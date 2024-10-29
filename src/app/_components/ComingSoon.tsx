import { Facebook, Instagram, MessageCircle, Send } from "lucide-react"
import Link from "next/link"

export default function ComingSoon() {
  return (
    <div className=" h-screen flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-black to-black text-white p-4 sm:p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8 ">
          <img
            src="/thumbnail.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-6xl text-gray-300 font-bold  mb-4">
          Website Coming Soon
        </h1>
        <p className="text-lg sm:text-xl  mb-8">
          We&apos;re working hard to bring you an innovative learning platform. Stay tuned for our grand opening!
        </p>
        
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-300  mb-4">Exciting Features Coming Your Way:</h2>
          <ul className="text-left text-sm sm:text-lg  space-y-2 mx-auto max-w-2xl">
            <li>• Various types of tests: Model, Past Sets, Subject-wise, Chapter-wise, and more</li>
            <li>• Personalized dashboard with AI-powered analysis</li>
            <li>• Smart chapter recommendations based on your performance</li>
            <li>• Detailed progress reports to track your improvement</li>
            <li>• Adaptive learning paths tailored to your needs</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-white mb-4">Follow us for updates:</p>
          <div className="flex justify-center space-x-6">
            <Link href="https://www.instagram.com/edulocus/" className="text-gray-300 hover:text-pink-500 transition-colors">
              <Instagram className="w-8 h-8" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61567770503553" className="text-gray-300 hover:text-blue-600 transition-colors">
              <Facebook className="w-8 h-8" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://invite.viber.com/?g2=AQAR1VddClIhRlOy6Xmu3fiA8qWKNPCerYr1fVwVAJPdGlU1%2BgbgtWFTitvm5c1E" className="text-gray-300 hover:text-purple-600 transition-colors">
              <MessageCircle className="w-8 h-8" />
              <span className="sr-only">Viber</span>
            </Link>
            <Link href="https://t.me/edulocus_tg" className="text-gray-300 hover:text-blue-500 transition-colors">
              <Send className="w-8 h-8" />
              <span className="sr-only">Telegram</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}