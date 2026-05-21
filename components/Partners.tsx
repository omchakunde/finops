"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import { defaultPartners } from "@/lib/defaultHomepageContent";

type Partner = {
  _id?: string;
  name: string;
  logo: string;
};

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>(() => [
    ...defaultPartners,
  ]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners", {
          cache: "no-store",
        });

        const data = await res.json();

        if (isMounted && data.success && Array.isArray(data.partners)) {
          setPartners(data.partners);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 28,
        ease: "linear",
      },
    });
  }, [controls]);

  useEffect(() => {
    if (!selectedPartner) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPartner(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPartner]);

  const startMarquee = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 28,
        ease: "linear",
      },
    });
  };

  const displayPartners = partners.length > 0 ? [...partners, ...partners] : [];

  return (
    <section className="relative py-20 overflow-hidden bg-[#050212]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_45%)]" />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.45em] uppercase text-gray-400">
            Trusted By Industry Giants
          </p>

          <div className="mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#050212] to-transparent pointer-events-none" />

          <div className="absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#050212] to-transparent pointer-events-none" />

          <motion.div
            animate={controls}
            onHoverStart={() => controls.stop()}
            onHoverEnd={startMarquee}
            className="flex w-max items-center gap-8"
          >
            {displayPartners.length > 0 ? (
              displayPartners.map((partner, i) => (
                <button
                  type="button"
                  key={`${partner.name}-${i}`}
                  onClick={() => setSelectedPartner(partner)}
                  className="
                    group
                    relative
                    flex
                    items-center
                    justify-center
                    min-w-[240px]
                    h-[140px]
                    rounded-[30px]
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    overflow-hidden
                    transition-all
                    duration-500
                    hover:border-cyan-400/50
                    hover:bg-white/[0.06]
                    hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-400/70
                    cursor-pointer
                  "
                  title={`View ${partner.name}`}
                  aria-label={`View ${partner.name} logo`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_70%)]" />

                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="
                      relative
                      z-10
                      max-h-[90px]
                      max-w-[170px]
                      object-contain
                      transition-all
                      duration-500
                      group-hover:scale-125
                    "
                    loading="lazy"
                  />
                </button>
              ))
            ) : (
              <p className="w-full text-center text-sm text-gray-500">
                Partner logos will appear here once added by admin.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {selectedPartner && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/80
            backdrop-blur-xl
            px-4
          "
          onClick={() => setSelectedPartner(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPartner.name} logo preview`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="
              relative
              w-full
              max-w-4xl
              min-h-[420px]
              rounded-[28px]
              border
              border-cyan-400/20
              bg-[#08051a]/95
              shadow-[0_0_80px_rgba(34,211,238,0.18)]
              overflow-hidden
              flex
              flex-col
              items-center
              justify-center
              p-8
              sm:p-12
            "
          >
            <button
              type="button"
              onClick={() => setSelectedPartner(null)}
              className="
                absolute
                right-5
                top-5
                h-11
                w-11
                rounded-full
                border
                border-white/10
                bg-white/10
                text-white
                text-2xl
                leading-none
                flex
                items-center
                justify-center
                transition
                hover:bg-cyan-400/20
                hover:border-cyan-300/50
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
              "
              aria-label="Close logo preview"
            >
              ×
            </button>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),transparent_58%)]" />

            <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
              <div
                className="
                  w-full
                  max-w-3xl
                  min-h-[260px]
                  sm:min-h-[340px]
                  rounded-[24px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  flex
                  items-center
                  justify-center
                  p-8
                  sm:p-12
                "
              >
                <img
                  src={selectedPartner.logo}
                  alt={selectedPartner.name}
                  className="
                    max-h-[220px]
                    sm:max-h-[300px]
                    max-w-full
                    object-contain
                    drop-shadow-[0_0_28px_rgba(255,255,255,0.12)]
                  "
                />
              </div>

              <h3 className="text-center text-xl sm:text-2xl font-semibold text-white">
                {selectedPartner.name}
              </h3>
            </div>
          </motion.div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-32 bg-cyan-500/[0.03] blur-3xl" />

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </section>
  );
}