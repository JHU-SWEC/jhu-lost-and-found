import Link from "next/link";
import FoundItemsView, { FoundItem } from "./components/FoundItemsView";

export default function FoundPage() {
  const placeholder: FoundItem[] = [
    {
      id: 1,
      title: "Gray scarf",
      location: "MSE Library",
      date: "2025-10-18",
      description:
        "Found near the first-floor printers. No tag. Stored at the front desk. ",
    },
    {
      id: 2,
      title: "Car keys",
      location: "Brody Reading Room",
      date: "2025-10-21",
      description:
        "Hyundai. Blue lanyard with cracked clip.",
    },
  ];

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-1">Found Items</h1>
        <p className="text-muted-foreground mb-6">
          Items other users have marked as found — hover (or focus) to preview more details.
        </p>

        <FoundItemsView items={placeholder} />

        <div className="mt-8">
          <Link href="/report" className="inline-block rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
            Report a lost or found item
          </Link>
        </div>
      </div>
    </main>
  );
}
