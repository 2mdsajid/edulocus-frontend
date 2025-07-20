import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Send, Facebook, Star, ArrowRight } from "lucide-react";

type Props = {
  isSubscribed?:boolean
}
const JoinCommunityComponent = (props:Props) => (
  <Card className="mx-auto my-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white p-8 shadow-2xl mt-10 border-t-8 border-purple-500">
    <CardContent className="p-0">
      {/* --- Community Section --- */}
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left sm:gap-8">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <Send className="h-8 w-8" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
            Join Edulocus Community
          </h3>
          <p className="text-base text-gray-600 font-medium">
            Fresh features. 24×7 mentorship and Many more.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-col">
          <Button asChild className="bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-200 text-base">
            <Link href="https://t.me/edulocus_tg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              <span>Telegram</span>
            </Link>
          </Button>
          <Button asChild className="bg-[#1877F2] hover:bg-[#166bda] text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-200 text-base">
            <Link href="https://www.facebook.com/groups/1196549385578355/?ref=share&mibextid=NSMWBT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </Link>
          </Button>
        </div>
      </div>

     {(!props.isSubscribed) && <div>
        <div className="my-8 border-t border-gray-200"></div>
        {/* --- Premium Upsell Section --- */}
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left sm:gap-8">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-500">
              <Star className="h-8 w-8" />
            </div>
          </div>
          {/* Text & Features */}
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-800">
              Ready to Go A Step Ahead?
            </h4>
            <p className="text-base text-gray-600 mt-1">
              Unlock all tests, remove question limits, access advanced AI features, and more.
            </p>
          </div>
          {/* Action Button */}
          <div className="w-full sm:w-auto">
              <Button asChild className="group w-full bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-200 text-base">
                <Link href="/membership" className="flex items-center gap-2">
                  <span>Explore Membership</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
          </div>
        </div>
      </div>}


    </CardContent>
  </Card>
);

export default JoinCommunityComponent;