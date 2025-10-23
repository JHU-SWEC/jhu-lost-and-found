import Link from "next/link";

export default function FoundPage() {
  const placeholder = [
    { id: 1, title: "Gray scarf", location: "MSE Library", date: "2025-10-18" },
    { id: 2, title: "Car keys", location: "Shops Plaza", date: "2025-10-21" },
  ];

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Found Items</h1>
        <p className="text-muted-foreground mb-6">Items other users have marked as found — check here to claim them.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholder.map((item) => (
            <div key={item.id} className="border rounded-md p-4">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-muted-foreground">Location: {item.location}</p>
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
