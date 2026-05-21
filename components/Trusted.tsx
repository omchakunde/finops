"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { defaultTrustedCompanies } from "@/lib/defaultHomepageContent";

export default function TrustedGiants() {
  const [companies, setCompanies] = useState(defaultTrustedCompanies);

  useEffect(() => {
    let isMounted = true;

    const fetchTrustedCompanies = async () => {
      try {
        const res = await fetch("/api/trusted-companies", {
          cache: "no-store",
        });

        const data = await res.json();

        if (
          isMounted &&
          data.success &&
          Array.isArray(data.trustedCompanies)
        ) {
          setCompanies(data.trustedCompanies);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrustedCompanies();

    return () => {
      isMounted = false;
    };
  }, []);

  const duplicatedCompanies =
    companies.length > 0
      ? [...companies, ...companies, ...companies]
      : [];

  return (
    <section className="py-20 relative bg-[#050212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.42em] text-gray-500 opacity-90">
            Trusted By Industry Giants
          </h2>

          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        </div>

        <div className="relative logo-mask overflow-hidden rounded-[28px] border border-white/5 bg-white/[0.015] py-6">
          <motion.div
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 36,
                ease: "linear",
              },
            }}
            className="flex w-max items-center gap-5 md:gap-6 px-6"
          >
            {duplicatedCompanies.length > 0 ? (
              duplicatedCompanies.map((company, i) => (
                <div
                  key={`${company.name}-${i}`}
                  className="logo-tile group"
                  title={company.name}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="premium-logo-image"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <p className="w-full text-center text-sm text-gray-500">
                Trusted company logos will appear here once added by admin.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-1/2 h-28 -translate-y-1/2 bg-blue-500/[0.025] blur-3xl" />
    </section>
  );
}