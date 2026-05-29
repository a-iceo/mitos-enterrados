import { CONFIG } from "@/config";

export default function sitemap() {
  const baseUrl = "https://mitos-enterrados.vercel.app";
  
  // Generar todas las combinaciones de URLs
  const urls: { url: string; lastModified: Date }[] = [];
  
  // Añadir la página de inicio
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
  });
  
  // Generar combinaciones
  for (const gancho of CONFIG.ganchos) {
    for (const sujeto of CONFIG.sujetos) {
      for (const ubicacion of CONFIG.ubicaciones) {
        for (const intencion of CONFIG.intenciones) {
          const slug = `${gancho}-${sujeto}-en-${ubicacion}-${intencion}`;
          urls.push({
            url: `${baseUrl}/${slug}`,
            lastModified: new Date(),
          });
        }
      }
    }
  }
  
  return urls;
}
