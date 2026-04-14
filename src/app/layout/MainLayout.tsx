import { useState } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar — off-canvas on mobile, always visible on md+ */}
            <div
                className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 md:static md:translate-x-0 md:z-auto
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Right column: sticky header + scrollable content */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <div className="sticky top-0 z-10">
                    <Header onMenuClick={() => setSidebarOpen(prev => !prev)} />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;