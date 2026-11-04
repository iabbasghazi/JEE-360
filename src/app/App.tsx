
import {
  useEffect,
  useState,
  type CSSProperties,
} from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  FlaskConical,
  GraduationCap,
  MoreHorizontal,
  Play,
  Plus,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'

import { AppShell } from '../components/layout/AppShell'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'

const subjects = [
  {
    name: 'Physics',
    subtitle: 'Build your intuition',
    icon: Atom,
    className: 'subject-card--physics',
    progress: 68,
    completed: 34,
    total: 50,
  },
  {
    name: 'Chemistry',
    subtitle: 'Master the reactions',
    icon: FlaskConical,
    className: 'subject-card--chemistry',
    progress: 42,
    completed: 21,
    total: 50,
  },
  {
    name: 'Mathematics',
    subtitle: 'Solve with confidence',
    icon: Target,
    className: 'subject-card--maths',
    progress: 56,
    completed: 28,
    total: 50,
  },
]

const initialTasks = [
  {
    title: 'Laws of Motion',
    subject: 'Physics',
    time: '25 min',
  },
  {
    title: 'Chemical Bonding',
    subject: 'Chemistry',
    time: '40 min',
  },
  {
    title: 'Practice: Sets',
    subject: 'Mathematics',
    time: '20 min',
  },
]

const pageDetails: Record<
  string,
  { title: string; description: string }
> = {
  '/lecture': {
    title: 'Lectures',
    description:
      'Continue lessons and build concepts one lecture at a time.',
  },
  '/group': {
    title: 'Study Group',
    description:
      'A place for study circles, accountability and shared goals.',
  },
  '/test': {
    title: 'Test Centre',
    description:
      'Practice questions and review your performance.',
  },
  '/books': {
    title: 'Your Bookshelf',
    description:
      'Keep notes, modules and learning material in one place.',
  },
  '/analytics': {
    title: 'Your Analytics',
    description:
      'Understand your progress, consistency and focus areas.',
  },
  '/ai-teacher': {
    title: 'AI Teacher',
    description:
      'A future home for concept explanations and study help.',
  },
  '/settings': {
    title: 'Settings',
    description:
      'Personalise your learning workspace.',
  },
  '/profile': {
    title: 'Your Profile',
    description:
      'Your learning identity and personal preferences.',
  },
}

