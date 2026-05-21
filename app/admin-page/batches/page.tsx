"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  FileText,
  HelpCircle,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";

type Enrollment = {
  _id: string;
  name?: string;
  email?: string;
  courseName?: string;
  courseId?: string;
  coursePrice?: string;
  status?: string;
  batchName?: string;
  batchAssignedAt?: string;
  createdAt?: string;
};

export default function BatchesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/enrollments");
      const data = await res.json();

      if (data.success) {
        setEnrollments(data.enrollments || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const groupedBatches = useMemo(() => {
    const groups = new Map<string, Enrollment[]>();

    enrollments
      .filter((item) => item.batchName?.trim())
      .forEach((item) => {
        const name = item.batchName!.trim();
        const current = groups.get(name) || [];
        groups.set(name, [...current, item]);
      });

    const normalizedSearch = search.trim().toLowerCase();

    return Array.from(groups.entries())
      .map(([name, students]) => ({
        name,
        students,
        latestAssignedAt: students
          .map((student) => student.batchAssignedAt || student.createdAt || "")
          .sort()
          .at(-1),
      }))
      .filter((batch) => {
        if (!normalizedSearch) return true;

        const searchable = [
          batch.name,
          ...batch.students.flatMap((student) => [
            student.name,
            student.email,
            student.courseName,
            student.courseId,
          ]),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalizedSearch);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [enrollments, search]);

  const assignedCount = enrollments.filter((item) => item.batchName).length;
  const unassignedCount = enrollments.length - assignedCount;

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">
      <aside className="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between fixed h-screen overflow-y-auto">
        <div>
          <div className="px-8 py-10">
            <h1 className="text-4xl font-bold text-cyan-500">
              FinOps
            </h1>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarLink href="/admin-page" icon={<BookOpen size={22} />} text="Courses" />
            <SidebarLink active href="/admin-page/batches" icon={<Briefcase size={22} />} text="Batches" />
            <SidebarLink href="/admin-page/content" icon={<FileText size={22} />} text="Content" />
            <SidebarLink href="/admin-page/chats" icon={<MessageCircle size={22} />} text="Chats" />
            <SidebarLink href="/admin-page/people" icon={<Users size={22} />} text="People" />
          </nav>
        </div>

        <div className="p-5">
          <div className="bg-cyan-500 rounded-3xl p-5 text-white">
            <HelpCircle size={24} />
            <h2 className="text-xl font-semibold mt-3">
              Help & Support
            </h2>
            <p className="text-sm opacity-90 mt-2">
              Manage batch enrollment from saved student assignments.
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-[250px] p-10 overflow-y-auto">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800">
              Batches
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Students appear here automatically after you save their batch.
            </p>
          </div>

          <Link
            href="/admin-page#enrolled-students"
            className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-7 py-4 rounded-2xl font-semibold w-fit"
          >
            Assign Students
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCard title="Active Batches" value={groupedBatches.length} />
          <StatCard title="Assigned Students" value={assignedCount} />
          <StatCard title="Unassigned Students" value={unassignedCount} />
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm mb-8">
          <div className="flex items-center gap-3">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search batch, student, email, or course"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-black placeholder:text-gray-400 bg-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center text-gray-500">
            Loading batches...
          </div>
        ) : groupedBatches.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {groupedBatches.map((batch) => (
              <section
                key={batch.name}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {batch.name}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {batch.students.length} enrolled student{batch.students.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <span className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-2xl font-semibold">
                    Active
                  </span>
                </div>

                <div className="space-y-3">
                  {batch.students.map((student) => (
                    <div
                      key={student._id}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {student.name || "Unknown Student"}
                          </h3>
                          <p className="text-sm text-gray-500 break-all">
                            {student.email || "No email"}
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            {student.courseName || student.courseId || "Unknown Course"}
                          </p>
                        </div>

                        <div className="text-left md:text-right shrink-0">
                          <span className="inline-flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                            {student.status || "enrolled"}
                          </span>
                          <p className="text-xs text-gray-400 mt-2">
                            {student.batchAssignedAt
                              ? new Date(student.batchAssignedAt).toLocaleDateString()
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No saved batches yet. Go to Enrolled Students, enter a batch name, and save it.
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, text, active = false }: any) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition ${
        active
          ? "bg-cyan-100 text-cyan-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {text}
    </Link>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
      <p className="text-sm uppercase tracking-widest text-gray-400">
        {title}
      </p>
      <p className="text-4xl font-bold text-gray-900 mt-3">
        {value}
      </p>
    </div>
  );
}
