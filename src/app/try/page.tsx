import StreamSelectButton from "./_components/StreamSelectButton";
type Props = {
    searchParams:{
        ru:string
    }
}

export const metadata = {
  title: "Edulocus | Choose Stream",
  description: "Select your preferred stream (UG/PG) to start your journey with Edulocus"
}


const page = (props: Props) => {
    console.log(props.searchParams.ru)
    return (
        <div className="min-h-screen pt-32 flex flex-col gap-10 items-center bg-gradient-to-b from-color1 to-color1 bg-blur-lg ">
            <h1 className="text-4xl font-bold"> Choose Your Stream </h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 justify-center gap-8 px-4">
                <StreamSelectButton stream="ug" ru={props.searchParams.ru} />
                <StreamSelectButton stream="pg" ru={props.searchParams.ru} />
            </div>
        </div>
    )
}

export default page;