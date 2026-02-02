'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect logged-in users to their dashboard
      switch (user.role) {
        case 'PATIENT':
          router.push('/dashboard/patient');
          break;
        case 'DOCTOR':
          router.push('/dashboard/doctor');
          break;
        case 'ADMIN':
          router.push('/dashboard/admin');
          break;
        default:
          router.push('/dashboard');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="bg-linear-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Modern Healthcare<br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Management
            </span>{' '}
            Made Simple
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
            Streamline your hospital operations with a premium, professional platform. 
            Appointments, records, analytics—everything in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button asChild size="lg" className="text-lg">
              <Link href="/auth/register">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-md h-96 rounded-2xl shadow-2xl bg-linear-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center">
            <svg
              className="w-64 h-64 text-blue-600 opacity-90"
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
            <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to simplify healthcare management and improve patient care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-linear-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Appointment Scheduling
              </h3>
              <p className="text-gray-600 text-base">
                Easy-to-use scheduling system for managing patient appointments with automated reminders.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-linear-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Patient Records</h3>
              <p className="text-gray-600 text-base">
                Secure digital records with complete medical history and treatment information at your
                fingertips.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-linear-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-gray-600 text-base">
                Comprehensive analytics and reporting tools to track performance and improve operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="rounded-2xl bg-white/10 p-10 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100 text-lg font-medium">Hospitals Using</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-10 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-100 text-lg font-medium">Patients Served</div>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join hundreds of hospitals already using MediCare to improve patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/auth/register">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}