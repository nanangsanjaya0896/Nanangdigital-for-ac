import SectionHeader from "./SectionHeader";
import ProjectShowcase from "./ProjectShowcase";
import { PROJECTS } from "../data/projects";

export default function WorksSection() {
  return (
    <section
      id="karya"
      aria-label="Contoh website buatan NanangDigital"
      className="relative border-y border-line bg-ink-soft py-24 md:py-32"
    >
      <div className="section-wrap">
        <SectionHeader
          index="04"
          eyebrow="Contoh Website"
          title={
            <>
              Lihat Langsung <span className="text-accent">Website Servis AC</span> Buatan Saya.
            </>
          }
          description="Bukan sekadar gambar mockup. Ini website lengkap yang sudah online dan bisa Anda buka sendiri, mulai dari daftar paket, form booking, sampai tombol WhatsApp."
        />

        <div className="mt-14 space-y-24 md:mt-16 md:space-y-32">
          {PROJECTS.map((project, i) => (
            <ProjectShowcase key={project.id} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
