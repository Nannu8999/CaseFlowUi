interface HeaderProps {
    onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-slate-800 border-b border-slate-700 shadow-md">
            {/* Left: hamburger (mobile) + page title */}
            <div className="flex items-center gap-3">
                {/* Hamburger — only visible on mobile */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden text-slate-400 hover:text-white transition-colors p-1 rounded"
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-base md:text-lg font-semibold text-white tracking-wide">Dashboard</h1>
            </div>

            {/* Right-side actions */}
            <div className="flex items-center gap-3 md:gap-4">
                {/* Notification bell */}
                <button
                    className="relative text-slate-400 hover:text-white transition-colors duration-150"
                    aria-label="Notifications"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
                </button>

                {/* Avatar */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold select-none">
                        A
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-150 hidden sm:block">
                        Admin
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;