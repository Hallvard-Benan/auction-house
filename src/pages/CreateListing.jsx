import React from "react";
import SearchBar from "../components/ui/searchBar";
import CreateListingForm from "../components/Forms/createListingForm";

function CreateListing() {
  return (
    <main className="grid gap-6 w-calc">
      <SearchBar />
      <CreateListingForm></CreateListingForm>
    </main>
  );
}

export default CreateListing;
