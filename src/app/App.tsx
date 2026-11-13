import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import Login from "../Login";
import ProfileSetup from "./ProfileSetup";
import {
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flame,
  FlaskConical,
  Home,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Users,
  Zap,
  BarChart3,
  CalendarDays,
  Atom,
  ArrowRight,
  Calculator,
  BookMarked,
  Bell,
  GraduationCap,
} from "lucide-react";
import {
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

type Subject = {
  name: string;
  subtitle: string;
  progress: number;
  completed: number;
  total: number;
  icon: typeof Atom;
  color: string;
  background: string;
};

const subjects: Subject[] = [
  {
    name: "Physics",
    subtitle: "Concepts & numericals",
    progress: 35,
    completed: 14,
    total: 40,
    icon: Atom,
    color: "#a78bfa",
    background: "rgba(167,139,250,.12)",
  },
  {
    name: "Chemistry",
    subtitle: "Build your fundamentals",
    progress: 48,
    completed: 19,
    total: 40,
    icon: FlaskConical,
    color: "#67e8c0",
    background: "rgba(103,232,192,.10)",
  },
  {
    name: "Mathematics",
    subtitle: "Practice makes perfect",
    progress: 26,
    completed: 10,
    total: 38,
    icon: Calculator,
    color: "#fbbf77",
    background: "rgba(251,191,119,.11)",
  },
];

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: Home },
  { label: "Lectures", path: "/lecture", icon: Play },
  { label: "Study Group", path: "/group", icon: Users },
  { label: "Test Centre", path: "/test", icon: Target },
  { label: "Books & Notes", path: "/books", icon: BookOpen },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "AI Teacher", path: "/ai-teacher", icon: Brain },
];

const styles = `
  * { box-sizing: border-box; }
  :root { color-scheme: dark; }
  body {
    margin: 0;
    background: #08080b;
    color: #f5f3ff;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  button, input, select { font: inherit; }
  button { cursor: pointer; }
  a { color: inherit; text-decoration: none; }
  .app { min-height: 100vh; background: #08080b; }
  .glow {
    pointer-events: none;
    position: fixed;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: rgba(124, 58, 237, .10);
    filter: blur(90px);
    transform: translate(-50%, -50%);
    z-index: 0;
  }
  .layout { position: relative; z-index: 1; min-height: 100vh; }
  .sidebar {
    width: 248px;
    position: fixed;
    inset: 0 auto 0 0;
    background: rgba(12, 12, 17, .96);
    border-right: 1px solid #24232d;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    z-index: 20;
  }
  .brand { display: flex; align-items: center; gap: 12px; padding: 0 8px 28px; }
  .brand-mark {
    width: 42px; height: 42px; flex: 0 0 42px;
    border-radius: 14px; overflow: hidden;
    display: grid; place-items: center;
    background: #ffffff;
    border: 1px solid rgba(196, 181, 253, .9);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, .12),
      0 0 20px rgba(124, 58, 237, .28),
      0 4px 14px rgba(0, 0, 0, .28);
    transition: box-shadow .22s ease, transform .22s ease;
  }
  .brand:hover .brand-mark {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, .16),
      0 0 26px rgba(167, 139, 250, .42),
      0 4px 14px rgba(0, 0, 0, .3);
    transform: translateY(-1px);
  }
  .brand-mark img {
    display: block; width: 100%; height: 100%;
    object-fit: contain; border-radius: 12px;
  }
  .brand-name { font-size: 17px; font-weight: 850; letter-spacing: 1.6px; }
  .brand-caption { font-size: 11px; color: #9290a3; margin-top: 3px; }
  .nav-caption {
    color: #747184; font-size: 10px; font-weight: 800;
    letter-spacing: 1.6px; padding: 8px 12px 10px;
  }
  .nav-list { display: grid; gap: 5px; }
  .nav-link {
    display: flex; align-items: center; gap: 12px;
    min-height: 44px; padding: 0 12px; border-radius: 12px;
    color: #a5a2b5; font-size: 13px; font-weight: 600;
    transition: .2s ease;
  }
  .nav-link:hover { background: #191821; color: white; }
  .nav-link.active {
    background: linear-gradient(90deg, #8b5cf622, #8b5cf609);
    color: #c4b5fd; border: 1px solid #8b5cf62b;
  }
  .nav-link.active svg { color: #a78bfa; }
  .side-bottom { margin-top: auto; }
  .profile-mini {
    display: flex; align-items: center; gap: 10px;
    padding: 13px 8px 2px; border-top: 1px solid #25242d;
    margin-top: 20px;
  }
  .avatar {
    width: 38px; height: 38px; border-radius: 50%;
    display: grid; place-items: center; flex-shrink: 0;
    background: linear-gradient(145deg, #7c3aed, #312e81);
    border: 1px solid #a78bfa55; color: white; font-weight: 800;
  }
  .profile-name { font-size: 12px; font-weight: 700; }
  .profile-role { font-size: 11px; color: #858295; margin-top: 3px; }
  .main { margin-left: 248px; min-width: 0; }
  .topbar {
    height: 76px; display: flex; align-items: center;
    justify-content: space-between; gap: 16px;
    padding: 0 34px; border-bottom: 1px solid #22212a;
    background: rgba(8,8,11,.72); backdrop-filter: blur(16px);
    position: sticky; top: 0; z-index: 10;
  }
  .crumb { font-size: 13px; color: #9996a9; }
  .crumb strong { color: #f4f0ff; }
  .top-actions { display: flex; align-items: center; gap: 10px; }
  .searchbox {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 12px; border: 1px solid #292834;
    background: #111117; border-radius: 12px;
    color: #8d899f; width: 220px; font-size: 12px;
  }
  .icon-btn {
    width: 38px; height: 38px; display: grid; place-items: center;
    color: #aaa6bc; background: #121118; border: 1px solid #292834;
    border-radius: 12px;
  }
  .icon-btn:hover { color: white; border-color: #6d28d9; }
  .content { max-width: 1500px; padding: 32px 34px 20px; margin: auto; }
  .eyebrow {
    display: flex; align-items: center; gap: 7px; color: #b8a4ff;
    font-size: 11px; font-weight: 800; letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .page-title { font-size: clamp(25px, 3vw, 34px); line-height: 1.2; margin: 10px 0 8px; letter-spacing: -1.2px; }
  .muted { color: #9692a7; font-size: 13px; line-height: 1.7; }
  .hero {
    margin-top: 26px; padding: 28px; border-radius: 22px;
    border: 1px solid #393044;
    background: radial-gradient(ellipse at 90% 0%, #6d28d933, transparent 45%),
      linear-gradient(115deg, #191320, #101015 65%);
    position: relative; overflow: hidden;
  }
  .hero:after {
    content: ""; position: absolute; width: 210px; height: 210px;
    border: 1px solid #a78bfa20; border-radius: 50%;
    right: -48px; top: -72px; box-shadow: 0 0 0 24px #a78bfa08, 0 0 0 48px #a78bfa05;
  }
  .hero-content { position: relative; z-index: 1; max-width: 670px; }
  .hero h2 { font-size: clamp(23px, 3vw, 31px); margin: 14px 0 10px; letter-spacing: -.9px; }
  .hero p { color: #b2acbf; font-size: 13px; line-height: 1.8; max-width: 570px; }
  .button-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
    border: 0; padding: 12px 16px; border-radius: 12px;
    background: linear-gradient(135deg, #a78bfa, #7c3aed);
    color: white; font-size: 12px; font-weight: 800;
    box-shadow: 0 6px 22px #7c3aed30;
  }
  .button-primary:hover { filter: brightness(1.1); }
  .button-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    border: 1px solid #34313f; padding: 11px 14px; border-radius: 12px;
    background: #15141c; color: #d6d1e3; font-size: 12px; font-weight: 700;
  }
  .button-secondary:hover { border-color: #8b5cf6; }
  .stats-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 14px; margin-top: 20px; }
  .panel {
    background: linear-gradient(145deg, #14131a, #101015);
    border: 1px solid #292733; border-radius: 17px; padding: 18px;
    min-width: 0;
  }
  .stat-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .stat-icon {
    width: 38px; height: 38px; border-radius: 12px;
    display: grid; place-items: center;
  }
  .stat-label { color: #a09bae; font-size: 12px; margin-top: 15px; }
  .stat-value { font-size: 25px; font-weight: 800; letter-spacing: -.8px; margin-top: 5px; }
  .stat-note { color: #8e8a9d; font-size: 10px; margin-top: 7px; }
  .section-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 30px 0 15px; }
  .section-head h3 { font-size: 16px; margin: 0; letter-spacing: -.3px; }
  .section-head p { margin: 5px 0 0; font-size: 11px; color: #8d899f; }
  .text-link { border: 0; background: transparent; color: #b8a4ff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; }
  .subject-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 14px; }
  .subject-head { display: flex; align-items: center; gap: 11px; }
  .subject-icon { width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center; }
  .subject-title { font-size: 13px; font-weight: 800; }
  .subject-sub { font-size: 10px; color: #8f8a9e; margin-top: 4px; }
  .subject-numbers { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 24px 0 10px; }
  .subject-numbers strong { font-size: 21px; }
  .subject-numbers span { color: #9994a9; font-size: 10px; }
  .progress { height: 6px; background: #292631; border-radius: 20px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 20px; }
  .subject-footer { display: flex; justify-content: space-between; margin-top: 13px; color: #a09bae; font-size: 10px; }
  .bottom-grid { display: grid; grid-template-columns: minmax(0,1.3fr) minmax(270px,1fr); gap: 16px; margin-top: 24px; }
  .task-row { display: flex; align-items: center; gap: 11px; padding: 13px 0; border-bottom: 1px solid #272530; }
  .task-row:last-child { border-bottom: 0; padding-bottom: 0; }
  .check-btn { width: 22px; height: 22px; flex-shrink: 0; border: 1px solid #4a455a; border-radius: 7px; background: #17151e; color: white; display: grid; place-items: center; }
  .check-btn.checked { background: #7c3aed; border-color: #a78bfa; }
  .task-name { font-size: 12px; font-weight: 650; }
  .task-meta { color: #8e899e; font-size: 10px; margin-top: 4px; }
  .task-done { text-decoration: line-through; color: #777386; }
  .focus-card { border: 1px solid #44335d; border-radius: 15px; padding: 18px; background: radial-gradient(ellipse at 100% 0%, #7c3aed25, transparent 60%), #17131f; }
  .focus-icon { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 13px; background: #8b5cf625; color: #c4b5fd; }
  .focus-title { font-size: 14px; font-weight: 800; margin: 14px 0 7px; }
  .focus-card p { color: #a7a0b7; font-size: 11px; line-height: 1.7; }
  .focus-bottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 15px; }
  .pill { display: inline-flex; align-items: center; gap: 5px; border: 1px solid #3b3449; background: #211a2b; color: #c4b5fd; border-radius: 999px; padding: 6px 9px; font-size: 10px; }
  .countdown-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 12px; margin-top: 16px; }
  .countdown { border: 1px solid #2a2834; background: #121117; border-radius: 14px; padding: 14px; }
  .countdown-label { font-size: 10px; color: #a6a0b4; }
  .countdown-value { font-size: 20px; font-weight: 850; margin-top: 8px; }
  .countdown-note { font-size: 9px; color: #7f7a91; margin-top: 5px; }
  .page-footer { border-top: 1px solid #25232d; margin-top: 35px; padding: 18px 0; color: #777386; font-size: 10px; display: flex; justify-content: space-between; gap: 10px; }
  .placeholder {
    min-height: 55vh; display: grid; place-items: center; text-align: center;
    border: 1px solid #292733; border-radius: 20px; margin-top: 28px;
    padding: 30px; background: radial-gradient(ellipse at top, #7c3aed15, transparent 65%), #101015;
  }
  .placeholder-icon { width: 62px; height: 62px; border-radius: 19px; display: grid; place-items: center; margin: 0 auto 18px; background: #8b5cf620; color: #c4b5fd; }
  .mobile-menu { display: none; }
  @media (max-width: 1100px) {
    .stats-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .subject-grid { grid-template-columns: 1fr; }
    .subject-card { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 12px; }
    .subject-numbers { margin: 0; }
    .subject-card .progress, .subject-footer { grid-column: 1 / -1; }
  }
  @media (max-width: 760px) {
    .sidebar { width: 260px; transform: translateX(-100%); transition: transform .25s ease; box-shadow: 20px 0 60px #0008; }
    .sidebar.open { transform: translateX(0); }
    .main { margin-left: 0; }
    .topbar { height: 64px; padding: 0 16px; }
    .mobile-menu { display: grid; }
    .searchbox { display: none; }
    .content { padding: 23px 16px 16px; }
    .hero { padding: 21px; }
    .stats-grid { gap: 10px; }
    .panel { padding: 14px; }
    .stat-value { font-size: 22px; }
    .bottom-grid { grid-template-columns: 1fr; }
    .countdown-grid { gap: 8px; }
    .countdown { padding: 11px; }
    .countdown-value { font-size: 17px; }
    .page-footer { flex-direction: column; }
  }
  @media (max-width: 390px) {
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .hero h2 { font-size: 23px; }
    .countdown-grid { grid-template-columns: 1fr; }
  }
`;

