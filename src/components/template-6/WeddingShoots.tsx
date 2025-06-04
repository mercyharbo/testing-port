export default function WeddingShoots() {
    return (
      <div className="bg-gray-900 text-white py-12 space-y-12">
        {[
          { title: "WEDDING SHOOTS" },
          { title: "EVENTS SHOOTS" },
          { title: "BTS SHOOTS" },
          { title: "BIRTHDAY SHOOTS" },
        ].map((section, idx) => (
          <div key={idx} className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              {/* Colored Box Instead of Image */}
              <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
                <div
                  className="w-[300px] h-[200px] rounded"
                  style={{ backgroundColor: "#D9D9D9" }}
                ></div>
              </div>
  
              {/* Text + Button */}
              <div className="md:w-1/2 md:pl-8 flex flex-col items-start">
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                <button className="bg-white text-black px-6 py-3 rounded">
                  View more Google Drive/Instagram
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  