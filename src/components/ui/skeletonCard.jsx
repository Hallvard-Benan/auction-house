import { Card, CardContent, CardHeader, CardFooter } from "./card";
import { Skeleton } from "./skeleton";

export default function SkeletonCard() {
  return (
    <Card className="w-full h-[26rem] overflow-hidden">
      <CardContent className="grid gap-2 px-0">
        <Skeleton className="h-[18rem] " />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Skeleton className="w-60 h-9" />
        <Skeleton className="w-20 h-8" />
      </CardFooter>
    </Card>
  );
}
