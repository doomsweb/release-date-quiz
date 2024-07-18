import { createHashRouter } from "react-router-dom"
import { lazyImport } from "@/utils/helpers"

const { Home } = lazyImport(() => import("@/views"), "Home")

const router = createHashRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />
      },
    ]
  }
])

export default router