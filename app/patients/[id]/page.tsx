'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { patientsApi, ApiError } from '@/lib/api';

export default function PatientDetailPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR']}>
      <PageContent />
    </ProtectedRoute>
  );
}

function PageContent() {
  const { logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [patient, setPatient] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPatient();
  }, [params.id]);

  const loadPatient = async () => {
    setIsLoading(true);
    try {
      const data = await patientsApi.getAll();
      const foundPatient = data.find((p: any) => p.id === params.id);
      if (!foundPatient) {
        toast.error('Patient not found');
        router.push('/patients');
        return;
      }
      setPatient(foundPatient);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load patient details');
      }
      router.push('/patients');
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

  if (!patient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Patient Details</h1>
            <Button variant="outline" onClick={() => router.push('/patients')}>
              Back to Patients
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {patient.user?.name || 'N/A'}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{patient.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-medium text-gray-900">{patient.age || 'N/A'} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium text-gray-900">{patient.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{patient.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Patient ID: {patient.id}</p>
                <p>• Status: Active</p>
                <p>• Registered on: {new Date(patient.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
