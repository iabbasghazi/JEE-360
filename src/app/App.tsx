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

  const features = [
    { icon: Target, title: "Smart Dashboard", text: "Track your syllabus, study goals, streaks and exam preparation in one place." },
    { icon: Brain, title: "AI Teacher", text: "Get concept explanations, doubt support and study guidance when you need it." },
    { icon: BookOpen, title: "Lectures & Study Material", text: "Keep lessons, notes, books, DPPs and chapter resources organised." },
    { icon: Trophy, title: "Tests & Performance", text: "Practise questions, review mistakes and understand where to improve." },
    { icon: BarChart3, title: "Learning Analytics", text: "See your progress, identify weak topics and plan your next revision." },
    { icon: Users, title: "Study Groups", text: "Stay motivated with shared goals, study communities and friendly competition." },
  ];

  const faqs = [
    ["Who can use JEE 360?", "JEE 360 is designed for Class 11, Class 12 and dropper students preparing for JEE Main, JEE Advanced or NEET."],
    ["Is JEE 360 free?", "The project is being built with a zero-cost approach. Some features may be introduced gradually as they are completed."],
    ["How do I get started?", "Choose Continue with Google or Get Started, sign in securely, and complete your student profile."],
    ["Can I use it on my phone?", "The landing page and learning workspace are designed to adapt to mobile, tablet and desktop screens."],
  ];

  return (
    <div className="landing-page">
      <style>{`
        .landing-page, .landing-page * { box-sizing: border-box; }
        .landing-page {
          min-height: 100vh; overflow: hidden; background: #07070a; color: #f7f4ff;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative; isolation: isolate;
        }
        .landing-page:before, .landing-page:after {
          content: ""; position: absolute; pointer-events: none; z-index: -1; border-radius: 50%;
          filter: blur(100px); opacity: .55;
        }
        .landing-page:before { width: 540px; height: 540px; top: -230px; left: -170px; background: #5425a8; }
        .landing-page:after { width: 520px; height: 520px; top: 380px; right: -300px; background: #32106f; }
        .lp-wrap { width: min(1160px, calc(100% - 44px)); margin: 0 auto; }
        .lp-nav { height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 18px; border-bottom: 1px solid #ffffff12; }
        .lp-brand { display: flex; align-items: center; gap: 12px; }
        .lp-logo { width: 43px; height: 43px; border-radius: 14px; display: grid; place-items: center; color: white; background: linear-gradient(145deg,#a78bfa,#5b21b6); box-shadow: 0 0 32px #8b5cf64d; }
        .lp-brand strong { display: block; font-size: 17px; letter-spacing: 1.6px; font-weight: 900; }
        .lp-brand small { display: block; margin-top: 3px; color: #a49bb7; font-size: 9px; letter-spacing: 2px; }
        .lp-navlinks { display: flex; align-items: center; gap: 27px; color: #b7b1c5; font-size: 12px; }
        .lp-navlinks a { text-decoration: none; color: inherit; transition: color .2s; }
        .lp-navlinks a:hover { color: white; }
        .lp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 9px; border: 1px solid transparent; border-radius: 13px; padding: 13px 18px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform .2s, box-shadow .2s, border-color .2s; }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-primary { color: white; background: linear-gradient(110deg,#8b5cf6,#6d28d9); box-shadow: 0 10px 30px #7c3aed40; }
        .lp-btn-primary:hover { box-shadow: 0 14px 38px #7c3aed66; }
        .lp-btn-secondary { color: #eee9ff; background: #ffffff08; border-color: #ffffff22; }
        .lp-btn-secondary:hover { border-color: #a78bfa88; }
        .lp-hero { min-height: 660px; display: grid; grid-template-columns: 1.08fr .92fr; align-items: center; gap: 40px; padding: 76px 0 85px; }
        .lp-kicker { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid #a78bfa44; border-radius: 99px; color: #d2c3ff; background: #8b5cf615; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; }
        .lp-hero h1 { max-width: 680px; margin: 22px 0 18px; font-size: clamp(43px,6.5vw,76px); line-height: 1.02; letter-spacing: -3.6px; font-weight: 900; }
        .lp-gradient { color: #c4b5fd; background: linear-gradient(95deg,#e9ddff,#a78bfa 55%,#8b5cf6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .lp-lead { max-width: 570px; color: #aaa4b8; font-size: 15px; line-height: 1.9; }
        .lp-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
        .lp-trust { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 24px; color: #8e879e; font-size: 10px; }
        .lp-trust span { display: inline-flex; align-items: center; gap: 6px; }
        .lp-trust svg { color: #b9a3ff; }
        .lp-visual { position: relative; min-height: 440px; display: grid; place-items: center; perspective: 1000px; }
        .lp-orbit { position: absolute; width: min(430px,90%); aspect-ratio: 1; border: 1px solid #a78bfa25; border-radius: 50%; box-shadow: 0 0 0 34px #a78bfa08, 0 0 0 70px #a78bfa05; animation: lp-orbit 24s linear infinite; }
        .lp-orbit:before, .lp-orbit:after { content: ""; position: absolute; width: 9px; height: 9px; border-radius: 50%; background: #c4b5fd; box-shadow: 0 0 22px #a78bfa; }
        .lp-orbit:before { top: 13%; left: 17%; } .lp-orbit:after { bottom: 17%; right: 12%; }
        .lp-dashboard { width: min(420px,100%); padding: 21px; border: 1px solid #ffffff25; border-radius: 25px; background: linear-gradient(145deg,#211a31eF,#111017f5); box-shadow: 0 35px 100px #000a, 0 0 65px #7c3aed20; transform: rotateY(-12deg) rotateX(5deg); animation: lp-float 6s ease-in-out infinite; backdrop-filter: blur(18px); }
        .lp-dash-top { display: flex; align-items: center; justify-content: space-between; color: #aaa3b9; font-size: 10px; }
        .lp-dash-title { font-size: 20px; font-weight: 850; margin: 20px 0 5px; }
        .lp-dash-sub { color: #928ba2; font-size: 10px; }
        .lp-progress-card { margin-top: 19px; padding: 15px; border: 1px solid #ffffff12; border-radius: 15px; background: #ffffff07; }
        .lp-progress-row { display: flex; justify-content: space-between; gap: 8px; font-size: 10px; color: #c9c2d5; }
        .lp-bar { height: 7px; margin-top: 11px; background: #ffffff13; border-radius: 20px; overflow: hidden; }
        .lp-bar span { display: block; height: 100%; width: 68%; border-radius: inherit; background: linear-gradient(90deg,#7c3aed,#c4b5fd); }
        .lp-mini-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-top: 11px; }
        .lp-mini { padding: 14px; border: 1px solid #ffffff12; border-radius: 14px; background: #ffffff07; }
        .lp-mini small { color: #9c95aa; font-size: 9px; }
        .lp-mini strong { display: block; margin-top: 8px; font-size: 19px; }
        .lp-float-tag { position: absolute; padding: 12px 15px; border: 1px solid #ffffff22; border-radius: 14px; background: #171321eF; box-shadow: 0 15px 35px #0008; color: #dcd3f5; font-size: 10px; font-weight: 750; backdrop-filter: blur(12px); animation: lp-float 5s ease-in-out infinite; }
        .lp-tag-one { top: 13%; right: -2%; } .lp-tag-two { bottom: 13%; left: -2%; animation-delay: -2s; }
        @keyframes lp-float { 0%,100% { transform: translateY(0) rotateY(-12deg) rotateX(5deg); } 50% { transform: translateY(-12px) rotateY(-8deg) rotateX(3deg); } }
        @keyframes lp-orbit { to { transform: rotate(360deg); } }
        .lp-section { padding: 82px 0; }
        .lp-section-head { max-width: 650px; margin: 0 auto 38px; text-align: center; }
        .lp-section-head h2 { margin: 13px 0 10px; font-size: clamp(28px,4vw,43px); letter-spacing: -1.5px; }
        .lp-section-head p { color: #a49daf; font-size: 13px; line-height: 1.8; }
        .lp-feature-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 14px; }
        .lp-feature { padding: 23px; border: 1px solid #ffffff14; border-radius: 19px; background: linear-gradient(145deg,#17151f,#0e0e13); transition: transform .22s,border-color .22s,box-shadow .22s; }
        .lp-feature:hover { transform: translateY(-5px); border-color: #9b7aff77; box-shadow: 0 18px 40px #0005,0 0 30px #7c3aed12; }
        .lp-feature-icon { width: 43px; height: 43px; display: grid; place-items: center; border-radius: 14px; color: #c4b5fd; background: #8b5cf622; }
        .lp-feature h3 { margin: 19px 0 8px; font-size: 15px; }
        .lp-feature p { margin: 0; color: #9992a7; font-size: 11px; line-height: 1.8; }
        .lp-how { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .lp-step { padding: 22px; border: 1px solid #ffffff14; border-radius: 18px; background: #ffffff06; }
        .lp-step b { color: #b9a3ff; font-size: 11px; letter-spacing: 1.5px; }
        .lp-step h3 { margin: 12px 0 7px; font-size: 15px; }
        .lp-step p { margin: 0; color: #9992a7; font-size: 11px; line-height: 1.8; }
        .lp-audience { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
        .lp-chip { padding: 12px 17px; border: 1px solid #a78bfa35; border-radius: 99px; background: #8b5cf611; color: #d4c8f5; font-size: 12px; font-weight: 750; }
        .lp-faq { max-width: 790px; margin: 0 auto; display: grid; gap: 10px; }
        .lp-faq details { padding: 17px 19px; border: 1px solid #ffffff16; border-radius: 14px; background: #ffffff06; }
        .lp-faq summary { cursor: pointer; font-size: 12px; font-weight: 750; }
        .lp-faq p { margin: 12px 0 0; color: #a49daf; font-size: 11px; line-height: 1.8; }
        .lp-final { margin: 35px 0 80px; padding: 55px 25px; text-align: center; border: 1px solid #9b7aff44; border-radius: 25px; background: radial-gradient(ellipse at 50% 0%,#7c3aed30,transparent 65%),linear-gradient(145deg,#171321,#0e0d13); }
        .lp-final h2 { margin: 0 0 12px; font-size: clamp(27px,4vw,42px); letter-spacing: -1.3px; }
        .lp-final p { color: #aaa3b8; font-size: 12px; margin: 0 0 23px; }
        .lp-footer { padding: 24px 0 30px; border-top: 1px solid #ffffff12; display: flex; justify-content: space-between; gap: 15px; color: #817a90; font-size: 10px; }
        @media(max-width:850px) { .lp-hero { grid-template-columns: 1fr; padding: 65px 0; text-align: center; } .lp-lead { margin: auto; } .lp-actions,.lp-trust { justify-content: center; } .lp-visual { min-height: 410px; } .lp-feature-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } .lp-navlinks { display: none; } }
        @media(max-width:560px) { .lp-wrap { width: min(100% - 30px,1160px); } .lp-nav { height: 70px; } .lp-nav > .lp-btn { padding: 10px 12px; font-size: 10px; } .lp-hero { min-height: auto; padding: 55px 0 65px; gap: 25px; } .lp-hero h1 { letter-spacing: -2px; } .lp-lead { font-size: 13px; } .lp-visual { min-height: 330px; } .lp-dashboard { padding: 16px; } .lp-tag-one { right: 0; top: 4%; } .lp-tag-two { left: 0; bottom: 4%; } .lp-feature-grid,.lp-how { grid-template-columns: 1fr; } .lp-section { padding: 58px 0; } .lp-final { margin-bottom: 55px; padding: 40px 18px; } .lp-footer { flex-direction: column; text-align: center; } }
        @media(prefers-reduced-motion:reduce) { .lp-orbit,.lp-dashboard,.lp-float-tag { animation: none !important; } * { scroll-behavior: auto !important; } }
      `}</style>

      <div className="lp-wrap">
        <nav className="lp-nav">
          <div className="lp-brand">
            <div className="lp-logo"><GraduationCap size={24} /></div>
            <div><strong>JEE 360</strong><small>YOUR PREPARATION UNIVERSE</small></div>
          </div>
          <div className="lp-navlinks">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#who-its-for">Who it's for</a>
            <a href="#faq">FAQ</a>
          </div>
          <button className="lp-btn lp-btn-primary" onClick={() => navigate("/login")}>Continue with Google <ArrowRight size={15} /></button>
        </nav>

        <section className="lp-hero">
          <div>
            <div className="lp-kicker"><Sparkles size={13} /> YOUR ALL-IN-ONE EXAM PREP SPACE</div>
            <h1>Your dream deserves a <span className="lp-gradient">360° preparation.</span></h1>
            <p className="lp-lead">One focused space for your lectures, practice, tests, progress and study planning. Build better habits, understand your preparation and keep moving towards your target.</p>
            <div className="lp-actions">
              <button className="lp-btn lp-btn-primary" onClick={() => navigate("/login")}>Continue with Google <ArrowRight size={16} /></button>
              <button className="lp-btn lp-btn-secondary" onClick={() => navigate("/login")}>Get Started <ChevronRight size={16} /></button>
            </div>
            <div className="lp-trust">
              <span><Check size={13} /> Made for JEE & NEET aspirants</span>
              <span><Check size={13} /> Personal learning workspace</span>
              <span><Check size={13} /> Mobile-friendly experience</span>
            </div>
          </div>

          <div className="lp-visual" aria-label="Illustration of the JEE 360 student dashboard">
            <div className="lp-orbit" />
            <div className="lp-dashboard">
              <div className="lp-dash-top"><span>JEE 360 / OVERVIEW</span><Sparkles size={15} color="#b9a3ff" /></div>
              <div className="lp-dash-title">Your progress, in focus.</div>
              <div className="lp-dash-sub">A clearer view of your preparation journey</div>
              <div className="lp-progress-card">
                <div className="lp-progress-row"><strong>Preparation overview</strong><span>Live workspace preview</span></div>
                <div className="lp-bar"><span /></div>
              </div>
              <div className="lp-mini-grid">
                <div className="lp-mini"><small>LEARNING</small><strong><BookOpen size={17} /> &nbsp;Lessons</strong></div>
                <div className="lp-mini"><small>PRACTICE</small><strong><Target size={17} /> &nbsp;Tests</strong></div>
                <div className="lp-mini"><small>GUIDANCE</small><strong><Brain size={17} /> &nbsp;AI Teacher</strong></div>
                <div className="lp-mini"><small>INSIGHTS</small><strong><BarChart3 size={17} /> &nbsp;Analytics</strong></div>
              </div>
            </div>
            <div className="lp-float-tag lp-tag-one"><Sparkles size={13} /> Study smarter, every day</div>
            <div className="lp-float-tag lp-tag-two"><Flame size={14} color="#fbbf77" /> Build your consistency</div>
          </div>
        </section>

        <section className="lp-section" id="features">
          <div className="lp-section-head">
            <div className="lp-kicker"><Zap size={13} /> ONE CONNECTED WORKSPACE</div>
            <h2>Everything you need to <span className="lp-gradient">move forward.</span></h2>
            <p>Bring the important parts of your preparation together instead of scattering your effort across different places.</p>
          </div>
          <div className="lp-feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;
              return <article className="lp-feature" key={feature.title}><div className="lp-feature-icon"><Icon size={21} /></div><h3>{feature.title}</h3><p>{feature.text}</p></article>;
            })}
          </div>
        </section>

        <section className="lp-section" id="how-it-works">
          <div className="lp-section-head">
            <div className="lp-kicker"><Sparkles size={13} /> SIMPLE TO BEGIN</div>
            <h2>Your preparation, <span className="lp-gradient">one step at a time.</span></h2>
          </div>
          <div className="lp-how">
            <article className="lp-step"><b>01 / SIGN IN</b><h3>Create your space</h3><p>Continue securely with your Google account to start your JEE 360 journey.</p></article>
            <article className="lp-step"><b>02 / PERSONALISE</b><h3>Tell us about your goals</h3><p>Set your class, target exam, study routine and preparation preferences.</p></article>
            <article className="lp-step"><b>03 / GET STARTED</b><h3>Follow your progress</h3><p>Use your learning workspace to plan, practise, review and improve consistently.</p></article>
          </div>
        </section>

        <section className="lp-section" id="who-its-for">
          <div className="lp-section-head"><div className="lp-kicker"><GraduationCap size={13} /> BUILT AROUND YOUR JOURNEY</div><h2>For every stage of <span className="lp-gradient">exam preparation.</span></h2><p>Choose your path and make your learning space work around your target.</p></div>
          <div className="lp-audience"><span className="lp-chip">Class 11</span><span className="lp-chip">Class 12</span><span className="lp-chip">Dropper</span><span className="lp-chip">JEE Main</span><span className="lp-chip">JEE Advanced</span><span className="lp-chip">NEET</span></div>
        </section>

        <section className="lp-section" id="faq">
          <div className="lp-section-head"><div className="lp-kicker"><CircleHelp size={13} /> GOOD TO KNOW</div><h2>Frequently asked <span className="lp-gradient">questions.</span></h2></div>
          <div className="lp-faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>

        <section className="lp-final">
          <div className="lp-kicker"><Sparkles size={13} /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h2>Ready to take charge of your preparation?</h2>
          <p>Set up your student profile and build a more focused learning routine.</p>
          <button className="lp-btn lp-btn-primary" onClick={() => navigate("/login")}>Get Started <ArrowRight size={16} /></button>
        </section>

        <footer className="lp-footer"><span>© {new Date().getFullYear()} JEE 360. All rights reserved.</span><span>Created by Ghazi Abbas · Learn with purpose. Improve every day.</span></footer>
      </div>
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
