import SkeletonListings from "../Listings/loading";
import { Skeleton } from "../ui/skeleton";

function SkeletonProfile() {
  return (
    <div className="grid gap-10">
      <div className="max-w-full grid gap-4 overflow-hidden">
        <div className="grid md:flex justify-center gap-2 md:gap-4">
          <div className="grid gap-2 justify-items-center">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/17/17004.png"}
              alt=""
              className={` h-44 rounded-lg md:h-72 transition-opacity duration-200 `}
            />
          </div>

          <div className="grid gap-4 md:flex md:flex-col md:justify-center ">
            <Skeleton className="text-xl md:text-2xl text-transparent break-all text-center max-w-[400px]">
              asdfasdf asdfasdfasdfasdfasdfasdf asdf
            </Skeleton>
            <div className="bg-white rounded-lg p-4 flex justify-evenly">
              <div>
                <Skeleton className="text-lg text-transparent font-medium text-center md:text-xl mb-1">
                  7dasfd
                </Skeleton>
                <Skeleton className="text-lg text-transparent font-medium text-center md:text-xl">
                  7dasfd
                </Skeleton>
              </div>
              <div>
                <Skeleton className="text-lg text-transparent font-medium text-center md:text-xl mb-1">
                  7dasfd
                </Skeleton>
                <Skeleton className="text-lg text-transparent font-medium text-center md:text-xl">
                  7dasfd
                </Skeleton>
              </div>
              <div>
                <Skeleton className="text-lg text-transparent font-medium text-center md:text-xl mb-1">
                  7dasfd
                </Skeleton>
                <Skeleton className="text-lg text-transparent font-medium text-center md:text-xl">
                  7dasfd
                </Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <Skeleton className="w-40 h-10" />
        <SkeletonListings />
      </div>
    </div>
  );
}

export default SkeletonProfile;
