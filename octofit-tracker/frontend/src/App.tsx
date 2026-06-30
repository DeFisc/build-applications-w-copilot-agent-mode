import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1>OctoFit Tracker</h1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <p>Welcome to OctoFit Tracker</p>
    </div>
  )
}

export default App
