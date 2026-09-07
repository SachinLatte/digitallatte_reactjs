import NotFound from "../not-found";
import { constructMetadata } from "@/utils/seo";

export const metadata = constructMetadata({
  title: "404 - Page Not Found",
  description: "Looks like the brew isn't strong enough here. Let's find you a perfect brew.",
  url: "/404",
  noIndex: true,
});

export default function Page404() {
  return <NotFound />;
}
