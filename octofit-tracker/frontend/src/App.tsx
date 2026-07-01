import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand fw-bold">OctoFit Tracker</span>
            <div className="navbar-nav ms-auto">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <div className="alert alert-info shadow-sm">
            <strong>API base:</strong> {apiBaseUrl}
            <div className="small text-muted">
              Define VITE_CODESPACE_NAME in .env.local for public Codespaces URLs.
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Welcome to OctoFit Tracker</h2>
        <p className="card-text text-muted">
          Explore your latest activity, leaderboard standings, teams, members, and training plans from a single dashboard.
        </p>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h5>Presentation tier</h5>
              <p className="mb-0">Built with React 19, Vite, Bootstrap, and client-side routing.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h5>Logic tier</h5>
              <p className="mb-0">Fetches data from the Express API endpoints with a fallback for local development.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
