"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  BookOpen,
  Users,
  MessageCircle,
  Plus,
  LogOut,
  Briefcase,
  FileText,
  Mail,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";

const emptyLogoForm = {
  name: "",
  logo: "",
  website: "",
  displayOrder: "",
};

const emptyTestimonialForm = {
  name: "",
  role: "",
  content: "",
  rating: "5",
  displayOrder: "",
};

const emptyWebinarForm = {
  name: "",
  title: "",
  date: "",
  time: "",
  img: "",
  role: "",
  displayOrder: "",
};

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);

  // DYNAMIC COURSES
  const [courses, setCourses] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [trustedCompanies, setTrustedCompanies] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [webinars, setWebinars] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [batchAssignments, setBatchAssignments] = useState<any>({});
  const [inquiryReplies, setInquiryReplies] = useState<any>({});
  const [courseSearch, setCourseSearch] = useState("");
  const [courseSort, setCourseSort] = useState("newest");
  const [courseFilter, setCourseFilter] = useState("all");

  // CREATE MODAL
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [editingPartnerId, setEditingPartnerId] = useState("");
  const [editingTrustedCompanyId, setEditingTrustedCompanyId] = useState("");
  const [editingTestimonialId, setEditingTestimonialId] = useState("");
  const [editingWebinarId, setEditingWebinarId] = useState("");
  const [partnerForm, setPartnerForm] = useState(emptyLogoForm);
  const [trustedCompanyForm, setTrustedCompanyForm] =
    useState(emptyLogoForm);
  const [testimonialForm, setTestimonialForm] =
    useState(emptyTestimonialForm);
  const [webinarForm, setWebinarForm] = useState(emptyWebinarForm);

  // FORM DATA
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    duration: "",
    sessions: "",
    professionals: "",
    exam: "",
    price: "",
    rating: "",
    provider: "FinOps",
    enrolled: "",
    level: "Beginner",
    badge: "Published",
    image: "",
    videoUrl: "",
    pdfUrl: "",
    materialUrl: "",
    materialTitle: "",
    learn: "",
    prerequisites: "",
    career: "",
  });

  useEffect(() => {
    const verifyAdminSession = async () => {
      const storedUser = localStorage.getItem("user");
      const sessionToken = localStorage.getItem("sessionToken");
      const deviceId = localStorage.getItem("deviceId");

      if (!storedUser || !sessionToken || !deviceId) {
        localStorage.removeItem("user");
        localStorage.removeItem("sessionToken");
        window.location.href = "/login";
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.role !== "admin") {
        window.location.href = "/";
        return;
      }

      const res = await fetch("/api/session/verify", {
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

      const data = await res.json();

      if (!res.ok || !data.success) {
        localStorage.removeItem("user");
        localStorage.removeItem("sessionToken");
        window.location.href = "/login";
        return;
      }

      setUser(parsedUser);

      fetchCourses();
      fetchPartners();
      fetchTrustedCompanies();
      fetchTestimonials();
      fetchWebinars();
      fetchInquiries();
      fetchEnrollments();
    };

    verifyAdminSession();
  }, []);

  // FETCH COURSES
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");

      const data = await res.json();

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners");

      const data = await res.json();

      if (data.success) {
        setPartners(data.partners);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrustedCompanies = async () => {
    try {
      const res = await fetch("/api/trusted-companies");

      const data = await res.json();

      if (data.success) {
        setTrustedCompanies(data.trustedCompanies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");

      const data = await res.json();

      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWebinars = async () => {
    try {
      const res = await fetch("/api/webinars");

      const data = await res.json();

      if (data.success) {
        setWebinars(data.webinars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");

      const data = await res.json();

      if (data.success) {
        setInquiries(data.inquiries);

        const replies: any = {};

        data.inquiries.forEach((item: any) => {
          replies[item._id] = item.adminReply || "";
        });

        setInquiryReplies(replies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await fetch("/api/enrollments");

      const data = await res.json();

      if (data.success) {
        setEnrollments(data.enrollments);

        const assignments: any = {};

        data.enrollments.forEach((item: any) => {
          assignments[item._id] = item.batchName || "";
        });

        setBatchAssignments(assignments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignBatch = async (enrollment: any) => {
    try {
      const batchName = batchAssignments[enrollment._id] || "";

      const res = await fetch(`/api/enrollments/${enrollment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchName,
          status: enrollment.status || "enrolled",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Batch assigned successfully");
        fetchEnrollments();
      } else {
        alert(data.message || "Batch assignment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyInquiry = async (inquiry: any) => {
    try {
      const adminReply = inquiryReplies[inquiry._id] || "";

      if (!adminReply.trim()) {
        alert("Please enter a reply message");
        return;
      }

      const res = await fetch(`/api/inquiries/${inquiry._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminReply,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Reply saved and sent to user");
        fetchInquiries();
      } else {
        alert(data.message || "Reply failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePartner = async () => {
    try {
      const res = await fetch(
        editingPartnerId
          ? `/api/partners/${editingPartnerId}`
          : "/api/partners",
        {
          method: editingPartnerId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partnerForm),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          editingPartnerId
            ? "Partner Updated"
            : "Partner Created"
        );
        setEditingPartnerId("");
        setPartnerForm(emptyLogoForm);
        fetchPartners();
      } else {
        alert(data.message || "Partner save failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPartner = (partner: any) => {
    setEditingPartnerId(partner._id);
    setPartnerForm({
      name: partner.name || "",
      logo: partner.logo || "",
      website: partner.website || "",
      displayOrder:
        partner.displayOrder !== undefined
          ? String(partner.displayOrder)
          : "",
    });
  };

  const handleDeletePartner = async (id: string) => {
    const confirmDelete = confirm("Delete this partner?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Partner Deleted");
        setEditingPartnerId("");
        setPartnerForm(emptyLogoForm);
        fetchPartners();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTrustedCompany = async () => {
    try {
      const res = await fetch(
        editingTrustedCompanyId
          ? `/api/trusted-companies/${editingTrustedCompanyId}`
          : "/api/trusted-companies",
        {
          method: editingTrustedCompanyId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trustedCompanyForm),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          editingTrustedCompanyId
            ? "Trusted Company Updated"
            : "Trusted Company Created"
        );
        setEditingTrustedCompanyId("");
        setTrustedCompanyForm(emptyLogoForm);
        fetchTrustedCompanies();
      } else {
        alert(data.message || "Trusted company save failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTrustedCompany = (company: any) => {
    setEditingTrustedCompanyId(company._id);
    setTrustedCompanyForm({
      name: company.name || "",
      logo: company.logo || "",
      website: company.website || "",
      displayOrder:
        company.displayOrder !== undefined
          ? String(company.displayOrder)
          : "",
    });
  };

  const handleDeleteTrustedCompany = async (id: string) => {
    const confirmDelete = confirm("Delete this trusted company?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/trusted-companies/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Trusted Company Deleted");
        setEditingTrustedCompanyId("");
        setTrustedCompanyForm(emptyLogoForm);
        fetchTrustedCompanies();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTestimonial = async () => {
    try {
      const res = await fetch(
        editingTestimonialId
          ? `/api/testimonials/${editingTestimonialId}`
          : "/api/testimonials",
        {
          method: editingTestimonialId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testimonialForm),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          editingTestimonialId
            ? "Testimonial Updated"
            : "Testimonial Created"
        );
        setEditingTestimonialId("");
        setTestimonialForm(emptyTestimonialForm);
        fetchTestimonials();
      } else {
        alert(data.message || "Testimonial save failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTestimonial = (testimonial: any) => {
    setEditingTestimonialId(testimonial._id);
    setTestimonialForm({
      name: testimonial.name || "",
      role: testimonial.role || "",
      content: testimonial.content || "",
      rating:
        testimonial.rating !== undefined
          ? String(testimonial.rating)
          : "5",
      displayOrder:
        testimonial.displayOrder !== undefined
          ? String(testimonial.displayOrder)
          : "",
    });
  };

  const handleDeleteTestimonial = async (id: string) => {
    const confirmDelete = confirm("Delete this testimonial?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Testimonial Deleted");
        setEditingTestimonialId("");
        setTestimonialForm(emptyTestimonialForm);
        fetchTestimonials();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveWebinar = async () => {
    try {
      const res = await fetch(
        editingWebinarId
          ? `/api/webinars/${editingWebinarId}`
          : "/api/webinars",
        {
          method: editingWebinarId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webinarForm),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          editingWebinarId
            ? "Webinar Updated"
            : "Webinar Created"
        );
        setEditingWebinarId("");
        setWebinarForm(emptyWebinarForm);
        fetchWebinars();
      } else {
        alert(data.message || "Webinar save failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditWebinar = (webinar: any) => {
    setEditingWebinarId(webinar._id);
    setWebinarForm({
      name: webinar.name || "",
      title: webinar.title || "",
      date: webinar.date || "",
      time: webinar.time || "",
      img: webinar.img || "",
      role: webinar.role || "",
      displayOrder:
        webinar.displayOrder !== undefined
          ? String(webinar.displayOrder)
          : "",
    });
  };

  const handleDeleteWebinar = async (id: string) => {
    const confirmDelete = confirm("Delete this webinar?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/webinars/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Webinar Deleted");
        setEditingWebinarId("");
        setWebinarForm(emptyWebinarForm);
        fetchWebinars();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT COURSE HANDLERS
  const handleEditClick = (course: any) => {
    setSelectedCourseId(course._id);

    setFormData({
      slug: course.slug || "",
      title: course.title || "",
      description: course.description || "",
      duration: course.duration || "",
      sessions: course.sessions || "",
      professionals: course.professionals || "",
      exam: course.exam || "",
      price: course.price || "",
      rating: course.rating || "",
      provider: course.provider || "FinOps",
      enrolled: course.enrolled || "",
      level: course.level || "Beginner",
      badge: course.badge || "Published",
      image: course.image || "",
      videoUrl: course.videoUrl || "",
      pdfUrl: course.pdfUrl || "",
      materialUrl: course.materialUrl || "",
      materialTitle: course.materialTitle || "",
      learn: Array.isArray(course.learn)
        ? course.learn.join(", ")
        : "",
      prerequisites: Array.isArray(course.prerequisites)
        ? course.prerequisites.join(", ")
        : "",
      career: course.career || "",
    });

    setShowEditModal(true);
  };

  const handleUpdateCourse = async () => {
    try {
      const payload = {
        ...formData,
        learn: formData.learn
          .split(",")
          .map((item) => item.trim()),
        prerequisites: formData.prerequisites
          .split(",")
          .map((item) => item.trim()),
      };

      const res = await fetch(
        `/api/courses/${selectedCourseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Course Updated");
        setShowEditModal(false);
        fetchCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCourse = async () => {
    const confirmDelete = confirm("Delete this course?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `/api/courses/${selectedCourseId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Course Deleted");
        setShowEditModal(false);
        fetchCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE COURSE
  const handleCreateCourse = async () => {
    try {
      const payload = {
        ...formData,
        learn: formData.learn
          .split(",")
          .map((item) => item.trim()),
        prerequisites: formData.prerequisites
          .split(",")
          .map((item) => item.trim()),
      };

      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Course Created Successfully");
        setShowCreateModal(false);
        fetchCourses();
        setFormData({
          slug: "",
          title: "",
          description: "",
          duration: "",
          sessions: "",
          professionals: "",
          exam: "",
          price: "",
          rating: "",
          provider: "FinOps",
          enrolled: "",
          level: "Beginner",
          badge: "Published",
          image: "",
          videoUrl: "",
          pdfUrl: "",
          materialUrl: "",
          materialTitle: "",
          learn: "",
          prerequisites: "",
          career: "",
        });
      } else {
        alert("Failed To Create Course");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT
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

    window.location.href = "/login";
  };

  const parseCourseNumber = (value: any) => {
    const normalized = String(value || "").replace(/[^0-9.]/g, "");

    return Number(normalized) || 0;
  };

  const filteredCourses = courses
    .filter((course) => {
      const searchText = courseSearch.trim().toLowerCase();
      const searchableContent = [
        course.title,
        course.slug,
        course.provider,
        course.description,
        course.level,
        course.badge,
        course.tag,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchText || searchableContent.includes(searchText);

      if (!matchesSearch) return false;

      if (courseFilter === "all") return true;

      const filterValue = courseFilter.toLowerCase();

      if (filterValue === "premium") {
        return [course.badge, course.tag, course.level, course.provider]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes("premium");
      }

      return [course.badge, course.level, course.provider, course.tag]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(filterValue);
    })
    .sort((a, b) => {
      switch (courseSort) {
        case "oldest":
          return (
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
          );
        case "title":
          return String(a.title || "").localeCompare(String(b.title || ""));
        case "price-low":
          return parseCourseNumber(a.price) - parseCourseNumber(b.price);
        case "price-high":
          return parseCourseNumber(b.price) - parseCourseNumber(a.price);
        case "popular":
          return (
            parseCourseNumber(b.enrolled) - parseCourseNumber(a.enrolled)
          );
        case "newest":
        default:
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
      }
    });

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between fixed h-screen overflow-y-auto">

        <div>

          {/* LOGO */}
          <div className="px-8 py-10">
            <h1 className="text-4xl font-bold text-cyan-500">
              FinOps
            </h1>
          </div>

          {/* MENU */}
          <div className="px-4 space-y-2">

            <Link
              href="/admin-page"
              className="w-full flex items-center gap-4 bg-cyan-100 text-cyan-600 px-5 py-4 rounded-2xl font-medium"
            >
              <BookOpen size={22} />
              Courses
            </Link>

            <Link
              href="/admin-page/batches"
              className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition"
            >
              <Briefcase size={22} />
              Batches
            </Link>

            <Link
              href="/admin-page/content"
              className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition"
            >
              <FileText size={22} />
              Content
            </Link>

            <Link
              href="/admin-page/chats"
              className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition"
            >
              <MessageCircle size={22} />
              Chats
            </Link>

            <Link
              href="/admin-page/people"
              className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition"
            >
              <Users size={22} />
              People
            </Link>

            <Link
              href="/admin-page#inquiries"
              className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition"
            >
              <Mail size={22} />
              Inquiries
            </Link>

            <Link
              href="/admin-page/admins"
              className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-4 rounded-2xl transition"
            >
              <ShieldCheck size={22} />
              Admin Members
            </Link>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="px-5 pb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Homepage Managers
              </p>

              <Link
                href="/admin-page#enrolled-students"
                className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl transition"
              >
                <Users size={20} />
                Enrolled Students
              </Link>

              <Link
                href="/admin-page#partners"
                className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl transition"
              >
                <Briefcase size={20} />
                Partners
              </Link>

              <Link
                href="/admin-page#trusted-companies"
                className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl transition"
              >
                <FileText size={20} />
                Trusted Companies
              </Link>

              <Link
                href="/admin-page#testimonials"
                className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl transition"
              >
                <MessageCircle size={20} />
                Testimonials
              </Link>

              <Link
                href="/admin-page#webinars"
                className="w-full flex items-center gap-4 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl transition"
              >
                <BookOpen size={20} />
                Webinars
              </Link>
            </div>

          </div>

        </div>

        {/* SUPPORT */}
        <div className="p-5">

          <div className="bg-cyan-500 rounded-3xl p-5 text-white">

            <h2 className="text-xl font-semibold">
              Help & Support
            </h2>

            <p className="text-sm opacity-90 mt-2">
              Contact FinOps support team.
            </p>

            <button className="mt-4 bg-white text-cyan-600 px-5 py-2 rounded-xl font-semibold">
              Contact
            </button>

          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 ml-[250px] p-10 overflow-y-auto">

        {/* TOPBAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-end gap-6 mb-10">

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* USER */}
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200">

              <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)}
              </div>

              <div>

                <p className="font-semibold">
                  {user?.name}
                </p>

                <p className="text-sm text-gray-500">
                  Admin
                </p>

              </div>

            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

        {/* TITLE */}
        <div
          id="courses"
          className="scroll-mt-32 flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10"
        >

          <div>

            <h1 className="text-5xl font-bold text-gray-800">
              Your Courses
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Add/View courses of your brand
            </p>

          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold w-fit"
          >
            <Plus size={22} />
            Create Course
          </button>

        </div>

        {/* FILTERS */}
       <div className="flex flex-wrap gap-5 mb-10">

  {/* SEARCH */}
  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 w-full md:w-[340px] shadow-sm">
    
    <input
      type="text"
      placeholder="Search by course name..."
      value={courseSearch}
      onChange={(e) => setCourseSearch(e.target.value)}
      className="w-full outline-none text-black placeholder:text-gray-400 bg-transparent"
    />

  </div>

  {/* SORT */}
  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 w-full md:w-[220px] shadow-sm">

    <select
      value={courseSort}
      onChange={(e) => setCourseSort(e.target.value)}
      className="w-full outline-none text-black bg-transparent"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="title">Course Name A-Z</option>
      <option value="price-low">Price Low to High</option>
      <option value="price-high">Price High to Low</option>
      <option value="popular">Most Popular</option>
    </select>

  </div>

  {/* FILTER */}
  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 w-full md:w-[180px] shadow-sm">

    <select
      value={courseFilter}
      onChange={(e) => setCourseFilter(e.target.value)}
      className="w-full outline-none text-black bg-transparent"
    >
      <option value="all">All Courses</option>
      <option value="Published">Published</option>
      <option value="Draft">Draft</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
      <option value="Premium">Premium</option>
    </select>

  </div>

</div>

        {/* COURSE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">

          {filteredCourses.map((course) => (

            <div
              key={course._id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="relative">

                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />

                <div className="absolute top-4 left-4">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      course.badge === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.badge}
                  </span>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col">

                <h2 className="text-xl font-bold text-gray-800 leading-snug min-h-[60px]">
                  {course.title}
                </h2>

                <p className="text-gray-500 mt-3 text-sm leading-relaxed line-clamp-3 min-h-[70px]">
                  {course.description}
                </p>

                {/* EXTRA INFO */}
                <div className="space-y-2 mt-5">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Duration
                    </span>

                    <span className="font-semibold text-gray-800">
                      {course.duration}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Students
                    </span>

                    <span className="font-semibold text-gray-800">
                      {course.enrolled}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-500">
                      Provider
                    </span>

                    <span className="font-semibold text-gray-800">
                      {course.provider}
                    </span>

                  </div>

                </div>

                {/* FOOTER */}
                <div className="mt-6 flex items-center justify-between">

                  <div>

                    <p className="text-2xl font-bold text-gray-900">
                      {course.price}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Premium Course
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleEditClick(course)
                    }
                    className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-5 py-2 rounded-xl font-medium"
                  >
                    Edit
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No courses match your current search, sort, or filter.
          </div>
        )}

        <InquiryManager
          inquiries={inquiries}
          inquiryReplies={inquiryReplies}
          onReplyChange={setInquiryReplies}
          onReply={handleReplyInquiry}
        />

        <EnrollmentManager
          enrollments={enrollments}
          batchAssignments={batchAssignments}
          onBatchChange={setBatchAssignments}
          onAssignBatch={handleAssignBatch}
        />

        {/* LOGO MANAGEMENT */}
        <div className="mt-16 grid grid-cols-1 xl:grid-cols-2 gap-8">

          <LogoManager
            sectionId="partners"
            title="Partners"
            description="Control the partner logos shown on the user homepage."
            items={partners}
            form={partnerForm}
            editingId={editingPartnerId}
            emptyText="No partners added yet."
            onFormChange={setPartnerForm}
            onSave={handleSavePartner}
            onEdit={handleEditPartner}
            onDelete={handleDeletePartner}
            onCancel={() => {
              setEditingPartnerId("");
              setPartnerForm(emptyLogoForm);
            }}
          />

          <LogoManager
            sectionId="trusted-companies"
            title="Trusted Companies"
            description="Control the trusted company logos shown on the user homepage."
            items={trustedCompanies}
            form={trustedCompanyForm}
            editingId={editingTrustedCompanyId}
            emptyText="No trusted companies added yet."
            onFormChange={setTrustedCompanyForm}
            onSave={handleSaveTrustedCompany}
            onEdit={handleEditTrustedCompany}
            onDelete={handleDeleteTrustedCompany}
            onCancel={() => {
              setEditingTrustedCompanyId("");
              setTrustedCompanyForm(emptyLogoForm);
            }}
          />

        </div>

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8">

          <TestimonialManager
            sectionId="testimonials"
            items={testimonials}
            form={testimonialForm}
            editingId={editingTestimonialId}
            onFormChange={setTestimonialForm}
            onSave={handleSaveTestimonial}
            onEdit={handleEditTestimonial}
            onDelete={handleDeleteTestimonial}
            onCancel={() => {
              setEditingTestimonialId("");
              setTestimonialForm(emptyTestimonialForm);
            }}
          />

          <WebinarManager
            sectionId="webinars"
            items={webinars}
            form={webinarForm}
            editingId={editingWebinarId}
            onFormChange={setWebinarForm}
            onSave={handleSaveWebinar}
            onEdit={handleEditWebinar}
            onDelete={handleDeleteWebinar}
            onCancel={() => {
              setEditingWebinarId("");
              setWebinarForm(emptyWebinarForm);
            }}
          />

        </div>

      </div>

      {/* CREATE COURSE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 overflow-y-auto">

          <div className="bg-white w-full max-w-5xl rounded-3xl p-8 relative max-h-[95vh] overflow-y-auto">

            {/* CLOSE */}
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-black"
            >
              <X size={28} />
            </button>

            {/* TITLE */}
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              Create New Course
            </h2>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Course Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Sessions"
                value={formData.sessions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sessions: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Professionals"
                value={formData.professionals}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    professionals: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Exam"
                value={formData.exam}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    exam: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* IMAGE */}
            <div className="mt-6">

              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            <CourseMediaFields
              formData={formData}
              setFormData={setFormData}
            />

            {/* DESCRIPTION */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* LEARN */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="What Students Will Learn (comma separated)"
                value={formData.learn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    learn: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* PREREQUISITES */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="Prerequisites (comma separated)"
                value={formData.prerequisites}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prerequisites: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* CAREER */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="Career Opportunities"
                value={formData.career}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    career: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* BUTTON */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleCreateCourse}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
              >
                Create Course
              </button>
            </div>

          </div>

        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 overflow-y-auto">

          <div className="bg-white w-full max-w-5xl rounded-3xl p-8 relative max-h-[95vh] overflow-y-auto">

            {/* CLOSE */}
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-black"
            >
              <X size={28} />
            </button>

            {/* TITLE */}
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              Edit Course
            </h2>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Course Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Sessions"
                value={formData.sessions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sessions: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Professionals"
                value={formData.professionals}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    professionals: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Exam"
                value={formData.exam}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    exam: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

              <input
                type="text"
                placeholder="Rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* IMAGE */}
            <div className="mt-6">

              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            <CourseMediaFields
              formData={formData}
              setFormData={setFormData}
            />

            {/* DESCRIPTION */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* LEARN */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="What Students Will Learn (comma separated)"
                value={formData.learn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    learn: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* PREREQUISITES */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="Prerequisites (comma separated)"
                value={formData.prerequisites}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prerequisites: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* CAREER */}
            <div className="mt-6">

              <textarea
                rows={4}
                placeholder="Career Opportunities"
                value={formData.career}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    career: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
              />

            </div>

            {/* BUTTON */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleDeleteCourse}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
              >
                Delete Course
              </button>

              <button
                onClick={handleUpdateCourse}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
              >
                Save Changes
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function InquiryManager({
  inquiries,
  inquiryReplies,
  onReplyChange,
  onReply,
}: any) {
  return (
    <section
      id="inquiries"
      className="scroll-mt-32 mt-16 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Contact Inquiries
          </h2>
          <p className="text-gray-500 mt-2">
            View contact messages, sender details, and reply by email.
          </p>
        </div>

        <div className="bg-cyan-50 text-cyan-700 px-5 py-3 rounded-2xl font-semibold">
          {inquiries.length} Inquiries
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.length > 0 ? (
          inquiries.map((item: any) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-200 p-5"
            >
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr_1.3fr] gap-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Sender
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-500 break-all">
                    {item.email || "No email"}
                  </p>
                  <span
                    className={`inline-flex mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === "replied"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status || "new"}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Message
                  </p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.message}
                  </p>
                  {item.emailSentToAdmin && (
                    <p className="text-xs text-cyan-600 mt-3">
                      Email sent to admin
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Reply
                  </p>
                  <textarea
                    rows={5}
                    placeholder="Write reply to user"
                    value={inquiryReplies[item._id] || ""}
                    onChange={(e) =>
                      onReplyChange({
                        ...inquiryReplies,
                        [item._id]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none text-black placeholder:text-gray-400"
                  />
                  {item.repliedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Replied: {new Date(item.repliedAt).toLocaleString()}
                    </p>
                  )}
                  <button
                    onClick={() => onReply(item)}
                    className="mt-3 bg-cyan-500 hover:bg-cyan-600 transition text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
                  >
                    <Send size={18} />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No contact inquiries yet.
          </div>
        )}
      </div>
    </section>
  );
}

function CourseMediaFields({ formData, setFormData }: any) {
  const [uploadingField, setUploadingField] = useState("");

  const handleCourseUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "videoUrl" | "pdfUrl" | "materialUrl",
    folder: string
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingField(field);

      const url = await uploadAdminFile(file, folder);

      setFormData({
        ...formData,
        [field]: url,
      });
    } catch (error: any) {
      alert(error.message || "File upload failed");
    } finally {
      setUploadingField("");
      event.target.value = "";
    }
  };

  const uploadButtonClass =
    "border border-dashed border-cyan-300 bg-cyan-50 rounded-2xl px-5 py-4 text-cyan-700 font-semibold cursor-pointer hover:bg-cyan-100 transition text-center";

  return (
    <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="text-xl font-bold text-gray-800">
        Course Access Files
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Add video, PDF, and downloadable material shown to enrolled students.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <input
          type="text"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={(e) =>
            setFormData({
              ...formData,
              videoUrl: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400 bg-white"
        />

        <label className={uploadButtonClass}>
          {uploadingField === "videoUrl" ? "Uploading video..." : "Upload Video"}
          <input
            type="file"
            accept="video/*"
            onChange={(e) =>
              handleCourseUpload(e, "videoUrl", "finops/courses/videos")
            }
            disabled={Boolean(uploadingField)}
            className="hidden"
          />
        </label>

        <input
          type="text"
          placeholder="PDF URL"
          value={formData.pdfUrl}
          onChange={(e) =>
            setFormData({
              ...formData,
              pdfUrl: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400 bg-white"
        />

        <label className={uploadButtonClass}>
          {uploadingField === "pdfUrl" ? "Uploading PDF..." : "Upload PDF"}
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              handleCourseUpload(e, "pdfUrl", "finops/courses/pdfs")
            }
            disabled={Boolean(uploadingField)}
            className="hidden"
          />
        </label>

        <input
          type="text"
          placeholder="Material title"
          value={formData.materialTitle}
          onChange={(e) =>
            setFormData({
              ...formData,
              materialTitle: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400 bg-white"
        />

        <input
          type="text"
          placeholder="Material / file URL"
          value={formData.materialUrl}
          onChange={(e) =>
            setFormData({
              ...formData,
              materialUrl: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400 bg-white"
        />

        <label className={`${uploadButtonClass} md:col-span-2`}>
          {uploadingField === "materialUrl"
            ? "Uploading material..."
            : "Upload Course Material"}
          <input
            type="file"
            onChange={(e) =>
              handleCourseUpload(e, "materialUrl", "finops/courses/materials")
            }
            disabled={Boolean(uploadingField)}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

function EnrollmentManager({
  enrollments,
  batchAssignments,
  onBatchChange,
  onAssignBatch,
}: any) {
  return (
    <section
      id="enrolled-students"
      className="scroll-mt-32 mt-16 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Enrolled Students
          </h2>
          <p className="text-gray-500 mt-2">
            View student enrollments and assign each student to the right batch.
          </p>
        </div>

        <div className="bg-cyan-50 text-cyan-700 px-5 py-3 rounded-2xl font-semibold">
          {enrollments.length} Records
        </div>
      </div>

      <div className="space-y-4">
        {enrollments.length > 0 ? (
          enrollments.map((item: any) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-200 p-5"
            >
              <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1.4fr_1fr_1.2fr_auto] gap-4 xl:items-center">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Student
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name || "Unknown Student"}
                  </h3>
                  <p className="text-sm text-gray-500 break-all">
                    {item.email || "No email"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Course
                  </p>
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.courseName || item.courseId || "Unknown Course"}
                  </h3>
                  {item.coursePrice && (
                    <p className="text-sm text-gray-500">
                      {item.coursePrice}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Status
                  </p>
                  <span
                    className={`inline-flex mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === "enrolled"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status || "enrolled"}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Assign Batch
                  </p>
                  <input
                    type="text"
                    placeholder="e.g. Batch 10 AWS"
                    value={batchAssignments[item._id] || ""}
                    onChange={(e) =>
                      onBatchChange({
                        ...batchAssignments,
                        [item._id]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none text-black placeholder:text-gray-400"
                  />
                  {item.batchName && (
                    <p className="text-xs text-gray-500 mt-2">
                      Current: {item.batchName}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onAssignBatch(item)}
                  className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-3 rounded-2xl font-semibold"
                >
                  Save Batch
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No enrollments or reserved seats yet.
          </div>
        )}
      </div>
    </section>
  );
}

function LogoManager({
  sectionId,
  title,
  description,
  items,
  form,
  editingId,
  emptyText,
  onFormChange,
  onSave,
  onEdit,
  onDelete,
  onCancel,
}: any) {
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingLogo(true);

      const url = await uploadAdminImage(
        file,
        title === "Partners"
          ? "finops/partners"
          : "finops/trusted-companies"
      );

      onFormChange({
        ...form,
        logo: url,
      });
    } catch (error: any) {
      alert(error.message || "Image upload failed");
    } finally {
      setUploadingLogo(false);
      event.target.value = "";
    }
  };

  return (
    <section
      id={sectionId}
      className="scroll-mt-32 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="text-gray-500 mt-2">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              onFormChange({
                ...form,
                name: e.target.value,
              })
            }
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
          />

          <input
            type="text"
            placeholder="Logo URL or /public-file.png"
            value={form.logo}
            onChange={(e) =>
              onFormChange({
                ...form,
                logo: e.target.value,
              })
            }
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
          />

          <label className="border border-dashed border-cyan-300 bg-cyan-50 rounded-2xl px-5 py-4 text-cyan-700 font-semibold cursor-pointer hover:bg-cyan-100 transition">
            {uploadingLogo ? "Uploading image..." : "Upload Logo From PC"}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              disabled={uploadingLogo}
              className="hidden"
            />
          </label>

          <input
            type="text"
            placeholder="Website URL (optional)"
            value={form.website}
            onChange={(e) =>
              onFormChange({
                ...form,
                website: e.target.value,
              })
            }
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
          />

          <input
            type="number"
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={(e) =>
              onFormChange({
                ...form,
                displayOrder: e.target.value,
              })
            }
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onSave}
            className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-3 rounded-2xl font-semibold"
          >
            {editingId ? "Save Changes" : `Add ${title}`}
          </button>

          {editingId && (
            <button
              onClick={onCancel}
              className="bg-gray-100 hover:bg-gray-200 transition text-gray-700 px-6 py-3 rounded-2xl font-semibold"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item: any) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-gray-200 p-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-14 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">
                      Logo
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {item.logo}
                  </p>
                  {item.website && (
                    <p className="text-sm text-cyan-600 truncate">
                      {item.website}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-xl">
                  Order {item.displayOrder || 0}
                </span>

                <button
                  onClick={() => onEdit(item)}
                  className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-4 py-2 rounded-xl font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            {emptyText}
          </div>
        )}
      </div>
    </section>
  );
}

function TestimonialManager({
  sectionId,
  items,
  form,
  editingId,
  onFormChange,
  onSave,
  onEdit,
  onDelete,
  onCancel,
}: any) {
  return (
    <section
      id={sectionId}
      className="scroll-mt-32 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Testimonials
        </h2>
        <p className="text-gray-500 mt-2">
          Control learner testimonials shown on the user homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Learner Name"
          value={form.name}
          onChange={(e) =>
            onFormChange({
              ...form,
              name: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Role / Company"
          value={form.role}
          onChange={(e) =>
            onFormChange({
              ...form,
              role: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating 1-5"
          value={form.rating}
          onChange={(e) =>
            onFormChange({
              ...form,
              rating: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <input
          type="number"
          placeholder="Display Order"
          value={form.displayOrder}
          onChange={(e) =>
            onFormChange({
              ...form,
              displayOrder: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />
      </div>

      <textarea
        rows={4}
        placeholder="Testimonial content"
        value={form.content}
        onChange={(e) =>
          onFormChange({
            ...form,
            content: e.target.value,
          })
        }
        className="mt-4 w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
      />

      <div className="flex flex-wrap gap-3 mt-4 mb-6">
        <button
          onClick={onSave}
          className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-3 rounded-2xl font-semibold"
        >
          {editingId ? "Save Changes" : "Add Testimonial"}
        </button>

        {editingId && (
          <button
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 transition text-gray-700 px-6 py-3 rounded-2xl font-semibold"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item: any) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-200 p-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {item.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Rating {item.rating || 5} / Order {item.displayOrder || 0}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-4 py-2 rounded-xl font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            No testimonials added yet.
          </div>
        )}
      </div>
    </section>
  );
}

function WebinarManager({
  sectionId,
  items,
  form,
  editingId,
  onFormChange,
  onSave,
  onEdit,
  onDelete,
  onCancel,
}: any) {
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleWebinarImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);

      const url = await uploadAdminImage(file, "finops/webinars");

      onFormChange({
        ...form,
        img: url,
      });
    } catch (error: any) {
      alert(error.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  return (
    <section
      id={sectionId}
      className="scroll-mt-32 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Webinars
        </h2>
        <p className="text-gray-500 mt-2">
          Control upcoming webinar cards shown on the user homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Speaker Name"
          value={form.name}
          onChange={(e) =>
            onFormChange({
              ...form,
              name: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Speaker Role"
          value={form.role}
          onChange={(e) =>
            onFormChange({
              ...form,
              role: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Webinar Title"
          value={form.title}
          onChange={(e) =>
            onFormChange({
              ...form,
              title: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400 md:col-span-2"
        />

        <input
          type="text"
          placeholder="Date, e.g. 21 Apr 2026"
          value={form.date}
          onChange={(e) =>
            onFormChange({
              ...form,
              date: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Time, e.g. 02:00 PM IST"
          value={form.time}
          onChange={(e) =>
            onFormChange({
              ...form,
              time: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Speaker Image URL"
          value={form.img}
          onChange={(e) =>
            onFormChange({
              ...form,
              img: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />

        <label className="border border-dashed border-cyan-300 bg-cyan-50 rounded-2xl px-5 py-4 text-cyan-700 font-semibold cursor-pointer hover:bg-cyan-100 transition">
          {uploadingImage ? "Uploading image..." : "Upload Image From PC"}
          <input
            type="file"
            accept="image/*"
            onChange={handleWebinarImageUpload}
            disabled={uploadingImage}
            className="hidden"
          />
        </label>

        <input
          type="number"
          placeholder="Display Order"
          value={form.displayOrder}
          onChange={(e) =>
            onFormChange({
              ...form,
              displayOrder: e.target.value,
            })
          }
          className="border border-gray-300 rounded-2xl px-5 py-4 outline-none text-black placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-4 mb-6">
        <button
          onClick={onSave}
          className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-6 py-3 rounded-2xl font-semibold"
        >
          {editingId ? "Save Changes" : "Add Webinar"}
        </button>

        {editingId && (
          <button
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 transition text-gray-700 px-6 py-3 rounded-2xl font-semibold"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item: any) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-gray-200 p-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">
                      Image
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {item.name} - {item.role}
                  </p>
                  <p className="text-sm text-cyan-600 truncate">
                    {item.date} | {item.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-xl">
                  Order {item.displayOrder || 0}
                </span>

                <button
                  onClick={() => onEdit(item)}
                  className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-4 py-2 rounded-xl font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            No webinars added yet.
          </div>
        )}
      </div>
    </section>
  );
}

async function uploadAdminImage(file: File, folder: string) {
  return uploadAdminFile(file, folder);
}

async function uploadAdminFile(file: File, folder: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Image upload failed");
  }

  return data.url;
}
