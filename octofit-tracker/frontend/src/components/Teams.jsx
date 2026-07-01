import { useEffect, useState } from 'react'
import { requestCollection } from '../api.js'

const teamsEndpoint = 'https://<codespace>-8000.app.github.dev/api/teams'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadTeams = async () => {
      try {
        const data = await requestCollection(teamsEndpoint, 'teams')
        if (active) {
          setTeams(data)
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

    loadTeams()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="card p-4">Loading teams...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Teams</h2>
        {teams.length === 0 ? (
          <p className="text-muted">No teams were returned by the API.</p>
        ) : (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div key={team._id ?? `${team.name}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h5>{team.name ?? 'Unnamed team'}</h5>
                  <p className="text-muted mb-0">
                    Members: {Array.isArray(team.memberIds) ? team.memberIds.length : 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
