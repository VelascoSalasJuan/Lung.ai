import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Dashboard.css'
import { getUsuario, getUltimoAnalisis, getHistorialAnalisis } from '../utils/localStorage'

function Dashboard() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [ultimoAnalisis, setUltimoAnalisis] = useState(null)
  const [historial, setHistorial] = useState([])

  useEffect(() => {
    // Cargar datos del usuario
    const datosUsuario = getUsuario()
    setUsuario(datosUsuario)

    // Cargar último análisis
    const datosUltimoAnalisis = getUltimoAnalisis()
    setUltimoAnalisis(datosUltimoAnalisis)

    // Cargar historial
    const datosHistorial = getHistorialAnalisis()
    setHistorial(datosHistorial)
  }, [])

  const handleLogout = () => {
    // Solo redirigir al login sin borrar datos
    navigate('/login')
  }

  // Determinar nivel de riesgo basado en el último análisis
  const getRiskLevel = () => {
    if (!ultimoAnalisis) return { level: 'low', label: 'Riesgo bajo', message: 'Tus pulmones están saludables' }
    
    if (ultimoAnalisis.confianza >= 80) {
      return { level: 'high', label: 'Riesgo alto', message: 'Se detectaron anomalías' }
    } else if (ultimoAnalisis.confianza >= 50) {
      return { level: 'moderate', label: 'Riesgo moderado', message: 'Precaución recomendada' }
    } else {
      return { level: 'low', label: 'Riesgo bajo', message: 'Tus pulmones están saludables' }
    }
  }

  const risk = getRiskLevel()

  // Calcular días desde el último análisis
  const getDaysSinceLastAnalysis = () => {
    if (!ultimoAnalisis) return 'Sin análisis'
    
    const fechaAnalisis = new Date(ultimoAnalisis.fecha)
    const hoy = new Date()
    const diferencia = Math.floor((hoy - fechaAnalisis) / (1000 * 60 * 60 * 24))
    
    if (diferencia === 0) return 'Hoy'
    if (diferencia === 1) return 'Ayer'
    return `${diferencia} días`
  }

  return (
    <div className="dashboard-screen">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>🫁 LungAI</h1>
            <p>Bienvenido de nuevo{usuario ? `, ${usuario.nombre}` : ''}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Cerrar sesión
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className={`status-card risk-${risk.level}`}>
          <div className="status-icon">
            {risk.level === 'low' ? '🟢' : risk.level === 'moderate' ? '🟡' : '🔴'}
          </div>
          <div className="status-info">
            <h3>{risk.label}</h3>
            <p>{risk.message}</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🫁</div>
            <div className="stat-info">
              <h4>Estado pulmonar</h4>
              <p className="stat-value">{ultimoAnalisis ? `${100 - ultimoAnalisis.confianza}%` : '95%'}</p>
              <p className="stat-label">{ultimoAnalisis ? 'Basado en análisis' : 'Saludable'}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-info">
              <h4>Oxígeno</h4>
              <p className="stat-value">98%</p>
              <p className="stat-label">Normal</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h4>Frecuencia</h4>
              <p className="stat-value">16/min</p>
              <p className="stat-label">Respiratoria</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h4>Último análisis</h4>
              <p className="stat-value">{getDaysSinceLastAnalysis()}</p>
              <p className="stat-label">{ultimoAnalisis ? 'Atrás' : 'Sin datos'}</p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/scan')}>
            🎤 Iniciar análisis
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/history')}>
            📋 Ver historial
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard