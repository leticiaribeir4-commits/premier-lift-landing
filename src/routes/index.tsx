import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Armchair, Building2, ClipboardCheck, Instagram, Mail, Menu, MessagesSquare, PackageCheck, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/isale-logo.png.asset.json";
import facade from "@/assets/icamento-fachada.jpeg.asset.json";
import equipment from "@/assets/icamento-equipamento-predio.jpeg.asset.json";
import glass from "@/assets/icamento-fachada-vidro.jpeg.asset.json";
import piano from "@/assets/piano-cauda.jpeg.asset.json";
import between from "@/assets/icamento-entre-predios.jpeg.asset.json";

const WHATSAPP_URL = "https://wa.me/5511915718147?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20i%C3%A7amento.";
const EMAIL_URL = "mailto:isaleicamentos@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20-%20Isale%20I%C3%A7amentos";
const INSTAGRAM_URL = "https://www.instagram.com/isaleicamentos/";

const work = [
  { image: equipment.url, alt: "Spa sendo içado até um apartamento em edifício alto", title: "Içamento de spa", number: "01", detail: "Transporte especializado" },
  { image: facade.url, alt: "Carga sendo içada até um andar alto de edifício", title: "Içamento em andar alto", number: "02", detail: "Precisão e cuidado" },
  { image: piano.url, alt: "Piano de cauda branco em ambiente interno", title: "Peças especiais", number: "03", detail: "Cuidado em cada detalhe" },
  { image: glass.url, alt: "Peça de mármore sendo içada junto à fachada envidraçada de edifício", title: "Içamento de mármore", number: "04", detail: "Operações externas" },
];

const solutions = [
  { icon: Armchair, title: "Içamento residencial", text: "Móveis, sofás, pianos e objetos grandes que não passam por escadas ou elevadores." },
  { icon: Building2, title: "Içamento comercial", text: "Equipamentos e cargas de grande porte para empresas, lojas e obras." },
  { icon: PackageCheck, title: "Peças especiais", text: "Itens delicados ou fora do padrão, embalados e movidos com cuidado extremo." },
];

const steps = [
  { icon: MessagesSquare, title: "Chame no WhatsApp", text: "Envie uma foto do item e diga onde ele está e para onde precisa ir." },
  { icon: ClipboardCheck, title: "Receba o orçamento", text: "Avaliamos o acesso, a altura e a equipe necessária — sem compromisso." },
  { icon: ShieldCheck, title: "Nós fazemos o resto", text: "Chegamos com o equipamento certo e executamos tudo com segurança." },
];

