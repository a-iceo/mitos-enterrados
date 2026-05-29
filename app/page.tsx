import Link from "next/link";

export default function HomePage() {
  const exampleSlugs = [
    "la-leyenda-de-fantasmas-en-madrid-fotos-reales",
    "el-misterio-del-castillo-en-segovia-secretos-ocultos",
    "la-terrorifica-historia-de-la-casa-en-barcelona-testimonios",
  ];

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
        <div className="space-y-4">
          <p className="text-gray-400">Ejemplos de páginas:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {exampleSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="px-4 py-2 bg-purple-900/50 text-purple-200 rounded-lg hover:bg-purple-800/70 transition-colors"
              >
                {slug}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
