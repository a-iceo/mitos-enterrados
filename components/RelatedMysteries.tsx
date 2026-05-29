"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedMysteriesProps {
  slugs: string[];
}

function toReadable(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function RelatedMysteries({
  slugs,
}: RelatedMysteriesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="related">
      <div className="related-title">⬡ Otros Misterios Relacionados</div>
      <div className="related-grid">
        {slugs.map((slug) => (
          <Link key={slug} href={`/${slug}`} className="related-link">
            <span className="related-icon">🕯</span>
            <span className="related-text">{toReadable(slug)}</span>
            <span className="related-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
