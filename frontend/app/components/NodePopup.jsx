import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NodePopup({ open, onClose, markdown, translations, title }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            style={{ backdropFilter: "blur(2px)" }}
        >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-[80vw] max-w-[80vw] h-[80vh] max-h-[80vh] p-6 relative flex flex-col">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="w-full flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                        {title}
                    </h1>
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col">
                    <div className="mb-6 prose dark:prose-invert">
                        {/* Render markdown content */}
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {markdown}
                        </ReactMarkdown>
                    </div>
                    <div className="mt-auto w-full flex flex-col items-center">
                        <h3 className="font-semibold mb-4 text-xl text-center">Translations</h3>
                        <div className="w-full flex justify-center">
                            <div className="overflow-x-auto w-full max-w-2xl">
                                <table className="w-full table-auto border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-center text-lg font-semibold bg-gray-100 dark:bg-gray-700">
                                                Original
                                            </th>
                                            <th className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-center text-lg font-semibold bg-gray-100 dark:bg-gray-700">
                                                Translation
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {translations && translations.length > 0 ? (
                                            translations.map((t, i) => (
                                                <tr
                                                    key={i}
                                                    className="even:bg-gray-50 dark:even:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-center align-middle">
                                                        {t.original}
                                                    </td>
                                                    <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-center align-middle">
                                                        {t.translation}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="px-4 py-4 text-gray-400 text-center">
                                                    No translations available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
