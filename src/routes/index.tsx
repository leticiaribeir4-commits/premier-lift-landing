import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Armchair, Building2, Instagram, Mail, Menu, PackageCheck, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPng from "@/assets/isale-logo-240.png";
import logoWebp from "@/assets/isale-logo-240.webp";
import heroJpg480 from "@/assets/icamento-entre-predios-480.jpg";
import heroWebp480 from "@/assets/icamento-entre-predios-480.webp";
import heroJpg800 from "@/assets/icamento-entre-predios-800.jpg";
import heroWebp800 from "@/assets/icamento-entre-predios-800.webp";
import heroJpg1200 from "@/assets/icamento-entre-predios-1200.jpg";
import heroWebp1200 from "@/assets/icamento-entre-predios-1200.webp";
import heroJpg1600 from "@/assets/icamento-entre-predios-1600.jpg";
import heroWebp1600 from "@/assets/icamento-entre-predios-1600.webp";
import facadeJpg480 from "@/assets/icamento-fachada-480.jpg";
import facadeWebp480 from "@/assets/icamento-fachada-480.webp";
import facadeJpg800 from "@/assets/icamento-fachada-800.jpg";
import facadeWebp800 from "@/assets/icamento-fachada-800.webp";
import glassJpg480 from "@/assets/icamento-fachada-vidro-480.jpg";
import glassWebp480 from "@/assets/icamento-fachada-vidro-480.webp";
import glassJpg800 from "@/assets/icamento-fachada-vidro-800.jpg";
import glassWebp800 from "@/assets/icamento-fachada-vidro-800.webp";
import pianoJpg480 from "@/assets/piano-cauda-480.jpg";
import pianoWebp480 from "@/assets/piano-cauda-480.webp";
import pianoJpg800 from "@/assets/piano-cauda-800.jpg";
import pianoWebp800 from "@/assets/piano-cauda-800.webp";
import betweenJpg480 from "@/assets/icamento-andar-alto-480.jpg";
import betweenWebp480 from "@/assets/icamento-andar-alto-480.webp";
import betweenJpg800 from "@/assets/icamento-andar-alto-800.jpg";
import betweenWebp800 from "@/assets/icamento-andar-alto-800.webp";
import ogImage from "@/assets/og-image.jpg";

const WHATSAPP_URL = "https://wa.me/5511915718147?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20i%C3%A7amento.";
const OTHER_PHONE_URL = "tel:+5511948924855";
const EMAIL_URL = "mailto:isaleicamentos@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20-%20Isale%20I%C3%A7amentos";
const INSTAGRAM_URL = "https://www.instagram.com/isaleicamentos/";

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

const heroVariants: ImgVariant[] = [
  { webp: heroWebp480, jpeg: heroJpg480, w: 480 },
  { webp: heroWebp800, jpeg: heroJpg800, w: 800 },
  { webp: heroWebp1200, jpeg: heroJpg1200, w: 1200 },
  { webp: heroWebp1600, jpeg: heroJpg1600, w: 1600 },
];

const work: WorkItem[] = [
  { variants: [{ webp: facadeWebp480, jpeg: facadeJpg480, w: 480 }, { webp: facadeWebp800, jpeg: facadeJpg800, w: 800 }], alt: "Piano de cauda protegido em gaiola de madeira, içado na fachada de edifício alto", title: "Içamento de piano", number: "01", detail: "Transporte especializado", width: 800, height: 1067 },
  { variants: [{ webp: betweenWebp480, jpeg: betweenJpg480, w: 480 }, { webp: betweenWebp800, jpeg: betweenJpg800, w: 800 }], alt: "Carga suspensa entre edifícios durante operação de içamento", title: "Içamento em andar alto", number: "02", detail: "Precisão e cuidado", width: 800, height: 1067 },
  { variants: [{ webp: pianoWebp480, jpeg: pianoJpg480, w: 480 }, { webp: pianoWebp800, jpeg: pianoJpg800, w: 800 }], alt: "Piano de cauda Yamaha branco em ambiente interno", title: "Peças especiais", number: "03", detail: "Cuidado em cada detalhe", width: 800, height: 1067 },
  { variants: [{ webp: glassWebp480, jpeg: glassJpg480, w: 480 }, { webp: glassWebp800, jpeg: glassJpg800, w: 800 }], alt: "Içamento de mármore na fachada envidraçada de edifício", title: "Içamento de mármore", number: "04", detail: "Operações externas", width: 800, height: 1067 },
];

