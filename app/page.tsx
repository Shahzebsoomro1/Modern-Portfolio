import Hero from "@/app/components/Hero";
import Work from "@/app/components/Work";
import Companies from "@/app/components/Companies";
import About from "./components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work limit={3} showMore />
      <Companies />
    </>
  );
}