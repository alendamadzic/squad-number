import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('text-center', className)}>
      <Link
        href="https://alen.world"
        className="text-xs text-white/40 hover:text-white/70 transition-colors no-underline"
      >
        @alendamadzic
      </Link>
    </footer>
  );
}