function AppStyles() {
  return <style>{styles}</style>;
}

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pageName =
    navigation.find((item) => item.path === location.pathname)?.label ??
    (location.pathname === "/profile"
      ? "Profile"
      : location.pathname === "/settings"
        ? "Settings"
        : "Dashboard");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointer = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", handlePointer);
    return () => window.removeEventListener("mousemove", handlePointer);
  }, []);

  return (
    <div className="app">
      <AppStyles />
      <div
        className="glow"
        style={{
          left: "var(--pointer-x, 70%)",
          top: "var(--pointer-y, 20%)",
        }}
      />
      <div className="layout">
        {menuOpen && (
          <button
            aria-label="Close menu overlay"
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 15,
              background: "#0009",
              border: 0,
            }}
          />
        )}

        <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
          <NavLink to="/dashboard" className="brand" aria-label="JEE 360 dashboard">
            <div className="brand-mark">
              <img
                src="https://i.postimg.cc/m2PRngnY/logo512-png.png"
                alt="Ghazi Abbas logo"
                width={42}
                height={42}
                loading="eager"
                decoding="async"
              />
            </div>
            <div>
              <div className="brand-name">JEE 360</div>
              <div className="brand-caption">Your preparation universe</div>
            </div>
          </NavLink>

          <div className="nav-caption">LEARNING SPACE</div>
          <nav className="nav-list">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.path === "/ai-teacher" && (
                    <Sparkles size={13} style={{ marginLeft: "auto" }} />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="nav-caption" style={{ marginTop: 24 }}>
            PERSONAL
          </div>
          <nav className="nav-list">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <UserRound size={18} />
              <span>My Profile</span>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          </nav>

          <div className="side-bottom">
            <div className="focus-card" style={{ padding: 14, marginTop: 24 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Flame size={18} color="#fbbf77" />
                <strong style={{ fontSize: 12 }}>Keep showing up</strong>
              </div>
              <p style={{ marginBottom: 0 }}>
                Small daily steps build stronger preparation.
              </p>
            </div>
            <div className="profile-mini">
              <div className="avatar">S</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="profile-name">Student</div>
                <div className="profile-role">Your learning journey</div>
              </div>
              <MoreHorizontal size={17} color="#898499" />
            </div>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                className="icon-btn mobile-menu"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={19} />
              </button>
              <div className="crumb">
                JEE 360 <span style={{ color: "#625e70" }}> / </span>{" "}
                <strong>{pageName}</strong>
              </div>
            </div>
            <div className="top-actions">
              <div className="searchbox">
                <Search size={15} />
                <span>Search your learning space</span>
                <span style={{ marginLeft: "auto", color: "#666174" }}>⌘ K</span>
              </div>
              <button
                className="icon-btn"
                aria-label="Notifications"
                onClick={() => window.alert("Notifications will be available in a future update.")}
              >
                <Bell size={17} />
              </button>
              <button
                className="icon-btn"
                aria-label="Help"
                onClick={() => window.alert("Help and support will be available in a future update.")}
              >
                <CircleHelp size={17} />
              </button>
            </div>
          </header>

          <div className="content">
            <Outlet />
            <footer className="page-footer">
              <span>© {new Date().getFullYear()} JEE 360 · Created by Ghazi Abbas</span>
              <span>Learn with purpose. Improve every day.</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  note,
  color,
  background,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  note: string;
  color: string;
  background: string;
}) {
  return (
    <div className="panel">
      <div className="stat-top">
        <div className="stat-icon" style={{ color, background }}>
          <Icon size={19} />
        </div>
        <MoreHorizontal size={17} color="#777386" />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, name: "Revise Laws of Motion", meta: "Physics · 25 min", done: false },
    { id: 2, name: "Practice Mole Concept", meta: "Chemistry · 30 min", done: false },
    { id: 3, name: "Solve 10 algebra questions", meta: "Mathematics · 20 min", done: false },
  ]);

  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <>
      <div className="eyebrow">
        <Sparkles size={14} /> YOUR NEXT LEVEL STARTS HERE
      </div>
      <h1 className="page-title">Welcome to your learning space.</h1>
      <p className="muted">
        Make today count. Build your concepts, practise consistently, and track your progress.
      </p>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <Zap size={14} /> YOUR DAILY MISSION
          </div>
          <h2>One focused session can change your day.</h2>
          <p>
            Pick up where you left off, strengthen your weak topics, and take
            one step closer to your target exam.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
            <button className="button-primary" onClick={() => navigate("/lecture")}>
              <Play size={15} fill="currentColor" /> Continue learning
            </button>
            <button className="button-secondary" onClick={() => navigate("/test")}>
              <Target size={15} /> Practice a test
            </button>
          </div>
        </div>
      </section>

      <div className="stats-grid">
        <StatCard
          icon={Clock3}
          label="Study time today"
          value="—"
          note="Connect study tracking to see your time"
          color="#a78bfa"
          background="#a78bfa18"
        />
        <StatCard
          icon={BookMarked}
          label="Syllabus completed"
          value="—"
          note="Your actual syllabus progress will appear here"
          color="#67e8c0"
          background="#67e8c018"
        />
        <StatCard
          icon={Flame}
          label="Current streak"
          value="—"
          note="Daily activity tracking is not connected yet"
          color="#fbbf77"
          background="#fbbf7718"
        />
        <StatCard
          icon={Trophy}
          label="XP & rank"
          value="—"
          note="Rank will appear after verified tracking is enabled"
          color="#f0abfc"
          background="#f0abfc18"
        />
      </div>

      <div className="section-head">
        <div>
          <h3>Your subjects</h3>
          <p>Sample progress preview · Not saved to your account</p>
        </div>
        <button className="text-link" onClick={() => navigate("/analytics")}>
          View analytics <ChevronRight size={15} />
        </button>
      </div>

      <div className="subject-grid">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <div className="panel subject-card" key={subject.name}>
              <div className="subject-head">
                <div
                  className="subject-icon"
                  style={{ background: subject.background, color: subject.color }}
                >
                  <Icon size={21} />
                </div>
                <div>
                  <div className="subject-title">{subject.name}</div>
                  <div className="subject-sub">{subject.subtitle}</div>
                </div>
              </div>
              <div className="subject-numbers">
                <strong>{subject.progress}%</strong>
                <span>sample completion</span>
              </div>
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{
                    width: `${subject.progress}%`,
                    background: subject.color,
                  }}
                />
              </div>
              <div className="subject-footer">
                <span>{subject.completed} / {subject.total} sample chapters</span>
                <span style={{ color: subject.color }}>Preview</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-grid">
        <section className="panel">
          <div className="section-head" style={{ marginTop: 0 }}>
            <div>
              <h3>Today's study checklist</h3>
              <p>Tick items as you finish them. This checklist resets on refresh.</p>
            </div>
            <span className="pill">{doneCount}/{tasks.length} complete</span>
          </div>
          <div className="progress" style={{ marginBottom: 10 }}>
            <div
              className="progress-fill"
              style={{
                width: `${(doneCount / tasks.length) * 100}%`,
                background: "linear-gradient(90deg,#8b5cf6,#c4b5fd)",
              }}
            />
          </div>
          {tasks.map((task) => (
            <div className="task-row" key={task.id}>
              <button
                className={`check-btn ${task.done ? "checked" : ""}`}
                aria-label={task.done ? "Mark task incomplete" : "Mark task complete"}
                onClick={() =>
                  setTasks((current) =>
                    current.map((item) =>
                      item.id === task.id ? { ...item, done: !item.done } : item
                    )
                  )
                }
              >
                {task.done && <Check size={14} />}
              </button>
              <div style={{ flex: 1 }}>
                <div className={`task-name ${task.done ? "task-done" : ""}`}>
                  {task.name}
                </div>
                <div className="task-meta">{task.meta}</div>
              </div>
              <Clock3 size={15} color="#777386" />
            </div>
          ))}
          <button
            className="button-secondary"
            style={{ marginTop: 18 }}
            onClick={() =>
              window.alert("Custom study plans will be available in a future update.")
            }
          >
            <Plus size={15} /> Add a task
          </button>
        </section>

        <div style={{ display: "grid", gap: 15, alignContent: "start" }}>
          <section className="focus-card">
            <div className="focus-icon"><Brain size={22} /></div>
            <div className="focus-title">Your AI study companion</div>
            <p>
              Get help understanding concepts and planning your next study
              session. AI integration is not connected yet.
            </p>
            <button className="button-primary" onClick={() => navigate("/ai-teacher")}>
              Explore AI Teacher <ChevronRight size={15} />
            </button>
          </section>

          <section className="panel">
            <div className="section-head" style={{ marginTop: 0 }}>
              <div>
                <h3>Exam countdowns</h3>
                <p>Official dates need to be configured before countdowns appear.</p>
              </div>
              <CalendarDays size={18} color="#a78bfa" />
            </div>
            <div className="countdown-grid">
              {["JEE Main", "JEE Advanced", "NEET UG"].map((exam) => (
                <div className="countdown" key={exam}>
                  <div className="countdown-label">{exam}</div>
                  <div className="countdown-value">—</div>
                  <div className="countdown-note">Date not configured</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const placeholderDetails: Record<
  string,
  { title: string; description: string; icon: typeof BookOpen }
> = {
  "/lecture": {
    title: "Lectures",
    description: "Your chapter-wise lessons, video player, and lecture progress will live here.",
    icon: Play,
  },
  "/group": {
    title: "Study Group",
    description: "Connect with other learners, share goals, and practise together.",
    icon: Users,
  },
  "/test": {
    title: "Test Centre",
    description: "Chapter tests, DPPs, PYQs, mock exams, and detailed result analysis.",
    icon: Target,
  },
  "/books": {
    title: "Books & Notes",
    description: "Read your study materials, PDFs, notes, and bookmarked pages.",
    icon: BookOpen,
  },
  "/analytics": {
    title: "Analytics",
    description: "Understand your syllabus progress, test accuracy, study habits, and weak topics.",
    icon: BarChart3,
  },
  "/ai-teacher": {
    title: "AI Teacher",
    description: "A dedicated place for concept explanations and personalised study assistance. AI is not connected yet.",
    icon: Brain,
  },
  "/settings": {
    title: "Settings",
    description: "Account preferences, privacy controls, appearance, and notification settings.",
    icon: Settings,
  },
  "/profile": {
    title: "My Profile",
    description: "Your student profile, exam target, and learning achievements.",
    icon: UserRound,
  },
};

function PlaceholderPage({ path }: { path: string }) {
  const navigate = useNavigate();
  const details = placeholderDetails[path] ?? {
    title: "Page not found",
    description: "This page does not exist yet. Return to your dashboard to continue.",
    icon: CircleHelp,
  };
  const Icon = details.icon;

  return (
    <>
      <div className="eyebrow"><Sparkles size={14} /> JEE 360 WORKSPACE</div>
      <h1 className="page-title">{details.title}</h1>
      <p className="muted">{details.description}</p>
      <div className="placeholder">
        <div>
          <div className="placeholder-icon"><Icon size={28} /></div>
          <h2 style={{ fontSize: 21, margin: "0 0 10px" }}>
            {details.title} is being prepared
          </h2>
          <p className="muted" style={{ maxWidth: 450, margin: "0 auto 22px" }}>
            This screen is a starter page. The complete feature, saved data, and
            account integration will be added in the next development steps.
          </p>
          <button className="button-primary" onClick={() => navigate("/dashboard")}>
            <Home size={15} /> Back to dashboard
          </button>
        </div>
      </div>
    </>
  );
}

function AuthLoading({ message }: { message: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#050505",
        color: "#c4b5fd",
        fontSize: 16,
      }}
    >
      {message}
    </div>
  );
}

function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        console.error("Session check failed:", error.message);
      }

      setSession(data.session);
      setLoading(false);
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

