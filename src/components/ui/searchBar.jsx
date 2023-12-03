import { Input } from "./input";

function SearchBar({ onSubmitSearch }) {
  return (
    <form className="relative" onSubmit={onSubmitSearch}>
      <Input
        type="text"
        name="search"
        placeholder="What are you looking for?"
        className="w-full relative h-14 px-4 border-solid rounded-full border-zinc-800 focus-within:border-2"
      />
      <button
        type="submit"
        className="absolute bg-primary text-white h-14 rounded-e-full px-5 top-0 right-0"
      >
        search
      </button>
    </form>
  );
}

export default SearchBar;
