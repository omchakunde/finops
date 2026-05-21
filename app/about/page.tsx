"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const router = useRouter(); // ✅ ADD THIS LINE
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[160px] rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full top-1/2 right-0"></div>

      {/* 🔥 HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            About <span className="text-blue-400">FinOps Trainings</span>
          </h1>

          <p className="text-gray-400 mb-6 text-lg">
           Welcome to Finops-training– your passport to the world of IT excellence! We're excited to have you join our vibrant community of learners, innovators, and tech enthusiasts.

At CloudEdufy, our journey began in 2023 with a clear mission in mind: to bridge the gap between theoretical knowledge and real-world skills. We're not just another IT training company; we're your partners in embracing the possibilities of technology and carving out a successful path in the digital landscape.
          </p>

          <p className="mb-8 text-white/80">
            We empower professionals to achieve{" "}
            <span className="text-blue-400 font-semibold">Money</span>,{" "}
            <span className="text-blue-400 font-semibold">Respect</span>,{" "}
            <span className="text-blue-400 font-semibold">Peace of Mind</span>.
          </p>

          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition shadow-lg shadow-blue-500/20">
            Download Company Profile
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-xl">
          <p className="text-center text-gray-400">
            🎬 Intro Video Placeholder
          </p>
        </div>
      </section>

      {/* 🔥 NAV TABS */}
    

<div className="max-w-5xl mx-auto px-6 mb-16">
  <div className="flex flex-wrap justify-center gap-3 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-xl">

    {[
      "Overview",
      "Our Story",
      "Leadership",
      "Our Clientele",
      "Partners",
      "Feedback",
    ].map((item) => (
      <button
        key={item}
       onClick={() => {
  if (item === "Partners") {
    router.push("/partners");
  } 
  else if (item === "Feedback") {
    router.push("/feedback"); // 🔥 ADD THIS
  } 
  else {
    setActiveTab(item);
  }
}}
        className={`px-5 py-2 rounded-full text-sm transition ${
          activeTab === item
            ? "bg-blue-500 text-white"
            : "text-gray-300 hover:bg-blue-500/20 hover:text-white"
        }`}
      >
        {item}
      </button>
    ))}

  </div>
</div>

      {/* 🔥 MAIN CONTENT (ONLY ONE CONTROLLED SECTION) */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        {/* ✅ OVERVIEW */}
        {activeTab === "Overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >

            <div className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl backdrop-blur-xl">
              🌍 World Map Placeholder
            </div>

            <div className="text-gray-400 space-y-6 text-lg">
              <p>
               In the year 2018, a passionate individual named Sachin had a vision. He aimed to empower
               aspiring IT professionals to chase their dreams. With determination burning in his heart,
                Sachin started a small job alert group. It was a cozy space where like-minded folksgathered,
                 all with the same goal.
              </p>
              <p>
                Initially, it was a simple initiative – helping job seekers find their footing in the IT world. Little did Sachin know that this tiny seed would grow into something extraordinary?
              </p>
              <p>
                Through sheer dedication and unwavering resolve, the job alert group gained momentum. It turned into a hub for both IT job seekers and recruiters. Sachin's sincerity in offering real opportunities and personal support earned him the community's trust.
              </p>
            </div>

          </motion.div>
        )}

