const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim()

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName()
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export const buildApiUrl = (resource) => {
  const normalizedResource = resource?.trim?.() ?? ''
  const path = normalizedResource.startsWith('/') ? normalizedResource : `/api/${normalizedResource}`
  const withTrailingSlash = path.endsWith('/') ? path : `${path}/`

  return `${getApiBaseUrl()}${withTrailingSlash}`
}

export const requestCollection = async (resource, key) => {
  const response = await fetch(buildApiUrl(resource))

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} data.`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [payload?.[key], payload?.results, payload?.items, payload?.data]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
    }

    if (candidate && typeof candidate === 'object') {
      if (Array.isArray(candidate.results)) {
        return candidate.results
      }

      if (Array.isArray(candidate.items)) {
        return candidate.items
      }
    }
  }

  return []
}
