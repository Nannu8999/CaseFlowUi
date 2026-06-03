import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../services/clientService";
import type { FormState } from "../types/ClientTypes";

const initialForm: FormState = { name: "", email: "", phone: "", address: "" };

function ClientAddPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const validate = (): boolean => {

        const next: Partial<FormState> = {};

        if (!form.name.trim()) next.name = "Name is required.";

        if (!form.email.trim()) {
            next.email = "Email is required.";

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            next.email = "Enter a valid email address.";
        }

        if (!form.phone.trim()) next.phone = "Phone is required.";

        if (!form.address.trim()) next.address = "Address is required.";

        setErrors(next);

        return Object.keys(next).length === 0;

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target;

        setForm(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormState]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setSubmitting(true);
        setServerError(null);

        try {
            await createClient(form);
            navigate("/clients");
        } catch (err: unknown) {
            setServerError(err instanceof Error ? err.message : "Failed to create client. Please try again.");
        } finally {
            setSubmitting(false);
        }

    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Page header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate("/clients")}
                    className="text-slate-500 hover:text-slate-800 transition-colors p-1 rounded"
                    aria-label="Back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">Add Client</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Fill in the details to create a new client</p>
                </div>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                {serverError && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition
                                focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                                ${errors.name ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"}`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition
                                focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                                ${errors.email ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"}`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition
                                focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                                ${errors.phone ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"}`}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            rows={3}
                            value={form.address}
                            onChange={handleChange}
                            placeholder="123 Main St, City, State, ZIP"
                            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition resize-none
                                focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                                ${errors.address ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"}`}
                        />
                        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/clients")}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting && (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            {submitting ? "Saving…" : "Save Client"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ClientAddPage;
