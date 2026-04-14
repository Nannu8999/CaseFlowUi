import { Link, useLocation } from "react-router-dom";

const navItems = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
        ),
    },
    {
        to: "/clients",
        label: "Clients",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
        ),
    },
];

interface SidebarProps {
    onClose?: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
    const { pathname } = useLocation();

    return (
        <aside className="flex flex-col w-64 md:w-56 h-full min-h-screen bg-slate-900 text-slate-300 shadow-xl">
            {/* Brand + close button (mobile only) */}
            <div className="flex items-center justify-between gap-2 px-6 py-5 border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <span className="text-indigo-400 text-2xl font-bold">⚖</span>
                    <span className="text-white text-xl font-semibold tracking-wide">CaseFlow</span>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden text-slate-400 hover:text-white transition-colors p-1 rounded"
                        aria-label="Close menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, label, icon }) => {
                    const active = pathname === to || pathname.startsWith(to + "/");
                    return (
                        <Link
                            key={to}
                            to={to}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                                ${active
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <span className="shrink-0">{icon}</span>
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-700 text-xs text-slate-500">
                © 2026 CaseFlow
            </div>
        </aside>
    );
}

export default Sidebar;