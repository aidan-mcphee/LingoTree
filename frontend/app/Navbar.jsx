import { Link, useLocation } from "react-router";

export default function Navbar() {
    const location = useLocation();
    const links = [
        { to: "/", label: "Home" },
        { to: "/upload", label: "Upload" },
        { to: "/test", label: "Test" },
        { to: "/about", label: "About" },
    ];
    return (
        <nav className="bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight drop-shadow-sm select-none">
                        <span className="inline-block align-middle mr-2">🌳</span>LingoTree
                    </span>
                </div>
                <ul className="flex gap-2 sm:gap-6 text-gray-700 dark:text-gray-200 font-medium">
                    {links.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`px-4 py-2 rounded-lg transition-all duration-150 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${location.pathname === link.to ? 'bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-400 font-bold shadow-sm' : ''}`}
                                aria-current={location.pathname === link.to ? "page" : undefined}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
