import HeroHeader from "../components/HeroHeader";
import SignatureDishes from "../components/SignatureDishes";
import AboutSection from "../components/AboutSection";
import ReservationCTA from "../components/ReservationCTA";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div>
            <HeroHeader />
            <SignatureDishes />
            <AboutSection />
            <ReservationCTA />
            <Footer />
        </div>
    );
}