{/* 🔥 our story */}
    {activeTab === "Our Story" && (
  <motion.div
    key="story"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-24"
  >

    {/* 🔥 HEADER */}
    <div className="text-center space-y-4">
      <h2 className="text-5xl font-bold tracking-tight">
        Our <span className="text-blue-500">Journey</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        From a small training center to a global IT powerhouse — built through
        resilience, innovation, and relentless growth.
      </p>
    </div>

    {/* 🔥 HERO STORY BLOCK */}
    <div className="grid md:grid-cols-2 gap-10 items-center">

      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="h-[260px] flex items-center justify-center text-gray-500">
          🌍 Story Visual Placeholder
        </div>
      </div>

      {/* TEXT */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
        <p className="text-gray-300 leading-relaxed">
          Today, we are a reputed global training company. But decades ago,
          we were on the verge of collapse. Our journey is a story of
          persistence, calculated risk-taking, and bold transformation.
        </p>
      </div>
    </div>

    {/* 🔥 STORY CARDS */}
    <div className="grid md:grid-cols-2 gap-8">

      {[
        {
          title: "Pursuit of Excellence",
          desc: "Striving for the best defines us. We're dedicated to delivering top-notch training, engaging lessons, and remarkable learning experiences that set us apart as leaders in IT education.",
        },
        {
          title: "Embracing Innovation",
          desc: "Innovation is our heartbeat. We're all about sparking creative thought and diving into emerging technologies. We'll keep you ahead in the swiftly changing world of IT.",
        },
        {
          title: "You Are Our Focus",
          desc: "At the core, it's all about you. Your growth matters, and our personalized attention, support, and mentorship ensure you're well-taken care of on your educational journey.",
        },
        {
          title: "Built on Integrity",
          desc: "Transparency, honesty, and respect light our path. Upholding the highest standards of conduct guides our interactions with students, instructors, and partners.",
        },
        {
          title: "Power of Collaboration",
          desc:"Teamwork and diverse perspectives are our strength. Our inclusive learning community fosters collaboration, communication, and the sharing of varied viewpoints."
        },
        {
          title:"Real-World Relevance",
          desc:"We don't just teach theory; we prepare you for real-world demands. Working closely with industry experts, we craft a curriculum that meets the pulse of the market."
        },
        {
          title:"Learning for Life",
          desc:"Lifelong learning is our motto. With an embrace of growth mindset, we encourage you to stay adaptable and open to fresh opportunities."
        },
        {
          title:"Making an Impact",
          desc:"Your positive impact matters. Your success makes us proud, and we celebrate the transformation you bring to the world."
        },
        {
          title:"Education for All",
          desc:"Everyone deserves quality education. We're all in for accessibility, offering flexible learning and supporting diversity in our educational family."
        },
        {
          title:"Bound by Passion",
          desc:"Our fire for education and technology drives us. We're here for your success, and we believe in your potential to reshape the IT industry and create a meaningful mark in your journey."
        }

      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl hover:scale-[1.02] transition"
        >
          <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 hover:opacity-100 transition"></div>

          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-400">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>

    {/* 🔥 DETAILED STORY BLOCKS (LIKE SCREENSHOT) */}
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
        <h3 className="text-blue-400 font-semibold mb-2">
          Finops Vision
        </h3>
        <p className="text-gray-400 leading-relaxed">
          We're on a mission to be the go-to in cloud tech education. Picture us as the pioneers, crafting innovative training that stays ahead of industry shifts.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
        <h3 className="text-blue-400 font-semibold mb-2">
         Connecting Globally
        </h3>
        <p className="text-gray-400 leading-relaxed">
          Our vision spans across borders. Through virtual classrooms and interactive online platforms, we're reaching IT enthusiasts worldwide, powered by diversity and inclusivity.

        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
           Complete Learning Experience
          </h3>
          <p className="text-gray-400">
           We're nurturing talent holistically with expert-led training, hands-on labs, real-world projects, and peer collaboration.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
           Changing Careers
          </h3>
          <p className="text-gray-400">
            We’re not just teaching; we’re transforming careers. Our grads become the sought-after cloud experts shaping the IT industry.
          </p>
        </div>

<div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
           Building Industry Bonds
          </h3>
          <p className="text-gray-400">
            We collaborate with industry leaders to ensure our curriculum stays aligned with the latest industry standards.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
           Societal Impact
          </h3>
          <p className="text-gray-400">
            We give back by offering IT training to underserved communities, bridging the digital divide.
          </p>
        </div>

         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
           Innovation Unleashed
          </h3>
          <p className="text-gray-400">
            We dive into research, explore emerging tech, and redefine the boundaries of IT education.
          </p>
        </div>

    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
         Alumni Network
          </h3>
          <p className="text-gray-400">
           Our graduates are global ambassadors, forming a strong, connected, and collaborative IT network.
          </p>
        </div>

  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
         A Journey Forward
          </h3>
          <p className="text-gray-400">
           We commit to excellence, student success, and industry relevance while evolving IT training’s future.
          </p>
        </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <h3 className="text-blue-400 font-semibold mb-2">
         Embrace the Future
          </h3>
          <p className="text-gray-400">
           Together, let’s reshape IT, one learner at a time. Welcome to the future of IT education with CloudEdufy.
          </p>
        </div>

      </div>
    </div>

    {/* 🔥 PREMIUM TIMELINE */}
    <div className="space-y-16">

      <h3 className="text-3xl font-semibold text-center">
        Our Growth Timeline
      </h3>

      <div className="relative border-l border-white/10 pl-10 space-y-12">

        {[
          { year: "1993", text: "Company Founded" },
          { year: "2001", text: "Survived Crisis" },
          { year: "2007", text: "Opened Global Centers" },
          { year: "2015", text: "Cloud Expansion" },
          { year: "2020", text: "Online Transformation" },
          { year: "2024", text: "5000+ Courses Worldwide" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[46px] top-2 w-5 h-5 bg-blue-500 rounded-full shadow-lg"></div>

            <h4 className="text-blue-400 font-semibold text-lg">
              {item.year}
            </h4>

            <p className="text-gray-400">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>

  </motion.div>
)}

{/* 🔥 LEADERSHIP (PREMIUM) */}
{activeTab === "Leadership" && (
  <motion.div
    key="leadership"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-16"
  >

    {/* HEADER */}
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">
        Meet Our <span className="text-blue-500">Leadership</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Industry experts driving innovation, growth, and global impact.
      </p>
    </div>

    {/* CARDS GRID */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

      {[
        { name: "Rohit Aggarwal", role: "CEO & Founder" },
        { name: "Subodh Choudhary", role: "Group Manager" },
        { name: "Sakshi Gaba Dhawan", role: "Group Manager" },
        { name: "Vardaan Aggarwal", role: "Executive Director" },
        { name: "Aditya Sharma", role: "Technical Lead" },
        { name: "Praveen Kumar", role: "Finance Manager" },
        { name: "Raahil Aggarwal", role: "AI Strategy Lead" },
        { name: "Kunal Singh", role: "Regional Manager" },
      ].map((person, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:scale-[1.03] transition"
        >

          {/* IMAGE PLACEHOLDER */}
          <div className="h-[220px] bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center text-gray-500">
            👤
          </div>

          {/* INFO */}
          <div className="p-5 text-center">
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
              {person.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {person.role}
            </p>

            {/* LINK */}
            <div className="mt-4 text-blue-400 text-sm cursor-pointer hover:underline">
              View Bio +
            </div>
          </div>

          {/* HOVER GLOW */}
          <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 blur-xl transition"></div>

        </motion.div>
      ))}

    </div>

  </motion.div>
)}
        

        {/* 🔥 CLIENTELE */}
        {activeTab === "Our Clientele" && (
          <motion.div
            key="clientele"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >

            <h2 className="text-3xl font-bold text-center mb-12">
              Our Valuable Clients
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

              {[
                "Chevron","TCS","HCLTech","Microsoft","Capgemini","NTT Data",
                "PwC","Dell","United Nations","HSBC","NHS","AB InBev",
                "Aramco","Shell","Cognizant","Infosys","Wipro","Adobe","Google","EY",
              ].map((client, i) => (
                <div
                  key={i}
                  className="group relative bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-center text-center
                  transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]
                  hover:border-blue-500/30 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                >
                  <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/10 blur-xl transition"></div>

                  <span className="relative text-sm font-medium text-gray-300 group-hover:text-white">
                    {client}
                  </span>
                </div>
              ))}

            </div>

          </motion.div>
        )}

        {/* 🔹 OTHER TABS */}
        {activeTab !== "Overview" && activeTab !== "Our Clientele" && (
          <motion.div
            key="other"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-lg"
          >
            {activeTab} content coming soon...
          </motion.div>
        )}

      </section>

      {/* 🔥 STATS */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 mb-28">

        {[
          "30+ Years",
          "30,000+ Students",
          "99.1% Success",
          "300+ Trainers",
          "5,000+ Courses",
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:shadow-blue-500/20 transition"
          >
            <p className="text-blue-400 font-semibold text-lg">{item}</p>
          </motion.div>
        ))}

      </section>


      

    </div>
  );
}