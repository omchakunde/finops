"use client";
import React from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, Users, BookOpen, Award, Star, ArrowRight, Zap, Globe, GraduationCap, Shield, Check, Download } from "lucide-react";
const courses = [
  {
    slug: "pl-300",
    title: "PL-300T00: Power BI Data Analyst",
    description:
      "Master data analysis, visualization, and business intelligence using Power BI.",
    duration: "24 Hours",
    sessions: "1,086 Sessions",
    professionals: "1,085 Professionals",
    exam: "PL-300 Exam Code",
    price: "₹50,000+",
    rating: "⭐ 4.7 Rating",
    learn: [
      "Data modeling in Power BI",
      "Data visualization & dashboards",
      "DAX calculations",
      "Power Query transformations",
    ],
    prerequisites: [
      "Basic data analysis knowledge",
      "Familiarity with Excel",
    ],
    career:
      "Become Data Analyst, BI Developer, Power BI Consultant.",
  },
  {
    slug: "az-104",
    title: "AZ-104T00-A: Microsoft Azure Administrator",
    description:
      "Learn to manage Azure subscriptions, secure identities, and configure virtual networks.",
    duration: "32 Hours",
    sessions: "6,800+ Sessions",
    professionals: "6,500+ Professionals",
    exam: "AZ-104 Exam Code",
    price: "₹60,000+",
    rating: "⭐ 4.8 Rating",
    learn: [
      "Manage Azure identities & governance",
      "Implement storage solutions",
      "Configure virtual networks",
      "Monitor Azure resources",
    ],
    prerequisites: [
      "Basic cloud knowledge",
      "Understanding of networking",
    ],
    career:
      "Azure Administrator, Cloud Engineer, DevOps Engineer.",
  },
  {
  slug: "ai-102",
  title: "AI-102T00: Designing Azure AI Solution",
  description:
    "Learn to design and implement AI solutions using Azure Cognitive Services, AI workloads, and machine learning models.",
  duration: "24 Hours",
  sessions: "2,500+ Sessions",
  professionals: "2,200+ Professionals",
  exam: "AI-102 Exam Code",
  price: "₹55,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Design AI solutions using Azure",
    "Implement Cognitive Services APIs",
    "Work with NLP and Computer Vision",
    "Integrate AI models into applications",
  ],
  prerequisites: [
    "Basic programming knowledge",
    "Understanding of cloud concepts",
  ],
  career:
    "AI Engineer, Machine Learning Engineer, Azure AI Specialist.",
},
{
  slug: "az-305",
  title: "AZ-305T00: Azure Architect",
  description:
    "Learn to design cloud and hybrid solutions on Microsoft Azure including compute, network, storage, and security.",
  duration: "32 Hours",
  sessions: "4,000+ Sessions",
  professionals: "3,800+ Professionals",
  exam: "AZ-305 Exam Code",
  price: "₹65,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Design Azure infrastructure solutions",
    "Implement networking and security",
    "Architect data storage solutions",
    "Design business continuity strategies",
  ],
  prerequisites: [
    "Azure fundamentals knowledge",
    "Experience with cloud concepts",
  ],
  career:
    "Azure Architect, Cloud Solutions Architect, Senior Cloud Engineer.",
},
{
  slug: "az-400",
  title: "AZ-400T00: DevOps Solutions",
  description:
    "Learn to implement DevOps practices using Azure including CI/CD pipelines, infrastructure as code, and monitoring.",
  duration: "32 Hours",
  sessions: "5,200+ Sessions",
  professionals: "5,000+ Professionals",
  exam: "AZ-400 Exam Code",
  price: "₹65,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Implement CI/CD pipelines in Azure DevOps",
    "Manage source control with Git",
    "Configure infrastructure as code",
    "Monitor applications and infrastructure",
  ],
  prerequisites: [
    "Basic Azure knowledge",
    "Understanding of DevOps concepts",
  ],
  career:
    "DevOps Engineer, Site Reliability Engineer, Cloud DevOps Specialist.",
},
{
  slug: "sc-200",
  title: "SC-200T00: Security Operations",
  description:
    "Learn to detect, respond, and mitigate threats using Microsoft security tools like Microsoft Sentinel and Defender.",
  duration: "24 Hours",
  sessions: "3,800+ Sessions",
  professionals: "3,500+ Professionals",
  exam: "SC-200 Exam Code",
  price: "₹55,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Monitor security using Microsoft Sentinel",
    "Detect threats using Microsoft Defender",
    "Respond to security incidents",
    "Investigate alerts and logs",
  ],
  prerequisites: [
    "Basic knowledge of security concepts",
    "Understanding of networking and cloud",
  ],
  career:
    "Security Analyst, SOC Analyst, Cybersecurity Engineer.",
},
{
  slug: "sc-300",
  title: "SC-300T00: Identity and Access Administrator",
  description:
    "Learn to implement identity management solutions, configure access controls, and secure identities using Microsoft Entra ID (Azure AD).",
  duration: "24 Hours",
  sessions: "3,200+ Sessions",
  professionals: "3,000+ Professionals",
  exam: "SC-300 Exam Code",
  price: "₹55,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Implement identity management solutions",
    "Configure authentication and access",
    "Manage access using RBAC and policies",
    "Secure identities and monitor risks",
  ],
  prerequisites: [
    "Basic understanding of identity concepts",
    "Familiarity with Azure fundamentals",
  ],
  career:
    "Identity Administrator, IAM Specialist, Security Engineer.",
},
{
  slug: "az-500",
  title: "AZ-500T00: Azure Security",
  description:
    "Learn to implement security controls, maintain security posture, and identify vulnerabilities using Microsoft Azure security tools.",
  duration: "32 Hours",
  sessions: "4,500+ Sessions",
  professionals: "4,200+ Professionals",
  exam: "AZ-500 Exam Code",
  price: "₹60,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Manage identity and access in Azure",
    "Implement platform protection",
    "Secure data and applications",
    "Monitor security using Azure tools",
  ],
  prerequisites: [
    "Basic Azure knowledge",
    "Understanding of security concepts",
  ],
  career:
    "Azure Security Engineer, Cloud Security Engineer, Cybersecurity Specialist.",
},

