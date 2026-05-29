'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CONFIG } from '@/config';

function generateRandomSlug() {
  const g = CONFIG.ganchos[Math.floor(Math.random() * CONFIG.ganchos.length)];
  const s = CONFIG.sujetos[Math.floor(Math.random() * CONFIG.sujetos.length)];
  const u = CONFIG.ubicaciones[Math.floor(Math.random() * CONFIG.ubicaciones.length)];
  const i = CONFIG.intenciones[Math.floor(Math.random() * CONFIG.intenciones.length)];
  return `${g}-${s}-en-${u}-${i}`;
}

function toReadable(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function Home() {
  const [slugs, setSlugs] = useState(() => 
    Array.from({ length: 8 }, generateRandomSlug)
  );

  const regenerate = () => {
    setSlugs(Array.from({ length: 8 }, generateRandomSlug));
  };

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
        .content { width: 100%; max-width: 780px; display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; padding-bottom: 60px; }
        h1 { font-family: 'Cinzel Decorative', serif; font-size: clamp(32px, 6vw, 56px); line-height: 1.1; color: #f5e6ff; text-shadow: 0 0 40px rgba(140,0,180,0.35); margin-bottom: 16px; }
        h1 span { color: #ff4060; }
        .subtitle { font-size: 20px; line-height: 1.6; color: #c9b0d8; max-width: 560px; margin-bottom: 48px; }
        .generate-btn { font-family: 'Cinzel Decorative', serif; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; background: rgba(80,0,140,0.3); border: 1px solid rgba(120,40,160,0.5); color: #d070ff; padding: 12px 32px; border-radius: 3px; cursor: pointer; transition: all 0.15s ease; margin-bottom: 32px; }
        .generate-btn:hover { background: rgba(80,0,140,0.5); transform: translateY(-2px); }
        .slugs-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; width: 100%; max-width: 600px; }
        .slug-link { display: block; padding: 16px 20px; background: rgba(20,0,30,0.5); border: 1px solid rgba(80,20,110,0.3); border-radius: 3px; text-decoration: none; text-align: left; transition: all 0.15s ease; }
        .slug-link:hover { border-color: rgba(120,40,160,0.6); background: rgba(30,0,45,0.7); transform: translateY(-2px); }
        .slug-text { font-family: 'Crimson Text', serif; font-size: 15px; color: #b090c8; line-height: 1.4; }
        .slug-icon { font-size: 14px; margin-right: 8px; opacity: 0.7; }
        .footer { width: 100%; max-width: 780px; border-top: 1px solid rgba(80,20,110,0.2); margin-top: 60px; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: rgba(120,80,160,0.35); letter-spacing: 0.05em; flex-wrap: wrap; gap: 8px; }
        @media (max-width: 600px) { 
          .slugs-grid { grid-template-columns: 1fr; }
          h1 { font-size: 28px; } 
          .top-bar { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="bg" />

      <div className="page">
        <div className="top-bar">
          <div className="brand">⬡ Mitos Enterrados</div>
        </div>

        <div className="content">
          <h1>
            Misterios <span>enterrados</span> de todo el mundo
          </h1>
          <p className="subtitle">
            Descubre investigaciones paranormales, fenómenos inexplicables y evidencias que el sistema quiso mantener ocultas.
          </p>

          <button className="generate-btn" onClick={regenerate}>
            🔄 Generar nuevos misterios
          </button>

          <div className="slugs-grid">
            {slugs.map((slug) => (
              <Link key={slug} href={`/${slug}`} className="slug-link">
                <span className="slug-text">
                  <span className="slug-icon">🕯</span>
                  {toReadable(slug)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="footer">
          <span>© Mitos Enterrados</span>
          <span>Next.js 14 · ISR · Vercel Edge</span>
          <span>~10M URLs indexables</span>
        </div>
      </div>
    </>
  );
}
