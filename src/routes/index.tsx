import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import hook from "@/assets/isale-hook.png.asset.json";
import facade from "@/assets/icamento-fachada.jpeg.asset.json";
import equipment from "@/assets/icamento-equipamento-predio.jpeg.asset.json";
import glass from "@/assets/icamento-fachada-vidro.jpeg.asset.json";
import piano from "@/assets/piano-cauda.jpeg.asset.json";
import between from "@/assets/icamento-entre-predios.jpeg.asset.json";
import film from "@/assets/icamento-em-acao.mp4.asset.json";
import poster from "@/assets/icamento-video-capa.jpg.asset.json";

const work = [
  { image: equipment.url, alt: "Equipamento içado até um apartamento em edifício alto", title: "Equipamentos", number: "01", detail: "Cargas de grande porte" },
  { image: facade.url, alt: "Carga suspensa em frente à fachada de um edifício", title: "Grandes alturas", number: "02", detail: "Acesso em altura" },
  { image: piano.url, alt: "Piano de cauda branco em ambiente interno", title: "Peças especiais", number: "03", detail: "Cuidado em cada detalhe" },
  { image: glass.url, alt: "Operação em fachada envidraçada de edifício", title: "Fachadas", number: "04", detail: "Operações externas" },
];

const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#contato", label: "Contato" },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Isale Içamentos | Içamento de cargas com precisão" },
    { name: "description", content: "Isale Içamentos: soluções em içamento de cargas, equipamentos e peças especiais. Conheça operações reais e solicite um orçamento." },
    { property: "og:title", content: "Isale Içamentos | Içamento de cargas com precisão" },
    { property: "og:description", content: "Conheça os trabalhos da Isale Içamentos e solicite um orçamento para sua operação." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#inicio" aria-label="Isale Içamentos — início" className={`inline-flex items-center gap-2.5 shrink-0 ${light ? "text-hero-foreground" : "text-primary"}`}>
    <img src={hook.url} alt="" className="h-11 w-9 object-contain" />
    <span className="flex flex-col leading-none"><strong className="font-display text-[2rem] font-black leading-[.76]">ISALE</strong><span className="mt-1.5 text-[.55rem] font-bold tracking-[.25em]">IÇAMENTOS</span></span>
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  return <main id="inicio" className="overflow-hidden">
    <header className="absolute inset-x-0 top-0 z-30 border-b border-hero-foreground/20">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
        <Brand light />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {nav.map(item => <a key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[.12em] text-hero-foreground/80 transition-colors hover:text-signal">{item.label}</a>)}
        </nav>
        <Button asChild variant="hero" className="hidden h-10 px-5 text-xs font-bold uppercase lg:inline-flex"><a href="#contato">Solicitar orçamento <ArrowUpRight /></a></Button>
        <Button aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} variant="inverse" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav aria-label="Menu móvel" className="flex flex-col border-t border-hero-foreground/20 bg-hero px-6 py-5 lg:hidden">{nav.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-hero-foreground/15 py-3 text-sm font-bold uppercase text-hero-foreground">{item.label}</a>)}</nav>}
    </header>

    <section className="relative min-h-[710px] bg-hero text-hero-foreground md:min-h-[740px] lg:h-[min(820px,93vh)]">
      <img src={between.url} alt="Carga suspensa entre edifícios durante operação de içamento" className="absolute inset-0 h-full w-full object-cover object-[52%_center] lg:object-[center_42%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/80 to-hero/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-hero/75 via-transparent to-hero/20" />
      <div className="relative mx-auto flex min-h-[710px] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-28 md:min-h-[740px] md:px-10 md:pb-28 lg:h-full lg:px-16 lg:pb-32">
        <div className="max-w-[810px]">
          <div className="mb-6 flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.19em] text-signal"><span className="h-[2px] w-9 bg-signal" /> IÇAMENTO DE CARGAS</div>
          <h1 className="heading-display max-w-[870px] text-[clamp(4rem,9vw,8.6rem)]">O DESAFIO É<br /><span className="text-signal">NOSSO.</span><br />A SOLUÇÃO<br />TAMBÉM.</h1>
          <p className="mt-7 max-w-[500px] text-base leading-relaxed text-hero-foreground/85 md:text-lg">Movemos o que parece impossível. Soluções em içamento para cargas, equipamentos e peças que exigem atenção especial.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="feature"><a href="#contato">Solicitar orçamento <ArrowUpRight /></a></Button>
            <Button asChild variant="inverse" size="feature"><a href="#trabalhos">Ver trabalhos <ArrowDown /></a></Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden bg-signal px-9 py-5 text-signal-foreground md:flex md:items-center md:gap-8"><span className="font-display text-2xl font-bold uppercase">A altura não é limite.</span><ArrowUpRight className="h-5 w-5" /></div>
    </section>

    <section id="sobre" className="scroll-mt-10 bg-background py-14 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-16">
        <div><span className="section-kicker text-primary">QUEM SOMOS</span><h2 className="heading-display mt-6 max-w-[500px] text-[clamp(3.5rem,6vw,6.3rem)]">QUANDO A CARGA É COMPLEXA, <span className="text-primary">A RESPOSTA É PRECISA.</span></h2></div>
        <div className="flex flex-col justify-end border-l-2 border-signal pl-7 md:pl-10"><p className="max-w-[610px] text-xl leading-[1.6] text-foreground md:text-2xl">Cada operação tem sua própria escala, seus próprios desafios e um único caminho: fazer acontecer com planejamento e cuidado.</p><p className="mt-6 max-w-[540px] text-base leading-7 text-muted-foreground">Na Isale Içamentos, transformamos desafios de acesso e movimentação em soluções para o seu projeto. De equipamentos volumosos a peças delicadas, nosso foco está em cada etapa da operação.</p><a href="#solucoes" className="mt-8 inline-flex items-center gap-2 self-start border-b-2 border-signal pb-2 text-xs font-bold uppercase tracking-[.12em] text-primary">Conheça as soluções <ArrowRight size={17} /></a></div>
      </div>
    </section>

    <section id="solucoes" className="scroll-mt-10 bg-hero py-20 text-hero-foreground md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-signal">O QUE FAZEMOS</span><h2 className="heading-display mt-5 text-[clamp(3.6rem,6vw,6.5rem)]">SOLUÇÕES PARA<br />CADA DESAFIO.</h2></div><p className="max-w-[340px] text-sm leading-6 text-hero-foreground/65">Operações pensadas para o que você precisa mover, onde você precisa chegar.</p></div>
        <div className="grid border-t border-hero-foreground/25 md:grid-cols-3">
          {[{n:"01", title:"Içamento de cargas", text:"Movimentação de cargas em locais com acesso desafiador."},{n:"02", title:"Equipamentos", text:"Soluções para a instalação e movimentação de equipamentos de grande porte."},{n:"03", title:"Peças especiais", text:"Atenção redobrada para peças que pedem um cuidado diferente."}].map((item) => <div key={item.n} className="group border-b border-hero-foreground/25 py-8 md:border-r md:px-7 md:last:border-r-0 lg:px-10"><div className="mb-16 flex items-center justify-between"><span className="font-display text-2xl font-semibold text-signal">{item.n}</span><ArrowUpRight className="h-5 w-5 text-signal transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><h3 className="font-display text-3xl font-bold uppercase md:text-4xl">{item.title}</h3><p className="mt-3 max-w-[260px] text-sm leading-6 text-hero-foreground/65">{item.text}</p></div>)}
        </div>
      </div>
    </section>

    <section id="trabalhos" className="scroll-mt-10 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-primary">NA PRÁTICA</span><h2 className="heading-display mt-5 text-[clamp(3.6rem,6vw,6.5rem)]">NOSSO TRABALHO<br /><span className="text-primary">FALA POR SI.</span></h2></div><p className="max-w-[310px] text-sm leading-6 text-muted-foreground">Registros reais de operações e desafios que ajudamos a superar.</p></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{work.map(item => <figure key={item.number} className="group relative m-0 h-[420px] overflow-hidden bg-surface md:h-[480px]"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-hero/90 via-transparent to-transparent" /><figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-hero-foreground"><div><span className="text-xs font-bold text-signal">{item.number} / {item.detail}</span><h3 className="mt-1 font-display text-3xl font-bold uppercase">{item.title}</h3></div><ArrowUpRight className="mb-1 shrink-0 text-signal" size={20} /></figcaption></figure>)}</div>
      </div>
    </section>

    <section className="bg-surface py-16 md:py-24"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-[.55fr_1fr] lg:items-center lg:gap-20 lg:px-16"><div><span className="section-kicker text-primary">EM MOVIMENTO</span><h2 className="heading-display mt-5 text-[clamp(3.4rem,5vw,5.5rem)]">VEJA A OPERAÇÃO<br /><span className="text-primary">ACONTECER.</span></h2><p className="mt-5 max-w-[370px] text-base leading-7 text-muted-foreground">Do planejamento à execução, cada movimento importa.</p></div><div className="relative overflow-hidden bg-hero"><video className="aspect-video w-full object-cover" poster={poster.url} src={film.url} playsInline controls={videoOpen} autoPlay={videoOpen} muted={videoOpen} loop={videoOpen} preload="none" aria-label="Vídeo de operação real de içamento" />{!videoOpen && <Button variant="hero" size="icon" aria-label="Reproduzir vídeo da operação" onClick={() => setVideoOpen(true)} className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"><Play className="ml-0.5 fill-current" /></Button>}</div></div></section>

    <section className="bg-background py-20 md:py-28"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:grid-cols-2 md:px-10 lg:px-16"><div><span className="section-kicker text-primary">NOSSO JEITO DE FAZER</span><h2 className="heading-display mt-5 text-[clamp(3.5rem,6vw,6rem)]">CADA DETALHE<br />FAZ <span className="text-primary">DIFERENÇA.</span></h2></div><div className="grid gap-0 border-t border-border">{["Entender o desafio antes de movimentar", "Planejar o acesso e a operação", "Cuidar da carga em cada movimento"].map((text, index) => <div key={text} className="flex items-center gap-5 border-b border-border py-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-signal text-signal-foreground"><Check size={19} strokeWidth={3} /></span><span className="font-display text-2xl font-bold uppercase md:text-3xl">{text}</span><span className="ml-auto self-start text-xs text-muted-foreground">0{index+1}</span></div>)}</div></div></section>

    <section id="contato" className="scroll-mt-10 bg-signal py-20 text-signal-foreground md:py-28"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 px-5 md:px-10 lg:flex-row lg:items-end lg:px-16"><div><span className="section-kicker before:bg-hero">VAMOS CONVERSAR</span><h2 className="heading-display mt-5 text-[clamp(4rem,8vw,8rem)]">TEM UM DESAFIO?<br />CONTE PRA GENTE.</h2><p className="mt-6 max-w-[600px] text-base leading-7">Descreva o que precisa ser içado e onde a operação será realizada. Vamos encontrar o melhor caminho juntos.</p></div><Button asChild variant="default" size="feature" className="h-14 shrink-0 self-start px-7 lg:self-end"><a href="mailto:?subject=Solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20-%20Isale%20I%C3%A7amentos">Preparar e-mail <ArrowUpRight /></a></Button></div></section>
    <footer className="bg-hero py-10 text-hero-foreground"><div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16"><div><Brand light /><p className="mt-5 text-xs text-hero-foreground/55">Soluções em içamento de cargas.</p></div><div className="flex flex-wrap gap-x-6 gap-y-3">{nav.map(item => <a key={item.href} href={item.href} className="text-xs font-semibold uppercase text-hero-foreground/70 hover:text-signal">{item.label}</a>)}</div><span className="text-xs text-hero-foreground/45">© {new Date().getFullYear()} Isale Içamentos.</span></div></footer>
  </main>;
}