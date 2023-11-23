function SearchBar() {
  return (
    <form className="relative">
      <input
        type="text"
        className="w-full h-11 px-4 border-solid border-2 rounded-full border-zinc-800"
      />
      <button
        type="submit"
        className="absolute bg-primary text-white h-11 rounded-e-full px-5 right-0"
      >
        search
      </button>
    </form>
  );
}

export default SearchBar;
