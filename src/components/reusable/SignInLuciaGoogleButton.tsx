import Link from "next/link"
import { FaGoogle } from "react-icons/fa"; // Importing Google icon from React Icons
import { Button } from "../ui/button"

export default function SignInLuciaGoogleButton() {
  return (
      <Button asChild
        type="submit"
        className="flex justify-center items-center gap-2 px-6 py-2 w-full bg-black text-white font-medium border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:outline-none"
      >
        <Link href={`/login/google`}>
          <FaGoogle size={20} className="text-white" />  {/* Using the Google icon here */}
          Continue with Google
        </Link>
      </Button>
  )
}
