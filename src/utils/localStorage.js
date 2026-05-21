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
  USUARIO: 'usuario',
  HISTORIAL_ANALISIS: 'historialAnalisis',
  ULTIMO_ANALISIS: 'ultimoAnalisis'
}

/**
 * Guarda los datos del usuario
 * @param {Object} usuario - Objeto con nombre, correo, edad
 */
export const saveUsuario = (usuario) => {
  return saveToLocalStorage(STORAGE_KEYS.USUARIO, usuario)
}

/**
 * Recupera los datos del usuario
 * @returns {Object|null} Datos del usuario o null si no existe
 */
export const getUsuario = () => {
  return getFromLocalStorage(STORAGE_KEYS.USUARIO, null)
}

/**
 * Guarda un nuevo análisis en el historial
 * @param {Object} analisis - Objeto con id, fecha, resultado, confianza
 */
export const saveAnalisisToHistorial = (analisis) => {
  const historial = getHistorialAnalisis()
  historial.push(analisis)
  return saveToLocalStorage(STORAGE_KEYS.HISTORIAL_ANALISIS, historial)
}

/**
 * Recupera el historial completo de análisis
 * @returns {Array} Arreglo de análisis o arreglo vacío si no existe
 */
export const getHistorialAnalisis = () => {
  return getFromLocalStorage(STORAGE_KEYS.HISTORIAL_ANALISIS, [])
}

/**
 * Guarda el último análisis realizado
 * @param {Object} analisis - Objeto con fecha, resultado, confianza
 */
export const saveUltimoAnalisis = (analisis) => {
  return saveToLocalStorage(STORAGE_KEYS.ULTIMO_ANALISIS, analisis)
}

/**
 * Recupera el último análisis realizado
 * @returns {Object|null} Último análisis o null si no existe
 */
export const getUltimoAnalisis = () => {
  return getFromLocalStorage(STORAGE_KEYS.ULTIMO_ANALISIS, null)
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

/**
 * Cierra sesión del usuario eliminando sus datos
 */
export const logout = () => {
  return removeFromLocalStorage(STORAGE_KEYS.USUARIO)
}
