
import { useState } from "react";
import { supabase } from "./lib/supabase";
import { GraduationCap, LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";

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
    <main style={ui.page}>
      <div style={ui.glowOne} />
      <div style={ui.glowTwo} />

      <div style={ui.layout}>
        <section style={ui.intro}>
          <div style={ui.brand}>
            <div style={ui.logo}>
              <GraduationCap size={27} />
            </div>
            <span>JEE <b>360</b></span>
          </div>

          <div style={ui.pill}>
            <Sparkles size={14} />
            YOUR PREPARATION. YOUR FUTURE.
          </div>

          <h1 style={ui.headline}>
            Prepare smarter.
            <br />
            <span style={ui.gradientText}>Go beyond limits.</span>
          </h1>

          <p style={ui.description}>
            One focused space for your JEE Main, JEE Advanced and NEET
            preparation. Build consistency, strengthen concepts and keep
            moving towards your goal.
          </p>

          <div style={ui.features}>
            {[
              ["01", "Your learning dashboard", "Keep your preparation organised."],
              ["02", "Practice & progress", "Build better study habits every day."],
              ["03", "A space made for you", "Personalise your learning journey."],
            ].map(([number, title, description]) => (
              <div key={number} style={ui.feature}>
                <div style={ui.featureNumber}>{number}</div>
                <div>
                  <div style={ui.featureTitle}>{title}</div>
                  <div style={ui.featureDescription}>{description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={ui.card}>
          <div style={ui.cardIcon}>
            <GraduationCap size={29} />
          </div>

          <div style={ui.welcome}>WELCOME TO</div>
          <h2 style={ui.cardTitle}>Your next chapter starts here.</h2>
          <p style={ui.cardDescription}>
            Sign in with Google to get started with JEE 360.
          </p>

          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={loading}
            style={{
              ...ui.googleButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? (
              <LoaderCircle size={20} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <svg width="21" height="21" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.98 46.98 31.8 46.98 24.55Z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>
            )}
            {loading ? "Connecting to Google..." : "Continue with Google"}
          </button>

          {error && (
            <p role="alert" style={ui.error}>
              {error}
            </p>
          )}

          <div style={ui.secureNote}>
            <ShieldCheck size={15} />
            Secure sign-in powered by Google and Supabase
          </div>

          <div style={ui.divider} />

          <p style={ui.terms}>
            By continuing, you agree to use JEE 360 responsibly.
          </p>
        </section>
      </div>

      <footer style={ui.footer}>
        <span>© {new Date().getFullYear()} JEE 360</span>
        <span>Created by Ghazi Abbas</span>
      </footer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        button:focus-visible {
          outline: 2px solid #c4b5fd;
          outline-offset: 4px;
        }
        @media (max-width: 760px) {
          .login-layout {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
          }
          .login-intro {
            text-align: center;
          }
          .login-brand, .login-pill {
            justify-content: center;
          }
          .login-headline {
            font-size: clamp(36px, 10vw, 52px) !important;
          }
          .login-features {
            display: none !important;
          }
          .login-card {
            width: 100% !important;
            max-width: 460px;
            margin: 0 auto;
          }
        }
      `}</style>
    </main>
  );
}

const ui: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px clamp(20px, 5vw, 76px) 20px",
    background: "#07070a",
    color: "#f7f5ff",
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  glowOne: {
    position: "absolute",
    width: 420,
    height: 420,
    top: "-180px",
    left: "8%",
    borderRadius: "50%",
    background: "#7c3aed",
    opacity: 0.17,
    filter: "blur(120px)",
    pointerEvents: "none",
  },
  glowTwo: {
    position: "absolute",
    width: 380,
    height: 380,
    right: "-180px",
    bottom: "-100px",
    borderRadius: "50%",
    background: "#6d28d9",
    opacity: 0.19,
    filter: "blur(120px)",
    pointerEvents: "none",
  },
  layout: {
    width: "100%",
    maxWidth: 1120,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.8fr",
    gap: "clamp(40px, 8vw, 110px)",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  intro: { minWidth: 0 },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 1.5,
    marginBottom: 58,
  },
  logo: {
    width: 46,
    height: 46,
    display: "grid",
    placeItems: "center",
    borderRadius: 15,
    color: "#d9ccff",
    background: "linear-gradient(145deg, #2a1b42, #14101d)",
    border: "1px solid #8b5cf65c",
    boxShadow: "0 0 30px #7c3aed24",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #8b5cf642",
    background: "#8b5cf612",
    borderRadius: 999,
    padding: "9px 13px",
    color: "#c4b5fd",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.2,
  },
  headline: {
    fontSize: "clamp(39px, 5vw, 64px)",
    lineHeight: 1.08,
    letterSpacing: "-2.5px",
    margin: "25px 0 20px",
    fontWeight: 850,
  },
  gradientText: {
    background: "linear-gradient(95deg, #c4b5fd, #a78bfa 45%, #e9d5ff)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  description: {
    maxWidth: 500,
    color: "#a5a0b5",
    fontSize: 14,
    lineHeight: 1.9,
    margin: 0,
  },
  features: {
    display: "grid",
    gap: 22,
    marginTop: 40,
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  featureNumber: {
    width: 42,
    height: 42,
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    border: "1px solid #34303f",
    background: "#111016",
    borderRadius: 13,
    color: "#b9a4ff",
    fontSize: 12,
    fontWeight: 800,
  },
  featureTitle: { fontSize: 13, fontWeight: 750, marginBottom: 5 },
  featureDescription: { fontSize: 12, color: "#8f8a9f" },
  card: {
    width: "100%",
    maxWidth: 430,
    justifySelf: "end",
    padding: "clamp(25px, 4vw, 42px)",
    border: "1px solid #30283d",
    borderRadius: 26,
    background: "linear-gradient(145deg, #15121c, #0e0d12 75%)",
    boxShadow: "0 28px 100px #0007, 0 0 70px #7c3aed0b",
    textAlign: "center",
    backdropFilter: "blur(18px)",
  },
  cardIcon: {
    width: 62,
    height: 62,
    display: "grid",
    placeItems: "center",
    margin: "0 auto 25px",
    borderRadius: 20,
    color: "#d8caff",
    border: "1px solid #8b5cf64d",
    background: "linear-gradient(145deg, #382354, #171120)",
    boxShadow: "0 0 36px #7c3aed22",
  },
  welcome: {
    color: "#b8a4ff",
    fontSize: 10,
    fontWeight: 850,
    letterSpacing: 2.5,
  },
  cardTitle: {
    fontSize: 25,
    lineHeight: 1.3,
    letterSpacing: "-0.7px",
    margin: "12px 0 10px",
  },
  cardDescription: {
    color: "#9b95aa",
    fontSize: 13,
    lineHeight: 1.8,
    margin: "0 auto 27px",
  },
  googleButton: {
    width: "100%",
    minHeight: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    border: "1px solid #ffffff",
    borderRadius: 14,
    background: "#fff",
    color: "#17151d",
    fontSize: 13,
    fontWeight: 800,
    transition: "transform .2s ease, background .2s ease",
  },
  error: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    background: "#ef444414",
    color: "#fca5a5",
    fontSize: 12,
    lineHeight: 1.6,
  },
  secureNote: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    color: "#8f8a9f",
    fontSize: 10,
    marginTop: 22,
  },
  divider: {
    height: 1,
    background: "#292531",
    margin: "23px 0 17px",
  },
  terms: {
    color: "#777184",
    fontSize: 10,
    lineHeight: 1.7,
    margin: 0,
  },
  footer: {
    width: "100%",
    maxWidth: 1120,
    margin: "48px auto 0",
    paddingTop: 18,
    borderTop: "1px solid #24212d",
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    color: "#777184",
    fontSize: 10,
    position: "relative",
    zIndex: 1,
  },
};
