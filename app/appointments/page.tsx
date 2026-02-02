'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { doctorsApi, appointmentsApi, ApiError } from '@/lib/api';

const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Please select a doctor'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function AppointmentsPage() {
  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <PageContent />
    </ProtectedRoute>
  );
}

function PageContent() {
  const { logout } = useAuth();
  const router = useRouter();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setIsLoading(true);
    try {
      const data = await doctorsApi.getAll();
      setDoctors(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load doctors');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      // Combine date and time
      const dateTime = new Date(`${data.date}T${data.time}`);
      
      await appointmentsApi.create({
        doctorId: data.doctorId,
        date: dateTime.toISOString(),
      });

      toast.success('Appointment booked successfully!');
      reset();
      router.push('/dashboard/patient');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to book appointment');
      }
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
              <p className="text-sm text-gray-600">Schedule your visit with a doctor</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push('/dashboard/patient')}>
                Back to Dashboard
              </Button>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-6">Appointment Details</h2>
          
          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No doctors available at the moment.</p>
              <Button onClick={loadDoctors}>Retry</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="doctorId">Select Doctor</Label>
                <Select
                  id="doctorId"
                  {...register('doctorId')}
                  className="mt-1"
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.user?.name} - {doctor.specialization} ({doctor.department})
                    </option>
                  ))}
                </Select>
                {errors.doctorId && (
                  <p className="text-sm text-red-600 mt-1">{errors.doctorId.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    {...register('date')}
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    {...register('time')}
                    className="mt-1"
                  />
                  {errors.time && (
                    <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Your appointment will be pending until confirmed by the doctor. 
                  You will receive a notification once your appointment is confirmed.
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/patient')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Available Doctors Section */}
        {doctors.length > 0 && (
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Available Doctors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Dr. {doctor.user?.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500">{doctor.department} Department</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
