import React from "react";
import SearchBar from "../components/ui/searchBar";
import CreateListingForm from "../components/Forms/createListingForm";

function CreateListingPage() {
  return (
    <main className="grid gap-6 w-calc">
      <SearchBar />
      <CreateListingForm></CreateListingForm>
    </main>
  );
}

export default CreateListingPage;
