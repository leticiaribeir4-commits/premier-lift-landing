import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Armchair, Building2, Instagram, Mail, Menu, PackageCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappConversionHandlers } from "@/lib/gtag";
import {
  ADDRESS_DISPLAY,
  CNPJ,
  DATE_MODIFIED,
  EMAIL,
  faqs,
  INSTAGRAM_URL,
  jsonLd,
  OG_DESCRIPTION,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_TITLE,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PHONE_DISPLAY,
  PHONE_TEL,
  priceFactors,
  SITE_NAME,
  SITE_URL,
  steps,
} from "@/lib/site";
import { heroMobileVariants, heroVariants, HERO_MOBILE_MEDIA } from "@/lib/hero-photo";
import { cn } from "@/lib/utils";
import logoPng from "@/assets/isale-logo-240.png";
import logoWebp from "@/assets/isale-logo-240.webp";
import facadeJpg480 from "@/assets/icamento-fachada-480.jpg";
import facadeWebp480 from "@/assets/icamento-fachada-480.webp";
import facadeJpg800 from "@/assets/icamento-fachada-800.jpg";
import facadeWebp800 from "@/assets/icamento-fachada-800.webp";
import sofaJpg480 from "@/assets/icamento-sofas-480.jpg";
import sofaWebp480 from "@/assets/icamento-sofas-480.webp";
import sofaJpg800 from "@/assets/icamento-sofas-800.jpg";
import sofaWebp800 from "@/assets/icamento-sofas-800.webp";
import palmeiraJpg480 from "@/assets/icamento-palmeira-480.jpg";
import palmeiraWebp480 from "@/assets/icamento-palmeira-480.webp";
import palmeiraJpg800 from "@/assets/icamento-palmeira-800.jpg";
import palmeiraWebp800 from "@/assets/icamento-palmeira-800.webp";
import betweenJpg480 from "@/assets/icamento-andar-alto-480.jpg";
import betweenWebp480 from "@/assets/icamento-andar-alto-480.webp";
import betweenJpg800 from "@/assets/icamento-andar-alto-800.jpg";
import betweenWebp800 from "@/assets/icamento-andar-alto-800.webp";
import creaJpg240 from "@/assets/crea-sp-240.jpg";
import creaWebp240 from "@/assets/crea-sp-240.webp";
import creaJpg400 from "@/assets/crea-sp-400.jpg";
import creaWebp400 from "@/assets/crea-sp-400.webp";

const WHATSAPP_URL = "https://wa.me/5511915718147?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20i%C3%A7amento.";

function whatsappQuoteUrl(service: string) {
  return `https://wa.me/5511915718147?text=${encodeURIComponent(`Olá! Vim pelo site e gostaria de solicitar um orçamento de ${service}.`)}`;
}

const EMAIL_URL = `mailto:${EMAIL}?subject=${encodeURIComponent("Solicitação de orçamento - Isale Içamentos")}`;

type ImgVariant = { webp: string; jpeg: string; w: number };

type WorkItem = {
  variants: ImgVariant[];
  alt: string;
  title: string;
  number: string;
  detail: string;
  width: number;
  height: number;
};

const creaVariants: ImgVariant[] = [
  { webp: creaWebp240, jpeg: creaJpg240, w: 240 },
  { webp: creaWebp400, jpeg: creaJpg400, w: 400 },
];

