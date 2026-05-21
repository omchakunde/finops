"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { defaultWebinars } from "@/lib/defaultHomepageContent";

export default function Webinars() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [webinars, setWebinars] = useState(defaultWebinars);

  useEffect(() => {
    let isMounted = true;

    const fetchWebinars = async () => {
      try {
        const res = await fetch("/api/webinars", {
          cache: "no-store",
        });

        const data = await res.json();

        if (
          isMounted &&
          data.success &&
          Array.isArray(data.webinars) &&
          data.webinars.length > 0
        ) {
          setWebinars(data.webinars);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWebinars();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReserve = async (title: string) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("⚠️ Please login first");
      return;
    }

    const name = prompt("Enter your name");
    const email = prompt("Enter your email");

    if (!name || !email) return;

    try {
      const enablePayment =
        String(process.env.NEXT_PUBLIC_ENABLE_PAYMENT || "false") === "true";

      // 🚀 WITHOUT PAYMENT
      if (!enablePayment) {
        const res = await fetch("/api/webinar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            webinarTitle: title,
            date: new Date().toISOString(),
          }),
        });

        const data = await res.json();

        if (data.success) {
          alert("✅ Seat Reserved Successfully!");
        } else {
          alert("❌ Booking failed");
        }

        return;
      }

      // 💳 PAYMENT FLOW
      const paymentRes = await fetch("/api/payment", { method: "POST" });
      const order = await paymentRes.json();

      if (!(window as any).Razorpay) {
        alert("Payment system not loaded");
        return;
      }

      const razorpayKey = String(process.env.NEXT_PUBLIC_RAZORPAY_KEY || "");

      if (!razorpayKey) {
        alert("Payment key missing");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "FinOps Training",
        order_id: order.id,

        handler: async function () {
          const res = await fetch("/api/webinar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              webinarTitle: title,
              date: new Date().toISOString(),
            }),
          });

          const data = await res.json();

          if (data.success) {
            alert("✅ Payment + Seat Reserved Successfully!");
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollTo =
        direction === "left"
          ? scrollRef.current.scrollLeft - 400
          : scrollRef.current.scrollLeft + 400;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[#050212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3">
              Upcoming Webinars
            </h2>
            <p className="text-gray-400 text-sm">
              Learn live with industry experts
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => scroll("left")} className="p-3 bg-white/10 rounded-xl">
              <ChevronLeft />
            </button>
            <button onClick={() => scroll("right")} className="p-3 bg-white/10 rounded-xl">
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4">
          {webinars.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="min-w-[350px] p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={item.img || `https://i.pravatar.cc/150?u=${item.name}`}
                  className="w-14 h-14 rounded-xl object-cover"
                  alt={item.name}
                />
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-blue-400 text-xs">{item.role}</p>
                </div>
              </div>

              <h3 className="text-white text-xl font-bold mb-4">
                {item.title}
              </h3>

              <div className="text-gray-400 text-sm mb-6">
                <p className="flex items-center gap-2">
                  <Calendar size={16} /> {item.date}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} /> {item.time}
                </p>
              </div>

              <button
                onClick={() => handleReserve(item.title)}
                className="w-full py-3 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition"
              >
                Reserve My Seat
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