function ProtectedAppShell({
  session,
  loading,
  profileComplete,
  profileLoading,
}: {
  session: Session | null;
  loading: boolean;
  profileComplete: boolean;
  profileLoading: boolean;
}) {
  if (loading || (session && profileLoading)) {
    return <AuthLoading message="Loading JEE 360..." />;
  }

  if (!session) return <Navigate to="/" replace />;

  if (!profileComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return <AppShell />;
}





















function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".lux-reveal"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const featureStories = [
    { number: "01", category: "LEARN", title: "A clearer way to learn.", copy: "Bring lectures, chapter notes and study resources into one calm, organised space.", icon: BookOpen, tone: "lavender", label: "LECTURES · NOTES · MATERIAL" },
    { number: "02", category: "PRACTISE", title: "Turn effort into evidence.", copy: "Work through tests and questions, then understand what your answers are telling you.", icon: Target, tone: "amber", label: "DPP · PYQ · MOCK TESTS" },
    { number: "03", category: "UNDERSTAND", title: "Make progress visible.", copy: "See subject-wise progress, revision priorities and the topics that need another look.", icon: BarChart3, tone: "mint", label: "INSIGHTS · ANALYTICS · REVIEW" },
    { number: "04", category: "GET GUIDANCE", title: "A study companion, on call.", copy: "Explore an AI-assisted learning space for concept explanations and doubt support.", icon: Brain, tone: "rose", label: "CONCEPTS · DOUBTS · REVISION" },
  ];

  const faqs = [
    ["Who is JEE 360 made for?", "JEE 360 is being designed for Class 11, Class 12 and dropper students preparing for JEE Main, JEE Advanced or NEET."],
    ["Is JEE 360 free to use?", "The project is being developed with a ₹0 operating-budget goal. Features will be introduced gradually, and no paid feature is being promised here."],
    ["How do I create my account?", "Choose Continue with Google. After successful sign-in, complete your student profile before entering the learning workspace."],
    ["Will it work on mobile?", "The experience is responsive and designed for desktop, tablet and mobile screens."],
    ["Are all the features already live?", "Not yet. Some sections are previews of the planned product. We will clearly connect each feature to real data as it is implemented."],
  ] as const;

  const goLogin = () => navigate("/login");
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="lux-home">
      <style>{`
        .lux-home, .lux-home * { box-sizing: border-box; }
        .lux-home {
          --ink:#11110f; --paper:#e9e5dc; --muted:#a7a197; --line:rgba(235,230,218,.16);
          --accent:#c6b6f3; --serif: Georgia, "Times New Roman", serif;
          min-height:100vh; background:#10100f; color:#f0ede6; overflow:hidden;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position:relative; isolation:isolate;
        }
        .lux-home:before { content:""; position:absolute; inset:0; z-index:-1; pointer-events:none; opacity:.12;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E"); }
        .lux-wrap { width:min(1320px,calc(100% - 72px)); margin:0 auto; }
        .lux-top { height:88px; display:flex; align-items:center; justify-content:space-between; gap:24px; border-bottom:1px solid var(--line); }
        .lux-brand { display:flex; align-items:center; gap:12px; min-width:180px; }
        .lux-brand-mark { width:39px; height:39px; border:1px solid rgba(226,217,196,.52); border-radius:50%; display:grid; place-items:center; color:#171613; background:#d9d1c2; box-shadow:0 0 0 5px rgba(220,210,190,.05); }
        .lux-brand-name { font-size:14px; font-weight:900; letter-spacing:2.5px; }
        .lux-brand-sub { margin-top:4px; color:#8e897f; font-size:8px; letter-spacing:2.2px; }
        .lux-nav { display:flex; align-items:center; gap:34px; color:#b8b2a7; font-size:11px; letter-spacing:.35px; }
        .lux-nav a { position:relative; padding:10px 0; transition:color .2s; }
        .lux-nav a:after { content:""; position:absolute; left:0; bottom:3px; width:0; height:1px; background:#d7c8a8; transition:width .25s; }
        .lux-nav a:hover { color:#fff; } .lux-nav a:hover:after { width:100%; }
        .lux-top-cta,.lux-button { border:1px solid rgba(232,224,208,.42); background:transparent; color:#f0ede6; display:inline-flex; align-items:center; justify-content:center; gap:12px; padding:13px 18px; min-height:44px; font-size:10px; font-weight:800; letter-spacing:1.15px; text-transform:uppercase; transition:background .25s,color .25s,border .25s,transform .25s; cursor:pointer; }
        .lux-top-cta:hover,.lux-button:hover { background:#e7dfd0; color:#171613; border-color:#e7dfd0; transform:translateY(-2px); }
        .lux-menu-btn { display:none; width:42px; height:42px; border:1px solid var(--line); background:transparent; color:#eee9df; align-items:center; justify-content:center; }
        .lux-hero { position:relative; display:grid; grid-template-columns:1.02fr .98fr; gap:5.5%; align-items:center; min-height:690px; padding:82px 0 92px; }
        .lux-hero-copy { position:relative; z-index:2; }
        .lux-overline { display:flex; align-items:center; gap:13px; color:#c9bfae; font-size:9px; font-weight:800; letter-spacing:2.8px; text-transform:uppercase; }
        .lux-overline:before { content:""; width:34px; height:1px; background:#bba98a; }
        .lux-hero h1 { max-width:730px; margin:28px 0 24px; font-family:var(--serif); font-size:clamp(56px,7.3vw,104px); line-height:.96; font-weight:400; letter-spacing:-5.5px; }
        .lux-hero h1 em { color:#cbbde8; font-weight:400; }
        .lux-hero-copy > p { max-width:490px; color:#aaa59a; font-size:13px; line-height:2; letter-spacing:.12px; }
        .lux-hero-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:33px; }
        .lux-button-primary { background:#d8cdb8; border-color:#d8cdb8; color:#171613; }
        .lux-button-primary:hover { background:#f1e9d9; border-color:#f1e9d9; }
        .lux-button-quiet { border-color:rgba(232,224,208,.22); color:#d4cec2; }
        .lux-meta { display:flex; align-items:center; flex-wrap:wrap; gap:22px; margin-top:36px; color:#8e897f; font-size:9px; letter-spacing:1.1px; text-transform:uppercase; }
        .lux-meta span { display:flex; align-items:center; gap:8px; }
        .lux-meta i { width:4px; height:4px; border-radius:50%; background:#b6a7d8; display:inline-block; }
        .lux-hero-art { position:relative; min-height:515px; display:flex; align-items:center; justify-content:center; perspective:1100px; transform-style:preserve-3d; }
        .lux-hero-art:before { content:""; position:absolute; width:430px; height:430px; border:1px solid rgba(204,190,164,.22); border-radius:50%; transform:rotateX(68deg) rotateZ(-18deg); box-shadow:0 0 0 28px rgba(204,190,164,.035),0 0 0 58px rgba(204,190,164,.025); animation:lux-ring-turn 28s linear infinite; }
        .lux-hero-art:after { content:""; position:absolute; width:12px; height:12px; border-radius:50%; background:#c6b6f3; box-shadow:0 0 22px #c6b6f3; top:12%; left:17%; animation:lux-orbit-dot 9s ease-in-out infinite; }
        .lux-photo-frame { position:relative; z-index:1; width:min(470px,90%); height:500px; padding:10px; background:#cfc5b4; transform:rotate(2.2deg) rotateY(-5deg); transform-style:preserve-3d; box-shadow:0 38px 100px rgba(0,0,0,.48); animation:lux-photo-drift 8s ease-in-out infinite; transition:box-shadow .4s; }
        .lux-photo-frame:hover { box-shadow:0 48px 115px rgba(0,0,0,.62),0 0 0 1px rgba(229,218,196,.28); }
        .lux-photo { width:100%; height:100%; position:relative; overflow:hidden; background:#28231e; }
        .lux-photo img { width:100%; height:100%; display:block; object-fit:cover; filter:grayscale(28%) sepia(18%) brightness(.78); transform:scale(1.035); animation:lux-image-breathe 18s ease-in-out infinite alternate; }
        .lux-photo:after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,transparent 45%,rgba(12,11,10,.7)); }
        .lux-photo-caption { position:absolute; z-index:1; left:23px; bottom:22px; color:#f0e9dc; }
        .lux-photo-caption small { display:block; font-size:8px; letter-spacing:2.3px; margin-bottom:7px; }
        .lux-photo-caption strong { font-family:var(--serif); font-size:27px; font-weight:400; }
        .lux-stamp { position:absolute; z-index:2; top:-25px; right:-28px; width:106px; height:106px; border:1px solid #bcae93; border-radius:50%; display:grid; place-items:center; color:#d9cdb6; background:#171613; transform:rotate(11deg); }
        .lux-stamp-inner { width:84px; height:84px; border:1px dashed #82775f; border-radius:50%; display:grid; place-items:center; text-align:center; font-size:8px; line-height:1.6; letter-spacing:1.6px; }
        .lux-float-note { position:absolute; z-index:3; left:-42px; bottom:50px; width:190px; padding:17px 18px; background:#d8cfbf; color:#1b1a17; box-shadow:0 20px 45px #0007; transform:rotate(-4deg); animation:lux-note-float 6s ease-in-out infinite; }
        .lux-float-note small { display:block; font-size:8px; letter-spacing:1.7px; color:#716957; }
        .lux-float-note strong { display:block; margin-top:8px; font-family:var(--serif); font-size:20px; font-weight:400; }
        .lux-index { position:absolute; right:0; bottom:30px; color:#716c62; font-family:var(--serif); font-size:13px; writing-mode:vertical-rl; letter-spacing:2px; }
        @keyframes lux-photo-drift { 0%,100% { transform:rotate(2.2deg) rotateY(-5deg) translateY(0); } 50% { transform:rotate(1deg) rotateY(2deg) translateY(-10px); } }
        @keyframes lux-ring-turn { to { transform:rotateX(68deg) rotateZ(342deg); } }
        @keyframes lux-orbit-dot { 0%,100% { transform:translate(0,0); } 50% { transform:translate(34px,22px); } }
        @keyframes lux-image-breathe { from { transform:scale(1.035); } to { transform:scale(1.12); } }
        @keyframes lux-note-float { 0%,100% { transform:rotate(-4deg) translateY(0); } 50% { transform:rotate(-2deg) translateY(-9px); } }
        .lux-marquee { border-top:1px solid var(--line); border-bottom:1px solid var(--line); overflow:hidden; padding:18px 0; background:#151512; }
        .lux-marquee-track { display:flex; align-items:center; justify-content:space-around; gap:40px; min-width:900px; color:#a9a294; font-family:var(--serif); font-size:18px; font-style:italic; }
        .lux-marquee-track span { display:flex; align-items:center; gap:20px; white-space:nowrap; }
        .lux-marquee-track b { color:#c6b6f3; font-family:Inter,sans-serif; font-size:8px; font-style:normal; letter-spacing:2px; }
        .lux-section { padding:116px 0; }
        .lux-section-head { display:grid; grid-template-columns:.65fr 1.35fr; gap:30px; align-items:start; margin-bottom:55px; }
        .lux-section-label { color:#bcae93; font-size:9px; font-weight:800; letter-spacing:2.5px; text-transform:uppercase; padding-top:12px; }
        .lux-section-head h2 { margin:0; max-width:800px; font-family:var(--serif); font-weight:400; font-size:clamp(38px,5vw,65px); line-height:1.05; letter-spacing:-2px; }
        .lux-section-head h2 em { color:#c6b6f3; }
        .lux-section-head p { grid-column:2; max-width:520px; margin:-10px 0 0; color:#9c978d; font-size:12px; line-height:1.9; }
        .lux-feature-list { border-top:1px solid var(--line); }
        .lux-feature-row { display:grid; grid-template-columns:90px 1fr 1.1fr 50px; gap:22px; align-items:center; padding:31px 8px; border-bottom:1px solid var(--line); transition:background .3s,padding .3s; }
        .lux-feature-row:hover { background:rgba(225,215,194,.045); padding-left:18px; padding-right:18px; }
        .lux-feature-number { color:#8d877a; font-family:var(--serif); font-size:20px; }
        .lux-feature-name small { display:block; margin-bottom:8px; color:#b9a989; font-size:8px; letter-spacing:2px; }
        .lux-feature-name h3 { margin:0; font-family:var(--serif); font-size:clamp(22px,2.5vw,32px); font-weight:400; }
        .lux-feature-copy { max-width:410px; color:#9d988d; font-size:11px; line-height:1.9; }
        .lux-feature-icon { width:42px; height:42px; display:grid; place-items:center; border:1px solid #514a3f; border-radius:50%; color:#d1c4aa; transition:transform .3s,background .3s; }
        .lux-feature-row:hover .lux-feature-icon { transform:rotate(-35deg); background:#d8cdb8; color:#171613; }
        .lux-editorial-split { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
        .lux-study-image { height:530px; position:relative; overflow:hidden; background:#26221c; }
        .lux-study-image img { width:100%; height:100%; object-fit:cover; filter:grayscale(35%) sepia(18%) brightness(.76); transition:transform 1s; }
        .lux-study-image:hover img { transform:scale(1.045); }
        .lux-image-index { position:absolute; right:18px; top:18px; padding:10px 13px; background:#e0d6c4; color:#201e19; font-size:8px; letter-spacing:1.6px; }
        .lux-story-copy { padding:25px 0; }
        .lux-story-copy h2 { margin:22px 0; font-family:var(--serif); font-weight:400; font-size:clamp(42px,5vw,68px); line-height:1.02; letter-spacing:-2px; }
        .lux-story-copy h2 em { color:#c6b6f3; }
        .lux-story-copy p { max-width:430px; color:#a49e93; font-size:12px; line-height:2; }
        .lux-story-points { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin:32px 0; padding-top:25px; border-top:1px solid var(--line); }
        .lux-story-points strong { display:block; font-family:var(--serif); font-size:25px; font-weight:400; color:#e9e2d4; }
        .lux-story-points span { display:block; margin-top:6px; color:#918b80; font-size:8px; letter-spacing:1.4px; text-transform:uppercase; }
        .lux-exam-band { background:#d9d0c1; color:#1a1916; padding:85px 0; }
        .lux-exam-band .lux-section-label { color:#71664f; }
        .lux-exam-band .lux-section-head h2 em { color:#75618e; }
        .lux-exam-band .lux-section-head p { color:#6f6a60; }
        .lux-exam-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid #aaa18f; border-bottom:1px solid #aaa18f; }
        .lux-exam { padding:26px 24px 29px 0; border-right:1px solid #aaa18f; }
        .lux-exam + .lux-exam { padding-left:25px; }
        .lux-exam:last-child { border-right:0; }
        .lux-exam small { color:#786f60; font-size:8px; letter-spacing:2px; }
        .lux-exam h3 { margin:13px 0 8px; font-family:var(--serif); font-size:31px; font-weight:400; }
        .lux-exam p { max-width:270px; margin:0; color:#6f6a60; font-size:10px; line-height:1.8; }
        .lux-exam .lux-exam-mark { display:block; margin-top:25px; color:#81765f; font-family:var(--serif); font-size:32px; }
        .lux-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
        .lux-step { min-height:220px; padding:27px; background:#10100f; }
        .lux-step small { color:#b8a98c; font-size:8px; letter-spacing:2px; }
        .lux-step h3 { margin:35px 0 10px; font-family:var(--serif); font-size:25px; font-weight:400; }
        .lux-step p { max-width:270px; color:#9c978d; font-size:10px; line-height:1.9; }
        .lux-featured-preview { display:grid; grid-template-columns:1.1fr .9fr; gap:24px; align-items:stretch; }
        .lux-preview-main { min-height:420px; position:relative; overflow:hidden; background:#26231f; }
        .lux-preview-main img { width:100%; height:100%; position:absolute; inset:0; object-fit:cover; filter:grayscale(40%) sepia(15%) brightness(.55); }
        .lux-preview-main:after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,rgba(10,10,9,.82),rgba(10,10,9,.1)); }
        .lux-preview-copy { position:absolute; z-index:1; left:35px; bottom:34px; max-width:430px; }
        .lux-preview-copy small { color:#d1c2a4; font-size:8px; letter-spacing:2px; }
        .lux-preview-copy h3 { margin:13px 0; font-family:var(--serif); font-size:clamp(34px,4vw,52px); font-weight:400; line-height:1.05; }
        .lux-preview-copy p { color:#c2bbae; font-size:11px; line-height:1.8; }
        .lux-preview-side { display:grid; grid-template-rows:1fr 1fr; gap:16px; }
        .lux-preview-tile { position:relative; min-height:195px; padding:24px; border:1px solid var(--line); background:#171714; overflow:hidden; }
        .lux-preview-tile:after { content:""; position:absolute; width:180px; height:180px; right:-75px; bottom:-100px; border:1px solid #c6b6f355; border-radius:50%; box-shadow:0 0 0 18px #c6b6f311,0 0 0 36px #c6b6f30a; }
        .lux-preview-tile small { color:#b9a989; font-size:8px; letter-spacing:2px; }
        .lux-preview-tile h3 { position:relative; z-index:1; margin:22px 0 8px; font-family:var(--serif); font-size:25px; font-weight:400; }
        .lux-preview-tile p { position:relative; z-index:1; max-width:250px; color:#9c978d; font-size:10px; line-height:1.8; }
        .lux-quote { padding:105px 0; text-align:center; background:#171714; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .lux-quote-mark { color:#bcae93; font-family:var(--serif); font-size:65px; line-height:.7; }
        .lux-quote blockquote { max-width:900px; margin:20px auto 25px; font-family:var(--serif); font-size:clamp(31px,4.6vw,58px); font-weight:400; line-height:1.15; letter-spacing:-1.3px; }
        .lux-quote cite { color:#aaa294; font-size:8px; font-style:normal; letter-spacing:2.5px; text-transform:uppercase; }
        .lux-faq-layout { display:grid; grid-template-columns:.8fr 1.2fr; gap:70px; }
        .lux-faq-intro h2 { margin:18px 0; font-family:var(--serif); font-size:clamp(40px,5vw,60px); font-weight:400; line-height:1.04; }
        .lux-faq-intro p { max-width:300px; color:#9d978c; font-size:11px; line-height:1.9; }
        .lux-faq-list { border-top:1px solid var(--line); }
        .lux-faq-item { border-bottom:1px solid var(--line); }
        .lux-faq-question { width:100%; padding:21px 0; display:flex; justify-content:space-between; align-items:center; gap:18px; border:0; background:transparent; color:#e9e4da; text-align:left; font-family:var(--serif); font-size:19px; cursor:pointer; }
        .lux-faq-question span:last-child { color:#bcae93; font-family:Inter,sans-serif; font-size:20px; transition:transform .2s; }
        .lux-faq-answer { max-width:600px; padding:0 35px 20px 0; color:#9d978c; font-size:11px; line-height:1.9; }
        .lux-final { position:relative; padding:92px 35px; text-align:center; background:#d9d0c1; color:#171613; overflow:hidden; }
        .lux-final:before,.lux-final:after { content:""; position:absolute; width:310px; height:310px; border:1px solid #9d927d77; border-radius:50%; top:50%; transform:translateY(-50%); }
        .lux-final:before { left:-170px; box-shadow:0 0 0 22px #9d927d12,0 0 0 45px #9d927d0d; }
        .lux-final:after { right:-170px; box-shadow:0 0 0 22px #9d927d12,0 0 0 45px #9d927d0d; }
        .lux-final .lux-overline { justify-content:center; color:#71664f; }
        .lux-final .lux-overline:before { background:#8f826b; }
        .lux-final h2 { max-width:760px; margin:20px auto 14px; font-family:var(--serif); font-size:clamp(42px,5.5vw,72px); line-height:1.02; font-weight:400; letter-spacing:-2px; }
        .lux-final p { margin:0 auto 27px; color:#6e685d; font-size:11px; }
        .lux-final .lux-button { position:relative; z-index:1; background:#171613; color:#eee7d9; border-color:#171613; }
        .lux-final .lux-button:hover { background:#39352d; border-color:#39352d; color:white; }
        .lux-footer { padding:28px 0 34px; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#807b71; font-size:8px; letter-spacing:1.2px; text-transform:uppercase; }
        .lux-footer strong { color:#d1c7b6; letter-spacing:2px; }
        .lux-reveal { opacity:0; transform:translateY(22px); transition:opacity .75s ease,transform .75s cubic-bezier(.2,.7,.2,1); }
        .lux-reveal.is-visible { opacity:1; transform:translateY(0); }
        @media (prefers-reduced-motion:reduce) { .lux-home *, .lux-home *:before,.lux-home *:after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; transition-duration:.01ms !important; } .lux-reveal { opacity:1; transform:none; } }
        @media(max-width:950px) { .lux-wrap { width:calc(100% - 48px); } .lux-nav { gap:20px; } .lux-hero { min-height:610px; gap:3%; } .lux-photo-frame { height:440px; } .lux-hero-art { min-height:460px; } .lux-feature-row { grid-template-columns:55px 1fr 1fr 42px; gap:15px; } .lux-editorial-split { gap:40px; } .lux-study-image { height:460px; } }
        @media(max-width:700px) { .lux-wrap { width:calc(100% - 36px); } .lux-top { height:72px; } .lux-menu-btn { display:flex; } .lux-top-cta { display:none; } .lux-nav { display:none; position:absolute; z-index:20; top:72px; left:0; right:0; padding:18px 22px 22px; background:#171714; border-bottom:1px solid var(--line); flex-direction:column; align-items:stretch; gap:4px; } .lux-nav.is-open { display:flex; } .lux-nav a { padding:13px 0; } .lux-hero { grid-template-columns:1fr; padding:65px 0 70px; gap:35px; } .lux-hero h1 { font-size:clamp(54px,13vw,82px); letter-spacing:-3px; } .lux-hero-copy > p { font-size:12px; } .lux-hero-art { min-height:400px; } .lux-photo-frame { width:min(390px,84%); height:390px; } .lux-float-note { left:-4px; bottom:24px; } .lux-stamp { right:-5px; } .lux-index { display:none; } .lux-section { padding:78px 0; } .lux-section-head { grid-template-columns:1fr; gap:15px; margin-bottom:35px; } .lux-section-head p { grid-column:1; margin:0; } .lux-feature-row { grid-template-columns:40px 1fr 38px; gap:12px; padding:24px 2px; } .lux-feature-copy { grid-column:2 / 3; grid-row:2; } .lux-feature-icon { grid-column:3; grid-row:1 / span 2; } .lux-feature-number { grid-row:1 / span 2; align-self:start; } .lux-editorial-split,.lux-featured-preview,.lux-faq-layout { grid-template-columns:1fr; gap:32px; } .lux-study-image { height:410px; } .lux-story-copy { padding:0; } .lux-exam-band { padding:70px 0; } .lux-exam-grid { grid-template-columns:1fr; } .lux-exam,.lux-exam + .lux-exam { padding:23px 0; border-right:0; border-bottom:1px solid #aaa18f; } .lux-exam:last-child { border-bottom:0; } .lux-exam .lux-exam-mark { display:none; } .lux-steps { grid-template-columns:1fr; } .lux-step { min-height:170px; } .lux-step h3 { margin-top:23px; } .lux-preview-main { min-height:360px; } .lux-preview-side { grid-template-rows:auto auto; } .lux-quote { padding:75px 0; } .lux-final { padding:75px 22px; } .lux-final:before { left:-250px; } .lux-final:after { right:-250px; } .lux-footer { flex-direction:column; align-items:flex-start; line-height:1.8; } }
        @media(max-width:420px) { .lux-hero h1 { font-size:52px; } .lux-hero-art { min-height:350px; } .lux-photo-frame { height:340px; } .lux-float-note { width:165px; padding:13px; } .lux-meta { gap:12px; } .lux-button { padding:12px 13px; font-size:9px; } .lux-study-image { height:340px; } }
      `}</style>

      <div className="lux-wrap">
        <header className="lux-top">
          <a className="lux-brand" href="#top" aria-label="JEE 360 home">
            <span className="lux-brand-mark"><GraduationCap size={20} /></span>
            <span><span className="lux-brand-name">JEE 360</span><span className="lux-brand-sub">THE ART OF PREPARATION</span></span>
          </a>
          <nav className={`lux-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#experience" onClick={closeMenu}>The experience</a>
            <a href="#subjects" onClick={closeMenu}>Your exam</a>
            <a href="#journey" onClick={closeMenu}>The journey</a>
            <a href="#faq" onClick={closeMenu}>Questions</a>
          </nav>
          <button className="lux-top-cta" onClick={goLogin}>Continue with Google <ArrowRight size={14} /></button>
          <button className="lux-menu-btn" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <CircleHelp size={19} /> : <Menu size={19} />}</button>
        </header>

        <main id="top">
          <section className="lux-hero">
            <div className="lux-hero-copy lux-reveal">
              <div className="lux-overline">A more considered way to prepare</div>
              <h1>Make your<br />next chapter<br /><em>count.</em></h1>
              <p>Preparation is more than hours at a desk. It is the small decisions, the questions you return to, and the confidence you build along the way. JEE 360 brings that journey into focus.</p>
              <div className="lux-hero-actions">
                <button className="lux-button lux-button-primary" onClick={goLogin}>Begin your journey <ArrowRight size={15} /></button>
                <a className="lux-button lux-button-quiet" href="#experience">Discover JEE 360 <ChevronRight size={15} /></a>
              </div>
              <div className="lux-meta"><span><i /> JEE MAIN & ADVANCED</span><span><i /> NEET UG</span><span><i /> BUILT FOR ASPIRANTS</span></div>
            </div>
            <div className="lux-hero-art lux-reveal">
              <div className="lux-photo-frame">
                <div className="lux-photo">
                  <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1100&q=85" alt="A quiet study desk with notebooks and books" fetchPriority="high" />
                  <div className="lux-photo-caption"><small>THE DISCIPLINE OF SMALL STEPS</small><strong>Focus. Then flourish.</strong></div>
                </div>
              </div>
              <div className="lux-stamp"><div className="lux-stamp-inner">LEARN<br />WITH<br />INTENTION<br />✳</div></div>
              <div className="lux-float-note"><small>YOUR DAILY REMINDER</small><strong>Progress is a practice.</strong></div>
            </div>
            <div className="lux-index">JEE 360 · EST. FOR THE NEXT GENERATION</div>
          </section>
        </main>
      </div>

      <div className="lux-marquee" aria-label="Learning, practice, progress">
        <div className="lux-wrap lux-marquee-track"><span>Learn with intention <b>✳</b></span><span>Practise with purpose <b>✳</b></span><span>Progress with clarity <b>✳</b></span><span>Repeat with confidence <b>✳</b></span></div>
      </div>

      <section className="lux-section" id="experience">
        <div className="lux-wrap">
          <div className="lux-section-head lux-reveal"><div className="lux-section-label">01 / The experience</div><div><h2>One thoughtful space.<br /><em>Every part of your prep.</em></h2></div><p>Less clutter. More clarity. JEE 360 is being shaped around the rhythm of serious preparation — learn, practise, review, and return stronger.</p></div>
          <div className="lux-feature-list">
            {featureStories.map((item) => { const Icon = item.icon; return <article className="lux-feature-row lux-reveal" key={item.number}><div className="lux-feature-number">{item.number}</div><div className="lux-feature-name"><small>{item.category}</small><h3>{item.title}</h3></div><div className="lux-feature-copy">{item.copy}<br /><span style={{ display:"inline-block", marginTop:10, color:"#777267", fontSize:8, letterSpacing:1.5 }}>{item.label}</span></div><div className="lux-feature-icon"><Icon size={18} /></div></article>; })}
          </div>
        </div>
      </section>

      <section className="lux-section" id="journey">
        <div className="lux-wrap lux-editorial-split">
          <div className="lux-study-image lux-reveal"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85" alt="Student focused on learning with a laptop and notes" loading="lazy" /><span className="lux-image-index">A PERSONAL LEARNING SPACE · 001</span></div>
          <div className="lux-story-copy lux-reveal"><div className="lux-overline">Built around your routine</div><h2>Make room for<br /><em>deep work.</em></h2><p>From the first chapter to the final revision, your preparation deserves a space that feels organised, personal and purposeful. Keep your learning resources together and make each session count.</p><div className="lux-story-points"><div><strong>01</strong><span>Set your direction</span></div><div><strong>02</strong><span>Build consistency</span></div><div><strong>03</strong><span>Review your effort</span></div><div><strong>04</strong><span>Keep improving</span></div></div><button className="lux-button lux-button-quiet" onClick={goLogin}>Create your space <ArrowRight size={14} /></button></div>
        </div>
      </section>

      <section className="lux-exam-band" id="subjects">
        <div className="lux-wrap">
          <div className="lux-section-head lux-reveal"><div className="lux-section-label">02 / Your destination</div><div><h2>Different ambitions.<br /><em>One place to begin.</em></h2></div><p>Choose the exam that defines your next chapter. Your student profile will help set up the right learning workspace.</p></div>
          <div className="lux-exam-grid lux-reveal">
            <article className="lux-exam"><small>ENGINEERING · 01</small><h3>JEE Main</h3><p>Build strong fundamentals, practise consistently and prepare for the next milestone.</p><span className="lux-exam-mark">↗</span></article>
            <article className="lux-exam"><small>ENGINEERING · 02</small><h3>JEE Advanced</h3><p>Go deeper into concepts, develop problem-solving confidence and refine your approach.</p><span className="lux-exam-mark">⌁</span></article>
            <article className="lux-exam"><small>MEDICAL · 03</small><h3>NEET UG</h3><p>Bring Physics, Chemistry and Biology into a focused and repeatable study routine.</p><span className="lux-exam-mark">✳</span></article>
          </div>
        </div>
      </section>

      <section className="lux-section">
        <div className="lux-wrap">
          <div className="lux-section-head lux-reveal"><div className="lux-section-label">03 / A simple beginning</div><div><h2>Good preparation is<br /><em>built, not rushed.</em></h2></div><p>Start with a few simple steps. Your workspace can grow with your goals and your daily routine.</p></div>
          <div className="lux-steps lux-reveal"><article className="lux-step"><small>STEP 01 — SIGN IN</small><h3>Make it yours.</h3><p>Continue securely with Google and create your personal JEE 360 account.</p></article><article className="lux-step"><small>STEP 02 — SET YOUR GOAL</small><h3>Know your direction.</h3><p>Complete your student profile with your class and target examination.</p></article><article className="lux-step"><small>STEP 03 — GET TO WORK</small><h3>Find your rhythm.</h3><p>Enter your learning space and build a steady routine, one session at a time.</p></article></div>
        </div>
      </section>

      <section className="lux-section" style={{ paddingTop:20 }}>
        <div className="lux-wrap">
          <div className="lux-featured-preview lux-reveal">
            <article className="lux-preview-main"><img src="https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&w=1200&q=85" alt="Open notebook and study notes on a desk" loading="lazy" /><div className="lux-preview-copy"><small>THE JEE 360 METHOD</small><h3>Every chapter.<br />A little more clarity.</h3><p>Organise the way you learn, the way you practise, and the way you measure progress.</p></div></article>
            <div className="lux-preview-side"><article className="lux-preview-tile"><small>THE LEARNING DESK</small><h3>Resources, in one place.</h3><p>Lectures, notes, books, DPPs and chapter-wise study material.</p></article><article className="lux-preview-tile"><small>THE REVIEW ROOM</small><h3>Learn from every attempt.</h3><p>Tests, mistakes and performance insights to guide your next step.</p></article></div>
          </div>
        </div>
      </section>

      <section className="lux-quote"><div className="lux-wrap lux-reveal"><div className="lux-quote-mark">“</div><blockquote>The goal is not to study every minute. It is to make every focused minute mean something.</blockquote><cite>A NOTE TO EVERY ASPIRANT · JEE 360</cite></div></section>

      <section className="lux-section" id="faq">
        <div className="lux-wrap lux-faq-layout">
          <div className="lux-faq-intro lux-reveal"><div className="lux-overline">A few useful details</div><h2>Before you<br /><em>begin.</em></h2><p>Some parts of JEE 360 are still being built. Here is what you should know before creating your account.</p></div>
          <div className="lux-faq-list lux-reveal">{faqs.map(([question, answer], index) => <div className="lux-faq-item" key={question}><button className="lux-faq-question" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}><span>{question}</span><span>{activeFaq === index ? "−" : "+"}</span></button>{activeFaq === index && <div className="lux-faq-answer">{answer}</div>}</div>)}</div>
        </div>
      </section>

      <section className="lux-final"><div className="lux-wrap lux-reveal"><div className="lux-overline">Your next chapter starts here</div><h2>Give your ambition<br />a place to grow.</h2><p>Set your goal. Create your space. Begin with intention.</p><button className="lux-button" onClick={goLogin}>Continue with Google <ArrowRight size={15} /></button></div></section>

      <footer className="lux-wrap lux-footer"><span>© {new Date().getFullYear()} <strong>JEE 360</strong> · All rights reserved.</span><span>Created by Ghazi Abbas · Learn with purpose.</span></footer>
    </div>
  );
}


















export default function App() {
  const { session, loading } = useAuthSession();

  const [profileComplete, setProfileComplete] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfileStatus() {
      if (loading) return;

      if (!session) {
        setProfileComplete(false);
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error("Profile status check failed:", error.message);
      }

      setProfileComplete(
        !error && data?.onboarding_completed === true
      );
      setProfileLoading(false);
    }

    void loadProfileStatus();

    return () => {
      active = false;
    };
  }, [session?.user.id, loading]);

  if (loading) {
    return <AuthLoading message="Loading JEE 360..." />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          !session ? (
            <LandingPage />
          ) : profileLoading ? (
            <AuthLoading message="Checking your profile..." />
          ) : profileComplete ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />

      <Route
        path="/login"
        element={
          !session ? (
            <Login />
          ) : profileLoading ? (
            <AuthLoading message="Checking your profile..." />
          ) : profileComplete ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />

      <Route
        path="/auth/callback"
        element={
          !session ? (
            <Navigate to="/" replace />
          ) : profileLoading ? (
            <AuthLoading message="Completing Google login..." />
          ) : profileComplete ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />

      <Route
        path="/onboarding"
        element={
          !session ? (
            <Navigate to="/" replace />
          ) : profileLoading ? (
            <AuthLoading message="Checking your profile..." />
          ) : profileComplete ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <ProfileSetup
              onComplete={() => setProfileComplete(true)}
            />
          )
        }
      />

      <Route
        element={
          <ProtectedAppShell
            session={session}
            loading={loading}
            profileComplete={profileComplete}
            profileLoading={profileLoading}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lecture" element={<PlaceholderPage path="/lecture" />} />
        <Route path="/group" element={<PlaceholderPage path="/group" />} />
        <Route path="/test" element={<PlaceholderPage path="/test" />} />
        <Route path="/books" element={<PlaceholderPage path="/books" />} />
        <Route path="/analytics" element={<PlaceholderPage path="/analytics" />} />
        <Route path="/ai-teacher" element={<PlaceholderPage path="/ai-teacher" />} />
        <Route path="/settings" element={<PlaceholderPage path="/settings" />} />
        <Route path="/profile" element={<PlaceholderPage path="/profile" />} />
        <Route path="*" element={<PlaceholderPage path="/not-found" />} />
      </Route>
    </Routes>
  );
}