{
  slug: "dp-600",
  title: "DP-600T00: Fabric Analytics Engineer",
  description:
    "Learn to design and implement analytics solutions using Microsoft Fabric, including data integration, transformation, and visualization.",
  duration: "24 Hours",
  sessions: "2,000+ Sessions",
  professionals: "1,800+ Professionals",
  exam: "DP-600 Exam Code",
  price: "₹55,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Work with Microsoft Fabric ecosystem",
    "Implement data pipelines and transformations",
    "Design analytics solutions",
    "Build reports and dashboards",
  ],
  prerequisites: [
    "Basic data analytics knowledge",
    "Familiarity with cloud concepts",
  ],
  career:
    "Data Engineer, Analytics Engineer, Fabric Specialist.",
},

{
  slug: "dw-101",
  title: "DW-101: Copilot Deployment",
  description:
    "Learn to deploy and manage Microsoft Copilot solutions, including integration with enterprise systems and AI-powered workflows.",
  duration: "16 Hours",
  sessions: "1,200+ Sessions",
  professionals: "1,000+ Professionals",
  exam: "DW-101 Certification",
  price: "₹45,000+",
  rating: "⭐ 4.6 Rating",
  learn: [
    "Deploy Microsoft Copilot solutions",
    "Integrate AI into business workflows",
    "Manage Copilot configurations",
    "Optimize productivity using AI tools",
  ],
  prerequisites: [
    "Basic understanding of Microsoft ecosystem",
    "Familiarity with cloud and AI concepts",
  ],
  career:
    "AI Solutions Engineer, Copilot Specialist, Automation Engineer.",
},
{
  slug: "aws-cloud-practitioner",
  title: "AWS Certified Cloud Practitioner",
  description:
    "Learn the fundamentals of AWS cloud including core services, security, pricing, and architecture best practices.",
  duration: "16 Hours",
  sessions: "7,500+ Sessions",
  professionals: "7,000+ Professionals",
  exam: "CLF-C02 Exam",
  price: "₹40,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "AWS core services overview",
    "Cloud concepts and architecture",
    "Security and compliance in AWS",
    "Billing, pricing, and support models",
  ],
  prerequisites: [
    "Basic understanding of IT concepts",
    "No prior cloud experience required",
  ],
  career:
    "Cloud Practitioner, AWS Support Engineer, Cloud Consultant.",
},

