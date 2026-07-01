import { useEffect, useState } from 'react'
import { requestCollection } from '../api.js'

const activitiesEndpoint = 'https://<codespace>-8000.app.github.dev/api/activities'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadActivities = async () => {
      try {
        const data = await requestCollection(activitiesEndpoint, 'activities')
        if (active) {
          setActivities(data)
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

    loadActivities()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="card p-4">Loading activities...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Activities</h2>
        {activities.length === 0 ? (
          <p className="text-muted">No activities were returned by the API.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">User</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Minutes</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity._id ?? `${activity.userId}-${index}`}>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'Unknown'}</td>
                    <td>{activity.userId ?? 'Unknown'}</td>
                    <td>{activity.caloriesBurned ?? 0}</td>
                    <td>{activity.durationMinutes ?? 0}</td>
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
