// Funciones reutilizables para LocalStorage

/**
 * Guarda datos en LocalStorage
 * @param {string} key - Clave para almacenar los datos
 * @param {any} data - Datos a guardar (serán convertidos a JSON)
 */
export const saveToLocalStorage = (key, data) => {
  try {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
    return true
  } catch (error) {
    console.error(`Error al guardar en LocalStorage (${key}):`, error)
    return false
  }
}

/**
 * Recupera datos de LocalStorage
 * @param {string} key - Clave de los datos a recuperar
 * @param {any} defaultValue - Valor por defecto si no existe la clave
 * @returns {any} Datos recuperados o valor por defecto
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key)
    if (data === null) {
      return defaultValue
    }
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error al leer de LocalStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Elimina datos de LocalStorage
 * @param {string} key - Clave de los datos a eliminar
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error al eliminar de LocalStorage (${key}):`, error)
    return false
  }
}

/**
 * Limpia todos los datos de LocalStorage
 */
export const clearLocalStorage = () => {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error('Error al limpiar LocalStorage:', error)
    return false
  }
}

// Funciones específicas para el proyecto Lung.AI

const STORAGE_KEYS = {
  USUARIOS: 'usuarios',
  USUARIO_ACTUAL: 'usuarioActual',
  HISTORIAL_ANALISIS: 'historialAnalisis_',
  ULTIMO_ANALISIS: 'ultimoAnalisis_'
}

/**
 * Guarda un nuevo usuario en el array de usuarios
 * @param {Object} usuario - Objeto con nombre, correo, edad
 */
export const saveUsuario = (usuario) => {
  const usuarios = getUsuarios()
  // Verificar si el correo ya existe
  const existe = usuarios.find(u => u.correo === usuario.correo)
  if (existe) {
    // Actualizar usuario existente
    const index = usuarios.findIndex(u => u.correo === usuario.correo)
    usuarios[index] = usuario
  } else {
    // Agregar nuevo usuario
    usuarios.push(usuario)
  }
  return saveToLocalStorage(STORAGE_KEYS.USUARIOS, usuarios)
}

/**
 * Recupera todos los usuarios
 * @returns {Array} Arreglo de usuarios
 */
export const getUsuarios = () => {
  return getFromLocalStorage(STORAGE_KEYS.USUARIOS, [])
}

/**
 * Busca un usuario por correo
 * @param {string} correo - Correo del usuario a buscar
 * @returns {Object|null} Usuario encontrado o null
 */
export const getUsuarioPorCorreo = (correo) => {
  const usuarios = getUsuarios()
  return usuarios.find(u => u.correo === correo) || null
}

/**
 * Guarda el usuario actual (sesión activa)
 * @param {Object} usuario - Usuario de la sesión actual
 */
export const setUsuarioActual = (usuario) => {
  return saveToLocalStorage(STORAGE_KEYS.USUARIO_ACTUAL, usuario)
}

/**
 * Recupera el usuario actual (sesión activa)
 * @returns {Object|null} Usuario actual o null
 */
export const getUsuario = () => {
  return getFromLocalStorage(STORAGE_KEYS.USUARIO_ACTUAL, null)
}

/**
 * Cierra sesión eliminando el usuario actual
 */
export const logout = () => {
  return removeFromLocalStorage(STORAGE_KEYS.USUARIO_ACTUAL)
}

/**
 * Elimina la cuenta del usuario actual y todos sus datos
 */
export const eliminarCuenta = () => {
  const usuarioActual = getUsuario()
  if (!usuarioActual) {
    console.error('No hay usuario actual para eliminar')
    return false
  }
  
  console.log('Eliminando cuenta de:', usuarioActual.correo)
  
  // Eliminar usuario del array de usuarios
  const usuarios = getUsuarios()
  console.log('Usuarios antes:', usuarios)
  const usuariosFiltrados = usuarios.filter(u => u.correo !== usuarioActual.correo)
  const guardado = saveToLocalStorage(STORAGE_KEYS.USUARIOS, usuariosFiltrados)
  console.log('Usuarios después:', usuariosFiltrados, 'Guardado:', guardado)
  
  // Eliminar historial del usuario
  const keyHistorial = STORAGE_KEYS.HISTORIAL_ANALISIS + usuarioActual.correo
  const eliminadoHistorial = removeFromLocalStorage(keyHistorial)
  console.log('Historial eliminado:', eliminadoHistorial, 'Key:', keyHistorial)
  
  // Eliminar último análisis del usuario
  const keyUltimo = STORAGE_KEYS.ULTIMO_ANALISIS + usuarioActual.correo
  const eliminadoUltimo = removeFromLocalStorage(keyUltimo)
  console.log('Último análisis eliminado:', eliminadoUltimo, 'Key:', keyUltimo)
  
  // Eliminar usuario actual
  const logoutResult = logout()
  console.log('Logout resultado:', logoutResult)
  
  return true
}

/**
 * Guarda un nuevo análisis en el historial del usuario actual
 * @param {Object|Array} analisis - Objeto con id, fecha, resultado, confianza o array completo
 */
export const saveAnalisisToHistorial = (analisis) => {
  const usuarioActual = getUsuario()
  if (!usuarioActual) return false
  
  const key = STORAGE_KEYS.HISTORIAL_ANALISIS + usuarioActual.correo
  
  if (Array.isArray(analisis)) {
    // Si es un array, guardarlo directamente (para inicialización)
    return saveToLocalStorage(key, analisis)
  }
  const historial = getHistorialAnalisis()
  historial.push(analisis)
  return saveToLocalStorage(key, historial)
}

/**
 * Recupera el historial completo de análisis del usuario actual
 * @returns {Array} Arreglo de análisis o arreglo vacío si no existe
 */
export const getHistorialAnalisis = () => {
  const usuarioActual = getUsuario()
  if (!usuarioActual) return []
  
  const key = STORAGE_KEYS.HISTORIAL_ANALISIS + usuarioActual.correo
  return getFromLocalStorage(key, [])
}

/**
 * Guarda el último análisis realizado del usuario actual
 * @param {Object} analisis - Objeto con fecha, resultado, confianza
 */
export const saveUltimoAnalisis = (analisis) => {
  const usuarioActual = getUsuario()
  if (!usuarioActual) return false
  
  const key = STORAGE_KEYS.ULTIMO_ANALISIS + usuarioActual.correo
  return saveToLocalStorage(key, analisis)
}

/**
 * Recupera el último análisis realizado del usuario actual
 * @returns {Object|null} Último análisis o null si no existe
 */
export const getUltimoAnalisis = () => {
  const usuarioActual = getUsuario()
  if (!usuarioActual) return null
  
  const key = STORAGE_KEYS.ULTIMO_ANALISIS + usuarioActual.correo
  return getFromLocalStorage(key, null)
}

/**
 * Genera un ID único para un nuevo análisis
 * @returns {number} ID único
 */
export const generateAnalisisId = () => {
  const historial = getHistorialAnalisis()
  if (historial.length === 0) {
    return 1
  }
  const maxId = Math.max(...historial.map(a => a.id))
  return maxId + 1
}

/**
 * Obtiene la fecha y hora actual en formato string
 * @returns {string} Fecha y hora formateada
 */
export const getCurrentDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}