{
  slug: "aws-solutions-architect",
  title: "AWS Solutions Architect",
  description:
    "Learn to design scalable, secure, and cost-effective cloud architectures using AWS services.",
  duration: "32 Hours",
  sessions: "6,000+ Sessions",
  professionals: "5,800+ Professionals",
  exam: "SAA-C03 Exam",
  price: "₹65,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Design resilient AWS architectures",
    "Implement secure cloud solutions",
    "Optimize cost and performance",
    "Work with core AWS services like EC2, S3, RDS",
  ],
  prerequisites: [
    "Basic cloud knowledge",
    "Understanding of networking concepts",
  ],
  career:
    "Cloud Architect, AWS Solutions Architect, Cloud Engineer.",
},

{
  slug: "aws-devops-engineer",
  title: "AWS DevOps Engineer",
  description:
    "Learn to implement CI/CD pipelines, automate infrastructure, and monitor applications using AWS DevOps tools.",
  duration: "32 Hours",
  sessions: "4,800+ Sessions",
  professionals: "4,500+ Professionals",
  exam: "DOP-C02 Exam",
  price: "₹65,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Implement CI/CD pipelines using AWS",
    "Automate infrastructure with CloudFormation",
    "Monitor applications with CloudWatch",
    "Manage deployments and version control",
  ],
  prerequisites: [
    "Basic AWS knowledge",
    "Understanding of DevOps concepts",
  ],
  career:
    "DevOps Engineer, Cloud DevOps Engineer, Site Reliability Engineer.",
},

{
  slug: "ccna",
  title: "CCNA v2.1",
  description:
    "Learn networking fundamentals, routing, switching, and security concepts required for Cisco CCNA certification.",
  duration: "40 Hours",
  sessions: "6,500+ Sessions",
  professionals: "6,000+ Professionals",
  exam: "200-301 CCNA Exam",
  price: "₹55,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Networking fundamentals and protocols",
    "Routing and switching concepts",
    "IP addressing and subnetting",
    "Network security basics",
  ],
  prerequisites: [
    "Basic understanding of computers and networking",
  ],
  career:
    "Network Engineer, System Administrator, Network Support Engineer.",
},

{
  slug: "cissp",
  title: "CISSP Security Professional",
  description:
    "Learn advanced cybersecurity concepts including risk management, security architecture, and network security aligned with CISSP certification.",
  duration: "40 Hours",
  sessions: "3,500+ Sessions",
  professionals: "3,200+ Professionals",
  exam: "CISSP Exam (ISC²)",
  price: "₹70,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Security and risk management",
    "Asset security and cryptography",
    "Network and communication security",
    "Identity and access management",
  ],
  prerequisites: [
    "Basic knowledge of cybersecurity",
    "IT experience recommended",
  ],
  career:
    "Security Analyst, Cybersecurity Engineer, Information Security Manager.",
},

