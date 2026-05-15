"use client"
import { useRouter } from "next/navigation"

export function useSafeRouter() {
  const router = useRouter()

  const safePush = (path: string) => {
    const safeRoutes = [
      "/admin/dashboard",
      "/admin/students",
      "/admin/results",
      "/admin/settings",
      "/admin/exams",
      "/login"
    ]

    if (safeRoutes.includes(path)) {
      router.push(path)
    } else {
      router.push("/admin/dashboard")
    }
  }

  return { safePush }
}

