import { perfil } from '@/data/perfil'

const MENSAJE_POR_DEFECTO = `Hola ${perfil.nombreCorto || perfil.nombre}, vi tu portafolio y me gustaría hablar sobre un proyecto.`

export function crearEnlaceWhatsapp(mensaje = MENSAJE_POR_DEFECTO) {
  const numero = String(perfil.whatsapp || '').replace(/\D/g, '')
  if (!numero) return ''

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}