const work: WorkItem[] = [
  { variants: [{ webp: sofaWebp480, jpeg: sofaJpg480, w: 480 }, { webp: sofaWebp800, jpeg: sofaJpg800, w: 800 }], alt: "Sofá embalado sendo içado na fachada de um edifício", title: "Içamento de sofás e móveis", number: "01", detail: "Operações seguras", width: 800, height: 1067 },
  { variants: [{ webp: betweenWebp480, jpeg: betweenJpg480, w: 480 }, { webp: betweenWebp800, jpeg: betweenJpg800, w: 800 }], alt: "Carga suspensa entre edifícios durante operação de içamento", title: "Içamento em andar alto", number: "02", detail: "Precisão e cuidado", width: 800, height: 1067 },
  { variants: [{ webp: palmeiraWebp480, jpeg: palmeiraJpg480, w: 480 }, { webp: palmeiraWebp800, jpeg: palmeiraJpg800, w: 800 }], alt: "Palmeira suspensa por cabos durante o içamento na fachada do edifício", title: "Peças especiais", number: "03", detail: "Cuidado em cada detalhe", width: 800, height: 1067 },
  { variants: [{ webp: facadeWebp480, jpeg: facadeJpg480, w: 480 }, { webp: facadeWebp800, jpeg: facadeJpg800, w: 800 }], alt: "SPA protegido em gaiola de madeira, içado na fachada de edifício alto", title: "Içamento de SPA", number: "04", detail: "Transporte especializado", width: 800, height: 1067 },
];

function srcSetOf(variants: ImgVariant[], type: "webp" | "jpeg") {
  return variants.map((v) => `${v[type]} ${v.w}w`).join(", ");
}

function Photo({
  variants,
  mobileVariants,
  alt,
  width,
  height,
  sizes,
  className,
  loading,
  fetchPriority,
  desktopMedia,
}: {
  variants: ImgVariant[];
  mobileVariants?: ImgVariant[];
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  desktopMedia?: string;
}) {
  const fallback = mobileVariants?.[0] ?? variants[0];
  const wide = desktopMedia ? variants.filter((variant) => variant.w <= 1200) : variants;
  const full = variants.filter((variant) => variant.w >= 1200);
  return (
    <picture>
      {mobileVariants && <source media={HERO_MOBILE_MEDIA} type="image/webp" srcSet={srcSetOf(mobileVariants, "webp")} sizes={sizes} />}
      {mobileVariants && <source media={HERO_MOBILE_MEDIA} type="image/jpeg" srcSet={srcSetOf(mobileVariants, "jpeg")} sizes={sizes} />}
      {desktopMedia && <source media="(min-width: 1200px)" type="image/webp" srcSet={srcSetOf(full, "webp")} sizes={sizes} />}
      {desktopMedia && <source media="(min-width: 1200px)" type="image/jpeg" srcSet={srcSetOf(full, "jpeg")} sizes={sizes} />}
      <source media={desktopMedia} type="image/webp" srcSet={srcSetOf(wide, "webp")} sizes={sizes} />
      <source media={desktopMedia} type="image/jpeg" srcSet={srcSetOf(wide, "jpeg")} sizes={sizes} />
      <img src={fallback.jpeg} alt={alt} width={width} height={height} sizes={sizes} className={className} loading={loading} decoding={fetchPriority === "high" ? "sync" : "async"} fetchPriority={fetchPriority} />
    </picture>
  );
}

const gallerySizes = "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw";

const solutions = [
  { icon: Armchair, title: "Içamento residencial", text: "Içamos mesas, vidros, geladeiras, sofás, colchões, tapetes, banheiras, piscinas, spas e outros itens que não passam por escadas ou elevadores." },
  { icon: Building2, title: "Içamento comercial", text: "Equipamentos, cargas de grande porte e condensadoras para empresas, lojas, condomínios e obras." },
  { icon: PackageCheck, title: "Peças especiais", text: "Obras de arte, pianos de cauda ou de armário, mesas cascata, mármores, granitos e outros itens delicados." },
];

