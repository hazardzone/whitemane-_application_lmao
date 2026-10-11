import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function makeTerrain() {
  const geometry = new THREE.PlaneGeometry(90, 90, 90, 90)
  const pos = geometry.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i)
    const ridges = Math.sin(x * .12 + Math.sin(y * .06) * 2) * .55 + Math.cos(y * .13) * .42
    const distance = Math.sqrt((x + 1) ** 2 + (y - 1) ** 2)
    const volcano = Math.max(0, 1 - distance / 23) * 6.5
    pos.setZ(i, ridges + volcano + Math.sin(x * .45) * Math.cos(y * .32) * .13)
  }
  geometry.computeVertexNormals()
  return geometry
}

function makeMountain(scene: THREE.Scene, x: number, z: number, radius: number, height: number, color: number) {
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 7, 4), new THREE.MeshStandardMaterial({ color, roughness: .95, flatShading: true }))
  mesh.position.set(x, height / 2 - 1, z)
  mesh.rotation.y = .2
  scene.add(mesh)
  const cap = new THREE.Mesh(new THREE.TorusGeometry(radius * .24, .12, 6, 20), new THREE.MeshBasicMaterial({ color: 0xff642d, transparent: true, opacity: .75 }))
  cap.rotation.x = Math.PI / 2
  cap.position.set(x, height - .65, z)
  scene.add(cap)
}

export default function World() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current
    if (!el) return
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#11100f')
    scene.fog = new THREE.FogExp2('#11100f', .021)
    const camera = new THREE.PerspectiveCamera(39, 1, .1, 180)
    camera.position.set(0, 9.4, 29)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    el.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight('#f5b88f', '#171419', 1.25))
    const moon = new THREE.DirectionalLight('#a4b4d4', 1.4)
    moon.position.set(-8, 14, 12); scene.add(moon)
    const lavaLight = new THREE.PointLight('#ff4a18', 45, 42, 2)
    lavaLight.position.set(-1, 2, -9); scene.add(lavaLight)

    const terrain = new THREE.Mesh(makeTerrain(), new THREE.MeshStandardMaterial({ color: '#302522', roughness: .9, metalness: .05, flatShading: true }))
    terrain.rotation.x = -Math.PI / 2
    terrain.position.y = -2.4
    scene.add(terrain)
    makeMountain(scene, -1, -14, 10, 14, 0x372a28)
    makeMountain(scene, -14, -18, 5.4, 9, 0x282326)
    makeMountain(scene, 12, -20, 6.4, 11, 0x242126)
    makeMountain(scene, 22, -8, 5.8, 9, 0x302326)
    makeMountain(scene, -25, -8, 6.8, 11, 0x292326)

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, .16, 8, 36), new THREE.MeshBasicMaterial({ color: '#ff5a28', transparent: true, opacity: .84 }))
    ring.position.set(-1, 1.8, -8.5); scene.add(ring)
    const ringCore = new THREE.Mesh(new THREE.CircleGeometry(1.63, 32), new THREE.MeshBasicMaterial({ color: '#ff531c', transparent: true, opacity: .2, side: THREE.DoubleSide }))
    ringCore.position.copy(ring.position); ringCore.lookAt(camera.position); scene.add(ringCore)

    const count = 380
    const embers = new THREE.BufferGeometry()
    const coords = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - .5) * 54
      coords[i * 3 + 1] = Math.random() * 19 - 2
      coords[i * 3 + 2] = (Math.random() - .5) * 44 - 4
      speeds[i] = .15 + Math.random() * .6
    }
    embers.setAttribute('position', new THREE.BufferAttribute(coords, 3))
    const points = new THREE.Points(embers, new THREE.PointsMaterial({ color: '#ff7540', size: .075, transparent: true, opacity: .76, sizeAttenuation: true }))
    scene.add(points)

    let width = 0, height = 0, frame = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let pointerX = 0, pointerY = 0
    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - .5) * 2
      pointerY = (e.clientY / window.innerHeight - .5) * 2
    }
    const resize = () => {
      width = el.clientWidth; height = el.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(el); resize()
    window.addEventListener('pointermove', onPointer, { passive: true })
    const clock = new THREE.Clock()
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      if (!reducedMotion) {
        camera.position.x += (pointerX * 1.3 - camera.position.x) * .009
        camera.position.y += (9.4 + pointerY * -.45 - camera.position.y) * .009
        ring.rotation.z = Math.sin(t * .45) * .06
        points.rotation.y = t * .009
        const p = embers.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < count; i++) {
          const y = p.getY(i) + speeds[i] * .012
          p.setY(i, y > 17 ? -2 : y)
          p.setX(i, p.getX(i) + Math.sin(t * .45 + i) * .002)
        }
        p.needsUpdate = true
      }
      camera.lookAt(0, 1.2, -9)
      renderer.render(scene, camera)
    }
    animate()
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove', onPointer)
      scene.traverse((o) => { if (o instanceof THREE.Mesh || o instanceof THREE.Points) { o.geometry.dispose(); const m = o.material; if (Array.isArray(m)) m.forEach(x => x.dispose()); else m.dispose() } })
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [])
  return <div className="world-canvas" ref={host} aria-hidden="true" />
}