{
  slug: "itil-4",
  title: "ITIL 4 Foundation",
  description:
    "Learn IT service management principles, practices, and frameworks aligned with ITIL 4 certification.",
  duration: "16 Hours",
  sessions: "4,000+ Sessions",
  professionals: "3,800+ Professionals",
  exam: "ITIL 4 Foundation Exam",
  price: "₹45,000+",
  rating: "⭐ 4.6 Rating",
  learn: [
    "ITIL service management concepts",
    "Service value system and value chain",
    "ITIL practices and processes",
    "Continuous improvement strategies",
  ],
  prerequisites: [
    "Basic understanding of IT services",
    "No prior certification required",
  ],
  career:
    "IT Service Manager, IT Consultant, Service Delivery Manager.",
},
{
  slug: "aws-cloud-practitioner",
  title: "AWS Certified Cloud Practitioner",
  description:
    "Learn the fundamentals of AWS Cloud including core services, security, pricing, and architecture best practices.",
  duration: "16 Hours",
  sessions: "7,500+ Sessions",
  professionals: "7,000+ Professionals",
  exam: "CLF-C02 Exam",
  price: "₹40,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "AWS core services and global infrastructure",
    "Cloud concepts and deployment models",
    "Security, identity, and compliance in AWS",
    "Pricing, billing, and support plans",
  ],
  prerequisites: [
    "Basic understanding of IT concepts",
    "No prior cloud experience required",
  ],
  career:
    "Cloud Practitioner, AWS Support Engineer, Cloud Consultant.",
},

{
  slug: "aws-security-specialty",
  title: "AWS Certified Security - Specialty",
  description:
    "Learn advanced security practices on AWS including identity management, data protection, incident response, and infrastructure security.",
  duration: "24 Hours",
  sessions: "4,500+ Sessions",
  professionals: "4,000+ Professionals",
  exam: "SCS-C02 Exam",
  price: "₹65,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Identity and Access Management (IAM) best practices",
    "Data protection and encryption in AWS",
    "Monitoring and logging using AWS services",
    "Incident response and security automation",
  ],
  prerequisites: [
    "Basic AWS knowledge",
    "Understanding of networking and security concepts",
  ],
  career:
    "Security Engineer, Cloud Security Architect, AWS Security Specialist.",
},
{
  slug: "ccnp",
  title: "CCNP: Cisco Certified Network Professional",
  description:
    "Advance your networking skills with CCNP certification covering enterprise networking, security, automation, and troubleshooting.",
  duration: "40 Hours",
  sessions: "3,500+ Sessions",
  professionals: "3,200+ Professionals",
  exam: "ENCOR 350-401 Exam",
  price: "₹70,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Enterprise network architecture and design",
    "Advanced routing and switching concepts",
    "Network security and automation",
    "Troubleshooting complex network issues",
  ],
  prerequisites: [
    "Basic networking knowledge",
    "Understanding of CCNA concepts",
  ],
  career:
    "Network Engineer, Network Administrator, Systems Engineer, Infrastructure Specialist.",
},
{
  slug: "cisco-security",
  title: "Cisco Security Certification Training",
  description:
    "Learn to secure networks, manage threats, and implement Cisco security solutions including firewalls, VPNs, and intrusion prevention systems.",
  duration: "32 Hours",
  sessions: "2,800+ Sessions",
  professionals: "2,500+ Professionals",
  exam: "SCOR 350-701 Exam",
  price: "₹65,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Network security fundamentals and architecture",
    "Cisco firewalls, VPNs, and secure access",
    "Threat detection and mitigation",
    "Security monitoring and incident response",
  ],
  prerequisites: [
    "Basic networking knowledge",
    "Understanding of CCNA concepts",
  ],
  career:
    "Network Security Engineer, Security Analyst, Cybersecurity Specialist.",
},
{
  slug: "cisco-data-center",
  title: "Cisco Data Center Certification Training",
  description:
    "Learn to design, implement, and manage Cisco data center technologies including UCS, Nexus switching, storage networking, and virtualization.",
  duration: "36 Hours",
  sessions: "2,200+ Sessions",
  professionals: "2,000+ Professionals",
  exam: "DCCOR 350-601 Exam",
  price: "₹75,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Cisco UCS and data center architecture",
    "Nexus switching and ACI fundamentals",
    "Storage networking and SAN technologies",
    "Data center virtualization and automation",
  ],
  prerequisites: [
    "Basic networking knowledge",
    "Understanding of data center concepts",
  ],
  career:
    "Data Center Engineer, Network Engineer, Infrastructure Specialist, Cloud Engineer.",
},
{
  slug: "vsphere-install-configure-manage",
  title: "vSphere: Install, Configure, Manage",
  description:
    "Learn to install, configure, and manage VMware vSphere environments including ESXi hosts, vCenter Server, virtual machines, and networking.",
  duration: "40 Hours",
  sessions: "3,000+ Sessions",
  professionals: "2,700+ Professionals",
  exam: "2V0-21.23 Exam",
  price: "₹80,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Install and configure ESXi and vCenter Server",
    "Create and manage virtual machines",
    "Configure vSphere networking and storage",
    "Monitor and manage vSphere performance",
  ],
  prerequisites: [
    "Basic knowledge of virtualization",
    "Understanding of networking and servers",
  ],
  career:
    "Virtualization Engineer, System Administrator, Cloud Engineer, Infrastructure Engineer.",
},

