'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { NumberHistory } from '@/types';

interface HistoryTabsProps {
  clubs: NumberHistory[];
  international: NumberHistory[];
}

export function HistoryTabs({ clubs, international }: HistoryTabsProps) {
  const [tab, setTab] = useState<'clubs' | 'international'>('clubs');
  const records = tab === 'clubs' ? clubs : international;

  return (
    <div>
      <div className="flex gap-1 mb-3 p-1 bg-muted rounded-[--radius-md] w-fit">
        <TabButton active={tab === 'clubs'} onClick={() => setTab('clubs')}>
          Club
        </TabButton>
        <TabButton active={tab === 'international'} onClick={() => setTab('international')}>
          International
        </TabButton>
      </div>
      <HistoryList records={records} />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1 text-xs font-medium rounded-[--radius-sm] transition-colors',
        active ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}

export function HistoryList({ records }: { records: NumberHistory[] }) {
  if (records.length === 0) {
    return <p className="text-sm text-muted-foreground">No history available.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-border rounded-[--radius-lg] border border-border overflow-hidden">
      {records.map((record) => (
        <HistoryItem key={`${record.season}-${record.club.name}-${record.jerseyNumber}`} record={record} />
      ))}
    </div>
  );
}

function HistoryItem({ record }: { record: NumberHistory }) {
  const color = record.club.colors?.[0];

  return (
    <div className="flex items-center gap-4 px-4 py-3 text-sm">
      <span className="w-12 shrink-0 text-muted-foreground tabular-nums">{record.season}</span>
      <span className="w-8 shrink-0 font-bold tabular-nums" style={{ color: color ?? undefined }}>
        {record.jerseyNumber}
      </span>
      <span className="truncate text-muted-foreground">{record.club.name}</span>
    </div>
  );
}
