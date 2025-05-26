import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NodePopup({ open, onClose, markdown, translations }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            style={{ backdropFilter: "blur(2px)" }}
        >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full p-6 relative flex flex-col">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="mb-6 overflow-y-auto max-h-72 prose dark:prose-invert">
                    {/* Render markdown content */}
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdown}
                    </ReactMarkdown>
                </div>
                <div className="mt-2">
                    <h3 className="font-semibold mb-2">Translations</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-[50%] max-w-[50%] table-auto border border-gray-300 dark:border-gray-700 rounded">
                            <thead>
                                <tr>
                                    <th className="px-2 py-1 border-b border-gray-200 dark:border-gray-700 text-left">Original</th>
                                    <th className="px-2 py-1 border-b border-gray-200 dark:border-gray-700 text-left">Translation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {translations && translations.length > 0 ? (
                                    translations.map((t, i) => (
                                        <tr key={i}>
                                            <td className="px-2 py-1 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap">{t.original}</td>
                                            <td className="px-2 py-1 border-b border-gray-100 dark:border-gray-800 break-words max-w-xs">{t.translation}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="px-2 py-2 text-gray-400 text-center">No translations available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
