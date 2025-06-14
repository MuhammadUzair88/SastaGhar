import React from "react";

const NewsletterSection = () => {
  return (
    <div className="w-full py-8 px-4 md:px-10 flex flex-col items-center text-center ">
      <h2 className="text-zinc-900 text-xl font-semibold leading-7 mb-2">
        Subscribe on our newsletter
      </h2>
      <p className="text-zinc-600 text-base font-normal leading-normal max-w-xl mb-6">
        Get daily news on upcoming offers from many suppliers all over the world
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Email Input */}
        <div className="relative w-full sm:w-72 h-10">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-full pl-10 pr-4 bg-white border border-zinc-200 rounded-md text-base text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {/* Icon */}
          <div className="absolute left-2 top-2.5 w-5 h-5">
            <div className="w-5 h-3.5 bg-gray-400 absolute top-[3.67px] left-[1.83px]" />
          </div>
        </div>

        {/* Subscribe Button */}
        <button className="h-10 px-4 bg-blue-600 rounded-md text-white text-base font-medium">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSection;