function Dashboard() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([
    'Laws of Motion',
  ])

  const toggleTask = (title: string) => {
    setCompletedTasks((current) =>
      current.includes(title)
        ? current.filter((task) => task !== title)
        : [...current, title],
    )
  }

  const goTo = (path: string) => {
    window.location.href = path
  }

  return (
    <div className="dashboard-page">
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            YOUR NEXT LEVEL STARTS HERE
          </div>

          <h1>
            Make today <span>count.</span>
          </h1>

          <p className="page-subtitle">
            One focused session at a time. You’ve got this.
          </p>
        </div>

        <Button
          variant="secondary"
          icon={<CalendarDays size={17} />}
          onClick={() =>
            window.alert(
              'The study planner will be added in a future phase.',
            )
          }
        >
          Study planner
        </Button>
      </section>

      <section className="hero-panel">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />

        <div className="hero-content">
          <Badge tone="purple">YOUR DAILY MISSION</Badge>

          <h2>
            Progress beats
            <br />
            <span>perfection.</span>
          </h2>

          <p>
            Show up, stay curious, and keep moving forward.
            Your preparation is built one good day at a time.
          </p>

          <div className="hero-actions">
            <Button
              icon={<Play size={16} fill="currentColor" />}
              onClick={() => goTo('/lecture')}
            >
              Continue learning
            </Button>

            <span className="hero-caption">
              <Zap size={14} />
              Focus on your next step
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual__ring hero-visual__ring--outer" />
          <div className="hero-visual__ring hero-visual__ring--inner" />

          <div className="hero-visual__core">
            <GraduationCap size={47} strokeWidth={1.4} />
          </div>

          <span className="orbit-dot orbit-dot--one" />
          <span className="orbit-dot orbit-dot--two" />
          <span className="orbit-dot orbit-dot--three" />

          <div className="floating-chip floating-chip--top">
            <Sparkles size={14} />
            Keep going
          </div>

          <div className="floating-chip floating-chip--bottom">
            <Target size={14} />
            One goal at a time
          </div>
        </div>
      </section>

      <section
        className="stats-grid"
        aria-label="Learning overview"
      >
        <Card className="stat-card">
          <div className="stat-card__top">
            <span className="stat-icon stat-icon--purple">
              <BookOpen size={18} />
            </span>
            <span className="stat-trend">
              <ArrowUpRight size={14} />
              TRACK
            </span>
          </div>

          <p className="stat-label">Syllabus progress</p>
          <div className="stat-value">
            — <span>to be synced</span>
          </div>
          <p className="stat-footnote">
            Connect your existing tracker in a later step.
          </p>
        </Card>

        <Card className="stat-card">
          <div className="stat-card__top">
            <span className="stat-icon stat-icon--blue">
              <Clock3 size={18} />
            </span>
            <span className="stat-trend">DAILY GOAL</span>
          </div>

          <p className="stat-label">Study time</p>
          <div className="stat-value">
            — <span>minutes</span>
          </div>
          <p className="stat-footnote">
            Study-session tracking is not connected yet.
          </p>
        </Card>

        <Card className="stat-card">
          <div className="stat-card__top">
            <span className="stat-icon stat-icon--orange">
              <Flame size={18} />
            </span>
            <span className="stat-trend">CONSISTENCY</span>
          </div>

          <p className="stat-label">Study streak</p>
          <div className="stat-value">
            — <span>days</span>
          </div>
          <p className="stat-footnote">
            Streaks will use verified activity.
          </p>
        </Card>

        <Card className="stat-card">
          <div className="stat-card__top">
            <span className="stat-icon stat-icon--green">
              <Trophy size={18} />
            </span>
            <span className="stat-trend">GAMIFICATION</span>
          </div>

          <p className="stat-label">XP &amp; rank</p>
          <div className="stat-value">
            — <span>not assigned</span>
          </div>
          <p className="stat-footnote">
            No fake rank or XP is shown.
          </p>
        </Card>
      </section>

      <section className="content-grid">
        <div className="content-column">
          <div className="section-heading">
            <div>
              <div className="eyebrow">YOUR PREPARATION</div>
              <h2>Subject overview</h2>
            </div>

            <button
              className="text-link"
              onClick={() => goTo('/analytics')}
            >
              View analytics
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="subject-grid">
            {subjects.map((subject) => {
              const Icon = subject.icon

              return (
                <Card
                  key={subject.name}
                  className={`subject-card ${subject.className}`}
                >
                  <div className="subject-card__head">
                    <div className="subject-icon">
                      <Icon size={21} />
                    </div>

                    <button
                      className="icon-button"
                      aria-label={`More options for ${subject.name}`}
                      onClick={() =>
                        window.alert(
                          `${subject.name} details will be connected later.`,
                        )
                      }
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </div>

                  <h3>{subject.name}</h3>
                  <p className="subject-subtitle">
                    {subject.subtitle}
                  </p>

                  <div className="subject-progress-label">
                    <span>Sample progress preview</span>
                    <strong>{subject.progress}%</strong>
                  </div>

                  <ProgressBar
                    value={subject.progress}
                    showValue={false}
                  />

                  <div className="subject-card__bottom">
                    <span>
                      {subject.completed} / {subject.total} topics
                    </span>
                    <ArrowUpRight size={16} />
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="insight-card">
            <div className="insight-icon">
              <BrainCircuit size={22} />
            </div>

            <div className="insight-copy">
              <Badge tone="blue">COMING NEXT</Badge>

              <h3>Your personal learning insights</h3>

              <p>
                Once your own study data is connected, JEE 360 can
                help identify weak topics and suggest what to revise
                next.
              </p>
            </div>

            <ArrowRight
              className="insight-arrow"
              size={19}
            />
          </Card>
        </div>

        <aside className="right-column">
          <Card className="tasks-card">
            <div className="section-heading section-heading--compact">
              <div>
                <div className="eyebrow">MAKE IT HAPPEN</div>
                <h2>Daily checklist</h2>
              </div>

              <span className="checklist-count">
                {completedTasks.length}/{initialTasks.length}
              </span>
            </div>

            <ProgressBar
              value={
                (completedTasks.length / initialTasks.length) * 100
              }
              showValue={false}
            />

            <div className="task-list">
              {initialTasks.map((task) => {
                const isDone = completedTasks.includes(task.title)

                return (
                  <button
                    key={task.title}
                    className={`task-item ${
                      isDone ? 'task-item--done' : ''
                    }`}
                    aria-pressed={isDone}
                    onClick={() => toggleTask(task.title)}
                  >
                    <span className="task-check">
                      {isDone && <CheckCircle2 size={18} />}
                    </span>

                    <span className="task-copy">
                      <strong>{task.title}</strong>
                      <span>
                        {task.subject} · {task.time}
                      </span>
                    </span>

                    {isDone && (
                      <span className="task-done-label">
                        DONE
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <Button
              variant="secondary"
              className="full-width"
              icon={<Plus size={16} />}
              onClick={() =>
                window.alert(
                  'Custom tasks will be saved when the study planner is built.',
                )
              }
            >
              Add a task
            </Button>
          </Card>

          <Card className="focus-card-main">
            <div className="focus-card-main__top">
              <div className="stat-icon stat-icon--purple">
                <Zap size={18} />
              </div>

              <Badge tone="green">A LITTLE EVERY DAY</Badge>
            </div>

            <h3>Protect your focus.</h3>

            <p>
              Try one distraction-free study block. Consistency is
              a skill you can train.
            </p>

            <div className="focus-quote">
              <span>“</span>
              The secret is to begin.
            </div>
          </Card>

          <Card className="exam-note">
            <div className="exam-note__icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <strong>Exam countdowns</strong>
              <p>
                Official dates will be configurable after verification.
              </p>
            </div>
          </Card>
        </aside>
      </section>

      <footer className="page-footer">
        <span>
          JEE 360 <span className="footer-dot">·</span>
          Built for your next chapter.
        </span>

        <span>Created by Ghazi Abbas</span>
      </footer>
    </div>
  )
}

function PlaceholderPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-art">
        <div className="placeholder-art__glow" />
        <Sparkles size={34} />
      </div>

      <Badge tone="purple">FOUNDATION PHASE</Badge>

      <h1>{title}</h1>
      <p>{description}</p>

      <Card className="placeholder-note">
        <div className="placeholder-note__icon">
          <CheckCircle2 size={20} />
        </div>

        <div>
          <strong>This route is ready for development.</strong>
          <p>
            Real features and student data will be connected in
            later phases. This preview does not claim that the
            feature is already operational.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  const [pointer, setPointer] = useState({
    x: 50,
    y: 25,
  })

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('pointermove', onPointerMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }, [location.pathname])

  return (
    <div
      className="app-root"
      style={
        {
          '--pointer-x': `${pointer.x}%`,
          '--pointer-y': `${pointer.y}%`,
        } as CSSProperties
      }
    >
      <div className="ambient-glow" aria-hidden="true" />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {Object.entries(pageDetails).map(([path, details]) => (
            <Route
              key={path}
              path={path}
              element={
                <PlaceholderPage
                  title={details.title}
                  description={details.description}
                />
              }
            />
          ))}

          <Route
            path="*"
            element={
              <PlaceholderPage
                title="Page not found"
                description="This page does not exist in the current foundation."
              />
            }
          />
        </Route>
      </Routes>
    </div>
  )
}
