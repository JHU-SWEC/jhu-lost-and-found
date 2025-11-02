import Link from "next/link";

export default function LostPage() {
  // Placeholder data for now — replace with real API results later
  const placeholder = [
    { id: 1, title: "Blue backpack", location: "Gilman Hall", date: "2025-10-12" },
    { id: 2, title: "Silver MacBook", location: "Homewood Library", date: "2025-10-20" },
  ];

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Lost Items</h1>
        <p className="text-muted-foreground mb-6">Browse items other users have reported as lost.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholder.map((item) => (
            <div key={item.id} className="rounded-2xl border bg-white p-4 shadow-sm transition duration-200 ease-out group-hover:shadow-xl group-focus:shadow-xl group-hover:scale-[1.02] group-focus:scale-[1.02]">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">Location: {item.location}</p>
              <p className="text-sm text-muted-foreground">Date reported: {item.date}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/report" className="inline-block rounded bg-blue-600 text-white px-4 py-2">
            Report a lost or found item
          </Link>
        </div>
      </div>
    </main>
  );
}
