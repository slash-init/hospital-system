'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { doctorsApi, ApiError } from '@/lib/api';

export default function DoctorDetailPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'PATIENT']}>
      <PageContent />
    </ProtectedRoute>
  );
}

function PageContent() {
  const { logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [doctor, setDoctor] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctor();
  }, [params.id]);

  const loadDoctor = async () => {
    setIsLoading(true);
    try {
      const data = await doctorsApi.getAll();
      const foundDoctor = data.find((d: any) => d.id === params.id);
      if (!foundDoctor) {
        toast.error('Doctor not found');
        router.push('/doctors');
        return;
      }
      setDoctor(foundDoctor);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load doctor details');
      }
      router.push('/doctors');
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!doctor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Doctor Details</h1>
            <Button variant="outline" onClick={() => router.push('/doctors')}>
              Back to Doctors
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {doctor.user?.name || 'N/A'}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{doctor.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialization</p>
                  <p className="font-medium text-gray-900">{doctor.specialization || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">{doctor.department || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600">
                Dr. {doctor.user?.name?.split(' ').pop()} is a qualified medical professional specializing in {doctor.specialization}
                at our {doctor.department} department. Available for appointments and consultations.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
