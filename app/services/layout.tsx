import type { ReactNode } from "react"

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <div className="bg-[#001333] min-h-screen">{children}</div>
}