function srcSetOf(variants: ImgVariant[], type: "webp" | "jpeg") {
  return variants.map((v) => `${v[type]} ${v.w}w`).join(", ");
}

function Photo({
  variants,
  alt,
  width,
  height,
  sizes,
  className,
  loading,
  fetchPriority,
}: {
  variants: ImgVariant[];
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const fallback = variants[0];
  return (
    <picture>
      <source type="image/webp" srcSet={srcSetOf(variants, "webp")} sizes={sizes} />
      <source type="image/jpeg" srcSet={srcSetOf(variants, "jpeg")} sizes={sizes} />
      <img src={fallback.jpeg} alt={alt} width={width} height={height} sizes={sizes} className={className} loading={loading} decoding="async" fetchPriority={fetchPriority} />
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
  { href: "#contato", label: "Contato" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Isale Içamentos | Içamento residencial e comercial" },
      { name: "description", content: "Soluções para seus móveis e objetos. Especialistas em içamento residencial e comercial. Solicite seu orçamento pelo WhatsApp 11 91571-8147." },
      { property: "og:title", content: "Isale Içamentos | Içamento residencial e comercial" },
      { property: "og:description", content: "Soluções para seus móveis e objetos. Especialistas em içamento residencial e comercial. Solicite seu orçamento." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroWebp800,
        type: "image/webp",
        imageSrcSet: srcSetOf(heroVariants, "webp"),
        imageSizes: "100vw",
      },
    ],
  }),
  component: Index,
});

