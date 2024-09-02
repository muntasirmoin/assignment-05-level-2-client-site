import React from "react";
import { Link } from "react-router-dom";

const BrandingSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0f3e2a] text-white">
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/yqF4twB/pexels-photo-372810.jpg" // Replace with your background image URL
          alt="Car Wash Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Sparkle & Shine <br className="hidden md:block" />
          <span className="text-[#8B0000] mt-2">Wheels Wash</span>
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Experience the ultimate clean with our premium car wash services.{" "}
          <br />
          Our expert team ensures your car looks as good as new!
        </p>
        <div className="flex justify-center">
          <Link
            to="/services"
            className="bg-[#8B0000] text-white hover:bg-[#d91b1b] px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Discover Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandingSection;
