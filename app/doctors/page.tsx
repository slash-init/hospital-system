'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { doctorsApi, ApiError } from '@/lib/api';

export default function DoctorsPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'PATIENT']}>
      <PageContent />
    </ProtectedRoute>
  );
}

function PageContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = doctors.filter(
        (doctor) =>
          (doctor.user?.name && doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (doctor.department && doctor.department.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [searchTerm, doctors]);

  const loadDoctors = async () => {
    setIsLoading(true);
    try {
      const data = await doctorsApi.getAll();
      setDoctors(data);
      setFilteredDoctors(data);
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
              <h1 className="text-2xl font-bold text-gray-900">Doctors Directory</h1>
              <p className="text-sm text-gray-600">Browse our medical professionals</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => router.push(
                  user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/patient'
                )}
              >
                Back to Dashboard
              </Button>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search by name, specialization, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="ml-4 flex gap-2">
              <Button variant="outline" onClick={loadDoctors}>
                Refresh
              </Button>
              {user?.role === 'PATIENT' && (
                <Button onClick={() => router.push('/appointments')}>
                  Book Appointment
                </Button>
              )}
            </div>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchTerm ? 'No doctors found matching your search.' : 'No doctors registered yet.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredDoctors.length} of {doctors.length} doctors
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Doctor ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDoctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell className="font-medium">
                          Dr. {doctor.user?.name || 'N/A'}
                        </TableCell>
                        <TableCell>{doctor.user?.email || 'N/A'}</TableCell>
                        <TableCell>{doctor.specialization}</TableCell>
                        <TableCell>{doctor.department}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {doctor.id.slice(0, 8)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </Card>

        {/* Departments Overview */}
        {doctors.length > 0 && (
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Departments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from(new Set(doctors.map(d => d.department))).map((dept) => (
                <div key={dept} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">{dept}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {doctors.filter(d => d.department === dept).length} doctor(s)
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
