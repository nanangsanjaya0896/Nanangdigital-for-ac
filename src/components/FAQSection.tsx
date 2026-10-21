import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { FAQ_ITEMS } from "../data/faq";
import { waUrl } from "../data/business";

/**
 * FAQ interaktif: beberapa jawaban boleh terbuka bersamaan,
 * penuh dukungan keyboard dan aria-expanded (FR-06).
 */
export default function FAQSection() {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set(FAQ_ITEMS[0] ? [FAQ_ITEMS[0].id] : [])
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="faq" aria-label="Pertanyaan yang sering diajukan" className="relative py-24 md:py-32">
      <div className="section-wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeader
            index="11"
            eyebrow="FAQ"
            title={
              <>
                Pertanyaan yang Sering <span className="text-accent">Ditanyakan</span>.
              </>
            }
            description="Semua ketentuan penting — pengerjaan, domain, hosting, pembayaran, dan revisi — dijawab langsung di sini."
          />

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-3xl border border-line bg-surface p-7">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                Masih ada pertanyaan lain?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Tanyakan langsung — konsultasi gratis dan tanpa komitmen. Tidak ada pertanyaan yang
                terlalu sederhana.
              </p>
              <a
                href={waUrl(
                  "Halo NanangDigital, saya sudah membaca FAQ di website dan masih ada pertanyaan tentang pembuatan website service AC."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 w-full text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Tanya via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIds.has(item.id);
            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-accent/40 bg-surface" : "border-line bg-surface/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.02] md:p-6"
                  >
                    <span className="font-mono text-xs text-accent/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-base font-semibold tracking-tight md:text-lg">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-line text-mist"
                      }`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={`faq-panel-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/5 px-5 pb-6 pl-14 pt-4 text-sm leading-relaxed text-mist md:px-6 md:pl-[4.25rem] md:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