function Brand() {
  return <a href="#inicio" aria-label="Isale Içamentos — início" className="inline-flex shrink-0 items-center">
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img src={logoPng} alt="Isale Içamentos" width={240} height={234} className="h-24 w-auto md:h-28" decoding="async" />
    </picture>
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main id="inicio" className="overflow-hidden">
    <header className="absolute inset-x-0 top-0 z-30 border-b border-hero-foreground/20">
      <div className="mx-auto flex h-[var(--header-height)] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
        <Brand />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {nav.map(item => <a key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[.12em] text-hero-foreground/80 transition-colors hover:text-signal">{item.label}</a>)}
        </nav>
        <Button asChild variant="hero" className="hidden h-10 px-5 text-xs font-bold uppercase lg:inline-flex"><a href={WHATSAPP_URL} target="_blank" rel="noopener">Solicite seu orçamento <ArrowUpRight /></a></Button>
        <Button aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} variant="inverse" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav aria-label="Menu móvel" className="flex flex-col border-t border-hero-foreground/20 bg-hero px-6 py-5 lg:hidden">{nav.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-hero-foreground/15 py-3 text-sm font-bold uppercase text-hero-foreground">{item.label}</a>)}</nav>}
    </header>

    <section className="relative min-h-[710px] bg-hero text-hero-foreground md:min-h-[740px] lg:min-h-[min(920px,93vh)]">
      <Photo
        variants={heroVariants}
        alt="Carga suspensa entre edifícios durante operação de içamento"
        width={1600}
        height={900}
        sizes="100vw"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[52%_center] lg:object-[center_42%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/80 to-hero/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-hero/75 via-transparent to-hero/20" />
      <div className="relative mx-auto flex min-h-[710px] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-[calc(var(--header-height)+1.25rem)] md:min-h-[740px] md:px-10 md:pb-28 md:pt-[calc(var(--header-height)+1.75rem)] lg:min-h-[min(920px,93vh)] lg:px-16 lg:pb-32 lg:pt-[calc(var(--header-height)+2.75rem)] xl:pt-[calc(var(--header-height)+3.25rem)]">
        <div className="max-w-[810px]">
          <div className="mb-6 flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.19em] text-signal"><span className="h-[2px] w-9 bg-signal" /> IÇAMENTO RESIDENCIAL E COMERCIAL</div>
          <h1 className="heading-display max-w-[870px] text-[clamp(3.6rem,8vw,7.6rem)]">SOLUÇÕES PARA SEUS <span className="text-signal">MÓVEIS E OBJETOS</span></h1>
          <p className="mt-6 text-xl font-medium leading-snug text-hero-foreground/90 md:text-2xl">Especialistas em içamento residencial e comercial.</p>
          <p className="mt-4 max-w-[500px] text-base leading-relaxed text-hero-foreground/85 md:text-lg">Movemos o que parece impossível com planejamento, segurança e cuidado em cada detalhe.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="feature"><a href={WHATSAPP_URL} target="_blank" rel="noopener"><WhatsAppIcon className="h-5 w-5" /> Solicite seu orçamento</a></Button>
            <Button asChild variant="inverse" size="feature"><a href="#trabalhos">Ver trabalhos <ArrowDown /></a></Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden bg-signal px-9 py-5 text-signal-foreground md:flex md:items-center md:gap-8"><span className="font-display text-2xl font-bold uppercase">A altura não é limite.</span><ArrowUpRight className="h-5 w-5" /></div>
    </section>

    <section id="trabalhos" className="scroll-mt-10 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-primary">NA PRÁTICA</span><h2 className="heading-display mt-5 max-w-[900px] text-[clamp(3.4rem,6vw,6.5rem)]">RESULTADOS REAIS<br /><span className="text-primary">ENTREGUES AOS NOSSOS CLIENTES.</span></h2></div><p className="max-w-[310px] text-sm leading-6 text-muted-foreground">Registros reais de operações e desafios que ajudamos a superar.</p></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{work.map(item => <figure key={item.number} className="group relative m-0 h-[420px] overflow-hidden bg-surface md:h-[480px]"><Photo variants={item.variants} alt={item.alt} width={item.width} height={item.height} sizes={gallerySizes} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-hero/90 via-transparent to-transparent" /><figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-hero-foreground"><div><span className="text-xs font-bold text-signal">{item.number} / {item.detail}</span><h3 className="mt-1 font-display text-3xl font-bold uppercase">{item.title}</h3></div><ArrowUpRight className="mb-1 shrink-0 text-signal" size={20} /></figcaption></figure>)}</div>
      </div>
    </section>

    <section id="sobre" className="scroll-mt-10 bg-background py-14 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-16">
        <div><span className="section-kicker text-primary">QUEM SOMOS</span><h2 className="heading-display mt-6 max-w-[620px] text-[clamp(3.5rem,6vw,6.3rem)]">REFERÊNCIA EM <span className="text-primary">IÇAMENTO SEGURO.</span></h2></div>
        <div className="flex flex-col justify-end border-l-2 border-signal pl-7 md:pl-10">
          <p className="max-w-[650px] text-lg leading-[1.65] text-foreground md:text-xl">Na ISALE, compreendemos que cada projeto é único e requer soluções personalizadas. Nossa equipe é formada por profissionais altamente treinados e experientes, que entendem a importância do seu projeto. Estamos prontos para atender você, desde o içamento mais simples até o mais complexo.</p>
          <ul className="mt-7 grid max-w-[680px] gap-4 text-sm leading-6 text-muted-foreground md:text-base">
            <li className="border-l-2 border-signal pl-4">Atendimento personalizado, com soluções sob medida para projetos residenciais e comerciais.</li>
            <li className="border-l-2 border-signal pl-4">Equipe altamente treinada conforme as normas NR35, NR12 e NR18, oferecendo qualidade e segurança.</li>
            <li className="border-l-2 border-signal pl-4">Soluções em içamentos que garantem a realização de projetos com eficiência e segurança.</li>
          </ul>
          <a href="#solucoes" className="mt-8 inline-flex items-center gap-2 self-start border-b-2 border-signal pb-2 text-xs font-bold uppercase tracking-[.12em] text-primary">Conheça as soluções <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>

    <section id="solucoes" className="scroll-mt-10 bg-hero py-20 text-hero-foreground md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-signal">O QUE FAZEMOS</span><h2 className="heading-display mt-5 text-[clamp(3.6rem,6vw,6.5rem)]">SOLUÇÕES PARA<br />CADA DESAFIO.</h2></div><p className="max-w-[340px] text-sm leading-6 text-hero-foreground/65">Operações pensadas para o que você precisa mover, onde você precisa chegar.</p></div>
        <div className="grid border-t border-hero-foreground/25 md:grid-cols-3">
          {solutions.map((item) => <div key={item.title} className="group border-b border-hero-foreground/25 py-8 md:border-r md:px-7 md:last:border-r-0 lg:px-10"><span className="mb-6 flex h-12 w-12 items-center justify-center bg-signal text-signal-foreground"><item.icon size={24} strokeWidth={2} /></span><h3 className="font-display text-3xl font-bold uppercase md:text-4xl">{item.title}</h3><p className="mt-3 max-w-[290px] text-sm leading-6 text-hero-foreground/65">{item.text}</p></div>)}
        </div>
      </div>
    </section>

    <aside className="bg-signal py-10 text-signal-foreground md:py-14">
      <p className="mx-auto max-w-[1100px] px-5 text-2xl leading-relaxed md:px-10 md:text-3xl lg:px-16">
        Atendemos na <strong>Grande São Paulo, interior, litoral</strong> e outras localidades. Fale com nossa equipe sobre sua necessidade.
      </p>
    </aside>

    <section id="contato" className="scroll-mt-10 bg-footer py-20 text-hero-foreground md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 text-center md:px-10 lg:px-16">
        <span className="section-kicker text-signal">VAMOS CONVERSAR?</span>
        <h2 className="heading-display mx-auto mt-8 max-w-[950px] text-5xl sm:text-6xl lg:text-8xl">SEU PROJETO MERECE<br /><span className="text-signal">UMA SOLUÇÃO À ALTURA.</span></h2>
        <p className="mx-auto mt-8 max-w-[720px] text-lg leading-relaxed text-hero-foreground/85 md:text-xl">Conte para nós o que você precisa içar. Vamos entender sua demanda e encontrar a melhor solução.</p>
        <Button asChild variant="hero" size="feature" className="mt-9 h-14 max-w-full px-5 text-sm sm:px-8 sm:text-base"><a href={WHATSAPP_URL} target="_blank" rel="noopener"><WhatsAppIcon className="h-5 w-5" /> CONVERSAR NO WHATSAPP <ArrowRight /></a></Button>
        <div className="mx-auto mt-16 grid max-w-[900px] text-left md:grid-cols-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="group flex min-w-0 items-center gap-4 border-t border-hero-foreground/25 py-6 transition-colors hover:text-signal md:pr-6">
             <WhatsAppIcon className="h-6 w-6 shrink-0 text-signal" /><span className="min-w-0"><span className="block text-xs font-bold uppercase text-signal">WHATSAPP PRINCIPAL</span><span className="font-display text-2xl font-bold">(11) 91571-8147</span></span><ArrowUpRight className="ml-auto h-5 w-5 shrink-0" />
          </a>
          <a href={EMAIL_URL} className="group flex min-w-0 items-center gap-4 border-t border-hero-foreground/25 py-6 transition-colors hover:text-signal md:px-6">
            <Mail className="h-6 w-6 shrink-0 text-signal" /><span className="min-w-0"><span className="block text-xs font-bold uppercase text-signal">E-MAIL</span><span className="block break-all font-display text-xl font-bold">isaleicamentos@gmail.com</span></span><ArrowUpRight className="ml-auto h-5 w-5 shrink-0" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="group flex min-w-0 items-center gap-4 border-t border-hero-foreground/25 py-6 transition-colors hover:text-signal md:pl-6">
            <Instagram className="h-6 w-6 shrink-0 text-signal" /><span className="min-w-0"><span className="block text-xs font-bold uppercase text-signal">INSTAGRAM</span><span className="font-display text-2xl font-bold">@isaleicamentos</span></span><ArrowUpRight className="ml-auto h-5 w-5 shrink-0" />
          </a>
        </div>
      </div>
    </section>
    <footer className="bg-footer py-10 text-hero-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
        <div><Brand /><p className="mt-5 text-xs text-hero-foreground/55">Soluções para seus móveis e objetos.</p></div>
        <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-[.1em] text-hero-foreground/70">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-signal"><WhatsAppIcon className="h-4 w-4" /> WhatsApp principal — 11 91571-8147</a>
          <a href={EMAIL_URL} className="inline-flex items-center gap-2 hover:text-signal"><Mail size={16} /> isaleicamentos@gmail.com</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-signal"><Instagram size={16} /> @isaleicamentos</a>
          <a href={OTHER_PHONE_URL} className="mt-2 inline-flex items-center gap-2 text-hero-foreground/45 hover:text-signal"><Phone size={14} /> Telefone alternativo — 11 94892-4855</a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">{nav.map(item => <a key={item.href} href={item.href} className="text-xs font-semibold uppercase text-hero-foreground/70 hover:text-signal">{item.label}</a>)}</div>
        <span className="text-xs text-hero-foreground/45">© {new Date().getFullYear()} Isale Içamentos.</span>
      </div>
    </footer>
  </main>;
}
