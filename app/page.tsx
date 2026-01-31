import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-linear-to-b from-[#EFF6FF] via-white to-[#BFDBFE] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-4 animate-fade-in">
            Modern Healthcare<br />
            <span className="bg-linear-to-r from-[#2563EB] to-[#1E40AF] bg-clip-text text-transparent">Management</span> Made Simple
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl animate-fade-in delay-100">
            Streamline your hospital operations with a premium, professional platform. Appointments, records, analytics—everything in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in delay-200">
            <Link
              href="/register"
              className="bg-linear-to-tr from-[#2563EB] to-[#1E40AF] text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="border-2 border-[#2563EB] text-[#2563EB] font-semibold text-lg px-8 py-4 rounded-lg hover:bg-[#EFF6FF] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
            >
              Book a Demo
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center animate-fade-in delay-300">
          <div className="relative w-full max-w-md h-96 rounded-2xl shadow-2xl bg-linear-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
            <svg
              className="w-64 h-64 text-[#2563EB] opacity-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful features designed to simplify healthcare management and improve patient care.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-linear-to-tr from-[#2563EB] to-[#60A5FA] rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Appointment Scheduling</h3>
              <p className="text-gray-600 text-base">Easy-to-use scheduling system for managing patient appointments with automated reminders.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-linear-to-tr from-[#2563EB] to-[#60A5FA] rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Patient Records</h3>
              <p className="text-gray-600 text-base">Secure digital records with complete medical history and treatment information at your fingertips.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-linear-to-tr from-[#2563EB] to-[#60A5FA] rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-gray-600 text-base">Comprehensive analytics and reporting tools to track performance and improve operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-linear-to-r from-[#2563EB] to-[#1E40AF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="rounded-2xl bg-white/10 p-10 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100 text-lg font-medium">Hospitals Using</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-10 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-100 text-lg font-medium">Patients Managed</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-10 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-100 text-lg font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Ready to Transform Your Healthcare Operations?</h2>
          <p className="text-xl text-gray-600 mb-10">Join hundreds of hospitals already using MediCare to improve patient care and streamline operations.</p>
          <Link
            href="/register"
            className="inline-block bg-linear-to-tr from-[#2563EB] to-[#1E40AF] text-white font-semibold text-lg px-10 py-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/30"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}