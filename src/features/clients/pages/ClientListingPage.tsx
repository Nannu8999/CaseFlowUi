import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../services/clientService";
import type { Client } from "../types/ClientTypes";
import ClientTable from "../components/ClientTable";

function ClientListingPage() {
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
            } catch (err: unknown) {
                const message =
                    err instanceof Error ? err.message : "Failed to fetch clients. Please try again.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();

    }, []);



    return (

        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">Clients</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage your client directory</p>
                </div>
                <button onClick={() => navigate("/clients/add")} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors duration-150 whitespace-nowrap">
                    <span className="text-lg leading-none">+</span>
                    Add Client
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-5 py-4 text-sm">
                    {error}
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <ClientTable clients={clients} />
            )}
        </div>

    );
}

export default ClientListingPage;
