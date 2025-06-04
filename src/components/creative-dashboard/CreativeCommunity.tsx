const CreativeCommunity = () => {
    return (
      <section className="flex flex-col gap-6 my-6 font-raleway px-4 sm:px-6 md:px-12">
        {/* Motivation Banner */}
        <div className="flex flex-col justify-center items-center text-center bg-linear-gradient w-full h-auto py-6 px-2 rounded-md">
          <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
            Didn’t get the job? It’s not you, it’s them. Don’t feel down.
          </h2>
          <h2 className="text-xs sm:text-sm mt-1">
            You will get the next one, hang in there...
          </h2>
        </div>
  
        {/* Community Section */}
        <div className="max-w-7xl mx-auto py-5 text-primary flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center lg:text-left">
            You are not alone, Interact with other Creatives
          </h2>
  
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6">
            {/* Discord */}
            <div className="flex flex-col items-center gap-3 text-center w-full">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                Discord community
              </h2>
              <button
                type="button"
                className="py-3 px-6 w-full sm:w-64 bg-primary text-white rounded-md"
              >
                Join Here
              </button>
            </div>
  
            {/* Telegram */}
            <div className="flex flex-col items-center gap-3 text-center w-full">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                Telegram community
              </h2>
              <button
                type="button"
                className="py-3 px-6 w-full sm:w-64 bg-primary text-white rounded-md"
              >
                Join Here
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default CreativeCommunity
  