const nav = [
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

type Review = { nome: string; meta: string; cor: string; texto: string };

const reviews: Review[] = [
  { nome: "Richárd Cser", meta: "4 avaliações", cor: "#1565c0", texto: "Me ajudaram de maneira segura e profissional com um içamento que imaginei ser muito mais complicado. Excelente equipe, desde o atendimento que foi atencioso e educado até o içamento em si. Toda a equipe está de parabéns!" },
  { nome: "Silvana", meta: "11 avaliações", cor: "#6a1b9a", texto: "Atendimento rápido, de qualidade e super profissional! Os funcionários que nos atenderam foram incríveis, o serviço estava bem complicado, devido ao local, mas eles foram muito cuidadosos! Recomendo!!!!" },
  { nome: "Myriam Guizelini", meta: "14 avaliações · 1 foto", cor: "#6d4c41", texto: "Hoje a equipe da Isale icamentos veio em meu apto no 16 andar para fazer icamento de um piano. Posso dizer uma equipe fantástica os rapazes Erisson, Jefferson e Mateus trabalharam um muita eficiencia. Recomendo." },
  { nome: "Joao Henrique Dias Aguilar", meta: "1 avaliação · 1 foto", cor: "#0b6b4f", texto: "Foi incrível, muito cuidadosos, educados, dispostos ." },
  { nome: "Beatrix Bortolai", meta: "1 avaliação", cor: "#6d4c41", texto: "Excelente! Super profissionais, rápidos e melhor preco do mercado" },
  { nome: "Micro Scalp", meta: "6 avaliações", cor: "#37474f", texto: "Ótimo atendimento, foram bem rápidos e cuidadosos. Super recomendo" },
  { nome: "Thaís B.", meta: "14 avaliações", cor: "#00838f", texto: "Serviço excelente! A equipe foi extremamente eficiente, rápida e muito atenciosa durante todo o processo. Um destaque especial para Gabriel e Eric, que foram super profissionais. Muito educados e fizeram tudo com muita agilidade. Recomendo fortemente!" },
  { nome: "Jordana Petillo", meta: "Local Guide · 13 avaliações · 2 fotos", cor: "#455a64", texto: "Atendimento e execução impecável. Simpáticos, rápidos, gentis e competentes! Nota 10!" },
];

const REVIEW_AUTOPLAY_MS = 4500;
const REVIEW_GAP_PX = 16;

function GoogleStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 17.3l-5.8 3.4 1.5-6.6L2.6 9.6l6.7-.6L12 2.8l2.7 6.2 6.7.6-5.1 4.5 1.5 6.6z" />
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 010-9.4l-7.9-6.1a24 24 0 000 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function ChevronPrevIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M15.4 5.4L14 4l-8 8 8 8 1.4-1.4L8.8 12z" />
    </svg>
  );
}

function ChevronNextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M8.6 5.4L10 4l8 8-8 8-1.4-1.4 6.6-6.6z" />
    </svg>
  );
}

function GoogleStars({ size = "sm", label }: { size?: "sm" | "lg"; label: string }) {
  return (
    <span className="inline-flex gap-0.5 text-[#fbbc04]" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <GoogleStar key={i} className={cn("fill-current", size === "lg" ? "h-6 w-6" : "h-[18px] w-[18px]")} />
      ))}
    </span>
  );
}

