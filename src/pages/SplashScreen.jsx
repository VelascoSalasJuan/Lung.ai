import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SplashScreen.css'

function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="lung-animation">
          <div className="lung">
            <div className="lung-left"></div>
            <div className="lung-right"></div>
          </div>
        </div>
        <h1 className="logo">🫁 LungAI</h1>
        <p className="tagline">Detección inteligente respiratoria</p>
      </div>
    </div>
  )
}

export default SplashScreen