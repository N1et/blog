import { highlight } from "@/lib/shiki";
import { PropsWithChildren } from "react";

export const Fence = async (props: PropsWithChildren<{ language: string }>) => {
    const code = (props.children as string) || "";
    if (!code) return null;
    const html = await highlight(code, props.language);
    
    return (
        <div className="my-6 rounded-lg bg-gray-900 shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal header with macOS-style dots */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">
                    {'Terminal'}
                </div>
                <div className="w-16"></div> {/* Spacer for centering */}
            </div>
            
            {/* Code content */}
            <div className="overflow-x-auto bg-transparent">
                <div 
                    dangerouslySetInnerHTML={{ __html: html }} 
                    className="font-mono text-sm  m-2"
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                        overflowWrap: 'anywhere',
                        overflowX: 'hidden'
                    }}
                />
            </div>
        </div>
    );
};
