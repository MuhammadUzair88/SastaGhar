import React from "react";

const QuoteRequest = () => {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/Group 982.png')" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-4 md:px-8 py-8 md:py-16 ">
        {/* Left Content */}
        <div className="text-white md:w-1/2 space-y-2">
          <h2 className="text-lg md:text-3xl font-semibold">
            An easy way to send <br className="hidden md:block" /> requests to
            all suppliers
          </h2>
          <p className="italic text-sm md:text-base text-white/80 hidden md:block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
          {/* Mobile CTA button */}
          <button className="md:hidden mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
            Send inquiry
          </button>
        </div>

        {/* Right Form - Desktop Only */}
        <div className="hidden md:block bg-white text-black rounded-lg shadow-md p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            Send quote to suppliers
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="What item you need?"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
            />
            <textarea
              placeholder="Type more details"
              className="w-full border border-gray-300 rounded px-4 py-2 text-sm h-24"
            ></textarea>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Quantity"
                className="w-1/2 border border-gray-300 rounded px-4 py-2 text-sm"
              />
              <select className="w-1/2 border border-gray-300 rounded px-4 py-2 text-sm">
                <option>Pcs</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
            >
              Send inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
