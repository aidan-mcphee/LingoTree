import {
    AcademicCapIcon,
    SparklesIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white flex flex-col">
            {/* Hero Section */}
            <section className="flex flex-1 flex-col md:flex-row items-center justify-between px-6 py-16 max-w-6xl mx-auto gap-12">
                {/* Text */}
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 leading-tight">
                        Welcome to&nbsp;
                        <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                            LingoTree
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-600 max-w-lg">
                        Discover a new way to master languages. Explore a living language tree, generate custom lessons with AI, and get personalized study recommendations—all in a beautiful, interactive experience.
                    </p>
                </div>
                {/* Visual: Language Tree Illustration */}
                <div className="flex-1 flex items-center justify-center">
                    {/* Replace with your own SVG or animated tree */}
                    <img
                        src="/images/language-tree-visual.png"
                        alt="Language Tree Visual"
                        className="w-[320px] md:w-[400px] drop-shadow-xl"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-14 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-10">
                        Why LingoTree?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <AcademicCapIcon className="h-10 w-10 text-purple-300 mb-3" />
                            <h3 className="text-lg font-semibold text-blue-600 mb-1">
                                Visual Language Trees
                            </h3>
                            <p className="text-blue-500">
                                Navigate your learning journey through an intuitive tree—branch into grammar, vocabulary, culture, and more as you grow your skills.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <SparklesIcon className="h-10 w-10 text-blue-300 mb-3" />
                            <h3 className="text-lg font-semibold text-blue-600 mb-1">
                                AI-Generated Lessons
                            </h3>
                            <p className="text-blue-500">
                                Instantly create new topics—AI crafts markdown lessons and translations tailored to your interests and level.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <ChatBubbleLeftRightIcon className="h-10 w-10 text-purple-300 mb-3" />
                            <h3 className="text-lg font-semibold text-blue-600 mb-1">
                                Personalized Testing
                            </h3>
                            <p className="text-blue-500">
                                Test your knowledge, get real-time feedback, and receive smart recommendations on what to study next.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="py-6 text-center text-blue-400 text-sm">
                &copy; {new Date().getFullYear()} LingoTree. All rights reserved.
            </footer>
        </div>
    );
}
