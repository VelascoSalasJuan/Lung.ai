import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Analyzing.css'

function Analyzing() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results')
    }, 4000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="analyzing-screen">
      <div className="analyzing-content">
        <div className="sound-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
          <div className="wave wave-4"></div>
          <div className="wave wave-5"></div>
        </div>

        <div className="ai-processor">
          <div className="brain-icon">🧠</div>
          <div className="processing-ring"></div>
        </div>

        <h1 className="analyzing-title">Analizando patrones respiratorios...</h1>
        <p className="analyzing-subtitle">La IA está procesando tu voz</p>

        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>

        <div className="analyzing-steps">
          <div className="step completed">
            <span className="step-icon">✓</span>
            <span>Extracción de audio</span>
          </div>
          <div className="step completed">
            <span className="step-icon">✓</span>
            <span>Análisis de frecuencia</span>
          </div>
          <div className="step active">
            <span className="step-icon">⟳</span>
            <span>Comparación con base de datos</span>
          </div>
          <div className="step">
            <span className="step-icon">○</span>
            <span>Generando diagnóstico</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analyzing