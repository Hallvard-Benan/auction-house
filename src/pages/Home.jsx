import Listings from "../components/Listings";

function Home() {
  return (
    <main className="grid gap-6">
      <form className="relative">
        <input
          type="text"
          className="w-full h-11 px-4 border-solid border-2 rounded-full border-zinc-800"
        />
        <button
          type="submit"
          className="absolute bg-slate-900 text-white h-11 rounded-e-full px-5 right-0"
        >
          search
        </button>
      </form>
      <Listings />
    </main>
  );
}

export default Home;