const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#contato", label: "Contato" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>;
}

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Isale Içamentos | Içamento residencial e comercial" },
    { name: "description", content: "Soluções para seus móveis e objetos. Especialistas em içamento residencial e comercial. Solicite seu orçamento pelo WhatsApp 11 91571-8147." },
    { property: "og:title", content: "Isale Içamentos | Içamento residencial e comercial" },
    { property: "og:description", content: "Soluções para seus móveis e objetos. Especialistas em içamento residencial e comercial. Solicite seu orçamento." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Brand() {
  return <a href="#inicio" aria-label="Isale Içamentos — início" className="inline-flex shrink-0 items-center bg-card px-3 py-1.5 shadow-sm">
    <img src={logo.url} alt="Isale Içamentos" className="h-20 w-auto md:h-24" />
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main id="inicio" className="overflow-hidden">
    <header className="absolute inset-x-0 top-0 z-30 border-b border-hero-foreground/20">
      <div className="mx-auto flex h-[108px] max-w-[1440px] items-center justify-between px-5 md:h-[120px] md:px-10 lg:px-16">
        <Brand />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {nav.map(item => <a key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[.12em] text-hero-foreground/80 transition-colors hover:text-signal">{item.label}</a>)}
        </nav>
        <Button asChild variant="hero" className="hidden h-10 px-5 text-xs font-bold uppercase lg:inline-flex"><a href={WHATSAPP_URL} target="_blank" rel="noopener">Solicite seu orçamento <ArrowUpRight /></a></Button>
        <Button aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} variant="inverse" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav aria-label="Menu móvel" className="flex flex-col border-t border-hero-foreground/20 bg-hero px-6 py-5 lg:hidden">{nav.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-hero-foreground/15 py-3 text-sm font-bold uppercase text-hero-foreground">{item.label}</a>)}</nav>}
    </header>

    <section className="relative min-h-[710px] bg-hero text-hero-foreground md:min-h-[740px] lg:h-[min(820px,93vh)]">
      <img src={between.url} alt="Carga suspensa entre edifícios durante operação de içamento" className="absolute inset-0 h-full w-full object-cover object-[52%_center] lg:object-[center_42%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/80 to-hero/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-hero/75 via-transparent to-hero/20" />
      <div className="relative mx-auto flex min-h-[710px] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-32 md:min-h-[740px] md:px-10 md:pb-28 lg:h-full lg:px-16 lg:pb-32">
        <div className="max-w-[810px]">
          <div className="mb-6 flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-[.19em] text-signal"><span className="h-[2px] w-9 bg-signal" /> IÇAMENTO RESIDENCIAL E COMERCIAL</div>
          <h1 className="heading-display max-w-[870px] text-[clamp(3.6rem,8vw,7.6rem)]">SOLUÇÕES PARA SEUS <span className="text-signal">MÓVEIS E OBJETOS</span></h1>
          <p className="mt-6 text-xl font-medium leading-snug text-hero-foreground/90 md:text-2xl">Especialistas em içamento residencial e comercial.</p>
          <p className="mt-4 max-w-[500px] text-base leading-relaxed text-hero-foreground/85 md:text-lg">Movemos o que parece impossível — com planejamento, segurança e cuidado em cada detalhe.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="feature"><a href={WHATSAPP_URL} target="_blank" rel="noopener"><WhatsAppIcon className="h-5 w-5" /> Solicite seu orçamento</a></Button>
            <Button asChild variant="inverse" size="feature"><a href="#trabalhos">Ver trabalhos <ArrowDown /></a></Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden bg-signal px-9 py-5 text-signal-foreground md:flex md:items-center md:gap-8"><span className="font-display text-2xl font-bold uppercase">A altura não é limite.</span><ArrowUpRight className="h-5 w-5" /></div>
    </section>

    <section id="sobre" className="scroll-mt-10 bg-background py-14 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-16">
        <div><span className="section-kicker text-primary">QUEM SOMOS</span><h2 className="heading-display mt-6 max-w-[560px] text-[clamp(3.5rem,6vw,6.3rem)]">A SOLUÇÃO PARA SEUS MÓVEIS E OBJETOS QUE NÃO PASSAM PELO ELEVADOR OU ESCADA E <span className="text-primary">PRECISAM DE IÇAMENTO SEGURO.</span></h2></div>
        <div className="flex flex-col justify-end border-l-2 border-signal pl-7 md:pl-10">
          <p className="max-w-[650px] text-lg leading-[1.65] text-foreground md:text-xl">Há anos, a ISALE é referência em içamento seguro e soluções sob medida para o transporte de móveis e cargas especiais.</p>
          <p className="mt-6 max-w-[650px] font-semibold leading-7 text-primary">Atendemos na Grande São Paulo, interior, litoral e outras localidades.</p>
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

    <section id="trabalhos" className="scroll-mt-10 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-primary">NA PRÁTICA</span><h2 className="heading-display mt-5 text-[clamp(3.6rem,6vw,6.5rem)]">NOSSO TRABALHO<br /><span className="text-primary">FALA POR SI.</span></h2></div><p className="max-w-[310px] text-sm leading-6 text-muted-foreground">Registros reais de operações e desafios que ajudamos a superar.</p></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{work.map(item => <figure key={item.number} className="group relative m-0 h-[420px] overflow-hidden bg-surface md:h-[480px]"><img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-hero/90 via-transparent to-transparent" /><figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-hero-foreground"><div><span className="text-xs font-bold text-signal">{item.number} / {item.detail}</span><h3 className="mt-1 font-display text-3xl font-bold uppercase">{item.title}</h3></div><ArrowUpRight className="mb-1 shrink-0 text-signal" size={20} /></figcaption></figure>)}</div>
      </div>
    </section>

    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="section-kicker text-primary">SIMPLES DO SEU LADO</span><h2 className="heading-display mt-5 text-[clamp(3.4rem,5.5vw,6rem)]">SOLICITAR É <span className="text-primary">FÁCIL ASSIM.</span></h2></div><p className="max-w-[340px] text-sm leading-6 text-muted-foreground">Do primeiro contato à operação concluída, você acompanha cada etapa.</p></div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">{steps.map(item => <div key={item.title} className="flex flex-col bg-background p-8 lg:p-10"><span className="flex h-12 w-12 items-center justify-center bg-signal text-signal-foreground"><item.icon size={24} strokeWidth={2} /></span><h3 className="mt-6 font-display text-2xl font-bold uppercase md:text-3xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">{item.text}</p></div>)}</div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="feature" className="h-14 px-7 text-base font-bold uppercase"><a href={WHATSAPP_URL} target="_blank" rel="noopener"><WhatsAppIcon className="h-5 w-5" /> Solicite seu orçamento</a></Button>
          <span className="text-sm text-muted-foreground">Resposta rápida pelo WhatsApp 11 91571-8147</span>
        </div>
      </div>
    </section>

    <section id="contato" className="scroll-mt-10 bg-signal py-20 text-signal-foreground md:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-12 px-5 md:px-10 lg:flex-row lg:items-end lg:px-16">
        <div><span className="section-kicker before:bg-hero">VAMOS CONVERSAR</span><h2 className="heading-display mt-5 text-[clamp(4rem,8vw,8rem)]">TEM UM DESAFIO?<br />CONTE PRA GENTE.</h2><p className="mt-6 max-w-[600px] text-base leading-7">Descreva o que precisa ser içado e onde a operação será realizada. Respondemos rápido com a melhor solução para o seu caso.</p></div>
        <div className="flex w-full max-w-[440px] shrink-0 flex-col lg:self-end">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="group flex items-center gap-4 border-t border-signal-foreground/30 py-5 transition-colors hover:bg-signal-foreground/10 md:px-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-signal-foreground text-signal"><WhatsAppIcon className="h-6 w-6" /></span>
            <span className="flex flex-col"><span className="text-xs font-bold uppercase tracking-[.14em]">WhatsApp</span><span className="font-display text-2xl font-bold uppercase">11 91571-8147</span></span>
            <ArrowUpRight className="ml-auto h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <a href={EMAIL_URL} className="group flex items-center gap-4 border-y border-signal-foreground/30 py-5 transition-colors hover:bg-signal-foreground/10 md:px-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-signal-foreground text-signal"><Mail size={22} /></span>
            <span className="flex min-w-0 flex-col"><span className="text-xs font-bold uppercase tracking-[.14em]">E-mail</span><span className="truncate font-display text-xl font-bold uppercase md:text-2xl">isaleicamentos@gmail.com</span></span>
            <ArrowUpRight className="ml-auto h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="group flex items-center gap-4 border-b border-signal-foreground/30 py-5 transition-colors hover:bg-signal-foreground/10 md:px-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-signal-foreground text-signal"><Instagram size={22} /></span>
            <span className="flex flex-col"><span className="text-xs font-bold uppercase tracking-[.14em]">Instagram</span><span className="font-display text-xl font-bold uppercase md:text-2xl">@isaleicamentos</span></span>
            <ArrowUpRight className="ml-auto h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
    <footer className="bg-hero py-10 text-hero-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
        <div><Brand /><p className="mt-5 text-xs text-hero-foreground/55">Soluções para seus móveis e objetos.</p></div>
        <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-[.1em] text-hero-foreground/70">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-signal"><WhatsAppIcon className="h-4 w-4" /> 11 91571-8147</a>
          <a href={EMAIL_URL} className="inline-flex items-center gap-2 hover:text-signal"><Mail size={16} /> isaleicamentos@gmail.com</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-signal"><Instagram size={16} /> @isaleicamentos</a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">{nav.map(item => <a key={item.href} href={item.href} className="text-xs font-semibold uppercase text-hero-foreground/70 hover:text-signal">{item.label}</a>)}</div>
        <span className="text-xs text-hero-foreground/45">© {new Date().getFullYear()} Isale Içamentos.</span>
      </div>
    </footer>
  </main>;
}
