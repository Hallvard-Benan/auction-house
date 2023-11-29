import { Router, Route, RootRoute } from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import ProfilePage from "./pages/ProfilePage";
import CreateListingPage from "./pages/CreateListingPage";
import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const listingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listing",
  component: ListingPage,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const createListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: CreateListingPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  listingRoute,
  profileRoute,
  createListingRoute,
]);

export const router = new Router({ routeTree });
export default router;
