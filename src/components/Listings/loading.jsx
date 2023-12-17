import SkeletonCard from "../ui/skeletonCard";
function SkeletonListings() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center align-center">
      {"abcdefghi".split("").map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default SkeletonListings;
