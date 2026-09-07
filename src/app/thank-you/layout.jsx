import { constructMetadata } from "@/utils/seo";

export const metadata = constructMetadata({
  title: "Thank You",
  description: "Thank you for contacting Digital Latte.",
  url: "/thank-you",
  noIndex: true,
});

export default function ThankYouLayout({ children }) {
  return children;
}
