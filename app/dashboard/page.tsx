'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/auth/login');
      } else {
        // Redirect to role-specific dashboard
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
            router.push('/auth/login');
        }
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
