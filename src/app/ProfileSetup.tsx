
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  LoaderCircle,
  Mail,
  Sparkles,
  Target,
  UserRound,
  Zap,
} from "lucide-react";

type ProfileSetupProps = {
  onComplete: () => void;
};

const classOptions = [
  { value: "Class 11", title: "Class 11", subtitle: "Build your foundation" },
  { value: "Class 12", title: "Class 12", subtitle: "Master your syllabus" },
  { value: "Dropper", title: "Dropper", subtitle: "Focus on your next attempt" },
];

const examOptions = [
  { value: "JEE Main", title: "JEE Main", subtitle: "Engineering entrance" },
  {
    value: "JEE Advanced",
    title: "JEE Advanced",
    subtitle: "IIT admission",
  },
  { value: "NEET", title: "NEET", subtitle: "Medical entrance" },
];

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [nickname, setNickname] = useState("");
  const [classLevel, setClassLevel] = useState("Class 11");
  const [targetExam, setTargetExam] = useState("JEE Main");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const { data, error: userError } = await supabase.auth.getUser();

      if (!active) return;

      if (userError || !data.user) {
        setError("Your login session could not be verified. Please sign in again.");
        return;
      }

      setEmail(data.user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname, class_level, target_exam")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!active || !profile) return;

      setNickname(profile.nickname ?? "");
      setClassLevel(profile.class_level ?? "Class 11");
      setTargetExam(profile.target_exam ?? "JEE Main");
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanNickname = nickname.trim();

    if (cleanNickname.length < 2) {
      setError("Please enter a nickname with at least 2 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError || !data.user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const { error: saveError } = await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          nickname: cleanNickname,
          class_level: classLevel,
          target_exam: targetExam,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (saveError) throw saveError;

      onComplete();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't save your profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="setup-page">
      <style>{`
        .setup-page, .setup-page * { box-sizing: border-box; }
        .setup-page {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 18px;
          background: #050507;
          color: #f5f3fa;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          isolation: isolate;
        }
        .setup-page:before {
          content: "";
          position: absolute;
          z-index: -1;
          width: 650px;
          height: 650px;
          left: 50%;
          top: -370px;
          transform: translateX(-50%);
          background: rgba(124, 58, 237, .20);
          filter: blur(110px);
          border-radius: 50%;
          pointer-events: none;
        }
        .setup-page:after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 400px;
          height: 400px;
          right: -260px;
          bottom: -190px;
          background: rgba(91, 33, 182, .14);
          filter: blur(100px);
          border-radius: 50%;
          pointer-events: none;
        }
        .setup-shell { width: 100%; max-width: 570px; margin: auto; }
        .setup-brand {
          display: flex; align-items: center; justify-content: center;
          gap: 11px; margin-bottom: 26px;
        }
        .setup-logo {
          width: 42px; height: 42px; display: grid; place-items: center;
          color: white; border-radius: 14px;
          background: linear-gradient(145deg, #8b5cf6, #5b21b6);
          box-shadow: 0 0 30px rgba(139, 92, 246, .28);
        }
        .setup-brand-name { font-weight: 850; letter-spacing: 1.4px; font-size: 19px; }
        .setup-brand-sub { color: #a5a0b3; font-size: 10px; letter-spacing: 2.8px; margin-top: 3px; }
        .setup-card {
          padding: 32px;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 26px;
          background: linear-gradient(145deg, rgba(20,18,27,.97), rgba(10,10,14,.98));
          box-shadow: 0 28px 100px rgba(0,0,0,.48), 0 0 50px rgba(124,58,237,.07);
          backdrop-filter: blur(20px);
        }
        .setup-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          color: #c4b5fd; font-size: 11px; font-weight: 750;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: 1px solid rgba(167,139,250,.22);
          background: rgba(124,58,237,.10);
          border-radius: 100px; padding: 8px 11px;
        }
        .setup-title { font-size: clamp(27px, 5vw, 36px); line-height: 1.13; letter-spacing: -1.3px; font-weight: 820; margin: 19px 0 10px; }
        .setup-title span {
          background: linear-gradient(90deg, #c4b5fd, #a78bfa, #e9d5ff);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .setup-description { color: #a6a1b2; font-size: 13px; line-height: 1.7; margin: 0 0 23px; }
        .setup-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 27px; }
        .setup-progress-line { height: 4px; flex: 1; border-radius: 20px; background: #292531; overflow: hidden; }
        .setup-progress-line.active { background: linear-gradient(90deg, #7c3aed, #c4b5fd); }
        .setup-progress-label { font-size: 10px; color: #a6a1b2; white-space: nowrap; }
        .setup-field { margin-top: 23px; }
        .setup-label { display: flex; align-items: center; gap: 8px; color: #f0edf8; font-size: 12px; font-weight: 700; margin-bottom: 11px; }
        .setup-label svg { color: #b8a0ff; }
        .setup-input-wrap {
          display: flex; align-items: center; gap: 10px; padding: 0 14px;
          min-height: 49px; border: 1px solid #302b3b; border-radius: 13px;
          background: rgba(5,5,8,.65); transition: border-color .2s, box-shadow .2s;
        }
        .setup-input-wrap:focus-within { border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,.12); }
        .setup-input-wrap svg { flex-shrink: 0; color: #8f879f; }
        .setup-input {
          width: 100%; min-width: 0; border: 0; outline: 0; background: transparent;
          color: #faf8ff; font: inherit; font-size: 13px; padding: 13px 0;
        }
        .setup-input::placeholder { color: #696475; }
        .setup-email { color: #9992a8; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .setup-options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
        .setup-option {
          position: relative; text-align: left; min-width: 0; padding: 14px 11px;
          border: 1px solid #302b3b; border-radius: 14px;
          color: #eeeaf6; background: rgba(8,8,12,.7); cursor: pointer;
          transition: transform .18s, border-color .18s, background .18s;
        }
        .setup-option:hover { transform: translateY(-2px); border-color: #65518b; }
        .setup-option.selected {
          border-color: #9b7aff;
          background: linear-gradient(145deg, rgba(124,58,237,.20), rgba(91,33,182,.08));
          box-shadow: inset 0 0 0 1px rgba(167,139,250,.10), 0 0 22px rgba(124,58,237,.08);
        }
        .setup-option-title { display: block; font-size: 12px; font-weight: 760; margin-bottom: 6px; }
        .setup-option-subtitle { display: block; color: #9e97ad; font-size: 10px; line-height: 1.45; }
        .setup-check {
          position: absolute; right: 8px; top: 8px; width: 17px; height: 17px;
          display: grid; place-items: center; border-radius: 50%;
          background: #a78bfa; color: #160b2d;
        }
        .setup-submit {
          width: 100%; min-height: 51px; display: flex; justify-content: center;
          align-items: center; gap: 10px; margin-top: 27px; border: 0;
          border-radius: 14px; color: white; font: inherit; font-size: 13px;
          font-weight: 780; cursor: pointer;
          background: linear-gradient(100deg, #7c3aed, #6d28d9 55%, #8b5cf6);
          box-shadow: 0 9px 28px rgba(109,40,217,.25);
          transition: transform .18s, filter .18s;
        }
        .setup-submit:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.12); }
        .setup-submit:disabled { opacity: .65; cursor: not-allowed; }
        .setup-error { margin-top: 15px; padding: 12px 13px; border: 1px solid rgba(248,113,113,.24); background: rgba(127,29,29,.14); color: #fca5a5; border-radius: 11px; font-size: 12px; line-height: 1.5; }
        .setup-privacy { display: flex; align-items: center; justify-content: center; gap: 7px; color: #817a90; font-size: 10px; line-height: 1.6; margin-top: 18px; text-align: center; }
        .setup-footer { color: #716b7e; text-align: center; font-size: 10px; margin-top: 22px; }
        .setup-footer strong { color: #aaa2bb; font-weight: 650; }
        @media (max-width: 520px) {
          .setup-page { padding: 22px 13px; align-items: flex-start; }
          .setup-shell { margin: auto 0; }
          .setup-brand { margin-bottom: 20px; }
          .setup-card { padding: 23px 17px; border-radius: 21px; }
          .setup-title { margin-top: 16px; }
          .setup-options { gap: 7px; }
          .setup-option { padding: 13px 8px; border-radius: 12px; }
          .setup-option-title { font-size: 11px; }
          .setup-option-subtitle { font-size: 9px; }
        }
      `}</style>

      <div className="setup-shell">
        <header className="setup-brand">
          <div className="setup-logo">
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="setup-brand-name">JEE 360</div>
            <div className="setup-brand-sub">YOUR PREP. YOUR FUTURE.</div>
          </div>
        </header>

        <section className="setup-card">
          <div className="setup-eyebrow">
            <Sparkles size={13} />
            YOUR JOURNEY STARTS HERE
          </div>

          <h1 className="setup-title">
            Make this space <span>yours.</span>
          </h1>
          <p className="setup-description">
            Set up your learning profile so JEE 360 can personalise your
            preparation, progress tracking and study experience.
          </p>

          <div className="setup-progress" aria-label="Profile setup progress">
            <div className="setup-progress-line active" />
            <div className="setup-progress-line active" />
            <div className="setup-progress-line" />
            <span className="setup-progress-label">PROFILE SETUP</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="setup-field" style={{ marginTop: 0 }}>
              <label className="setup-label" htmlFor="setup-nickname">
                <UserRound size={16} />
                What should we call you?
              </label>
              <div className="setup-input-wrap">
                <input
                  id="setup-nickname"
                  className="setup-input"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  placeholder="Enter your nickname"
                  maxLength={40}
                  autoComplete="nickname"
                  required
                />
              </div>
            </div>

            <div className="setup-field">
              <div className="setup-label">
                <Mail size={16} />
                Signed in with
              </div>
              <div className="setup-input-wrap">
                <Mail size={16} />
                <span className="setup-email">
                  {email || "Checking your Google account…"}
                </span>
                <Check size={16} color="#a78bfa" />
              </div>
            </div>

            <div className="setup-field">
              <div className="setup-label">
                <BookOpen size={16} />
                Which class are you in?
              </div>
              <div className="setup-options">
                {classOptions.map((option) => {
                  const selected = classLevel === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`setup-option${selected ? " selected" : ""}`}
                      aria-pressed={selected}
                      onClick={() => setClassLevel(option.value)}
                    >
                      {selected && (
                        <span className="setup-check">
                          <Check size={11} />
                        </span>
                      )}
                      <span className="setup-option-title">{option.title}</span>
                      <span className="setup-option-subtitle">
                        {option.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="setup-field">
              <div className="setup-label">
                <Target size={16} />
                What's your target exam?
              </div>
              <div className="setup-options">
                {examOptions.map((option) => {
                  const selected = targetExam === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`setup-option${selected ? " selected" : ""}`}
                      aria-pressed={selected}
                      onClick={() => setTargetExam(option.value)}
                    >
                      {selected && (
                        <span className="setup-check">
                          <Check size={11} />
                        </span>
                      )}
                      <span className="setup-option-title">{option.title}</span>
                      <span className="setup-option-subtitle">
                        {option.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="setup-error" role="alert">
                {error}
              </div>
            )}

            <button className="setup-submit" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle size={17} className="setup-spinner" />
                  Saving your profile…
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Save & Continue
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="setup-privacy">
            <Check size={13} />
            Your profile is saved securely to your JEE 360 account.
          </div>
        </section>

        <footer className="setup-footer">
          Made for your next big milestone · <strong>Created by Ghazi Abbas</strong>
        </footer>
      </div>
    </main>
  );
}
