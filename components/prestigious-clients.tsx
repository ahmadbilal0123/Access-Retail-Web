"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ClientCarousel } from "./prestigious-clients/client-carousel"

export default function PrestigiousClients() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Client logos data with industry categories
  const clients = [
    { name: "", industry: "Beverages", logo: "/nestle.png" },
    {
      name: "",
      industry: "Beverages",
      logo: "/nescafe.png",
    },
    { name: "", industry: "Beverages", logo: "https://static.vecteezy.com/system/resources/thumbnails/019/956/122/small/coca-cola-transparent-coca-cola-free-free-png.png" },
    { name: "Pepsi", industry: "FMCG", logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/59db847a-30b6-4f66-9044-ef0a0adf1544/d91pbas-dcfba8fa-bc4b-4e50-b62f-6233b4b01858.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU5ZGI4NDdhLTMwYjYtNGY2Ni05MDQ0LWVmMGEwYWRmMTU0NFwvZDkxcGJhcy1kY2ZiYThmYS1iYzRiLTRlNTAtYjYyZi02MjMzYjRiMDE4NTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XvE_tvU31Yru4pGvobfI-uEuPczEfuuX-3ywkbfTSuk" },
    { name: "", industry: "FMCG", logo: "https://cdn.pixabay.com/photo/2021/10/26/12/17/unilever-6743502_1280.png" },
    { name: "P&G", industry: "FMCG", logo: "./p&g.png" },
    { name: "Engro", industry: "Conglomerate", logo: "https://mir-s3-cdn-cf.behance.net/projects/404/4ba83b187132161.Y3JvcCw4MDgsNjMyLDI0LDA.png" },
    { name: "", industry: "Telecom", logo: "/jazz.png" },
    { name: "Telenor", industry: "Telecom", logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/Telenor_logo.svg" },
    { name: "", industry: "Telecom", logo: "./Zong.png" },
    { name: "", industry: "Food", logo: "/shan.png" },
    { name: "", industry: "Beverages", logo: "/tapal.png" },
    { name: "Colgate-Palmolive", industry: "FMCG", logo: "/colgate.png" },
    { name: "", industry: "Food", logo: "/national.png" },
    { name: "", industry: "Telecom", logo: "/ufone.png" },
    { name: "", industry: "FMCG", logo: "/reckitt.png" },
    { name: "", industry: "Food", logo: "/mondelez.png" },
    { name: "", industry: "FMCG", logo: "/mayfair.png" },
    { name: "", industry: "Food", logo: "/dalda.png" },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900"
      id="clients"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-red-500/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-4"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Prestigious</span>{" "}
            Clients
          </motion.h2>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-blue-100 max-w-2xl mx-auto"
          >
           Trusted by blue chip multinational and local companies to deliver actionable retail intelligence & consulting

          </motion.p>
        </div>

        {/* Client Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative bg-blue-950/30 backdrop-blur-sm rounded-xl border border-blue-900/30 p-6 shadow-xl"
        >
          <ClientCarousel clients={clients} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="text-center mt-6 text-blue-200"
          >
            <p className="italic text-sm text-blue-300/70">And many more trusted partners...</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