{
  slug: "vmware-nsx",
  title: "VMware NSX: Network Virtualization",
  description:
    "Learn VMware NSX to design and manage network virtualization, micro-segmentation, and software-defined networking in modern data centers.",
  duration: "32 Hours",
  sessions: "2,600+ Sessions",
  professionals: "2,300+ Professionals",
  exam: "2V0-41.23 Exam",
  price: "₹75,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "NSX architecture and components",
    "Network virtualization and overlay networking",
    "Micro-segmentation and security policies",
    "Load balancing and VPN configuration",
  ],
  prerequisites: [
    "Basic networking knowledge",
    "Understanding of virtualization concepts",
  ],
  career:
    "Network Virtualization Engineer, Cloud Engineer, Security Engineer, Infrastructure Specialist.",
},
{
  slug: "oracle-dba",
  title: "Oracle DBA: Database Administration",
  description:
    "Learn Oracle Database Administration including installation, configuration, backup, recovery, and performance tuning of enterprise databases.",
  duration: "40 Hours",
  sessions: "2,400+ Sessions",
  professionals: "2,100+ Professionals",
  exam: "Oracle Database Administrator Certification",
  price: "₹70,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Oracle database installation and configuration",
    "Backup and recovery techniques (RMAN)",
    "User management and security",
    "Performance tuning and optimization",
  ],
  prerequisites: [
    "Basic database knowledge",
    "Understanding of SQL concepts",
  ],
  career:
    "Database Administrator, Oracle DBA, Database Engineer, Data Specialist.",
},
{
  slug: "oracle-cloud",
  title: "Oracle Cloud Infrastructure (OCI)",
  description:
    "Learn Oracle Cloud Infrastructure services including compute, storage, networking, and security for deploying scalable cloud applications.",
  duration: "24 Hours",
  sessions: "2,000+ Sessions",
  professionals: "1,800+ Professionals",
  exam: "Oracle Cloud Infrastructure Certification",
  price: "₹60,000+",
  rating: "⭐ 4.6 Rating",
  learn: [
    "OCI core services and architecture",
    "Compute, storage, and networking setup",
    "Identity and access management",
    "Monitoring and scaling cloud applications",
  ],
  prerequisites: [
    "Basic IT or cloud knowledge",
    "Understanding of networking fundamentals",
  ],
  career:
    "Cloud Engineer, Oracle Cloud Architect, DevOps Engineer, Infrastructure Engineer.",
},
{
  slug: "security-plus",
  title: "CompTIA Security+ Certification",
  description:
    "Learn foundational cybersecurity concepts including threat management, cryptography, network security, and risk management to become a certified security professional.",
  duration: "30 Hours",
  sessions: "3,800+ Sessions",
  professionals: "3,500+ Professionals",
  exam: "SY0-701 Exam",
  price: "₹55,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "Threats, vulnerabilities, and risk management",
    "Network security and architecture",
    "Cryptography and PKI concepts",
    "Identity and access management",
  ],
  prerequisites: [
    "Basic IT and networking knowledge",
    "Recommended: Network+ level understanding",
  ],
  career:
    "Security Analyst, Cybersecurity Specialist, SOC Analyst, Security Engineer.",
},
{
  slug: "network-plus",
  title: "CompTIA Network+ Certification",
  description:
    "Learn networking fundamentals including protocols, troubleshooting, infrastructure, and security to build a strong foundation in IT networking.",
  duration: "28 Hours",
  sessions: "4,200+ Sessions",
  professionals: "4,000+ Professionals",
  exam: "N10-008 Exam",
  price: "₹50,000+",
  rating: "⭐ 4.6 Rating",
  learn: [
    "Networking fundamentals and OSI model",
    "IP addressing and subnetting",
    "Network troubleshooting and tools",
    "Basic network security concepts",
  ],
  prerequisites: [
    "Basic computer knowledge",
    "No prior networking experience required",
  ],
  career:
    "Network Technician, Network Administrator, IT Support Engineer, Infrastructure Engineer.",
},
{
  slug: "iso-27001-lead-auditor",
  title: "ISO 27001 Lead Auditor Certification",
  description:
    "Learn how to audit Information Security Management Systems (ISMS) based on ISO/IEC 27001 standards and become a certified lead auditor.",
  duration: "32 Hours",
  sessions: "2,000+ Sessions",
  professionals: "1,800+ Professionals",
  exam: "ISO/IEC 27001 Lead Auditor Certification",
  price: "₹65,000+",
  rating: "⭐ 4.7 Rating",
  learn: [
    "ISMS principles and ISO 27001 framework",
    "Audit planning and execution techniques",
    "Risk assessment and treatment",
    "Compliance and regulatory requirements",
  ],
  prerequisites: [
    "Basic knowledge of information security",
    "Understanding of management systems",
  ],
  career:
    "ISO Auditor, Information Security Manager, Compliance Officer, Risk Analyst.",
},
{
  slug: "iso-22301",
  title: "ISO 22301 Business Continuity Management",
  description:
    "Learn to design and implement Business Continuity Management Systems (BCMS) to ensure organizational resilience and disaster recovery.",
  duration: "28 Hours",
  sessions: "1,800+ Sessions",
  professionals: "1,500+ Professionals",
  exam: "ISO 22301 Certification",
  price: "₹60,000+",
  rating: "⭐ 4.6 Rating",
  learn: [
    "Business continuity planning and strategy",
    "Risk analysis and business impact analysis (BIA)",
    "Disaster recovery planning",
    "ISO 22301 compliance and implementation",
  ],
  prerequisites: [
    "Basic knowledge of IT or business processes",
    "Understanding of risk management concepts",
  ],
  career:
    "Business Continuity Manager, Risk Manager, Compliance Specialist, Disaster Recovery Consultant.",
},
{
  slug: "ccsp",
  title: "CCSP: Certified Cloud Security Professional",
  description:
    "Master advanced cloud security concepts including architecture, data security, risk management, and compliance to become a certified cloud security expert.",
  duration: "35 Hours",
  sessions: "2,200+ Sessions",
  professionals: "2,000+ Professionals",
  exam: "CCSP Certification Exam",
  price: "₹75,000+",
  rating: "⭐ 4.8 Rating",
  learn: [
    "Cloud architecture and design principles",
    "Cloud data security and encryption",
    "Identity and access management in cloud",
    "Risk management, compliance, and governance",
  ],
  prerequisites: [
    "Basic knowledge of cloud computing",
    "Understanding of security concepts",
  ],
  career:
    "Cloud Security Engineer, Security Architect, Risk Analyst, Compliance Specialist.",
},
];

