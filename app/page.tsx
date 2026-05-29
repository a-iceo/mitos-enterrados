import Link from "next/link";
import { CONFIG } from "@/config";

// Función para generar un slug aleatorio usando las listas de config
const generateRandomSlug = () => {
  const gancho = CONFIG.ganchos[Math.floor(Math.random() * CONFIG.ganchos.length)];
  const sujeto = CONFIG.sujetos[Math.floor(Math.random() * CONFIG.sujetos.length)];
  const ubicacion = CONFIG.ubicaciones[Math.floor(Math.random() * CONFIG.ubicaciones.length)];
  const intencion = CONFIG.intenciones[Math.floor(Math.random() * CONFIG.intenciones.length)];
  return `${gancho}-${sujeto}-en-${ubicacion}-${intencion}`;
};

export default function HomePage() {
  // Generar 10 ejemplos de slugs aleatorios
  const exampleSlugs = Array.from({ length: 10 }, generateRandomSlug);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=dark%20mysterious%20paranormal%20background%20with%20fog%20and%20shadows&image_size=landscape_16_9')",
        }}
      />
      <div className="relative z-10 max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-red-600 to-purple-500 bg-clip-text text-transparent">
          Mitos Enterrados
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Descubre los misterios y leyendas ocultas de todo el mundo
        </p>
        <div className="space-y-4 mb-8">
          <p className="text-gray-400">Ejemplos de páginas generadas automáticamente:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {exampleSlugs.map((slug, index) => (
              <Link
                key={index}
                href={`/${slug}`}
                className="px-4 py-2 bg-purple-900/50 text-purple-200 rounded-lg hover:bg-purple-800/70 transition-colors"
              >
                {slug}
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-r from-purple-700 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-red-600 transition-all"
        >
          Generar más ejemplos
        </button>
      </div>
    </div>
  );
}
