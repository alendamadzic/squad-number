import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('text-center', className)}>
      <Button variant="link" asChild>
        <Link href="https://alen.world">@alendamadzic</Link>
      </Button>
    </footer>
  );
}
