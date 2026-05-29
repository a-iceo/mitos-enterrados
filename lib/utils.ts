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

// Limpiar un string de palabras comunes al principio/final
const cleanString = (str: string): string => {
  const parts = str.toLowerCase().split(" ").filter(w => w.trim().length > 0);
  // Quitar palabras comunes del principio
  while (parts.length > 0 && commonWordsToClean.has(parts[0])) {
    parts.shift();
  }
  // Quitar palabras comunes del final
  while (parts.length > 0 && commonWordsToClean.has(parts[parts.length - 1])) {
    parts.pop();
  }
  return parts.join(" ");
};

// Capitalizar primera letra y el resto en minúsculas
const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function decomposeSlug(slugParts: string[]): SlugComponents {
  const slug = slugParts.join("-");
  let words = slug.split("-").filter(word => word.trim().length > 0);
  
  // Eliminar cualquier "en" que esté separado antes de la ubicación
  const filteredWords = [];
  for (let i = 0; i < words.length; i++) {
    // Si la palabra es "en" y la siguiente es una ubicación potencial, saltarla
    if (words[i] === "en" && i < words.length - 1) {
      continue;
    }
    filteredWords.push(words[i]);
  }
  words = filteredWords;
  
  const totalWords = words.length;
  let gancho = "";
  let sujeto = "";
  let ubicacion = "";
  let intencion = "";

  if (totalWords >= 6) {
    gancho = words.slice(0, 3).join(" ");
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

  return {
    gancho: capitalize(cleanString(gancho) || "El misterio de"),
    sujeto: capitalize(cleanString(sujeto)),
    ubicacion: capitalize(cleanString(ubicacion)),
    intencion: capitalize(cleanString(intencion) || "secretos ocultos"),
    fullSlug: slug,
  };
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
