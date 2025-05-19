import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => (
  <div className="flex flex-col space-y-3 p-6 border rounded-lg bg-card shadow-sm">
    <div className="flex justify-between items-center">
      <Skeleton className="h-5 w-2/5" />
      <Skeleton className="h-5 w-5 rounded-full" />
    </div>
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-[150px] w-full" />
  </div>
);

export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
       <div className="flex justify-end">
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
