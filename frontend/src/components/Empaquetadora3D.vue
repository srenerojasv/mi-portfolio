<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
  giro: { type: Number, default: 0 },
  dur: { type: Number, default: 560 },
  paso: { type: Number, default: 0 },
  cilindro: { type: Number, default: 0 },
  visible: { type: Boolean, default: false },
  cayendo: { type: Boolean, default: false },
  llenado: { type: Number, default: 0 },
  m2: { type: Number, default: 0 },
  m3: { type: Number, default: 0 },
  s2: { type: Number, default: 0 },
  productos: { type: Number, default: 0 },
  material: { type: Boolean, default: true },
  estado: { type: String, default: 'APAGADO' },
})

const container = ref(null)
let scene, camera, renderer, controls, tambor, animFrameId

onMounted(() => {
  // Escena
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0f172a)

  // Cámara
  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.set(8, 6, 8)
  camera.lookAt(0, 0, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.value.appendChild(renderer.domElement)

  // OrbitControls (para mover la cámara con el mouse)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // Tambor (cilindro horizontal con marcas para ver la rotación)
  const tamborGroup = new THREE.Group()
  
  // Cuerpo del tambor
  const tamborGeometry = new THREE.CylinderGeometry(1.5, 1.5, 4, 32)
  const tamborMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xc0c0c0, 
    metalness: 0.8, 
    roughness: 0.2 
  })
  const tamborMesh = new THREE.Mesh(tamborGeometry, tamborMaterial)
  tamborMesh.castShadow = true
  tamborGroup.add(tamborMesh)

  // Marcas de las 16 ranuras (para visualizar la rotación)
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2
    const marcaGeometry = new THREE.BoxGeometry(0.05, 0.3, 3.8)
    const marcaMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
    const marca = new THREE.Mesh(marcaGeometry, marcaMaterial)
    marca.position.set(Math.cos(angle) * 1.51, Math.sin(angle) * 1.51, 0)
    marca.rotation.z = angle
    marca.castShadow = true
    tamborGroup.add(marca)
  }

  // Rotar el grupo para que el tambor esté horizontal (eje X)
  tamborGroup.rotation.z = Math.PI / 2
  tambor = tamborGroup
  scene.add(tambor)

  // Tolva (caja transparente)
  const tolvaGeometry = new THREE.BoxGeometry(2, 2, 2)
  const tolvaMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, 
    transparent: true, 
    opacity: 0.7 
  })
  const tolva = new THREE.Mesh(tolvaGeometry, tolvaMaterial)
  tolva.position.set(0, 3, 0)
  tolva.castShadow = true
  scene.add(tolva)

  // Suelo
  const sueloGeometry = new THREE.PlaneGeometry(20, 20)
  const sueloMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b })
  const suelo = new THREE.Mesh(sueloGeometry, sueloMaterial)
  suelo.rotation.x = -Math.PI / 2
  suelo.position.y = -2
  suelo.receiveShadow = true
  scene.add(suelo)

  // Animación
  const animate = () => {
    animFrameId = requestAnimationFrame(animate)
    controls.update() // Necesario para el damping
    renderer.render(scene, camera)
  }
  animate()

  // Resize
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animFrameId)
  window.removeEventListener('resize', onResize)
  if (controls) controls.dispose()
  if (renderer) {
    renderer.dispose()
    container.value.removeChild(renderer.domElement)
  }
})

function onResize() {
  if (!container.value || !camera || !renderer) return
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

// Actualizar rotación del tambor cuando cambia props.giro
watch(() => props.giro, (nuevoGiro) => {
  if (tambor) {
    // El tambor está rotado 90° en Z, así que para girar sobre su eje longitudinal usamos rotation.x
    tambor.rotation.x = (nuevoGiro * Math.PI) / 180
  }
})
</script>

<template>
  <div ref="container" class="w-full h-[400px] bg-slate-900 rounded-lg overflow-hidden relative cursor-grab active:cursor-grabbing"></div>
</template>