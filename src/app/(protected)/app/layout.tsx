import { ProfileCheckGuard } from '@/components/ProfileCheckGuard';
import { Footer } from '@/components/Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileCheckGuard>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ProfileCheckGuard>
  );
}
