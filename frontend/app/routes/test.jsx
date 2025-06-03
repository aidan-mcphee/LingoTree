import { useEffect, useState } from "react";
import { supabase_client } from "../components/supabase-client";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function Test() {
    const [translations, setTranslations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tests, setTests] = useState([]);
    const [current, setCurrent] = useState(0);
    const [results, setResults] = useState([]);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const { data, error } = await supabase_client
                    .from('translations')
                    .select('*');
                if (error) throw error;
                setTranslations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTranslations();
    }, []);

    useEffect(() => {
        if (translations.length > 0) {
            // Generate 10 random tests
            const picked = shuffle([...translations]).slice(0, 10);
            const testList = picked.map(t => {
                // Randomly decide direction
                const direction = Math.random() < 0.5 ? "toTranslation" : "toOriginal";
                let question, answer, options;
                if (direction === "toTranslation") {
                    question = t.original_text;
                    answer = t.translation_text;
                    // Pick 3 random wrong translations
                    const wrongs = shuffle(translations.filter(x => x.id !== t.id)).slice(0, 3).map(x => x.translation_text);
                    options = shuffle([answer, ...wrongs]);
                } else {
                    question = t.translation_text;
                    answer = t.original_text;
                    // Pick 3 random wrong originals
                    const wrongs = shuffle(translations.filter(x => x.id !== t.id)).slice(0, 3).map(x => x.original_text);
                    options = shuffle([answer, ...wrongs]);
                }
                return {
                    id: t.id,
                    direction,
                    question,
                    answer,
                    options
                };
            });
            setTests(testList);
        }
    }, [translations]);

    const handleAnswer = (selected) => {
        const correct = selected === tests[current].answer;
        setResults([...results, { id: tests[current].id, correct, selected }]);
        if (current === tests.length - 1) {
            setFinished(true);
            // Log results as requested
            setTimeout(() => {
                results.concat([{ id: tests[current].id, correct }]).forEach(r => {
                    console.log(`ID: ${r.id}, Correct: ${r.correct}`);
                });
            }, 0);
        } else {
            setCurrent(current + 1);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading translations...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 dark:bg-gray-900">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Test Complete!</h1>
                <div className="mb-4 text-gray-900 dark:text-white">Here are your results:</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl mb-6 border-4 border-blue-500">
                    <table className="w-full table-auto border border-gray-300 rounded-lg bg-white dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left text-gray-900 dark:text-white">#</th>
                                <th className="px-4 py-2 border-b text-left text-gray-900 dark:text-white">Korean</th>
                                <th className="px-4 py-2 border-b text-left text-gray-900 dark:text-white">English</th>
                                <th className="px-4 py-2 border-b text-left text-gray-900 dark:text-white">Your Answer</th>
                                <th className="px-4 py-2 border-b text-left text-gray-900 dark:text-white">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((r, idx) => {
                                const t = translations.find(tr => tr.id === tests[idx].id);
                                let korean = t ? t.translation_text : "";
                                let english = t ? t.original_text : "";
                                // Find the user's selected answer
                                const userAnswer = r.selected;
                                return (
                                    <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-700">
                                        <td className="px-4 py-2 border-b text-gray-900 dark:text-white">{idx + 1}</td>
                                        <td className="px-4 py-2 border-b text-gray-900 dark:text-white">{korean}</td>
                                        <td className="px-4 py-2 border-b text-gray-900 dark:text-white">{english}</td>
                                        <td className="px-4 py-2 border-b text-gray-900 dark:text-white">{userAnswer}</td>
                                        <td className={`px-4 py-2 border-b font-bold ${r.correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{r.correct ? 'Correct' : 'Incorrect'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => { setCurrent(0); setResults([]); setFinished(false); }}>Retake Test</button>
            </div>
        );
    }

    if (tests.length === 0) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-gray-500">Not enough translations to generate a test.</div>
            </div>
        );
    }

    const test = tests[current];

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-lg w-full">
                <div className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Question {current + 1} of {tests.length}</div>
                <div className="mb-6 text-xl font-bold text-center text-gray-900 dark:text-white">{test.direction === "toTranslation" ? "Translate to Korean:" : "Translate to English:"}</div>
                <div className="mb-6 text-2xl text-center text-gray-900 dark:text-white">{test.question}</div>
                <div className="grid grid-cols-1 gap-4">
                    {test.options.map((opt, idx) => (
                        <button
                            key={idx}
                            className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-700 hover:bg-blue-300 dark:hover:bg-blue-500 rounded text-lg transition-colors text-gray-900 dark:text-white"
                            onClick={() => handleAnswer(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}