function ReviewsCarousel() {
  const listRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const step = () => {
    const item = listRef.current?.querySelector<HTMLElement>("[data-review-item]");
    return (item?.getBoundingClientRect().width ?? 0) + REVIEW_GAP_PX;
  };

  const updateArrows = () => {
    const lista = listRef.current;
    if (!lista) return;
    const max = lista.scrollWidth - lista.clientWidth - 2;
    setCanPrev(lista.scrollLeft > 2);
    setCanNext(lista.scrollLeft < max);
  };

  const scrollByStep = (dir: 1 | -1) => {
    listRef.current?.scrollBy({ left: dir * step() });
  };

  useEffect(() => {
    const lista = listRef.current;
    if (!lista) return;
    updateArrows();
    lista.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      lista.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  useEffect(() => {
    const lista = listRef.current;
    const carrossel = lista?.closest("[data-reviews-carousel]");
    if (!lista || !carrossel) return;

    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | null = null;
    let visto = false;

    const avancar = () => {
      const fim = lista.scrollWidth - lista.clientWidth - 2;
      if (lista.scrollLeft >= fim) lista.scrollTo({ left: 0 });
      else lista.scrollBy({ left: step() });
    };
    const iniciar = () => {
      if (reduzMovimento || timer || !visto) return;
      timer = setInterval(avancar, REVIEW_AUTOPLAY_MS);
    };
    const pausar = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const onTouchEnd = () => {
      window.setTimeout(iniciar, REVIEW_AUTOPLAY_MS);
    };
    const onVisibility = () => {
      if (document.hidden || !visto) pausar();
      else iniciar();
    };

    carrossel.addEventListener("mouseenter", pausar);
    carrossel.addEventListener("mouseleave", iniciar);
    carrossel.addEventListener("focusin", pausar);
    carrossel.addEventListener("focusout", iniciar);
    carrossel.addEventListener("touchstart", pausar, { passive: true });
    carrossel.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      visto = entry?.isIntersecting ?? false;
      if (visto) iniciar();
      else pausar();
    }, { rootMargin: "160px" });
    observer.observe(carrossel);

    return () => {
      pausar();
      observer.disconnect();
      carrossel.removeEventListener("mouseenter", pausar);
      carrossel.removeEventListener("mouseleave", iniciar);
      carrossel.removeEventListener("focusin", pausar);
      carrossel.removeEventListener("focusout", iniciar);
      carrossel.removeEventListener("touchstart", pausar);
      carrossel.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="relative mt-8 md:mt-10" data-reviews-carousel>
      <button
        type="button"
        aria-label="Avaliações anteriores"
        disabled={!canPrev}
        onClick={() => scrollByStep(-1)}
        className="absolute top-[calc(50%-24px)] left-[-8px] z-10 grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-primary transition-[opacity,background-color,color] hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-0 md:left-[-24px]"
      >
        <ChevronPrevIcon className="h-6 w-6 fill-current" />
      </button>
      <ul
        ref={listRef}
        tabIndex={0}
        aria-label="Avaliações de clientes no Google"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollByStep(1);
          if (e.key === "ArrowLeft") scrollByStep(-1);
        }}
        className="m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <li key={review.nome} data-review-item className="flex w-[85%] shrink-0 snap-start md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
            <figure className="m-0 flex w-full flex-col gap-4 border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg font-semibold text-white"
                  style={{ background: review.cor }}
                >
                  {review.nome.charAt(0)}
                </span>
                <div className="grid min-w-0 gap-0.5">
                  <span className="text-base font-semibold text-foreground">{review.nome}</span>
                  <span className="text-[0.8125rem] text-muted-foreground">{review.meta}</span>
                </div>
                <GoogleLogo className="ml-auto h-5 w-5 shrink-0" />
              </div>
              <GoogleStars label="5 de 5 estrelas" />
              <blockquote className="m-0 text-base leading-[1.6] text-foreground">{review.texto}</blockquote>
            </figure>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-label="Próximas avaliações"
        disabled={!canNext}
        onClick={() => scrollByStep(1)}
        className="absolute top-[calc(50%-24px)] right-[-8px] z-10 grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-primary transition-[opacity,background-color,color] hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-0 md:right-[-24px]"
      >
        <ChevronNextIcon className="h-6 w-6 fill-current" />
      </button>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      },
    ],
  }),
  component: Index,
});

