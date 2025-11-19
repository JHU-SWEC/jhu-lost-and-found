"use client";

import { useState } from "react";
import Link from "next/link";

export type FoundItem = {
  id: number;
  title: string;
  location: string;
  date: string;         // ISO or yyyy-mm-dd
  brief?: string;
  description?: string;
};



type Props = { items: FoundItem[] };

export default function FoundItemsView({ items }: Props) {
  const [view, setView] = useState<"tiles" | "list">("tiles");

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });

  return (
    <section>
      {/* Top bar with dropdown on the right */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="sr-only">Found items</h2>
        <div className="ml-auto">
          <label className="mr-2 text-sm text-gray-600" htmlFor="viewSelect">View</label>
          <select
            id="viewSelect"
            className="rounded-md border px-2 py-1 text-sm"
            value={view}
            onChange={(e) => setView(e.target.value as "tiles" | "list")}
          >
            <option value="tiles">Tiles</option>
            <option value="list">List</option>
          </select>
        </div>
      </div>

      {/* Tiles view */}
      {view === "tiles" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative focus:outline-none"
              tabIndex={0}
              aria-describedby={`item-${item.id}-popover`}
            >
              <article className="rounded-2xl border bg-white p-4 shadow-sm transition duration-200 ease-out group-hover:shadow-xl group-focus:shadow-xl group-hover:scale-[1.02] group-focus:scale-[1.02]">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">Location: {item.location}</p>
                <p className="text-sm text-muted-foreground">Date reported: {fmtDate(item.date)}</p>
              </article>

              {/* Hover/focus popover */}
              <div
                id={`item-${item.id}-popover`}
                className="pointer-events-auto absolute left-0 right-0 z-20 translate-y-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-y-0 group-focus:translate-y-0 transition duration-200"
              >
                <div className="mt-2 rounded-2xl border bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                  <div className="p-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">{item.title}</span>
                      <span aria-hidden>•</span>
                      <span>{item.location}</span>
                      <span aria-hidden>•</span>
                      <span>Reported {fmtDate(item.date)}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                      {item.description ?? "No additional information provided."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/found/${item.id}`}
                        className="inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        View details
                      </Link>
                      <Link
                        href={`/claim/${item.id}`}
                        className="inline-flex items-center rounded-xl bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"
                      >
                        Claim this item
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="overflow-hidden rounded-2xl border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date reported</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">{fmtDate(item.date)}</td>
                  <td className="px-4 py-3 text-gray-700">{item.description ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/found/${item.id}`}
                      className="rounded-md border px-3 py-1.5 hover:bg-gray-50"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
