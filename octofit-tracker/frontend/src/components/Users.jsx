import { useEffect, useState } from 'react'
import { requestCollection } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadUsers = async () => {
      try {
        const data = await requestCollection('/api/users/', 'users')
        if (active) {
          setUsers(data)
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

    loadUsers()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <div className="card p-4">Loading users...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Users</h2>
        {users.length === 0 ? (
          <p className="text-muted">No users were returned by the API.</p>
        ) : (
          <div className="row g-3">
            {users.map((user, index) => (
              <div key={user._id ?? `${user.name}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h5>{user.name ?? 'Unnamed user'}</h5>
                  <p className="text-muted mb-0">Team: {user.teamId ?? 'Unassigned'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