function Brand({ imgClassName }: { imgClassName?: string }) {
  return <a href="#inicio" aria-label="Isale Içamentos — início" className="inline-flex shrink-0 items-center">
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img src={logoPng} alt="Isale Içamentos" width={240} height={234} className={cn("h-14 w-auto transition-[height] duration-300 md:h-16", imgClassName)} decoding="async" fetchPriority="low" />
    </picture>
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={cn(
      "fixed inset-x-0 top-0 z-30 border-b transition-[background-color,border-color,box-shadow] duration-300",
      scrolled ? "border-border bg-background shadow-md" : "border-border/50 bg-background/95",
    )}>
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:h-16 md:px-10 lg:px-16">
        <Brand imgClassName="h-12 md:h-14" />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {nav.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[.12em] text-primary transition-colors duration-300 hover:text-primary/70"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button asChild variant="hero" className="hidden h-10 px-5 text-xs font-bold uppercase lg:inline-flex"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" {...whatsappConversionHandlers}>Solicite seu orçamento <ArrowUpRight /></a></Button>
        <Button
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-movel"
          variant="outline"
          size="icon"
          className="border-primary/30 bg-transparent text-primary hover:bg-primary/5 hover:text-primary lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </Button>
      </div>
      {menuOpen && (
        <nav
          id="menu-movel"
          aria-label="Menu móvel"
          className="flex flex-col border-t border-border bg-background px-6 py-5 lg:hidden"
        >
          {nav.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-3 text-sm font-bold uppercase text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
    <main id="conteudo" className="overflow-hidden">
    <section id="inicio" aria-labelledby="inicio-titulo" className="relative min-h-[100dvh] bg-hero text-hero-foreground md:min-h-[740px] lg:min-h-[min(920px,93vh)]">
      <Photo
        variants={heroVariants}
        mobileVariants={heroMobileVariants}
        alt="Carga suspensa entre edifícios durante operação de içamento"
        width={488}
        height={900}
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        desktopMedia="(min-width: 480px) and (max-width: 1199px)"
        className="absolute inset-0 h-full w-full object-cover object-center min-[480px]:object-[52%_center] lg:object-[center_42%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/80 to-hero/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-hero/75 via-transparent to-hero/20" />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-[calc(var(--header-height)+1.25rem)] md:min-h-[740px] md:px-10 md:pb-28 md:pt-[calc(var(--header-height)+1.75rem)] lg:min-h-[min(920px,93vh)] lg:px-16 lg:pb-32 lg:pt-[calc(var(--header-height)+2.75rem)] xl:pt-[calc(var(--header-height)+3.25rem)]">
        <div className="max-w-[810px]">
          <div className="mb-6 flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.19em] text-signal"><span className="h-[2px] w-9 bg-signal" /> IÇAMENTO RESIDENCIAL E COMERCIAL</div>
          <h1 id="inicio-titulo" className="heading-display max-w-[870px] text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.95]">IÇAMENTO DE MÓVEIS <span className="text-signal">NA GRANDE SÃO PAULO</span></h1>
          <p className="mt-6 max-w-[640px] text-xl font-medium leading-snug text-hero-foreground/90 md:text-2xl">Soluções seguras para seus móveis e objetos que não passam pelo elevador ou escada.</p>
          <p className="mt-4 max-w-[540px] text-base leading-relaxed text-hero-foreground/85 md:text-lg">Atendimento residencial e comercial na Grande São Paulo, no interior e no litoral, com orçamento pelo WhatsApp.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="feature"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" {...whatsappConversionHandlers}><WhatsAppIcon className="h-5 w-5" /> Solicite seu orçamento</a></Button>
            <Button asChild variant="inverse" size="feature"><a href="#trabalhos">Ver trabalhos <ArrowDown /></a></Button>
          </div>
        </div>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Solicitar orçamento no WhatsApp"
        className="absolute bottom-0 right-0 hidden bg-signal px-9 py-5 text-signal-foreground no-underline transition-colors hover:bg-signal/90 md:flex md:items-center md:gap-8"
        {...whatsappConversionHandlers}
      >
        <span className="font-display text-2xl font-bold uppercase">A altura não é limite.</span>
        <ArrowUpRight className="h-5 w-5" aria-hidden />
      </a>
    </section>

    <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-primary">NA PRÁTICA</span><h2 id="trabalhos-titulo" className="heading-display mt-5 max-w-[900px] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95]">Içamentos realizados</h2></div><p className="max-w-[380px] text-base leading-7 text-muted-foreground">As fotos mostram operações reais: sofá, carga em andar alto, palmeira içada e SPA na fachada.</p></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {work.map(item => (
            <a
              key={item.number}
              href={whatsappQuoteUrl(item.title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Solicitar orçamento de ${item.title} no WhatsApp`}
              className="group relative block cursor-pointer no-underline"
              {...whatsappConversionHandlers}
            >
              <figure className="m-0 h-[420px] overflow-hidden bg-surface md:h-[480px]">
                <Photo variants={item.variants} alt={item.alt} width={item.width} height={item.height} sizes={gallerySizes} loading="lazy" fetchPriority="low" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />{" "}
                <div className="absolute inset-0 bg-gradient-to-t from-hero/90 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-hero-foreground">
                  <div>
                    <span className="text-xs font-bold text-signal">{item.number} / {item.detail} </span>
                    <h3 className="mt-1 font-display text-3xl font-bold uppercase">{item.title}</h3>
                  </div>
                  <ArrowUpRight className="mb-1 shrink-0 text-signal" size={20} aria-hidden />
                </figcaption>
              </figure>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section id="sobre" aria-labelledby="sobre-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-background py-14 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-16">
        <div>
          <span className="section-kicker text-primary">QUEM SOMOS</span>
          <h2 id="sobre-titulo" className="heading-display mt-6 max-w-[620px] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95]">Empresa de içamento <span className="text-primary">com apólice de seguro</span></h2>
          <Photo
            variants={creaVariants}
            alt="Empresa registrada no CREA-SP — Isale Içamentos Ltda."
            width={400}
            height={400}
            sizes="(min-width: 768px) 144px, 112px"
            loading="lazy"
            fetchPriority="low"
            className="mt-8 h-auto w-28 rounded-full md:w-36"
          />
        </div>
        <div className="flex flex-col justify-end border-l-2 border-signal pl-7 md:pl-10">
          <p className="max-w-[650px] text-lg leading-[1.65] text-foreground md:text-xl">Especializada em resolver desafios de transporte vertical, a Isale Içamentos realiza o içamento de itens que não passam por escadas ou elevadores em residências, comércios, condomínios e obras. Cada projeto recebe atendimento sob medida, do mais simples ao mais complexo.</p>
          <ul className="mt-7 grid max-w-[680px] gap-4 text-base leading-7 text-muted-foreground">
            <li className="border-l-2 border-signal pl-4">Equipe treinada conforme as normas NR-35, NR-12 e NR-18, com EPI e apólice de seguro.</li>
            <li className="border-l-2 border-signal pl-4">Empresa registrada no CREA-SP, Isale Içamentos Ltda., CNPJ 53.450.107/0001-06.</li>
            <li className="border-l-2 border-signal pl-4">Atendimento na Grande São Paulo, no interior, no litoral e em outras localidades confirmadas no orçamento.</li>
          </ul>
          <a href="#solucoes" className="mt-8 inline-flex items-center gap-2 self-start border-b-2 border-signal pb-2 text-xs font-bold uppercase tracking-[.12em] text-primary">Conheça as soluções <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>

    <section id="avaliacoes" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-surface py-20 md:py-28" aria-labelledby="avaliacoes-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <header className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <span className="section-kicker text-primary">Avaliações</span>
            <h2 id="avaliacoes-title" className="heading-display mt-5 max-w-[720px] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95]">O QUE OS CLIENTES <span className="text-primary">CONTAM?</span></h2>
            <p className="mt-4 max-w-[460px] text-base leading-7 text-muted-foreground">Quem contratou a Isale descreve a equipe como cuidadosa e profissional, inclusive no içamento de piano em andar alto.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-[3.5rem] leading-none font-bold text-primary" aria-hidden>5,0</span>
            <div className="grid gap-1">
              <GoogleStars size="lg" label="Nota 5,0 de 5 estrelas" />
              <span className="text-sm text-muted-foreground">Nota das avaliações exibidas</span>
            </div>
          </div>
        </header>
        <ReviewsCarousel />
      </div>
    </section>

    <section id="solucoes" aria-labelledby="solucoes-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-hero py-20 text-hero-foreground md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-signal">O QUE FAZEMOS</span><h2 id="solucoes-titulo" className="heading-display mt-5 text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95]">O QUE A ISALE <span className="text-signal">IÇA?</span></h2></div><p className="max-w-[460px] text-base leading-7 text-hero-foreground/85">Içamos condensadoras, mesas, tampos de vidro, geladeiras, sofás, colchões, tapetes, banheiras, piscinas, spas e quaisquer outros itens que não passem por escadas ou elevadores.</p></div>
        <div className="grid border-t border-hero-foreground/25 md:grid-cols-3">
          {solutions.map((item) => <div key={item.title} className="group border-b border-hero-foreground/25 py-8 md:border-r md:px-7 md:last:border-r-0 lg:px-10"><span className="mb-6 flex h-12 w-12 items-center justify-center bg-signal text-signal-foreground"><item.icon size={24} strokeWidth={2} /></span><h3 className="font-display text-3xl font-bold uppercase md:text-4xl">{item.title}</h3><p className="mt-3 max-w-[320px] text-base leading-7 text-hero-foreground/85">{item.text}</p></div>)}
        </div>
        <div className="mt-10 flex justify-center md:mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b-2 border-signal pb-2 text-xs font-bold uppercase tracking-[.12em] text-hero-foreground transition-colors hover:text-signal"
            {...whatsappConversionHandlers}
          >
            Solicite seu orçamento <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>

    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <span className="section-kicker text-primary">PASSO A PASSO</span>
        <h2 id="como-funciona-titulo" className="heading-display mt-5 max-w-[760px] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95]">COMO FUNCIONA <span className="text-primary">O IÇAMENTO?</span></h2>
        <p className="mt-6 max-w-[720px] text-lg leading-8 text-foreground">Você descreve o objeto e o acesso. A Isale avalia a operação, envia o orçamento e combina o dia do içamento.</p>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="border-t-2 border-signal pt-5">
              <span className="font-display text-3xl font-bold text-primary">{step.number} </span>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section id="preco" aria-labelledby="preco-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-[.8fr_1.2fr] lg:px-16">
        <div>
          <span className="section-kicker text-primary">ORÇAMENTO</span>
          <h2 id="preco-titulo" className="heading-display mt-5 text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95]">O QUE MUDA <span className="text-primary">O VALOR?</span></h2>
        </div>
        <div>
          <p className="max-w-[680px] text-lg leading-8 text-foreground">A Isale trabalha com orçamentos personalizados e não fixa uma tabela padrão. O valor exato do içamento é calculado depois que a equipe analisa o objeto, as características do edifício e a distância do local. Os principais fatores avaliados são:</p>
          <ul className="mt-8 grid gap-4">
            {priceFactors.map((factor) => (
              <li key={factor.title} className="border-l-2 border-signal pl-4 text-base leading-7 text-muted-foreground"><span className="font-semibold text-foreground">{factor.title}: </span>{factor.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section id="regioes" aria-labelledby="regioes-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-signal py-16 text-signal-foreground md:py-20">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10 lg:px-16">
        <h2 id="regioes-titulo" className="heading-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95]">ONDE A ISALE ATENDE?</h2>
        <p className="mt-6 max-w-[760px] text-2xl leading-relaxed md:text-3xl">
          Atendemos na <strong>Grande São Paulo, no interior e no litoral</strong>, e em outras localidades. Informe a cidade no WhatsApp para a equipe confirmar o local.
        </p>
      </div>
    </section>

    <section id="faq" aria-labelledby="faq-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-[.7fr_1.3fr] lg:px-16">
        <div>
          <span className="section-kicker text-primary">DÚVIDAS</span>
          <h2 id="faq-titulo" className="heading-display mt-5 text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95]">PERGUNTAS <span className="text-primary">FREQUENTES</span></h2>
          <p className="mt-6 max-w-[360px] text-base leading-7 text-muted-foreground">Respostas diretas sobre o que a Isale iça, onde atende e como pedir o orçamento.</p>
        </div>
        <div className="border-t border-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-2xl font-bold uppercase leading-tight [&::-webkit-details-marker]:hidden">
                {faq.question}{" "}
                <span aria-hidden className="text-3xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-[68ch] pb-6 text-base leading-7 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section id="contato" aria-labelledby="contato-titulo" className="scroll-mt-[calc(var(--header-height)+0.5rem)] bg-footer py-20 text-hero-foreground md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 text-center md:px-10 lg:px-16">
        <span className="section-kicker text-signal">VAMOS CONVERSAR?</span>
        <h2 id="contato-titulo" className="heading-display mx-auto mt-8 max-w-[950px] text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95]">COMO PEDIR <span className="text-signal">UM ORÇAMENTO?</span></h2>
        <p className="mx-auto mt-8 max-w-[720px] text-lg leading-relaxed text-hero-foreground/90 md:text-xl">Conte o que você precisa içar, o andar e a cidade. A equipe responde com o orçamento pelo WhatsApp ou por ligação no <a className="font-semibold underline" href={PHONE_TEL}>{PHONE_DISPLAY}</a>.</p>
        <Button asChild variant="hero" size="feature" className="mt-9 h-14 max-w-full px-5 text-sm sm:px-8 sm:text-base"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" {...whatsappConversionHandlers}><WhatsAppIcon className="h-5 w-5" /> CONVERSAR NO WHATSAPP <ArrowRight /></a></Button>
        <div className="mx-auto mt-16 grid max-w-[900px] text-left md:grid-cols-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex min-w-0 items-center gap-4 border-t border-hero-foreground/25 py-6 transition-colors hover:text-signal md:pr-6" {...whatsappConversionHandlers}>
             <WhatsAppIcon className="h-6 w-6 shrink-0 text-signal" /><span className="min-w-0"><span className="block text-xs font-bold uppercase text-signal">WHATSAPP E LIGAÇÕES</span><span className="font-display text-2xl font-bold">{PHONE_DISPLAY}</span></span><ArrowUpRight className="ml-auto h-5 w-5 shrink-0" />
          </a>
          <a href={EMAIL_URL} className="group flex min-w-0 items-center gap-4 border-t border-hero-foreground/25 py-6 transition-colors hover:text-signal md:px-6">
            <Mail className="h-6 w-6 shrink-0 text-signal" /><span className="min-w-0"><span className="block text-xs font-bold uppercase text-signal">E-MAIL</span><span className="block break-all font-display text-xl font-bold">isaleicamentos@gmail.com</span></span><ArrowUpRight className="ml-auto h-5 w-5 shrink-0" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group flex min-w-0 items-center gap-4 border-t border-hero-foreground/25 py-6 transition-colors hover:text-signal md:pl-6">
            <Instagram className="h-6 w-6 shrink-0 text-signal" /><span className="min-w-0"><span className="block text-xs font-bold uppercase text-signal">INSTAGRAM</span><span className="font-display text-2xl font-bold">@isaleicamentos</span></span><ArrowUpRight className="ml-auto h-5 w-5 shrink-0" />
          </a>
        </div>
      </div>
    </section>
    </main>
    <footer className="border-t border-border bg-background pt-10 pb-28 text-primary">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
        <div><Brand imgClassName="h-20 md:h-24" /><p className="mt-5 text-xs text-muted-foreground">Soluções para seus móveis e objetos.</p></div>
        <div className="flex shrink-0 flex-col gap-3 text-xs font-semibold uppercase tracking-[.1em] text-primary">
          <a href={PHONE_TEL} className="inline-flex items-center gap-2 whitespace-nowrap hover:text-primary/70">Ligar {PHONE_DISPLAY} <span className="normal-case">(principal)</span></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 whitespace-nowrap hover:text-primary/70" {...whatsappConversionHandlers}><WhatsAppIcon className="h-4 w-4" /> {PHONE_DISPLAY} <span className="normal-case">(WhatsApp principal)</span></a>
          <a href={EMAIL_URL} className="inline-flex items-center gap-2 hover:text-primary/70"><Mail size={16} /> {EMAIL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary/70"><Instagram size={16} /> @isaleicamentos</a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">{nav.map(item => <a key={item.href} href={item.href} className="text-xs font-semibold uppercase text-primary hover:text-primary/70">{item.label}</a>)}</div>
        <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Isale Içamentos — CNPJ: {CNPJ}. {ADDRESS_DISPLAY}. Todos os direitos reservados. <time dateTime={DATE_MODIFIED}>Conteúdo revisado em 12 de novembro de 2026.</time></span>
      </div>
    </footer>
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicite um orçamento no WhatsApp"
      className="fixed right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#075E54] text-white shadow-[0_8px_24px_rgba(20,16,60,.35)] transition-[transform,background-color] hover:scale-105 hover:bg-[#054940] bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
      {...whatsappConversionHandlers}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  </>;
}
