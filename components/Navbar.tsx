"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";

/* =========================
   DATA (UNCHANGED)
========================= */

const courseData: Record<string, string[]> = {
  "All Courses": [
    "PL-300T00: Microsoft Power BI Data Analyst",
    "AZ-104T00-A: Microsoft Azure Administrator",
    "AI-102T00: Designing Azure AI Solution",
    "AZ-305T00: Azure Architect",
    "AZ-400T00: DevOps Solutions",
    "SC-200T00: Security Operations",
    "SC-300T00: Identity Access Admin",
    "AZ-500T00: Azure Security",
    "DP-600T00: Fabric Analytics Engineer",
    "DW-101 Copilot Deployment",
    "AWS Certified Cloud Practitioner",
    "AWS Solutions Architect",
    "AWS DevOps Engineer",
    "CCNA v2.1",
    "CISSP Security Professional",
    "ITIL 4 Foundation",
  ],
  Microsoft: [
    "AZ-104 Azure Admin",
    "AZ-305 Architect",
    "AZ-400 DevOps",
    "AZ-500 Security",
    "SC-200 Security Ops",
    "SC-300 Identity",
    "PL-300 Power BI",
  ],
  AWS: [
    "AWS Cloud Practitioner",
    "AWS Solutions Architect",
    "AWS DevOps Engineer",
    "AWS Security Specialty",
  ],
  Cisco: ["CCNA", "CCNP", "Cisco Security", "Cisco Data Center"],
  VMware: ["vSphere Install Configure", "VMware NSX"],
  Oracle: ["Oracle DBA", "Oracle Cloud"],
  CompTIA: ["Security+", "Network+"],
  PECB: ["ISO 27001 Lead Auditor", "ISO 22301"],
  ISC2: ["CISSP", "CCSP"],
};

const categories = Object.keys(courseData);

/* =========================
   ABOUT MENU DATA
========================= */

const aboutItems = [
  "About Us",
  "Internship Programs"
];

/* =========================
   LEARNING MENU DATA
========================= */

const learningItems = [
  "Live Online Training",
  "Classroom Training",
  "1-on-1 Training",
  "Fly-Me-a-Trainer",
  "Flexi",
  "Customized Training",
  "Webinar as a Service",
  "Qubits",
  "Upcoming Webinars",
  "Learnova",
  "Finops",
];

