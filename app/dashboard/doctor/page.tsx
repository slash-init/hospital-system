'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { appointmentsApi, ApiError } from '@/lib/api';
import { format } from 'date-fns';

export default function DoctorDashboard() {
  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string>('today');

  useEffect(() => {
    loadAppointments();
  }, [dateFilter]);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await appointmentsApi.getMyDoctorAppointments(dateFilter === 'all' ? undefined : dateFilter);
      setAppointments(data);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error('Failed to load appointments');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await appointmentsApi.update({ id, status });
      toast.success(`Appointment ${status.toLowerCase()} successfully`);
      loadAppointments();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Failed to update appointment');
      }
    } finally {
      setUpdatingId(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, Dr. {user?.name}</p>
            </div>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                {dateFilter === 'today' ? "Today's Appointments" : 'All Appointments'}
              </h2>
              <div className="flex gap-2 mt-2">
                <Button 
                  size="sm" 
                  variant={dateFilter === 'today' ? 'default' : 'outline'}
                  onClick={() => setDateFilter('today')}
                >
                  Today
                </Button>
                <Button 
                  size="sm" 
                  variant={dateFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setDateFilter('all')}
                >
                  All
                </Button>
              </div>
            </div>
            <Button variant="outline" onClick={loadAppointments}>
              Refresh
            </Button>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {dateFilter === 'today' 
                  ? "No appointments scheduled for today." 
                  : "No appointments found."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.patient?.user?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{appointment.patient?.age || 'N/A'}</TableCell>
                      <TableCell>{appointment.patient?.gender || 'N/A'}</TableCell>
                      <TableCell>{appointment.patient?.phone || 'N/A'}</TableCell>
                      <TableCell>
                        {(() => {
                          try {
                            return format(new Date(appointment.date), 'p');
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
                      <TableCell>
                        <div className="flex gap-2">
                          {appointment.status === 'PENDING' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(appointment.id, 'CONFIRMED')}
                              disabled={updatingId === appointment.id}
                            >
                              Confirm
                            </Button>
                          )}
                          {appointment.status === 'CONFIRMED' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(appointment.id, 'COMPLETED')}
                              disabled={updatingId === appointment.id}
                            >
                              Complete
                            </Button>
                          )}
                          {appointment.status !== 'COMPLETED' && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleUpdateStatus(appointment.id, 'CANCELLED')}
                              disabled={updatingId === appointment.id}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
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
