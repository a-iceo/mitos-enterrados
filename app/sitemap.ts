import { MetadataRoute } from "next";
import { CONFIG } from "@/config";

const BASE_URL = "https://mitos-enterrados.vercel.app";

// Límite práctico para el sitemap inicial
// Google recomienda máx. 50.000 URLs por sitemap
// Escalás agregando más archivos sitemap o usando sitemap index
const MAX_URLS = 50000;

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Página raíz
  urls.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  });

  // Combinación: gancho + sujeto + ubicacion + intencion
  // Total posible: 11 × 14 × 22 × 10 = 33.880 combinaciones base
  outer: for (const gancho of CONFIG.ganchos) {
    for (const sujeto of CONFIG.sujetos) {
      for (const ubicacion of CONFIG.ubicaciones) {
        for (const intencion of CONFIG.intenciones) {
          if (urls.length >= MAX_URLS) break outer;

          const slug = `${gancho}-${sujeto}-en-${ubicacion}-${intencion}`;

          urls.push({
            url: `${BASE_URL}/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    }
  }

  return urls;
}
