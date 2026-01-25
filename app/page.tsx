import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Product from "@/components/Product";
import Transparency from "@/components/Transparency";
import Partners from "@/components/Partners";
import Impact from "@/components/Impact";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Product />
      <Transparency />
      <Partners />
      <Impact />
      <Roadmap />
      <Footer />
    </main>
  );
}