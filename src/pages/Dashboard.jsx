import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-screen">
      <div className="dashboard-header">
        <h1>🫁 LungAI</h1>
        <p>Bienvenido de nuevo</p>
      </div>

      <div className="dashboard-content">
        <div className="status-card risk-low">
          <div className="status-icon">🟢</div>
          <div className="status-info">
            <h3>Riesgo bajo</h3>
            <p>Tus pulmones están saludables</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🫁</div>
            <div className="stat-info">
              <h4>Estado pulmonar</h4>
              <p className="stat-value">95%</p>
              <p className="stat-label">Saludable</p>
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
              <p className="stat-value">2 días</p>
              <p className="stat-label">Atrás</p>
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