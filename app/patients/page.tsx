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
import { patientsApi, ApiError } from '@/lib/api';

export default function PatientsPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <PageContent />
    </ProtectedRoute>
  );
}

function PageContent() {
  const { logout } = useAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(
        (patient) =>
          (patient.user?.name && patient.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (patient.user?.email && patient.user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (patient.phone && patient.phone.includes(searchTerm))
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  const loadPatients = async () => {
    setIsLoading(true);
    try {
      const data = await patientsApi.getAll();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load patients');
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
              <h1 className="text-2xl font-bold text-gray-900">Patients Management</h1>
              <p className="text-sm text-gray-600">View and manage all registered patients</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push('/dashboard/admin')}>
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
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="ml-4">
              <Button variant="outline" onClick={loadPatients}>
                Refresh
              </Button>
            </div>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchTerm ? 'No patients found matching your search.' : 'No patients registered yet.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredPatients.length} of {patients.length} patients
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Patient ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          {patient.user?.name || 'N/A'}
                        </TableCell>
                        <TableCell>{patient.user?.email || 'N/A'}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {patient.id.slice(0, 8)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
