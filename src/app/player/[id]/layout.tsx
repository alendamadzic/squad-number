import { Header } from '@/components/header';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
