'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'


export default function ModelViewer() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Escena, cámara y renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Luz
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    // Carga modelo glb
    const loader = new GLTFLoader()
    loader.load(
      '/models/2020_chevrolet_corvette_c8_anderson_composites.glb',
      (gltf) => {
        scene.add(gltf.scene)
        animate()
      },
      undefined,
      (error) => {
        console.error('Error cargando el modelo:', error)
      }
    )

    // Animación
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    // Cleanup
    return () => {
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />
}
