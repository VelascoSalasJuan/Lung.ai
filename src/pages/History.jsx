import { useNavigate } from 'react-router-dom'
import './History.css'

function History() {
  const navigate = useNavigate()

  const historyData = [
    { date: '20/05/2026', result: 'Posible bronquitis leve', risk: 65, status: 'warning' },
    { date: '15/05/2026', result: 'Pulmones saludables', risk: 15, status: 'success' },
    { date: '10/05/2026', result: 'Irritación leve', risk: 35, status: 'warning' },
    { date: '05/05/2026', result: 'Pulmones saludables', risk: 10, status: 'success' },
    { date: '01/05/2026', result: 'Patrones normales', risk: 20, status: 'success' },
  ]

  return (
    <div className="history-screen">
      <div className="history-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Volver al inicio
        </button>
        <h1>📋 Historial Médico</h1>
      </div>

      <div className="history-content">
        <div className="charts-section">
          <div className="chart-card">
            <h3>📈 Evolución del Riesgo</h3>
            <div className="chart-container">
              <div className="chart-bars">
                <div className="chart-bar" style={{ height: '65%' }} data-label="20/05">
                  <span className="bar-label">65%</span>
                </div>
                <div className="chart-bar" style={{ height: '15%' }} data-label="15/05">
                  <span className="bar-label">15%</span>
                </div>
                <div className="chart-bar" style={{ height: '35%' }} data-label="10/05">
                  <span className="bar-label">35%</span>
                </div>
                <div className="chart-bar" style={{ height: '10%' }} data-label="05/05">
                  <span className="bar-label">10%</span>
                </div>
                <div className="chart-bar" style={{ height: '20%' }} data-label="01/05">
                  <span className="bar-label">20%</span>
                </div>
              </div>
              <div className="chart-labels">
                <span>20/05</span>
                <span>15/05</span>
                <span>10/05</span>
                <span>05/05</span>
                <span>01/05</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>💧 Saturación de Oxígeno</h3>
            <div className="oxygen-chart">
              <div className="oxygen-line"></div>
              <div className="oxygen-points">
                <div className="point" style={{ left: '10%', bottom: '98%' }}></div>
                <div className="point" style={{ left: '32%', bottom: '99%' }}></div>
                <div className="point" style={{ left: '55%', bottom: '96%' }}></div>
                <div className="point" style={{ left: '77%', bottom: '98%' }}></div>
                <div className="point" style={{ left: '90%', bottom: '97%' }}></div>
              </div>
            </div>
            <div className="oxygen-legend">
              <span>96-99%</span>
              <span className="current">Actual: 98%</span>
            </div>
          </div>
        </div>

        <div className="history-list">
          <h3>📝 Registros de análisis</h3>
          {historyData.map((item, index) => (
            <div key={index} className={`history-item ${item.status}`}>
              <div className="history-date">{item.date}</div>
              <div className="history-result">{item.result}</div>
              <div className="history-risk">
                <span className="risk-label">Riesgo:</span>
                <span className="risk-value">{item.risk}%</span>
              </div>
              <div className={`history-status ${item.status}`}>
                {item.status === 'success' ? '✓' : '⚠️'}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/scan')}>
          🎤 Nuevo análisis
        </button>
      </div>
    </div>
  )
}

export default History