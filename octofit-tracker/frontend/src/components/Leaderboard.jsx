import { useEffect, useState } from 'react'
import { requestCollection } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadLeaderboard = async () => {
      try {
        const data = await requestCollection('leaderboard', 'leaderboard')
        if (active) {
          setEntries(data)
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

    loadLeaderboard()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="card p-4">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Leaderboard</h2>
        {entries.length === 0 ? (
          <p className="text-muted">No leaderboard entries were returned by the API.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Minutes</th>
                  <th scope="col">Activities</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.userId ?? `${entry.userName}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{entry.userName ?? 'Unknown'}</td>
                    <td>{entry.totalCalories ?? 0}</td>
                    <td>{entry.totalMinutes ?? 0}</td>
                    <td>{entry.activityCount ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
