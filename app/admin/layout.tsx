'use client';

import { AuthProvider } from '@/lib/auth-context';
import { AdminGuard } from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminGuard>
        <AdminLayout>{children}</AdminLayout>
      </AdminGuard>
    </AuthProvider>
  );
}
