import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulación de login
    navigate('/dashboard')
  }

  const handleRegister = () => {
    // Simulación de registro
    navigate('/dashboard')
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <h1>🫁 LungAI</h1>
          <p>Detección inteligente respiratoria</p>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
        </form>
        
        <button className="btn btn-secondary" onClick={handleRegister}>
          Registrarse
        </button>
      </div>
    </div>
  )
}

export default Login