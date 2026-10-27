import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { FAQ_ITEMS } from "../data/faq";

export default function FAQSection() {
  const faqItems = FAQ_ITEMS;
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section
      id="faq"
      aria-label="Pertanyaan yang sering diajukan"
      className="relative py-24 md:py-32"
    >
      <div className="section-wrap">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              index="11"
              eyebrow="Tanya Jawab"
              title={
                <>
                  Hal yang Paling Sering <span className="text-accent">Ditanyakan</span>.
                </>
              }
              description="Masih ada yang belum terjawab di sini? Langsung lempar pertanyaan di chat WhatsApp saja, santai."
            />
          </div>

          <div className="divide-y divide-line border-y border-line">
            {faqItems.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <Reveal key={item.id} delay={i * 0.05}>
                  <div>
                    <button
                      type="button"
                      id={`faq-btn-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent md:py-7"
                    >
                      <span className="font-display text-base font-semibold tracking-tight sm:text-lg md:text-xl">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-accent bg-accent text-[#04140c]"
                            : "border-line text-mist"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${item.id}`}
                          role="region"
                          aria-labelledby={`faq-btn-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 pr-4 text-sm leading-relaxed text-mist sm:pr-12 md:text-base">
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
      </div>
    </section>
  );
}
