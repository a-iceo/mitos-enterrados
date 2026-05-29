export interface SlugComponents {
  gancho: string;
  sujeto: string;
  ubicacion: string;
  intencion: string;
  fullSlug: string;
}

// Preposiciones y artículos comunes en español para limpiar
const commonWordsToClean = new Set([
  "en", "de", "la", "el", "los", "las", "del", "al", "y", "e", "u", "o", "a", "para", "por", "con", "sin", "sobre", "ante", "bajo", "contra", "desde", "hasta", "entre", "durante", "mediante", "según", "tras", "via"
]);

export function decomposeSlug(slugParts: string[]): SlugComponents {
  const slug = slugParts.join("-");
  const words = slug.split("-").filter(word => word.trim().length > 0); // Limpiar espacios vacíos
  const totalWords = words.length;

  let gancho = "";
  let sujeto = "";
  let ubicacion = "";
  let intencion = "";

  // Lógica mejorada para identificar componentes con mayor precisión
  if (totalWords >= 6) {
    gancho = words.slice(0, 3).join(" ");
    // Encontrar la ubicación: buscar palabras que parezcan ubicaciones (o tomar la sección media)
    const midPoint = Math.floor(totalWords / 2);
    sujeto = words.slice(3, midPoint - 1).join(" ");
    ubicacion = words.slice(midPoint - 1, totalWords - 2).join(" ");
    intencion = words.slice(totalWords - 2).join(" ");
  } else if (totalWords >= 4) {
    gancho = words.slice(0, 2).join(" ");
    sujeto = words.slice(2, totalWords - 2).join(" ");
    ubicacion = words[totalWords - 2] || "";
    intencion = words[totalWords - 1] || "";
  } else {
    gancho = "El misterio de";
    sujeto = words.join(" ");
    ubicacion = "tu ciudad";
    intencion = "secretos ocultos";
  }

  // Limpiar preposiciones/artículos comunes al principio/fin de cada sección
  const cleanSection = (str: string): string => {
    const parts = str.toLowerCase().split(" ").filter(w => w.trim().length > 0);
    while (parts.length > 0 && commonWordsToClean.has(parts[0])) {
      parts.shift();
    }
    while (parts.length > 0 && commonWordsToClean.has(parts[parts.length - 1])) {
      parts.pop();
    }
    return parts.join(" ");
  };

  return {
    gancho: capitalize(cleanSection(gancho) || "El misterio de"),
    sujeto: capitalize(cleanSection(sujeto)),
    ubicacion: capitalize(cleanSection(ubicacion)),
    intencion: capitalize(cleanSection(intencion) || "secretos ocultos"),
    fullSlug: slug,
  };
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function generateContent(components: SlugComponents): string {
  // Mejorar los templates para mayor fluidez y evitar duplicaciones
  const templates = [
    `El misterio de ${components.sujeto} en ${components.ubicacion} ha sido guardado por años, pero hoy revelamos las ${components.intencion} que dejarán a todos impactados.`,
    `${components.gancho} ${components.sujeto} en ${components.ubicacion}: Las ${components.intencion} que nadie se atreve a mencionar.`,
    `¿Sabías qué? ${components.sujeto} en ${components.ubicacion} guarda ${components.intencion} que cambiarán tu forma de ver el mundo.`,
    `Los secretos de ${components.sujeto} en ${components.ubicacion} finalmente salen a la luz. Descubre las ${components.intencion} aquí.`,
  ];

  const index = components.fullSlug.length % templates.length;
  return templates[index];
}

export function generateMetaTitle(components: SlugComponents): string {
  return `${components.gancho} ${components.sujeto} en ${components.ubicacion} | Mitos Enterrados`;
}

export function generateMetaDescription(components: SlugComponents): string {
  return `Descubre ${components.gancho} ${components.sujeto} en ${components.ubicacion}. Las ${components.intencion} que te dejarán sin palabras.`;
}