function getCourseFileHref(
  url: string,
  filename: string,
  disposition: "inline" | "attachment" = "inline"
) {
  if (!url) return "#";

  const normalizedUrl = url.trim();

  if (normalizedUrl.startsWith("/")) return normalizedUrl;

  if (normalizedUrl.startsWith("www.")) {
    return getCourseFileHref(`https://${normalizedUrl}`, filename, disposition);
  }

  if (!/^https?:\/\//i.test(normalizedUrl)) {
    return `/${normalizedUrl.replace(/^\/+/, "")}`;
  }

  const params = new URLSearchParams({
    url: normalizedUrl,
    name: filename,
    disposition,
  });

  return `/api/course-file?${params.toString()}`;
}


export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const fallbackCourse = courses.find((c) => c.slug === slug);
  const [dynamicCourse, setDynamicCourse] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const course = dynamicCourse || fallbackCourse;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const fetchDynamicCourse = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();

        if (data.success) {
          const matchedCourse = data.courses?.find(
            (item: any) => item.slug === slug
          );

          if (matchedCourse) {
            setDynamicCourse(matchedCourse);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDynamicCourse();
  }, [slug]);

  useEffect(() => {
    const checkEnrollmentAccess = async () => {
      const storedUser = localStorage.getItem("user");

      if (localStorage.getItem(`enrolledCourse:${slug}`) === "true") {
        setHasAccess(true);
      }

      if (!storedUser) return;

      try {
        const parsedUser = JSON.parse(storedUser);
        const res = await fetch("/api/enrollments");
        const data = await res.json();

        if (data.success) {
          const isEnrolled = data.enrollments?.some((item: any) => {
            const sameUser =
              item.userId === parsedUser._id || item.email === parsedUser.email;
            const sameCourse =
              item.courseId === slug ||
              item.courseName === course?.title ||
              item.courseId === course?._id;

            return sameUser && sameCourse && item.status === "enrolled";
          });

          setHasAccess(Boolean(isEnrolled));
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkEnrollmentAccess();
  }, [slug, course?.title, course?._id]);

  // ✅ ENROLL FUNCTION (ADDED)
  const handleEnroll = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("⚠️ Please login first");
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(user);
    const sessionToken = localStorage.getItem("sessionToken");
    const deviceId = localStorage.getItem("deviceId");

    if (!sessionToken || !deviceId) {
      alert("Please login again");
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: parsedUser._id,
        courseId: course?.slug,
        courseName: course?.title,
        coursePrice: course?.price,
        sessionToken,
        deviceId
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Successfully Enrolled!");
      localStorage.setItem(`enrolledCourse:${slug}`, "true");
      setHasAccess(true);
    } else {
      alert(data.message || "Error enrolling");
      if (res.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("sessionToken");
        window.location.href = "/login";
      }
    }
  };

  // ✅ RESERVE FUNCTION (ADDED)
  const handleReserveSeat = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("⚠️ Please login first");
      return;
    }

    const parsedUser = JSON.parse(user);
    const sessionToken = localStorage.getItem("sessionToken");
    const deviceId = localStorage.getItem("deviceId");

    if (!sessionToken || !deviceId) {
      alert("Please login again");
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/reserve-seat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: parsedUser._id,
        courseId: course?.slug,
        courseName: course?.title,
        coursePrice: course?.price,
        sessionToken,
        deviceId
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Seat Reserved!");
    } else {
      alert(data.message || "❌ Failed");
      if (res.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("sessionToken");
        window.location.href = "/login";
      }
    }
  };

  const learnItems: string[] = Array.isArray(course?.learn)
    ? course.learn
    : String(course?.learn || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const prerequisiteItems: string[] = Array.isArray(course?.prerequisites)
    ? course.prerequisites
    : String(course?.prerequisites || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const hasCourseFiles = Boolean(
    course?.videoUrl || course?.pdfUrl || course?.materialUrl
  );

  if (!course) return <div className="text-white p-10 bg-[#02040a] min-h-screen">Course Not Found</div>;

  return (
    <section ref={ref} className="relative bg-[#020408] text-slate-100 min-h-screen overflow-hidden font-sans">

      {/* BACKGROUND */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/10 blur-[100px] rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative z-10">

        {/* HERO */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-12 items-center mb-24"
        >
          <div className="lg:col-span-7">

            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-[1.05] bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              {course.title}
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
              {course.description}
            </p>

            <div className="flex gap-4">
              {/* ✅ CONNECTED */}
              <button
                onClick={handleEnroll}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold hover:scale-105 transition shadow-xl shadow-purple-500/30"
              >
                Enroll Now
              </button>

              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                Brochure
              </button>
            </div>

            {/* SOCIAL PROOF */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://randomuser.me/api/portraits/men/${i}.jpg`} className="w-10 h-10 rounded-full border-2 border-black"/>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Trusted by <span className="text-white font-bold">15,000+ learners</span>
              </p>
            </div>

          </div>

          {/* STATS */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { icon: Zap, label: "Sessions", val: course.sessions },
              { icon: Globe, label: "Learners", val: course.professionals },
              { icon: GraduationCap, label: "Duration", val: course.duration },
              { icon: Shield, label: "Exam", val: String(course.exam || "Included").split(" ")[0] },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.05 }}
                className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition"
              >
                <stat.icon className="mb-3 text-blue-400" />
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold">{stat.val}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {hasCourseFiles && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Course Access
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  {hasAccess
                    ? "Your enrolled course material is ready."
                    : "Enroll in this course to unlock video, PDF, and downloads."}
                </p>
              </div>

              {!hasAccess && (
                <button
                  onClick={handleEnroll}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold w-fit"
                >
                  Enroll To Unlock
                </button>
              )}
            </div>

            {hasAccess ? (
              <div className="space-y-5">
                {course.videoUrl && (
                  <video
                    controls
                    src={course.videoUrl}
                    className="w-full rounded-2xl border border-white/10 bg-black max-h-[520px]"
                  />
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {course.pdfUrl && (
                    <a
                      href={getCourseFileHref(
                        course.pdfUrl,
                        `${course.slug || "course"}-material.pdf`,
                        "inline"
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      <Download className="text-blue-300 mb-3" />
                      <p className="font-bold">Open Course PDF</p>
                      <p className="text-sm text-slate-400 mt-1">
                        View or download the course PDF.
                      </p>
                    </a>
                  )}

                  {course.materialUrl && (
                    <a
                      href={getCourseFileHref(
                        course.materialUrl,
                        course.materialTitle || `${course.slug || "course"}-material`,
                        "attachment"
                      )}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      <BookOpen className="text-purple-300 mb-3" />
                      <p className="font-bold">
                        {course.materialTitle || "Download Course Material"}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        Access the uploaded course resource.
                      </p>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {course.videoUrl && <LockedResource label="Video" />}
                {course.pdfUrl && <LockedResource label="PDF" />}
                {course.materialUrl && <LockedResource label="Upload" />}
              </div>
            )}
          </motion.div>
        )}

        {/* CONTENT */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <h2 className="text-2xl font-bold mb-8">What You Will Master</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {learnItems.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">

              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl">
                <h3 className="text-sm mb-3">Price</h3>
                <p className="text-4xl font-bold">{course.price}</p>

                {/* ✅ CONNECTED */}
                <button
                  onClick={handleReserveSeat}
                  className="mt-6 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold hover:scale-105 transition"
                >
                  Reserve Seat
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-sm mb-4">Prerequisites</h3>
                {prerequisiteItems.map((p, i) => (
                  <p key={i} className="text-gray-400 text-sm">{p}</p>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function LockedResource({ label }: { label: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
        <Download size={18} className="text-slate-300" />
      </div>
      <p className="font-bold">{label}</p>
      <p className="text-sm text-slate-400 mt-1">
        Locked until enrollment.
      </p>
    </div>
  );
}
