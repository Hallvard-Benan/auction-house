import { Card, CardContent, CardHeader, CardFooter } from "./card";
import { Skeleton } from "./skeleton";

export default function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-24 h-8" />
      </CardHeader>
      <CardContent className="grid gap-2">
        <Skeleton className="w-full h-56" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-24 h-4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-24 h-10" />
      </CardFooter>
    </Card>
  );
}
