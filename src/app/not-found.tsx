import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react"; // Import an icon
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {/* Icon */}
      <AlertTriangle className="w-32 h-32 text-red-500 mb-6" />

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        404 - Page Not Found
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Link href="/home">
          <Button variant="default" className="bg-gray-600 hover:bg-gray-700 text-white">
            Go to Home
          </Button>
        </Link>
        <Link href="/tests">
          <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-50">
            Go to Tests
          </Button>
        </Link>
      </div>
    </div>
  );
}