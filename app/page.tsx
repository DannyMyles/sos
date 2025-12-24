// app/page.tsx

import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import Navigation from "@/components/ui/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Footer />
    </>
  )
}