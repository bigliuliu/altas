"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ClientComponentDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') {
      // Session data is still being loaded, do nothing
      return;
    }

    if (!session || session?.user?.userdata?.role !== 'government') {
      redirect('/login');
    }
  }, [session, status]);

  return <>{children}</>;
}
