"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/api-lib";


const countries = [
  { name: "UAE", code: "ae" },
  { name: "USA", code: "us" },
  { name: "UK", code: "gb" },
  { name: "India", code: "in" },
  { name: "Bangladesh", code: "bd" },
];

export default function Home() {
  const [country, setCountry] = useState("ae");
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNews(country);
  }, [country]);

  const loadNews = async (countryCode: string) => {
    try {
      setLoading(true);
      const articles = await api.getNewsEveryCountry(countryCode);
      setNews(articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-3xl font-bold text-zinc-800 dark:text-white">
          Top Headlines
        </h1>

        {/* Country Select */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mb-8 rounded-lg border px-4 py-2 dark:bg-zinc-900 dark:text-white"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Loading */}
        {loading && <p className="text-zinc-500">Loading news...</p>}

        {/* News Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              className="overflow-hidden rounded-xl bg-white shadow transition hover:scale-[1.02] dark:bg-zinc-900"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full">
                <Image
                  key={index}
                  src={article.urlToImage || "/news-placeholder.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category Badge */}
                <span className="mb-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                  Top Headlines
                </span>

                {/* Title */}
                <h2 className="line-clamp-2 text-lg font-semibold text-zinc-800 dark:text-white">
                  {article.title}
                </h2>

                {/* Description */}
                <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {article.description || "No description available."}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>{article.source?.name}</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
