import { highlight } from "@/lib/shiki";
import { PropsWithChildren } from "react";

export const Fence = async (props: PropsWithChildren<{ language: string }>) => {
    const code = (props.children as string) || "";
    if (!code) return null;
    const html = await highlight(code, props.language);
    return (
        <div className="overflow-hidden">
            <div 
                dangerouslySetInnerHTML={{ __html: html }} 
                style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    overflowWrap: 'anywhere',
                    overflowX: 'hidden'
                }}
            />
        </div>
    );
};
