import { Metadata } from "next";
import { CONFIG } from "@/config";
import RelatedMysteries from "@/components/RelatedMysteries";
import {
  parseSlug,
  readableComponents,
  generateContent,
} from "@/lib/slug-engine";

export const revalidate = 86400;

interface Props {
  params: { slug: string[] };
}

function getRelatedSlugs(
  currentSlug: string,
  sujeto: string,
  ubicacion: string
): string[] {
  const related: string[] = [];
  const seed = currentSlug.length;

  for (let i = 1; i <= 5; i++) {
    const g = CONFIG.ganchos[(seed + i * 3) % CONFIG.ganchos.length];
    const s =
      CONFIG.sujetos[
        (CONFIG.sujetos.indexOf(sujeto || "fantasmas") + i * 2) %
          CONFIG.sujetos.length
      ] || CONFIG.sujetos[i % CONFIG.sujetos.length];
    const u =
      CONFIG.ubicaciones[
        (CONFIG.ubicaciones.indexOf(ubicacion || "mexico") + i * 4) %
          CONFIG.ubicaciones.length
      ] || CONFIG.ubicaciones[i % CONFIG.ubicaciones.length];
    const int = CONFIG.intenciones[(seed + i * 7) % CONFIG.intenciones.length];

    const slug = `${g}-${s}-en-${u}-${int}`;
    if (slug !== currentSlug) related.push(slug);
  }

  return related.slice(0, 5);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const components = parseSlug(params.slug);
  const readable = readableComponents(components);
  const { title, description } = generateContent(readable);
  const canonicalUrl = `https://mitos-enterrados.vercel.app/${params.slug.join("/")}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Mitos Enterrados",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function MitoPage({ params }: Props) {
  const currentSlug = params.slug.join("-");
  const components = parseSlug(params.slug);
  const r = readableComponents(components);
  const { paragraph } = generateContent(r);
  const relatedSlugs = getRelatedSlugs(currentSlug, components.sujeto, components.ubicacion);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0008; color: #e8d5f0; font-family: 'Crimson Text', Georgia, serif; min-height: 100vh; }
        .bg { position: fixed; inset: 0; z-index: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, #2a003a 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, #1a0030 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 70%, #2d0010 0%, transparent 60%), #0a0008; }
        .page { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 0 20px; }
        .top-bar { width: 100%; max-width: 860px; display: flex; justify-content: space-between; align-items: center; padding: 20px 0 14px; border-bottom: 1px solid rgba(120,40,160,0.25); margin-bottom: 48px; }
        .brand { font-family: 'Cinzel Decorative', serif; font-size: 13px; color: #7b3fa0; letter-spacing: 0.15em; text-transform: uppercase; }
        .isr-badge { font-size: 11px; color: rgba(120,80,160,0.5); letter-spacing: 0.1em; }
        .content { width: 100%; max-width: 780px; display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; padding-bottom: 60px; }
        .eyebrow { font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: #8b0000; margin-bottom: 20px; }
        .hook-badge { display: inline-block; background: linear-gradient(135deg, #8b0000, #4a0080); color: #f0d0ff; font-style: italic; font-size: 15px; padding: 6px 22px; border-radius: 2px; margin-bottom: 24px; }
        h1 { font-family: 'Cinzel Decorative', serif; font-size: clamp(24px, 5vw, 44px); line-height: 1.25; color: #f5e6ff; text-shadow: 0 0 40px rgba(140,0,180,0.35); margin-bottom: 14px; }
        h1 .sujeto { color: #d070ff; }
        h1 .ubicacion { color: #ff4060; }
        .intencion-tag { display: inline-block; border: 1px solid rgba(180,50,50,0.5); color: #ff8090; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 18px; border-radius: 2px; margin-bottom: 44px; }
        .divider { width: 120px; height: 1px; background: linear-gradient(90deg, transparent, #6a0a8a, #8b0000, transparent); margin: 0 auto 36px; }
        .lede { font-size: 20px; line-height: 1.75; color: #c9b0d8; max-width: 640px; margin-bottom: 48px; }
        .lede strong { color: #e8d5f0; font-weight: 600; }
        .separator { display: flex; align-items: center; gap: 16px; width: 100%; max-width: 380px; margin: 0 auto 48px; }
        .sep-line { flex: 1; height: 1px; background: rgba(100,30,130,0.4); }
        .cta-block { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 440px; }
        .btn { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 20px 28px; border-radius: 3px; font-family: 'Cinzel Decorative', serif; font-size: 12px; letter-spacing: 0.08em; text-decoration: none; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .btn-fb { background: #4a0080; color: #f0d0ff; box-shadow: 0 4px 20px rgba(80,0,140,0.5), inset 0 1px 0 rgba(200,100,255,0.15); }
        .btn-fb:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(80,0,140,0.7), inset 0 1px 0 rgba(200,100,255,0.15); }
        .btn-blog { background: transparent; color: #ff8090; border: 1px solid rgba(180,30,50,0.6); box-shadow: 0 0 20px rgba(140,0,30,0.2); }
        .btn-blog:hover { transform: translateY(-2px); box-shadow: 0 4px 30px rgba(140,0,30,0.4); }
        .related { width: 100%; max-width: 780px; margin-top: 70px; border-top: 1px solid rgba(100,30,130,0.25); padding-top: 40px; }
        .related-title { font-family: 'Cinzel Decorative', serif; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; color: #6a3a8a; margin-bottom: 24px; text-align: center; }
        .related-grid { display: flex; flex-direction: column; gap: 10px; }
        .related-link { display: flex; align-items: center; gap: 14px; padding: 14px 18px; background: rgba(20,0,30,0.5); border: 1px solid rgba(80,20,110,0.3); border-radius: 3px; text-decoration: none; transition: border-color 0.15s, background 0.15s; }
        .related-link:hover { border-color: rgba(120,40,160,0.6); background: rgba(30,0,45,0.7); }
        .related-icon { font-size: 16px; opacity: 0.6; flex-shrink: 0; }
        .related-text { font-family: 'Crimson Text', serif; font-size: 16px; color: #b090c8; text-align: left; line-height: 1.3; }
        .related-arrow { margin-left: auto; font-size: 14px; color: rgba(120,60,160,0.5); flex-shrink: 0; }
        .footer { width: 100%; max-width: 780px; border-top: 1px solid rgba(80,20,110,0.2); margin-top: 50px; padding: 20px 0; display: flex; justify-content: space-between; font-size: 12px; color: rgba(120,80,160,0.35); letter-spacing: 0.05em; flex-wrap: wrap; gap: 8px; }
        @media (max-width: 600px) { h1 { font-size: 26px; } .top-bar { flex-direction: column; gap: 8px; text-align: center; } .related-text { font-size: 14px; } }
      `}</style>

      <div className="bg" />

      <div className="page">
        <div className="top-bar">
          <div className="brand">⬡ Mitos Enterrados</div>
          <div className="isr-badge">ISR · 24h cache</div>
        </div>

        <div className="content">
          <div className="eyebrow">Investigación clasificada · Acceso restringido</div>
          <div className="hook-badge">{r.gancho}</div>
          <h1>
            <span className="sujeto">{r.sujeto}</span>
            <br />
            en <span className="ubicacion">{r.ubicacion}</span>
          </h1>
          <div className="intencion-tag">📷 {r.intencion}</div>
          <div className="divider" />
          <p className="lede">{paragraph}</p>
          <div className="separator">
            <div className="sep-line" />
            <span style={{ opacity: 0.5 }}>✦</span>
            <div className="sep-line" />
          </div>
          <div className="cta-block">
            <a className="btn btn-fb" href={CONFIG.destinations.facebook} target="_blank" rel="noopener noreferrer">
              👁 &nbsp;Ver Evidencias en Facebook
            </a>
            <a className="btn btn-blog" href={CONFIG.destinations.blog} target="_blank" rel="noopener noreferrer">
              📜 &nbsp;Leer Investigación Completa
            </a>
          </div>
        </div>

        <RelatedMysteries slugs={relatedSlugs} />

        <div className="footer">
          <span>© Mitos Enterrados</span>
          <span>Next.js 14 · ISR · Vercel Edge</span>
          <span>~10M URLs indexables</span>
        </div>
      </div>
    </>
  );
}
