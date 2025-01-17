/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

export default function AppBar() {
  const user = useSelector((state: RootState) => state.user)
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" to="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" to="#">
              Home
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" to="#">
              About
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" to="#">
              Services
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" to="#">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {
              user.refresh_token ? (
                <Button size="sm" variant="outline" >
                  <Link to='signin' >
                    Sign in
                  </Link>
                </Button>
              ) : (
                <Button size="sm">  <Link to='signup' >Sign up </Link></Button>
              )
            }

          </div>
        </div>
      </div>
    </nav>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