const adminNavItems = [
  { label: "Courses", href: "/admin-page#courses" },
  { label: "Enrolled Students", href: "/admin-page#enrolled-students" },
  { label: "Partners", href: "/admin-page#partners" },
  { label: "Trusted Companies", href: "/admin-page#trusted-companies" },
  { label: "Testimonials", href: "/admin-page#testimonials" },
  { label: "Webinars", href: "/admin-page#webinars" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [user, setUser] = useState<any>(null);

  const pathname = usePathname();
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* AUTHENTICATION LOGIC - IMPROVED FOR INSTANT UPDATES */
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Initial check
    checkUser();

    // Listen for storage changes (handles login event from other tabs/redirects)
    window.addEventListener("storage", checkUser);
    
    // Listen for window focus (ensures state is fresh when user returns to tab)
    window.addEventListener("focus", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("focus", checkUser);
    };
  }, [pathname]); // Also re-check when URL path changes

  const handleLogout = async () => {
    const storedUser = localStorage.getItem("user");
    const sessionToken = localStorage.getItem("sessionToken");
    const deviceId = localStorage.getItem("deviceId");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: parsedUser._id,
            sessionToken,
            deviceId,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }

    localStorage.removeItem("user");
    localStorage.removeItem("sessionToken");
    setUser(null);
    window.location.reload(); 
  };

  /* CLOSE DROPDOWNS ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
      if (learningRef.current && !learningRef.current.contains(e.target)) {
        setLearningOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔥 SLUG GENERATOR */
  const generateSlug = (course: string) => {
    const name = course.toLowerCase();

    if (name.includes("pl-300")) return "pl-300";
    if (name.includes("az-104")) return "az-104";
    if (name.includes("ai-102")) return "ai-102";
    if (name.includes("az-305")) return "az-305";
    if (name.includes("az-400")) return "az-400";
    if (name.includes("az-500")) return "az-500";
    if (name.includes("sc-200")) return "sc-200";
    if (name.includes("sc-300")) return "sc-300";
    if (name.includes("dp-600")) return "dp-600";
    if (name.includes("dw-101")) return "dw-101";
    if (name.includes("itil")) return "itil-4";
    if (name.includes("ccnp")) return "ccnp";
    if (name.includes("data center")) return "cisco-data-center";

    if (name.includes("aws certified cloud practitioner"))
      return "aws-cloud-practitioner";

    if (name.includes("cloud practitioner")) return "aws-cloud-practitioner";
    if (name.includes("security specialty")) return "aws-security-specialty";
    if (name.includes("cisco")) return "cisco-security";
    if (name.includes("vsphere")) return "vsphere-install-configure-manage";
    if (name.includes("nsx")) return "vmware-nsx";
    if (name.includes("oracle dba")) return "oracle-dba";
    if (name.includes("oracle cloud")) return "oracle-cloud";
    if (name.includes("security+")) return "security-plus";
    if (name.includes("network+")) return "network-plus";
    if (name.includes("27001")) return "iso-27001-lead-auditor";
    if (name.includes("22301")) return "iso-22301";
    if (name.includes("ccsp")) return "ccsp";

    if (name.includes("aws solutions architect"))
      return "aws-solutions-architect";

    if (name.includes("aws devops engineer"))
      return "aws-devops-engineer";

    if (name.includes("ccna")) return "ccna";
    if (name.includes("cissp")) return "cissp";

    return "course";
  };

  if (pathname.startsWith("/admin-page")) {
    return null;
  }

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300
      ${
        scrolled
          ? "py-2 bg-black/90 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          : "py-4 bg-gradient-to-r from-black via-zinc-900 to-black"
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
       {/* LOGO */}
<Link
  href={
    user?.role === "admin"
      ? "/admin-page"
      : "/"
  }
  className="text-xl font-bold tracking-wide 
  bg-gradient-to-r from-blue-400 to-cyan-400 
  bg-clip-text text-transparent"
>
  FinOps Trainings
</Link>



        {user?.role === "admin" && (
          <div className="hidden md:flex items-center gap-5 text-sm font-semibold">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* MENU */}
        <div className={user?.role === "admin" ? "hidden" : "hidden md:flex items-center gap-8 text-base font-medium"}>

          {/* ✅ ALL COURSES MEGA MENU */}
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              All Courses <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute left-[-150px] top-12 w-[1000px] rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-2xl flex overflow-hidden">
                {/* LEFT SIDEBAR */}
                <div className="w-1/4 border-r border-white/10 p-4 space-y-2 bg-white/5">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      onMouseEnter={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg cursor-pointer transition-all
                      ${
                        activeCategory === cat
                          ? "bg-blue-500/30 text-white shadow-lg"
                          : "text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-3/4 p-6 bg-black/40">
                  <div className="grid grid-cols-3 gap-4">
                    {courseData[activeCategory].map((course, i) => (
                      <Link
                        key={i}
                        href={`/courses/${generateSlug(course)}`}
                        onClick={() => setOpen(false)}
                      >
                        <div
                          className="p-3 rounded-lg text-sm text-gray-300 cursor-pointer
                          bg-white/5 border border-white/5
                          hover:bg-blue-500/20 hover:text-white transition-all hover:scale-[1.02]"
                        >
                          {course}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="flex justify-center mt-8">
                    <button className="px-10 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition shadow-lg shadow-blue-500/20">
                      Show All Courses
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ABOUT DROPDOWN */}
          <div
            className="relative"
            ref={aboutRef}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setAboutOpen(true);
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setAboutOpen(false);
              }, 200);
            }}
          >
            <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              About <ChevronDown size={18} />
            </button>
            <div className="absolute top-full left-0 h-3 w-full"></div>
            {aboutOpen && (
              <div className="absolute top-full left-0 mt-2 w-[240px] rounded-2xl border border-white/10 bg-zinc-900 p-3 shadow-2xl backdrop-blur-xl">
                {aboutItems.map((item, i) => {
                  let href = item === "Internship Programs" ? "/internship-program" : "/about";
                  return (
                    <Link key={i} href={href}>
                      <div
                        className="px-4 py-2 rounded-lg text-gray-300 cursor-pointer
                        hover:bg-blue-500/20 hover:text-white transition"
                        onClick={() => setAboutOpen(false)}
                      >
                        {item}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* LEARNING DROPDOWN */}
          <div className="relative" ref={learningRef}>
            <button
              onClick={() => setLearningOpen(!learningOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              Learning <ChevronDown size={18} />
            </button>

            {learningOpen && (
              <div className="absolute top-12 left-0 w-[260px] rounded-xl border border-white/10 bg-zinc-900 p-2 shadow-2xl">
                {learningItems.map((item, i) => {
                  let href = "/learning/" + item.toLowerCase().replace(/ /g, "-").replace("1-on-1", "one-on-one");
                  return (
                    <Link key={i} href={href}>
                      <div
                        className="px-4 py-2 text-gray-300 hover:bg-blue-500/20 hover:text-white cursor-pointer transition rounded-lg"
                        onClick={() => setLearningOpen(false)}
                      >
                        {item}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>


          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* RIGHT SECTION: SEARCH & AUTH */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-48 transition-all focus:w-64"
            />
          </div>

         {user ? (
  <div className="flex items-center gap-3">

    {/* CHAT BUTTON */}
    <Link href={user.role === "admin" ? "/admin-page/chats" : "/student/chats"}>

      <button
        title="Chat Groups"
        className="relative w-12 h-12 rounded-2xl 
        bg-white/5 border border-white/10 
        hover:border-cyan-500 transition 
        flex items-center justify-center text-transparent"
      >

        <span className="text-xl">💬</span>

        <MessageCircle size={21} className="text-cyan-300 absolute" />

        {/* ONLINE DOT */}
        <div
          className="absolute top-2 right-2 
          w-2.5 h-2.5 rounded-full 
          bg-green-500 border border-black"
        />

      </button>

    </Link>

    {/* USER */}
    <div
      className="px-4 py-2 rounded-full 
      bg-white/5 border border-white/10 
      text-white flex items-center gap-2"
    >

      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

      👋 {user.name || user.email.split("@")[0]}

    </div>

    {/* LOGOUT */}
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-full 
      bg-red-500/20 text-red-400 
      border border-red-500/50 
      hover:bg-red-500 hover:text-white 
      transition-all text-sm font-medium"
    >
      Logout
    </button>

  </div>
) : (
            <Link
              href="/login"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-all shadow-lg shadow-blue-500/25"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden text-white">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 hover:bg-white/10 rounded-lg transition">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU CONTENT */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-t border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          {user?.role === "admin" ? (
            adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-300 text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))
          ) : (
            <>
              <Link href="/all-courses" className="block text-gray-300 text-lg">All Courses</Link>
              <Link href="/about" className="block text-gray-300 text-lg">About</Link>
              <Link href="/contact" className="block text-gray-300 text-lg">Contact</Link>
            </>
          )}
          
          <div className="pt-4 border-t border-white/10">
            {user ? (
               <div className="space-y-4">
                  <Link
                    href={user.role === "admin" ? "/admin-page/chats" : "/student/chats"}
                    className="block w-full py-3 bg-white/10 text-white text-center rounded-xl font-bold"
                    onClick={() => setMobileOpen(false)}
                  >
                    Chat Groups
                  </Link>
                  <div className="text-white font-medium">👋 {user.name || user.email}</div>
                  <button onClick={handleLogout} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold">Logout</button>
               </div>
            ) : (
              <Link href="/login" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center rounded-xl font-bold">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
