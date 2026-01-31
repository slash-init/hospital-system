import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MediCare - Hospital Management System",
  description: "Professional healthcare management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white/90 backdrop-blur border-b border-gray-200 shadow-md sticky top-0 z-50 transition-all">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-linear-to-tr from-[#2563EB] to-[#1E40AF] shadow-lg rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-[#2563EB] transition-colors">
                    MediCare
                  </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                  {[
                    { href: "/appointments", label: "Appointments" },
                    { href: "/patients", label: "Patients" },
                    { href: "/doctors", label: "Doctors" },
                    { href: "/dashboard", label: "Dashboard" },
                  ].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="relative px-2 py-1 text-gray-600 font-medium hover:text-[#2563EB] transition-colors group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30 rounded-lg"
                    >
                      <span>{label}</span>
                      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-linear-to-r from-[#60A5FA] to-[#2563EB] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                    </Link>
                  ))}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-[#2563EB] font-medium transition-colors px-4 py-2 rounded-lg hover:bg-[#EFF6FF] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-linear-to-tr from-[#2563EB] to-[#1E40AF] shadow-md text-white px-6 py-3 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#2563EB] transition-all border border-[#2563EB]/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-linear-to-br from-[#EFF6FF] via-white to-[#BFDBFE] py-10 px-2 md:px-0">
            <div className="max-w-7xl mx-auto w-full animate-fade-in">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-linear-to-tr from-[#2563EB] to-[#1E40AF] text-white border-t border-[#1E40AF] mt-auto shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-linear-to-tr from-[#2563EB] to-[#60A5FA] rounded-lg flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                      MediCare
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm max-w-md">
                    Empowering healthcare providers with modern technology for
                    better patient care and efficient hospital management.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold text-white mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/about"
                        className="text-blue-100 hover:text-white text-sm transition-colors"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="text-blue-100 hover:text-white text-sm transition-colors"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-blue-100 hover:text-white text-sm transition-colors"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/help"
                        className="text-blue-100 hover:text-white text-sm transition-colors"
                      >
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-blue-100 hover:text-white text-sm transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-blue-100 hover:text-white text-sm transition-colors"
                      >
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-[#1E40AF] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-blue-100 text-sm">
                  © 2024 MediCare. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}