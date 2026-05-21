import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Dashboard.css'
import { getUsuario, getUltimoAnalisis, getHistorialAnalisis, eliminarCuenta } from '../utils/localStorage'

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

  const handleEliminarCuenta = () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer y se borrarán todos tus datos.')) {
      const eliminado = eliminarCuenta()
      if (eliminado) {
        navigate('/login')
      } else {
        alert('Error al eliminar la cuenta. Intenta nuevamente.')
      }
    }
  }

  // Determinar nivel de riesgo basado en el último análisis
  const getRiskLevel = () => {
    if (!ultimoAnalisis) return null // Retorna null si no hay análisis
    
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
    if (!ultimoAnalisis) return null // Retorna null si no hay análisis
    
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
          <div className="header-buttons">
            <button className="delete-account-btn" onClick={handleEliminarCuenta}>
              🗑️ Borrar cuenta
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {risk ? (
          <div className={`status-card risk-${risk.level}`}>
            <div className="status-icon">
              {risk.level === 'low' ? '🟢' : risk.level === 'moderate' ? '🟡' : '🔴'}
            </div>
            <div className="status-info">
              <h3>{risk.label}</h3>
              <p>{risk.message}</p>
            </div>
          </div>
        ) : (
          <div className="empty-state-card">
            <div className="empty-icon">🫁</div>
            <div className="empty-info">
              <h3>Bienvenido a Lung.AI</h3>
              <p>Realiza tu primer análisis respiratorio para obtener resultados y estadísticas personalizadas.</p>
            </div>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🫁</div>
            <div className="stat-info">
              <h4>Estado pulmonar</h4>
              <p className="stat-value">{ultimoAnalisis ? `${100 - ultimoAnalisis.confianza}%` : '--'}</p>
              <p className="stat-label">{ultimoAnalisis ? 'Basado en análisis' : 'Sin datos'}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-info">
              <h4>Oxígeno</h4>
              <p className="stat-value">{ultimoAnalisis ? '98%' : '--'}</p>
              <p className="stat-label">Saturación</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h4>Frecuencia</h4>
              <p className="stat-value">{ultimoAnalisis ? '16/min' : '--'}</p>
              <p className="stat-label">Respiratoria</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h4>Último análisis</h4>
              <p className="stat-value">{getDaysSinceLastAnalysis() || '--'}</p>
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