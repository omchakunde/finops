"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin-page")) {
    return null;
  }

  return (
    <footer className="bg-[#0b3c4c] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="w-full md:w-2/3">
            <p className="mb-2 font-medium">Subscribe to our Newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md text-black outline-none"
              />
              <button className="bg-blue-500 px-6 rounded-r-md hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg">
            <FaYoutube className="cursor-pointer hover:text-blue-400" />
            <FaFacebookF className="cursor-pointer hover:text-blue-400" />
            <FaInstagram className="cursor-pointer hover:text-blue-400" />
            <FaLinkedinIn className="cursor-pointer hover:text-blue-400" />
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
          </div>
        </div>

        {/* Main Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/20 pt-10">

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>About us</li>
              <li>Leadership</li>
              <li>Contact Us</li>
              <li>Webinars</li>
              <li>Our Clients</li>
              <li>All Courses</li>
              <li>Our Partners</li>
              <li>Testimonials</li>
              <li>Our Awards</li>
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h3 className="font-semibold mb-4">Learning Options</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Explore All Learning</li>
              <li>Live Online Training</li>
              <li>1-on-1 Training</li>
              <li>Classroom Training</li>
              <li>Fly-Me-a-Trainer</li>
              <li>Flexi</li>
              <li>Customized Training</li>
              <li>Webinar as a Service</li>
              <li>Techlabs</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Technical Q&A</li>
              <li>Blog</li>
              <li>Sitemap</li>
              <li>Koenig Koshish</li>
              <li>Qubits</li>
              <li>Certificate Authenticator</li>
              <li>Microsoft Products</li>
            </ul>
          </div>

          {/* Others */}
          <div>
            <h3 className="font-semibold mb-4">Others</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Environment Policy</li>
              <li>Payment Methods</li>
              <li>Terms of Service</li>
              <li>Career</li>
              <li>Privacy Policy</li>
              <li>What's New</li>
              <li>Media Report</li>
            </ul>
          </div>
        </div>

        {/* Extra Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/20 mt-10 pt-10">

          <div>
            <h3 className="font-semibold mb-4">Top Technologies</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Cloud Computing</li>
              <li>Artificial Intelligence</li>
              <li>Microsoft Office</li>
              <li>Security</li>
              <li>Microsoft Dynamics</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Top Partners</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Microsoft</li>
              <li>AWS</li>
              <li>Cisco</li>
              <li>PECB</li>
              <li>VMware</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Top Courses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>PL-300</li>
              <li>AZ-104</li>
              <li>AI-102</li>
              <li>ITIL 4</li>
              <li>Automation in a Day</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-10 pt-6 text-xs text-gray-400 text-center space-y-2">
          <p>
            © 1997 - 2026, All rights reserved.
          </p>
          <p>
            We believe in continuous improvement. Keep visiting for updates.
          </p>
        </div>

      </div>
    </footer>
  );
}
