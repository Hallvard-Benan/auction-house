import { Skeleton } from "../ui/skeleton";

function SkeletonListing() {
  return (
    <>
      <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch md:grid-cols-2 gap-6 ">
        <div className="cols-span-1 md:col-span-2 grid md:grid-cols-5 md:h-96 gap-6 md:gap-8">
          <Skeleton className="h-72 w-calc md:h-96 md:w-auto col-span-1 md:col-span-3"></Skeleton>

          <div className="grid md:col-span-2 md:h-96 items-stretch gap-4">
            <div className="flex flex-col gap-2">
              {/* title */}
              <Skeleton className="w-60 h-14"></Skeleton>

              <div className="flex gap-2 group">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div>
                  <Skeleton className="w-28 h-12"></Skeleton>
                </div>
              </div>
            </div>

            {/* auction ends */}
            <Skeleton className="w w-36 h-8"></Skeleton>

            <div className="grid gap-2">
              <div className="flex text-lg font-semibold text-neutral-700">
                <Skeleton className="h-16 w-24"></Skeleton>
              </div>

              <div className="grid">
                <div className="flex gap-1">
                  <Skeleton className="w-72 h-12" />
                  <Skeleton className="w-20 h-12"></Skeleton>
                </div>
                <Skeleton className="w-24 h-8"></Skeleton>
              </div>
            </div>
          </div>
        </div>

        <Skeleton
          className="w-full md:col-span-2
        h-80"
        ></Skeleton>
      </div>
    </>
  );
}

export default SkeletonListing;
