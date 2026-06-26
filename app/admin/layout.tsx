import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Meatopia Admin',
  description: 'Admin dashboard for Meatopia',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-layout">{children}</div>;
}
