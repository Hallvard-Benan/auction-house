import { Router, Route, RootRoute } from "@tanstack/react-router";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const listingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listing",
  component: Listing,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const createListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: CreateListing,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  listingRoute,
  profileRoute,
  createListingRoute,
]);

export const router = new Router({ routeTree });
export default router;
