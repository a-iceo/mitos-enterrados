import { CONFIG } from "@/config";

export interface SlugComponents {
  gancho: string;
  sujeto: string;
  ubicacion: string;
  intencion: string;
  raw: string;
}

function toReadable(slug: string): string {
  return slug
    .split("-")
    .filter((w) => w !== "en") // evita doble "en" en frases
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function parseSlug(slugParts: string[]): SlugComponents {
  const raw = slugParts.join("/");
  const str = slugParts.join("-").toLowerCase();

  let gancho = "";
  let sujeto = "";
  let ubicacion = "";
  let intencion = "";

  // 1. Detectar gancho (más largo primero para evitar matches parciales)
  const sortedGanchos = [...CONFIG.ganchos].sort((a, b) => b.length - a.length);
  for (const g of sortedGanchos) {
    if (str.startsWith(g + "-") || str === g) {
      gancho = g;
      break;
    }
  }

  // 2. Detectar intención (desde el final)
  const sortedIntenciones = [...CONFIG.intenciones].sort(
    (a, b) => b.length - a.length
  );
  let remaining = gancho ? str.slice(gancho.length + 1) : str;
  for (const i of sortedIntenciones) {
    if (remaining.endsWith("-" + i) || remaining === i) {
      intencion = i;
      remaining =
        remaining === i
          ? ""
          : remaining.slice(0, remaining.length - i.length - 1);
      break;
    }
  }

  // 3. Detectar ubicación con patrón "-en-{ubicacion}"
  const sortedUbicaciones = [...CONFIG.ubicaciones].sort(
    (a, b) => b.length - a.length
  );
  for (const u of sortedUbicaciones) {
    const pattern = "-en-" + u;
    if (remaining.includes(pattern)) {
      ubicacion = u;
      const idx = remaining.lastIndexOf(pattern);
      sujeto = remaining.slice(0, idx);
      remaining = "";
      break;
    }
  }

  // 4. Fallback: detectar sujeto directamente si no hubo patrón "-en-"
  if (!sujeto && remaining) {
    const sortedSujetos = [...CONFIG.sujetos].sort(
      (a, b) => b.length - a.length
    );
    for (const s of sortedSujetos) {
      if (remaining.startsWith(s)) {
        sujeto = s;
        break;
      }
    }
    if (!sujeto) sujeto = remaining;
  }

  return { gancho, sujeto, ubicacion, intencion, raw };
}

// Convierte componentes internos a texto legible para UI y SEO
export function readableComponents(c: SlugComponents) {
  return {
    gancho: c.gancho ? toReadable(c.gancho) : "El Misterio De",
    sujeto: c.sujeto ? toReadable(c.sujeto) : "lo Desconocido",
    ubicacion: c.ubicacion ? toReadable(c.ubicacion) : "el Mundo",
    intencion: c.intencion ? toReadable(c.intencion) : "la Verdad",
  };
}

// Templates de texto para variedad de contenido
const TEMPLATES = [
  (s: string, u: string, i: string) =>
    `El misterio de los ${s} en ${u} ha sido guardado en silencio por décadas. Hoy, por primera vez, las ${i} que cambiarán todo salen a la luz.`,
  (s: string, u: string, i: string) =>
    `Lo que ocurre con los ${s} en ${u} nunca fue documentado públicamente — hasta ahora. Estas ${i} son la evidencia que muchos prefieren ignorar.`,
  (s: string, u: string, i: string) =>
    `Investigadores independientes llevan años recopilando ${i} sobre los ${s} en ${u}. Lo que descubrieron desafía cualquier explicación convencional.`,
  (s: string, u: string, i: string) =>
    `Archivos censurados, testigos anónimos y ${i} sin filtros: el fenómeno de los ${s} en ${u} finalmente tiene nombre y apellido.`,
  (s: string, u: string, i: string) =>
    `¿Por qué nadie habla de los ${s} en ${u}? Las ${i} que encontramos revelan una historia que el sistema quiso mantener enterrada.`,
];

export function generateContent(c: ReturnType<typeof readableComponents>): {
  paragraph: string;
  title: string;
  description: string;
} {
  const { sujeto, ubicacion, intencion, gancho } = c;

  // Selección pseudo-aleatoria determinística basada en los componentes
  const hash =
    (sujeto.length + ubicacion.length * 3 + intencion.length * 7) %
    TEMPLATES.length;
  const paragraph = TEMPLATES[hash](
    sujeto.toLowerCase(),
    ubicacion,
    intencion.toLowerCase()
  );

  const title = `${gancho} ${sujeto} en ${ubicacion} — ${intencion} | Mitos Enterrados`;
  const description = `${paragraph.slice(0, 152)}…`;

  return { paragraph, title, description };
}
