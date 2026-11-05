import { HomePage } from "@/components/home/HomePage";
import { getVisitorCount } from "@/lib/visitors";

// The visitor count in the hero refreshes at most once an hour.
export const revalidate = 3600;

export default async function Home() {
  return <HomePage visitorCount={await getVisitorCount()} />;
}
