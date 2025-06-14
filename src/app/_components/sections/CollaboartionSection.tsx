const CollaboartionSection = () => {
    return (
        <section className="bg-color1 pb-32 pt-8 px-4 md:px-10 lg:px-20 xl:px-32">
                <h2 className='text-4xl mb-4 text-center font-extrabold tracking-wider text-gray-700 font-pt-serif'>
                    Collaborative Partners
                </h2>
                <div className="flex flex-col justify-center items-center mt-8">
                    <img
                        src="/hleduroom_cover.jpg"
                        alt="HLEduRoom Cover"
                        className="w-full sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-1/4 h-auto rounded-lg shadow-lg"
                    />
                    <a href="/c/hleduroom" className="mt-4 text-blue-600 hover:text-blue-800">
                        HL Eduroom
                    </a>
                </div>
        </section>
    )
}

export default CollaboartionSection