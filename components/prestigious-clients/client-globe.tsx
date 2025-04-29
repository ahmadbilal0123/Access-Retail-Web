"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Client {
  name: string
  industry: string
  logo: string
}

interface ClientGlobeProps {
  clients: Client[]
  isVisible: boolean
}

export function ClientGlobe({ clients, isVisible }: ClientGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [clientElements, setClientElements] = useState<HTMLDivElement[]>([])

  // Get industry color scheme
  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "FMCG":
        return {
          color: "#3b82f6", // blue-500
          bgClass: "bg-blue-900/30",
          borderClass: "border-blue-700/30",
          glowClass: "bg-blue-500/30",
          textClass: "text-blue-300",
        }
      case "Beverages":
        return {
          color: "#ef4444", // red-500
          bgClass: "bg-red-900/30",
          borderClass: "border-red-700/30",
          glowClass: "bg-red-500/30",
          textClass: "text-red-300",
        }
      case "Telecom":
        return {
          color: "#a855f7", // purple-500
          bgClass: "bg-purple-900/30",
          borderClass: "border-purple-700/30",
          glowClass: "bg-purple-500/30",
          textClass: "text-purple-300",
        }
      case "Food":
        return {
          color: "#10b981", // green-500
          bgClass: "bg-green-900/30",
          borderClass: "border-green-700/30",
          glowClass: "bg-green-500/30",
          textClass: "text-green-300",
        }
      case "Conglomerate":
        return {
          color: "#f59e0b", // amber-500
          bgClass: "bg-amber-900/30",
          borderClass: "border-amber-700/30",
          glowClass: "bg-amber-500/30",
          textClass: "text-amber-300",
        }
      default:
        return {
          color: "#3b82f6", // blue-500
          bgClass: "bg-blue-900/30",
          borderClass: "border-blue-700/30",
          glowClass: "bg-blue-500/30",
          textClass: "text-blue-300",
        }
    }
  }

  // Initialize Three.js scene
  useEffect(() => {
    if (!isVisible || isInitialized || !canvasRef.current || !containerRef.current) return

    const THREE = (window as any).THREE
    if (!THREE) {
      console.error("Three.js not loaded")
      return
    }

    setIsInitialized(true)

    const container = containerRef.current
    const canvas = canvasRef.current

    // Create scene
    const scene = new THREE.Scene()

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 5

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // Create sphere geometry for the globe
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a1d3b, // dark blue
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Create client elements
    const elements: HTMLDivElement[] = []
    const clientPositions: THREE.Vector3[] = []

    // Calculate positions on the sphere
    clients.forEach((_, index) => {
      // Use fibonacci sphere distribution for even spacing
      const phi = Math.acos(-1 + (2 * index) / clients.length)
      const theta = Math.sqrt(clients.length * Math.PI) * phi

      const x = 2 * Math.sin(phi) * Math.cos(theta)
      const y = 2 * Math.sin(phi) * Math.sin(theta)
      const z = 2 * Math.cos(phi)

      clientPositions.push(new THREE.Vector3(x, y, z))
    })

    // Create HTML elements for each client
    clients.forEach((client, index) => {
      const element = document.createElement("div")
      element.className = "absolute pointer-events-auto cursor-pointer transition-all duration-300"
      element.style.width = "60px"
      element.style.height = "60px"
      element.style.transform = "translate(-50%, -50%)"
      element.dataset.clientIndex = index.toString()

      // Add client logo and styling
      const colors = getIndustryColor(client.industry)
      element.innerHTML = `
        <div class="relative group">
          <div class="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md ${colors.glowClass}"></div>
          <div class="relative ${colors.bgClass} ${colors.borderClass} backdrop-blur-sm rounded-full border p-2 flex items-center justify-center overflow-hidden">
            <img src="${client.logo}" alt="${client.name}" class="w-full h-full object-contain" crossorigin="anonymous" />
          </div>
        </div>
      `

      // Add click event
      element.addEventListener("click", (e) => {
        e.stopPropagation()
        setSelectedClient(client)
      })

      container.appendChild(element)
      elements.push(element)
    })

    setClientElements(elements)

    // Variables for rotation
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
    const rotationSpeed = { x: 0.001, y: 0.001 }
    let autoRotate = true

    // Mouse/touch event handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      setIsInteracting(true)
      autoRotate = false
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      }

      // Adjust rotation based on mouse movement
      sphere.rotation.y += deltaMove.x * 0.005
      sphere.rotation.x += deltaMove.y * 0.005

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const onMouseUp = () => {
      isDragging = false
      setTimeout(() => {
        if (!isDragging) {
          setIsInteracting(false)
          autoRotate = true
        }
      }, 2000)
    }

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        setIsInteracting(true)
        autoRotate = false
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return

      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      }

      // Adjust rotation based on touch movement
      sphere.rotation.y += deltaMove.x * 0.005
      sphere.rotation.x += deltaMove.y * 0.005

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }

    const onTouchEnd = () => {
      isDragging = false
      setTimeout(() => {
        if (!isDragging) {
          setIsInteracting(false)
          autoRotate = true
        }
      }, 2000)
    }

    // Add event listeners
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchstart", onTouchStart)
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("touchend", onTouchEnd)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Auto-rotate when not interacting
      if (autoRotate) {
        sphere.rotation.y += rotationSpeed.y
        sphere.rotation.x += rotationSpeed.x
      }

      // Update client element positions
      elements.forEach((element, index) => {
        const position = clientPositions[index].clone()
        position.applyMatrix4(sphere.matrixWorld)

        // Convert 3D position to 2D screen coordinates
        const vector = position.project(camera)

        const x = (vector.x * 0.5 + 0.5) * container.clientWidth
        const y = (vector.y * -0.5 + 0.5) * container.clientHeight

        // Check if the point is in front of the sphere (z < 0 is behind)
        const isBehind = position.z < 0

        // Update element position and visibility
        element.style.left = `${x}px`
        element.style.top = `${y}px`
        element.style.opacity = isBehind ? "0.3" : "1"
        element.style.zIndex = isBehind ? "0" : "1"
        element.style.transform = `translate(-50%, -50%) scale(${isBehind ? 0.7 : 1})`
        element.style.pointerEvents = isBehind ? "none" : "auto"
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!container) return

      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      // Remove event listeners
      canvas.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("resize", handleResize)

      // Remove client elements
      elements.forEach((element) => {
        if (container.contains(element)) {
          container.removeChild(element)
        }
      })

      // Dispose Three.js resources
      sphereGeometry.dispose()
      sphereMaterial.dispose()
      renderer.dispose()
    }
  }, [clients, isVisible, isInitialized])

  // Cleanup client elements on unmount
  useEffect(() => {
    return () => {
      clientElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element)
        }
      })
    }
  }, [clientElements])

  return (
    <div className="relative">
      <div ref={containerRef} className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

        {/* Instruction overlay when not interacting */}
        <AnimatePresence>
          {!isInteracting && isInitialized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-blue-950/50 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm">
                Drag to rotate • Click on logos to learn more
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Client detail modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm" onClick={() => setSelectedClient(null)} />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-gradient-to-br from-blue-900/90 to-blue-950/90 border border-blue-800/50 rounded-xl p-6 max-w-md w-full shadow-xl"
            >
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 right-4 text-blue-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Client info */}
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={selectedClient.logo || "/placeholder.svg"}
                    alt={selectedClient.name}
                    fill
                    className="object-contain"
                    crossOrigin="anonymous"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{selectedClient.name}</h3>
                  <div className={cn("text-sm", getIndustryColor(selectedClient.industry).textClass)}>
                    {selectedClient.industry}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-900/30 border border-blue-800/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Partnership Highlights</h4>
                  <p className="text-blue-100 text-sm">
                    Access Retail has been a trusted partner for {selectedClient.name}, providing comprehensive retail
                    intelligence and market insights that have helped drive strategic decision-making and business
                    growth.
                  </p>
                </div>

                <div className="bg-blue-900/30 border border-blue-800/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Services Provided</h4>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• Retail Audit & Merchandising</li>
                    <li>• Market Share Analysis</li>
                    <li>• Competitor Intelligence</li>
                    <li>• Consumer Insights</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

