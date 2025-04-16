import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BiLogoTelegram, BiSolidLogInCircle } from "react-icons/bi";
import StreamSelectButton from "./_components/StreamSelectButton";
type Props = {}

const page = (props: Props) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-color1 to-color1 bg-blur-lg grid place-items-center">
            <div className=" grid grid-cols-2 md:grid-cols-2 justify-center gap-8 px-4">
                <StreamSelectButton stream="ug" />
                <StreamSelectButton stream="pg" />
            </div>
        </div>
    )
}

export default page;