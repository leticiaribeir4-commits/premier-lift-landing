import heroJpg480 from "@/assets/icamento-entre-predios-480.jpg";
import heroWebp480 from "@/assets/icamento-entre-predios-480.webp";
import heroJpg800 from "@/assets/icamento-entre-predios-800.jpg";
import heroWebp800 from "@/assets/icamento-entre-predios-800.webp";
import heroJpg1200 from "@/assets/icamento-entre-predios-1200.jpg";
import heroWebp1200 from "@/assets/icamento-entre-predios-1200.webp";
import heroJpg1600 from "@/assets/icamento-entre-predios-1600.jpg";
import heroWebp1600 from "@/assets/icamento-entre-predios-1600.webp";
import heroMobileJpg from "@/assets/icamento-entre-predios-mobile.jpg";
import heroMobileWebp from "@/assets/icamento-entre-predios-mobile.webp";

export type HeroVariant = { webp: string; jpeg: string; w: number };

export const heroVariants: HeroVariant[] = [
  { webp: heroWebp480, jpeg: heroJpg480, w: 480 },
  { webp: heroWebp800, jpeg: heroJpg800, w: 800 },
  { webp: heroWebp1200, jpeg: heroJpg1200, w: 1200 },
  { webp: heroWebp1600, jpeg: heroJpg1600, w: 1600 },
];

/** Recorte do que o celular já mostra. 488px é a largura real do arquivo. */
export const heroMobileVariants: HeroVariant[] = [
  { webp: heroMobileWebp, jpeg: heroMobileJpg, w: 488 },
];

export const HERO_MOBILE_MEDIA = "(max-width: 479px)";

function srcSet(variants: HeroVariant[], type: "webp" | "jpeg") {
  return variants.map((v) => `${v[type]} ${v.w}w`).join(", ");
}

const heroDesktopVariants = heroVariants.filter((variant) => variant.w <= 1200);

export const heroPreloadLinks = [
  {
    rel: "preload" as const,
    as: "image" as const,
    href: heroMobileWebp,
    type: "image/webp",
    media: HERO_MOBILE_MEDIA,
    fetchPriority: "high" as const,
  },
  {
    rel: "preload" as const,
    as: "image" as const,
    href: heroWebp800,
    type: "image/webp",
    media: "(min-width: 480px) and (max-width: 1199px)",
    imageSrcSet: srcSet(heroDesktopVariants, "webp"),
    imageSizes: "100vw",
    fetchPriority: "high" as const,
  },
  {
    rel: "preload" as const,
    as: "image" as const,
    href: heroWebp1600,
    type: "image/webp",
    media: "(min-width: 1200px)",
    imageSrcSet: srcSet(heroVariants, "webp"),
    imageSizes: "100vw",
    fetchPriority: "high" as const,
  },
];
