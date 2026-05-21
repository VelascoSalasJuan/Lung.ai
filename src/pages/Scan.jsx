import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Scan.css'

function Scan() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [recordTime, setRecordTime] = useState(0)

  const startRecording = () => {
    setIsRecording(true)
    // Simular grabación
    setTimeout(() => {
      navigate('/analyzing')
    }, 3000)
  }

  return (
    <div className="scan-screen">
      <div className="scan-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Volver
        </button>
        <h1>🎤 Escaneo Respiratorio</h1>
      </div>

      <div className="scan-content">
        <div className="scan-instructions">
          <div className="instruction-step">
            <div className="step-icon">🗣️</div>
            <p>Graba tu tos</p>
          </div>
          <div className="instruction-step">
            <div className="step-icon">🌬️</div>
            <p>Graba tu respiración</p>
          </div>
          <div className="instruction-step">
            <div className="step-icon">🤖</div>
            <p>IA analizará tu voz</p>
          </div>
        </div>

        <div className="record-button-container">
          {!isRecording ? (
            <button 
              className="record-button" 
              onClick={startRecording}
            >
              🎤 Iniciar análisis
            </button>
          ) : (
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <p>Grabando... {recordTime}s</p>
            </div>
          )}
        </div>

        <div className="scan-tips">
          <h3>Consejos:</h3>
          <ul>
            <li>Mantén el dispositivo cerca de tu boca</li>
            <li>Graba en un lugar silencioso</li>
            <li>Tose naturalmente 2-3 veces</li>
            <li>Respira normalmente durante 10 segundos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Scan