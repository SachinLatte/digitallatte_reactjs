import NotFound from "../not-found";

export const metadata = {
  title: "404 - Page Not Found | Digital Latte",
  description: "Looks like the brew isn't strong enough here. Let's find you a perfect brew.",
};

export default function Page404() {
  return <NotFound />;
}
