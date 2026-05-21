import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { saveUsuario, getUsuario, getUsuarioPorCorreo, setUsuarioActual, saveAnalisisToHistorial, saveUltimoAnalisis } from '../utils/localStorage'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  // Cargar datos del usuario si ya existe
  useEffect(() => {
    const usuarioExistente = getUsuario()
    if (usuarioExistente) {
      setEmail(usuarioExistente.correo || '')
      setNombre(usuarioExistente.nombre || '')
      setEdad(usuarioExistente.edad?.toString() || '')
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Verificar si el usuario existe por correo
    const usuarioExistente = getUsuarioPorCorreo(email)
    if (usuarioExistente) {
      // Establecer como usuario actual
      setUsuarioActual(usuarioExistente)
      navigate('/dashboard')
    } else {
      alert('Usuario no encontrado. Por favor regístrate.')
      setIsRegistering(true)
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Verificar si el correo ya está registrado
    const usuarioExistente = getUsuarioPorCorreo(email)
    if (usuarioExistente) {
      alert('Este correo ya está registrado. Inicia sesión.')
      setIsRegistering(false)
      return
    }

    const nuevoUsuario = {
      nombre: nombre,
      correo: email,
      edad: parseInt(edad)
    }
    const guardado = saveUsuario(nuevoUsuario)
    if (guardado) {
      // Establecer como usuario actual
      setUsuarioActual(nuevoUsuario)
      // Inicializar datos vacíos para nuevo usuario
      saveAnalisisToHistorial([])
      saveUltimoAnalisis(null)
      alert('¡Cuenta creada exitosamente!')
      navigate('/dashboard')
    } else {
      alert('Error al guardar la cuenta. Intenta nuevamente.')
    }
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <h1>🫁 LungAI</h1>
          <p>Detección inteligente respiratoria</p>
        </div>
        
        {!isRegistering ? (
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
        ) : (
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
            
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
              <label htmlFor="edad">Edad</label>
              <input
                type="number"
                id="edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                placeholder="20"
                min="1"
                max="120"
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
              Registrarse
            </button>
          </form>
        )}
        
        <button className="btn btn-secondary" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? '← Volver a login' : 'Crear cuenta'}
        </button>
      </div>
    </div>
  )
}

export default Login