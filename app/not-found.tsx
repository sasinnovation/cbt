"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/dashboard")
  }, [])

  return <div style={{ padding: 20 }}>Redirecting...</div>
}

