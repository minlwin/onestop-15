import Footer from "@/components/app/footer";
import HeroSection from "./_widget/hero-section";
import OurCourses from "./_widget/our-courses";

export default function WelcomePage() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <HeroSection />


      {/* COURSES SECTION */}
      <OurCourses />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
