import { Metadata } from "next";
import {
  decomposeSlug,
  generateContent,
  generateMetaTitle,
  generateMetaDescription,
} from "@/lib/utils";
import { CONFIG } from "@/config";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const components = decomposeSlug(params.slug);
  return {
    title: generateMetaTitle(components),
    description: generateMetaDescription(components),
  };
}

export const revalidate = 86400;

export default function SlugPage({ params }: { params: { slug: string[] } }) {
  const components = decomposeSlug(params.slug);
  const content = generateContent(components);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=dark%20mysterious%20paranormal%20background%20with%20fog%20and%20shadows&image_size=landscape_16_9')",
        }}
      />
      <div className="relative z-10 max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-red-600 to-purple-500 bg-clip-text text-transparent">
          {components.gancho} {components.sujeto}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">{content}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={CONFIG.facebookFanpage}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-purple-800 to-purple-900 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105"
          >
            Ver Evidencias en Facebook
          </a>
          <a
            href={CONFIG.bloggerBlog}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-red-800 to-red-900 text-white font-semibold rounded-lg shadow-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105"
          >
            Leer Investigación Completa
          </a>
        </div>
      </div>
    </div>
  );
}
