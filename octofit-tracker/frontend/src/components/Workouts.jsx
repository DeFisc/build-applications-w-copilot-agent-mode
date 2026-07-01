import { useEffect, useState } from 'react'
import { requestCollection } from '../api.js'

const workoutsEndpoint = 'https://<codespace>-8000.app.github.dev/api/workouts'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadWorkouts = async () => {
      try {
        const data = await requestCollection(workoutsEndpoint, 'workouts')
        if (active) {
          setWorkouts(data)
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="card p-4">Loading workouts...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-muted">No workouts were returned by the API.</p>
        ) : (
          <div className="row g-3">
            {workouts.map((workout, index) => (
              <div key={workout._id ?? `${workout.name}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h5>{workout.name ?? 'Unnamed workout'}</h5>
                  <p className="text-muted mb-0">Focus: {workout.focus ?? 'General fitness'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
