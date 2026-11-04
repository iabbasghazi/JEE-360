
import { useState } from "react";
import { supabase } from "./lib/supabase";
import { GraduationCap, LoaderCircle } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signInWithGoogle() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
          <GraduationCap size={34} />
        </div>

        <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-purple-300">
          GHAZI ABBAS
        </p>

        <h1 className="text-4xl font-bold tracking-tight">JEE 360</h1>

        <p className="mt-4 text-sm leading-6 text-gray-400">
          Your complete preparation companion for JEE Main, JEE Advanced and NEET.
          Sign in to continue your learning journey.
        </p>

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.98 46.98 31.8 46.98 24.55Z" />
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
            </svg>
          )}
          {loading ? "Connecting..." : "Continue with Google"}
        </button>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <p className="mt-6 text-xs leading-5 text-gray-500">
          By continuing, you agree to use JEE 360 responsibly.
        </p>

        <p className="mt-8 text-xs text-gray-600">
          Created by Ghazi Abbas
        </p>
      </section>
    </main>
  );
}
