import { Header } from '@/components/header';

export default function PlayerLayout(props: LayoutProps<'/player/[id]'>) {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-4">{props.children}</div>
    </>
  );
}
