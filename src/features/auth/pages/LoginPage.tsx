import LoginForm from "../components/LoginForm";

function LoginPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left half — branding */}
            <div className="w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-between p-12">
                <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 mb-3">
                        <span className="text-white font-bold text-sm">CF</span>
                    </div>
                    <p className="text-white font-bold text-xl tracking-tight">CaseFlow</p>
                    <p className="text-slate-400 text-sm mt-1">Case Management Platform</p>
                </div>

                <div>
                    <p className="text-4xl font-bold text-white leading-snug">
                        Manage cases.<br />Stay on track.<br />Close faster.
                    </p>
                    <p className="mt-5 text-slate-400 text-base leading-relaxed max-w-xs">
                        Everything your legal team needs — case tracking, deadlines, documents, and collaboration in one place.
                    </p>

                    <div className="mt-10 flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {["bg-blue-400", "bg-indigo-400", "bg-sky-400"].map((c, i) => (
                                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-slate-900`} />
                            ))}
                        </div>
                        <p className="text-slate-400 text-sm">Trusted by 500+ legal professionals</p>
                    </div>
                </div>

                <div className="flex gap-5 text-slate-500 text-xs">
                    <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
                    <a href="#" className="hover:text-slate-300 transition-colors">Support</a>
                </div>
            </div>

            {/* Right half — login form */}
            <div className="w-1/2 bg-gray-50 flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                        <p className="text-gray-500 text-sm mt-1">Sign in to your CaseFlow account</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <LoginForm />

                        <p className="mt-6 text-center text-sm text-gray-500">
                            No account?{" "}
                            <a href="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Request access
                            </a>
                        </p>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        &copy; {new Date().getFullYear()} CaseFlow. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;