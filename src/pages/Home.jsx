import React, { useEffect, useState } from "react";
import { fetchAllListings } from "../lib/api";
import Listings from "../components/Listings";

function Home() {
  return <Listings />;
}

export default Home;
