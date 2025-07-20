import Markdoc from "@markdoc/markdoc";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import glob from "fast-glob";
import * as fs from "node:fs";
import * as path from "node:path";
import { createLoader } from "simple-functional-loader";
import * as url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const slugify = slugifyWithCounter();

function toString(node) {
    let str = node.type === "text" && typeof node.attributes?.content === "string" ? node.attributes.content : "";
    if ("children" in node) {
        for (let child of node.children) {
            str += toString(child);
        }
    }
    return str;
}

function extractSections(node, sections, isRoot = true) {
    if (isRoot) {
        slugify.reset();
    }
    if (node.type === "heading" || node.type === "paragraph") {
        let content = toString(node).trim();
        if (node.type === "heading" && node.attributes.level <= 2) {
            let hash = node.attributes?.id ?? slugify(content);
            sections.push([content, hash, []]);
        } else {
            sections.at(-1)[2].push(content);
        }
    } else if ("children" in node) {
        for (let child of node.children) {
            extractSections(child, sections, false);
        }
    }
}

export default function withSearch(nextConfig = {}) {
    let cache = new Map();
    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            config.module.rules.push({
                test: __filename,
                use: [
                    createLoader(function () {
                        let pagesDir = path.resolve("./src/app");
                        this.addContextDependency(pagesDir);

                        let files = glob.sync("**/page.md", { cwd: pagesDir });
                        let data = files
                            .map((file) => {
                                let url = file === "page.md" ? "/" : `/${file.replace(/\/page\.md$/, "")}`;
                                let md = fs.readFileSync(path.join(pagesDir, file), "utf8");

                                // Skip non-post files (only process files in posts directory)
                                if (!file.includes('posts/')) {
                                    return null;
                                }

                                let ast = Markdoc.parse(md);
                                let frontmatter = ast.attributes?.frontmatter || '';
                                
                                // Extract frontmatter data
                                let title = frontmatter.match(/^title:\s*(.*?)\s*$/m)?.[1] || '';
                                let description = frontmatter.match(/^description:\s*(.*?)\s*$/m)?.[1] || '';
                                let subjects = frontmatter.match(/^subjects:\s*\[(.*?)\]\s*$/m)?.[1]
                                    ?.split(',')
                                    ?.map(s => s.trim().replace(/['"]/g, '')) || [];
                                let date = frontmatter.match(/^date:\s*(.*?)\s*$/m)?.[1] || '';

                                // Get content without frontmatter for search
                                let content = toString(ast);

                                return { 
                                    url, 
                                    title, 
                                    description, 
                                    subjects, 
                                    date, 
                                    content: [title, description, ...subjects, content].join(' ')
                                };
                            })
                            .filter(Boolean); // Remove null entries
                        return `
              import FlexSearch from 'flexsearch'

              let postIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: ['title', 'description', 'subjects', 'content'],
                  store: ['title', 'description', 'subjects', 'date'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}

              for (let post of data) {
                postIndex.add({
                  url: post.url,
                  title: post.title,
                  description: post.description,
                  subjects: post.subjects.join(' '),
                  content: post.content,
                  date: post.date
                })
              }

              export function search(query, options = {}) {
                let result = postIndex.search(query, {
                  ...options,
                  enrich: true,
                })
                if (result.length === 0) {
                  return []
                }
                return result[0].result.map((item) => ({
                  url: item.id,
                  title: item.doc.title,
                  pageTitle: item.doc.description, // Use description as subtitle
                  subjects: item.doc.subjects,
                  date: item.doc.date
                }))
              }`;
                    }),
                ],
            });
            if (typeof nextConfig.webpack === "function") {
                return nextConfig.webpack(config, options);
            }
            return config;
        },
    });
}
