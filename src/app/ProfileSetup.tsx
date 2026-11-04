
import { useState, type FormEvent, type CSSProperties } from "react";
import { supabase } from "../lib/supabase";
import { GraduationCap, LoaderCircle, Sparkles } from "lucide-react";

type ProfileSetupProps = {
  userId: string;
  onComplete: () => void;
};

export default function ProfileSetup({
  userId,
  onComplete,
}: ProfileSetupProps) {
  const [nickname, setNickname] = useState("");
  const [classLevel, setClassLevel] = useState("Class 11");
  const [targetExam, setTargetExam] = useState("JEE Main");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanNickname = nickname.trim();

    if (!cleanNickname) {
      setError("Please enter your nickname.");
      return;
    }

    setSaving(true);

    try {
      const { error: saveError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            nickname: cleanNickname,
            class_level: classLevel,
            target_exam: targetExam,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (saveError) throw saveError;

      onComplete();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  const fieldStyle: CSSProperties = {
    width: "100%",
    padding: "13px 14px",
    background: "#111117",
    color: "#f5f3ff",
    border: "1px solid #34313f",
    borderRadius: 12,
    outline: "none",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    color: "#d8d3e5",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(ellipse at 50% 0%, #552c8533, transparent 55%), #08080b",
        color: "#f5f3ff",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 460,
          padding: 30,
          border: "1px solid #393044",
          borderRadius: 24,
          background: "rgba(17,16,23,.96)",
          boxShadow: "0 24px 90px #0008",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            display: "grid",
            placeItems: "center",
            borderRadius: 17,
            background: "#8b5cf625",
            color: "#c4b5fd",
            marginBottom: 22,
          }}
        >
          <GraduationCap size={28} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            color: "#b8a4ff",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          <Sparkles size={14} /> PERSONALISE YOUR EXPERIENCE
        </div>

        <h1 style={{ fontSize: 30, margin: "12px 0 8px" }}>
          Welcome to JEE 360
        </h1>

        <p style={{ color: "#9692a7", fontSize: 13, lineHeight: 1.7 }}>
          Tell us a little about yourself so we can personalise your learning
          dashboard.
        </p>

        <div style={{ marginTop: 25 }}>
          <label htmlFor="nickname" style={labelStyle}>
            What should we call you?
          </label>
          <input
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            maxLength={40}
            required
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="Enter your nickname"
            style={fieldStyle}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <label htmlFor="classLevel" style={labelStyle}>
            Your class
          </label>
          <select
            id="classLevel"
            value={classLevel}
            onChange={(event) => setClassLevel(event.target.value)}
            style={fieldStyle}
          >
            <option>Class 11</option>
            <option>Class 12</option>
            <option>Dropper</option>
          </select>
        </div>

        <div style={{ marginTop: 20 }}>
          <label htmlFor="targetExam" style={labelStyle}>
            Your target exam
          </label>
          <select
            id="targetExam"
            value={targetExam}
            onChange={(event) => setTargetExam(event.target.value)}
            style={fieldStyle}
          >
            <option>JEE Main</option>
            <option>JEE Advanced</option>
            <option>NEET</option>
          </select>
        </div>

        {error && (
          <p
            role="alert"
            style={{
              color: "#fca5a5",
              fontSize: 12,
              lineHeight: 1.6,
              marginTop: 16,
              overflowWrap: "anywhere",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            width: "100%",
            marginTop: 26,
            padding: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            border: 0,
            borderRadius: 12,
            background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
            color: "white",
            fontWeight: 800,
            cursor: saving ? "wait" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving && <LoaderCircle size={18} />}
          {saving ? "Saving your profile..." : "Complete setup"}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#777386",
            marginTop: 20,
          }}
        >
          JEE 360 · Created by Ghazi Abbas
        </p>
      </form>
    </main>
  );
}
