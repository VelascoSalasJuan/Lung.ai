import { useNavigate } from 'react-router-dom'
import './Results.css'

function Results() {
  const navigate = useNavigate()

  return (
    <div className="results-screen">
      <div className="results-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Volver al inicio
        </button>
        <h1>📊 Resultado del Análisis</h1>
      </div>

      <div className="results-content">
        <div className="result-card warning">
          <div className="result-header">
            <div className="result-icon">⚠️</div>
            <div className="result-level">Riesgo moderado</div>
            <div className="risk-percentage">65%</div>
          </div>
          <div className="result-diagnosis">
            <h3>Posible bronquitis leve</h3>
            <p>Se detectaron patrones respiratorios que sugieren irritación en las vías respiratorias.</p>
          </div>
        </div>

        <div className="lung-visualization">
          <h3>🫁 Visualización pulmonar</h3>
          <div className="lung-3d">
            <div className="lung-part lung-left-3d"></div>
            <div className="lung-part lung-right-3d"></div>
          </div>
          <div className="lung-legend">
            <div className="legend-item">
              <span className="legend-color healthy"></span>
              <span>Sano</span>
            </div>
            <div className="legend-item">
              <span className="legend-color warning"></span>
              <span>Irritación</span>
            </div>
            <div className="legend-item">
              <span className="legend-color danger"></span>
              <span>Crítico</span>
            </div>
          </div>
        </div>

        <div className="recommendation-card">
          <h3>💡 Recomendación</h3>
          <p>Se sugiere visitar a un especialista para una evaluación más detallada. Mantente hidratado y evita exposiciones a irritantes.</p>
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/history')}>
            📋 Ver historial completo
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/scan')}>
            🎤 Realizar nuevo análisis
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results