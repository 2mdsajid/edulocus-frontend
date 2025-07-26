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
    try {
        return (
            <div className="min-h-screen pt-32 flex flex-col gap-10 items-center bg-gradient-to-b from-color1 to-color1 bg-blur-lg ">
                <h1 className="text-4xl font-bold"> What are you preparing for ? </h1>
                <div className=" grid grid-cols-1 md:grid-cols-2 justify-center gap-8 px-4">
                    <StreamSelectButton stream="UG" ru={props.searchParams.ru} />
                    <StreamSelectButton stream="PG" ru={props.searchParams.ru} />
                </div>
            </div>
        )
    } catch (error) {
        console.error("An error occurred in page:", error);
        return (
            <div>
                <h1>Error</h1>
                <p>An error occurred while rendering this page.</p>
            </div>
        );
    }
}

export default page;