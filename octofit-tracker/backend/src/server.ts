const PORT = Number(process.env.PORT ?? 8000)
const HOST = '0.0.0.0'
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

export { PORT, HOST, CODESPACE_NAME, API_BASE_URL }
