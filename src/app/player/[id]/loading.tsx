import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PlayerLoading() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48 mx-auto" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32 mx-auto" />
        </CardDescription>
      </CardHeader>
      <CardContent className="text-6xl font-bold p-6">
        <div className="flex justify-center items-center">
          <Skeleton className="h-20 w-20 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
