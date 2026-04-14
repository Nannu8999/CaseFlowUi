import { useState } from "react";
import type { Client } from "../types/ClientTypes";

interface ClientTableProps {
    clients: Client[];
}

const PAGE_SIZE_OPTIONS = [5, 10, 20];

function ClientTable({ clients }: ClientTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const totalPages = Math.max(1, Math.ceil(clients.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = clients.slice(startIndex, startIndex + pageSize);

    const goTo = (page: number) => setCurrentPage(Math.min(Math.max(1, page), totalPages));

    const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    // Generate page numbers to show (max 5 around current)
    const pageNumbers = () => {
        const pages: (number | "...")[] = [];
        const delta = 2;
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        pages.push(1);
        if (left > 2) pages.push("...");
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < totalPages - 1) pages.push("...");
        if (totalPages > 1) pages.push(totalPages);
        return pages;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500 uppercase text-xs tracking-wider">
                            <th className="px-3 md:px-5 py-3 font-semibold">#</th>
                            <th className="px-3 md:px-5 py-3 font-semibold">Name</th>
                            <th className="px-3 md:px-5 py-3 font-semibold hidden sm:table-cell">Email</th>
                            <th className="px-3 md:px-5 py-3 font-semibold hidden md:table-cell">Phone</th>
                            <th className="px-3 md:px-5 py-3 font-semibold hidden lg:table-cell">Address</th>
                            <th className="px-3 md:px-5 py-3 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                                    No clients found.
                                </td>
                            </tr>
                        ) : (
                            paginated.map((client, idx) => (
                                <tr key={client.id} className="hover:bg-slate-50 transition-colors duration-100">
                                    <td className="px-3 md:px-5 py-3 text-slate-400">{startIndex + idx + 1}</td>
                                    <td className="px-3 md:px-5 py-3 font-medium text-slate-800">{client.name}</td>
                                    <td className="px-3 md:px-5 py-3 text-slate-600 hidden sm:table-cell">{client.email}</td>
                                    <td className="px-3 md:px-5 py-3 text-slate-600 hidden md:table-cell">{client.phone}</td>
                                    <td className="px-3 md:px-5 py-3 text-slate-600 hidden lg:table-cell">{client.address}</td>
                                    <td className="px-3 md:px-5 py-3 text-right">
                                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs mr-3 transition-colors">
                                            View
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 font-medium text-xs transition-colors">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-slate-200 bg-slate-50">
                {/* Row count info + per-page selector */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>
                        Showing {clients.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, clients.length)} of {clients.length}
                    </span>
                    <span className="text-slate-300">|</span>
                    <label htmlFor="pageSize" className="sr-only">Rows per page</label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={handlePageSize}
                        className="border border-slate-200 rounded px-2 py-1 bg-white text-slate-600 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        {PAGE_SIZE_OPTIONS.map(n => (
                            <option key={n} value={n}>{n} / page</option>
                        ))}
                    </select>
                </div>

                {/* Page buttons */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => goTo(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded text-xs text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        ‹ Prev
                    </button>

                    {pageNumbers().map((p, i) =>
                        p === "..." ? (
                            <span key={`ellipsis-${i}`} className="px-2 py-1 text-slate-400 text-xs">…</span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => goTo(p as number)}
                                className={`w-7 h-7 rounded text-xs font-medium transition-colors
                                    ${currentPage === p
                                        ? "bg-indigo-600 text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {p}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => goTo(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded text-xs text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Next ›
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClientTable;
