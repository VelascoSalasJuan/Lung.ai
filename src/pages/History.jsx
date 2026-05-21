import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './History.css'
import { getHistorialAnalisis } from '../utils/localStorage'

function History() {
  const navigate = useNavigate()
  const [historial, setHistorial] = useState([])

  useEffect(() => {
    // Cargar historial desde LocalStorage
    const datosHistorial = getHistorialAnalisis()
    setHistorial(datosHistorial)
  }, [])

  // Convertir datos del historial al formato esperado por el componente
  const historyData = historial.map(analisis => ({
    date: analisis.fecha,
    result: analisis.resultado,
    risk: analisis.confianza,
    status: analisis.confianza >= 50 ? 'warning' : 'success'
  })).reverse() // Mostrar los más recientes primero

  // Datos para el gráfico (solo los últimos 5, en orden cronológico)
  const chartData = historyData.slice(0, 5).reverse()

  return (
    <div className="history-screen">
      <div className="history-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Volver al inicio
        </button>
        <h1>📋 Historial Médico</h1>
      </div>

      <div className="history-content">
        {historial.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-info">
                <h3>Aún no tienes análisis registrados</h3>
                <p>Realiza tu primer análisis respiratorio para comenzar a generar tu historial.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="charts-section">
              <div className="chart-card">
                <h3>📈 Evolución del Riesgo</h3>
                <div className="chart-container">
                  <div className="chart-bars">
                    {chartData.map((item, index) => (
                      <div key={index} className="chart-bar" style={{ height: `${item.risk}%` }} data-label={item.date.split(' ')[0]}>
                        <span className="bar-label">{item.risk}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    {chartData.map((item, index) => (
                      <span key={index}>{item.date.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>💧 Saturación de Oxígeno</h3>
                <div className="oxygen-chart">
                  <div className="oxygen-line"></div>
                  <div className="oxygen-points">
                    {chartData.map((item, index) => (
                      <div 
                        key={index} 
                        className="point" 
                        style={{ 
                          left: `${(index + 1) * (80 / chartData.length) + 10}%`, 
                          bottom: `${100 - item.risk}%` 
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="oxygen-legend">
                  <span>Inicio</span>
                  <span className="current">Actual: {chartData.length > 0 ? chartData[chartData.length - 1].risk + '%' : '--'}</span>
                  <span>Fin</span>
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
          </>
        )}

        <button className="btn btn-primary" onClick={() => navigate('/scan')}>
          🎤 Nuevo análisis
        </button>
      </div>
    </div>
  )
}

export default History