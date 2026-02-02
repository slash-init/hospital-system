'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { patientsApi, appointmentsApi, ApiError } from '@/lib/api';
import { format } from 'date-fns';

export default function PatientDashboard() {
  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    phone: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Try to load profile
      try {
        const profileData = await patientsApi.getMe();
        setProfile(profileData);
        
        // Only load appointments if profile exists
        const appointmentsData = await appointmentsApi.getMyPatientAppointments();
        setAppointments(appointmentsData);
      } catch (error) {
        // Profile doesn't exist, show form
        if (error instanceof ApiError && error.status === 404) {
          setShowProfileForm(true);
          setAppointments([]);
        } else {
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProfile = await patientsApi.create({
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
      });
      setProfile(newProfile);
      setShowProfileForm(false);
      toast.success('Profile created successfully!');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create profile');
      }
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
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push('/appointments')}>
                Book Appointment
              </Button>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        {showProfileForm ? (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">Please provide your details to continue</p>
            <form onSubmit={handleCreateProfile} className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  type="text"
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="mt-1"
                  placeholder="Male/Female/Other"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button type="submit">Save Profile</Button>
            </form>
          </Card>
        ) : profile ? (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{profile.user?.name || user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{profile.user?.email || user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{profile.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium">{profile.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
          </Card>
        ) : null}

        {/* Appointments Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Appointments</h2>
            <Button onClick={() => router.push('/appointments')}>Book New</Button>
          </div>
          
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You don&apos;t have any appointments yet.</p>
              <Button onClick={() => router.push('/appointments')}>Book Your First Appointment</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.doctor?.user?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{appointment.doctor?.department || 'N/A'}</TableCell>
                      <TableCell>
                        {(() => {
                          try {
                            return format(new Date(appointment.date), 'PPp');
                          } catch {
                            return 'Invalid date';
                          }
                        })()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'COMPLETED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
