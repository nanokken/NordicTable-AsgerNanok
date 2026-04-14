
import PageHeader from "../components/PageHeader";
import BookingSection from "../components/BookingSection";
import Footer from "../components/Footer";

export default function Booking() {
  return (
    <>
      <PageHeader
        subtitle="Reservationer"
        title="Book dit bord"
        description="Vi glæder os til at modtage dig. Book dit bord nedenfor, og vi sørger for resten."
      />
      <BookingSection />
      <Footer />
    </>
  );
}