import { useState } from "react";
import { Login } from "../services/authService";
import { useDispatch } from "react-redux";
import { setToken } from "../authSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {

            const res = await Login({ email, password });
            dispatch(setToken(res.token));

            navigate("/dashboard");

        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Invalid email or password. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={isLoading}
                    className="rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60"
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <a
                        href="/forgot-password"
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Forgot password?
                    </a>
                </div>
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        disabled={isLoading}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400 transition focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>

                </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me for 30 days</span>
            </label>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isLoading && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                )}
                {isLoading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}

export default LoginForm;