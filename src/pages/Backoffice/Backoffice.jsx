
import { useState } from "react";
import BackofficeNav from "./BackofficeNav";
import Dishes from "./Dishes";
import Bookings from "./Bookings";
import PageHeader from "../../components/PageHeader";

export default function Backoffice() {
  const [activeTab, setActiveTab] = useState("dishes");

  return (
    <>
      <BackofficeNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <PageHeader subtitle="Backoffice" title={activeTab === "dishes" ? "Retter" : "Reservationer"} />
      <section className="bg-background min-h-screen py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          {activeTab === "dishes" ? <Dishes /> : <Bookings />}
        </div>
      </section>
    </>
  );
}