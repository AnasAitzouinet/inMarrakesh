"use client";

 import { Blog } from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Question } from "@/components/sections/Questions";
import { Tours } from "@/components/sections/Tours";
import { Trending } from "@/components/sections/Trending";

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute top-0 z-[-2] size-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(255,224,178,.5)_100%)]"></div>

      <Hero />
      <Partners />

      <Tours />
      <Trending />
      {/* <WhyUs /> */}

      <Blog />

      <div className="w-full mx-auto flex flex-col justify-center items-center my-40">
        <h1 className="text-5xl font-bold py-8">
          Frequently Asked
          <span className="text-orange-500"> Question</span>
        </h1>
        <Question />
      </div>
      <Footer />
    </main>
  );
}
