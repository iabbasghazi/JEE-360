import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Activity,
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  Command,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Lectures', path: '/lecture', icon: GraduationCap },
  { label: 'Group', path: '/group', icon: Users },
  { label: 'Test', path: '/test', icon: Target },
  { label: 'Books', path: '/books', icon: BookOpen },
  { label: 'Analytics', path: '/analytics', icon: Activity },
]

const secondaryNavigation = [
  { label: 'AI Teacher', path: '/ai-teacher', icon: BrainCircuit },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const sidebarClass = [
    'app-sidebar',
    mobileOpen ? 'app-sidebar--mobile-open' : '',
    collapsed ? 'app-sidebar--collapsed' : '',
  ].filter(Boolean).join(' ')

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          className="mobile-scrim"
          aria-label="Close navigation"
          onClick={closeMobile}
        />
      )}

      <aside className={sidebarClass}>
        <div className="sidebar-brand">
          <div className="brand-mark">
            <Command size={22} strokeWidth={2.4} />
          </div>

          {!collapsed && (
            <div className="brand-copy">
              <span className="brand-name">JEE <span>360</span></span>
              <span className="brand-caption">YOUR PREP SPACE</span>
            </div>
          )}

          <button
            className="sidebar-collapse"
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <Menu size={17} /> : <ChevronLeft size={17} />}
          </button>

          <button
            className="mobile-close"
            onClick={closeMobile}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="sidebar-label">
          {!collapsed && 'WORKSPACE'}
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              onClick={closeMobile}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              {!collapsed && <span>{label}</span>}
              {label === 'Test' && !collapsed && (
                <span className="nav-link__tag">NEW</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-label sidebar-label--lower">
          {!collapsed && 'YOUR TOOLS'}
        </div>

        <nav className="sidebar-nav" aria-label="Additional tools">
          {secondaryNavigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              onClick={closeMobile}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {!collapsed && (
            <div className="focus-card">
              <div className="focus-card__icon">
                <Zap size={17} />
              </div>
              <strong>Stay in focus</strong>
              <p>Small steps. Big results.</p>
              <div className="focus-card__line" />
            </div>
          )}

          <div className="sidebar-profile">
            <div className="avatar avatar--sidebar">S</div>
            {!collapsed && (
              <div className="sidebar-profile__copy">
                <strong>Student profile</strong>
                <span>Personal workspace</span>
              </div>
            )}
          </div>

          {!collapsed && (
            <p className="creator-credit">Created by Ghazi Abbas</p>
          )}
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

          <div className="topbar-context">
            <span className="topbar-context__dot" />
            <span>YOUR LEARNING SPACE</span>
          </div>

          <div className="topbar-actions">
            <div className="topbar-exam">
              <span className="topbar-exam__dot" />
              JEE / NEET
            </div>

            <button className="topbar-avatar" aria-label="Student profile">
              S
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
