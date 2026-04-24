"use client";

import Image from "next/image";
import React, { type ReactNode, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  Box,
  Code2,
  Database,
  LineChart,
  Cloud,
  Puzzle,
  Cog,
  ShieldCheck,
  Layers3,
  Network,
  Link2,
  Menu,
  X,
  Camera,
  Mail,
  type LucideIcon,
} from "lucide-react";
import {
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { HeroSection } from "../../components/sections/HeroSection";
import {
  developedCases,
  ecosystemCards,
  landingLinks,
  type CaseMetric,
  type EcosystemCard,
  type EcosystemIconKey,
} from "../content/landing";

/**
 * Navegacao do header.
 * O href e montado automaticamente com `item.toLowerCase()`, entao:
 * - "Sobre" aponta para "#sobre"
 * - "Produtos" aponta para "#produtos"
 * - "Cases" aponta para "#cases"
 * - "Contato" aponta para "#contato"
 *
 * Se adicionar item com acento ou espaco, prefira trocar para objetos
 * com `{ label, href }` para evitar links ruins.
 */
const navItems = ["Sobre", "Produtos", "Cases", "Contato"];

/**
 * Cores semanticas usadas em alguns arrays locais.
 * Isso limita os valores possiveis e evita erro de digitar "yelow" etc.
 */
type Accent = "red" | "yellow" | "blue";

/**
 * Variante padrao de entrada ao scroll.
 * Usada por `SectionReveal` e pelos cards.
 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Variante para animar listas em sequencia.
 * Aumente `staggerChildren` para uma entrada mais espaçada.
 */
const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/**
 * Wrapper de secao com animacao de entrada.
 *
 * Use este componente quando criar uma nova secao na pagina.
 * - `id`: ancora usada por links do menu.
 * - `className`: classes Tailwind da secao.
 * - `children`: conteudo da secao.
 */
function SectionReveal({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/**
 * Logo da NextCube reutilizada no header e footer.
 *
 * A imagem vem de `/public/Cube.png`.
 * Para trocar a logo, substitua esse arquivo ou altere `src`.
 */
function LogoMark({ size = "md" }) {
  const box = size === "lg" ? 48 : 36;
  return (
    <div className="relative shrink-0" style={{ height: box, width: box }} aria-label="NextCube logo">
      <Image
        src="/Cube.png"
        alt=""
        fill
        sizes={`${box}px`}
        className="object-contain drop-shadow-[0_10px_22px_rgba(239,68,68,0.28)]"
        priority
      />
    </div>
  );
}

/**
 * Linhas decorativas animadas usadas em secoes escuras e claras.
 *
 * `dark=true` aumenta a opacidade para fundos escuros.
 * As animacoes CSS ficam no `<style>` no final deste arquivo.
 */
function FlowLines({ dark = false, className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`flow-line flow-red ${dark ? "opacity-70" : "opacity-30"}`} />
      <div className={`flow-line flow-yellow ${dark ? "opacity-70" : "opacity-30"}`} />
      <div className={`flow-line flow-blue ${dark ? "opacity-70" : "opacity-30"}`} />
      <div className="flow-dot dot-one" />
      <div className="flow-dot dot-two" />
      <div className="flow-dot dot-three" />
    </div>
  );
}

/**
 * Header fixo da landing.
 *
 * Responsabilidades:
 * - Mostra logo, links e CTA no desktop.
 * - Mostra menu mobile com estado `open`.
 * - Aplica blur/borda quando o usuario rola a pagina (`scrolled`).
 *
 * Link do CTA:
 * - Vem de `landingLinks.talkToNextCube` em `src/content/landing.ts`.
 */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-[#07080c]/80 shadow-2xl shadow-black/20 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <LogoMark />
          <span className="text-lg font-black tracking-[0.16em] text-white">NEXTCUBE</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="group relative text-sm font-semibold text-white/70 transition hover:text-white"
            >
              {item}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-red from-red-500 via-yellow-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <a href={landingLinks.talkToNextCube} className="group hidden items-center gap-3 rounded-xl border border-red-500/60 px-5 py-3 text-sm font-bold text-white transition hover:border-red-400 hover:bg-red-500/10 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] md:flex">
          Falar com a NextCube
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>

        <button onClick={() => setOpen(!open)} className="rounded-xl border border-white/10 p-2 text-white md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#07080c]/95 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm font-semibold text-white/80">
                {item}
              </a>
            ))}
            <a href={landingLinks.talkToNextCube} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white">
              Falar com a NextCube <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}

const aboutCards = [
  { title: "Produto", text: "Desenvolvemos produtos digitais com foco em valor, usabilidade e evolução contínua.", icon: Box, color: "red" },
  { title: "Engenharia", text: "Arquitetura robusta, código limpo e práticas modernas de desenvolvimento.", icon: Code2, color: "blue" },
  { title: "Dados", text: "Transformamos dados em inteligência para decisões mais rápidas e precisas.", icon: Database, color: "yellow" },
  { title: "Escala", text: "Infraestrutura preparada para crescer com segurança, performance e eficiência.", icon: LineChart, color: "blue" },
] satisfies Array<{ title: string; text: string; icon: LucideIcon; color: Accent }>;

/**
 * Classes usadas pelos cards tradicionais que ainda existem em outras secoes.
 * Mantive separado para reaproveitar cor/borda sem repetir condicional em JSX.
 */
function colorClasses(color: Accent) {
  if (color === "red") return "text-red-500 border-red-500/25 group-hover:border-red-500/60 group-hover:bg-red-50";
  if (color === "yellow") return "text-yellow-500 border-yellow-400/25 group-hover:border-yellow-400/70 group-hover:bg-yellow-50";
  return "text-blue-500 border-blue-500/25 group-hover:border-blue-500/60 group-hover:bg-blue-50";
}

/**
 * Classes dos icones livres da secao About.
 * Esta secao nao usa cards com borda; apenas icone + texto.
 */
function freeIconClasses(color: Accent) {
  if (color === "red") return "bg-red-500/8 text-red-500 shadow-[0_18px_42px_rgba(239,68,68,0.08)]";
  if (color === "yellow") return "bg-yellow-400/12 text-yellow-500 shadow-[0_18px_42px_rgba(250,204,21,0.08)]";
  return "bg-blue-500/8 text-blue-500 shadow-[0_18px_42px_rgba(37,99,235,0.08)]";
}

/**
 * Secao "Quem Somos".
 *
 * Para alterar os quatro itens da direita, edite `aboutCards` acima.
 * Para alterar texto institucional, edite diretamente o h2 e o paragrafo abaixo.
 */
function AboutSection() {
  return (
    <SectionReveal id="sobre" className="bg-[#f7f7f4] py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-black tracking-[0.18em] text-red-500">QUEM SOMOS</p>
          <h2 className="font-display mt-4 max-w-lg text-4xl font-semibold leading-tight text-[#171717] md:text-5xl">Tecnologia estruturada para empresas em crescimento.</h2>
          <div className="mt-5 h-1 w-12 rounded-full bg-red-500" />
          <p className="mt-5 max-w-lg text-base leading-8 text-neutral-600">
            Criamos sistemas digitais que organizam dados, automatizam processos e transformam operações complexas em plataformas simples, conectadas e escaláveis.
          </p>
        </div>

        <motion.div variants={stagger} className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {aboutCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div variants={fadeUp} key={card.title} className="group flex gap-5">
                <div className={`mt-1 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${freeIconClasses(card.color)}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-900">{card.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600">{card.text}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionReveal>
  );
}

/**
 * Renderiza o icone de cada produto do ecossistema.
 *
 * Fluxo:
 * 1. Se `card.logoSrc` existir, usa a imagem de `/public`.
 * 2. Se nao existir, usa um dos icones internos definidos por `card.icon`.
 *
 * Os dados dos cards ficam em `src/content/landing.ts`.
 */
function EcosystemIcon({ card }: { card: EcosystemCard }) {
  if (card.logoSrc) {
    return (
      <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
        <Image src={card.logoSrc} alt="" fill sizes="64px" className="object-contain" />
      </div>
    );
  }

  const type: EcosystemIconKey = card.icon;
  if (type === "prisma") return <div className="h-16 w-16 rounded-[18px] bg-[conic-gradient(from_180deg,#1d4ed8,#60a5fa,#0f172a,#1d4ed8)] shadow-[0_18px_45px_rgba(37,99,235,0.25)] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />;
  if (type === "hub") return <Network className="h-16 w-16 text-yellow-400" />;
  if (type === "core") return <Layers3 className="h-16 w-16 text-red-500" />;
  return <Link2 className="h-16 w-16 text-blue-500" />;
}

/**
 * Secao "Ecossistema NextCube".
 *
 * Esta secao e data-driven: os cards vem de `ecosystemCards`.
 * Para trocar nome, descricao, link ou logo, edite `src/content/landing.ts`.
 */
function EcosystemSection() {
  return (
    <SectionReveal id="produtos" className="relative overflow-hidden bg-white py-14 md:py-16">
      <FlowLines />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-[#171717] md:text-5xl">Ecossistema NextCube</h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-red from-red-500 via-yellow-400 to-blue-500" />
          <p className="mt-5 text-base leading-8 text-neutral-600">Produtos pensados para conectar marketing, operação, dados e crescimento em uma única camada digital.</p>
        </div>

        <motion.div variants={stagger} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ecosystemCards.map((item) => (
            <motion.a href={item.href} variants={fadeUp} key={item.name} className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_80px_rgba(15,23,42,0.10)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-red from-transparent via-red-500/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              <EcosystemIcon card={item} />
              <h3 className="mt-7 text-xl font-black text-neutral-900">{item.name}</h3>
              <p className="mt-3 min-h-18 text-sm leading-7 text-neutral-600">{item.description}</p>
              <span className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-red-500 transition group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}

/**
 * Cards da secao "O que construimos".
 * Diferente do ecossistema, estes itens ainda estao locais porque sao capacidades,
 * nao produtos/cases que costumam mudar com frequencia.
 */
const capabilities = [
  { title: "Produtos SaaS", text: "Plataformas escaláveis que resolvem problemas reais e geram resultado.", icon: Cloud, color: "red" },
  { title: "Sistemas sob medida", text: "Soluções personalizadas para processos críticos e diferenciais competitivos.", icon: Puzzle, color: "yellow" },
  { title: "Integrações e automações", text: "Conectamos sistemas, pessoas e dados para eliminar atritos e acelerar operações.", icon: Cog, color: "blue" },
  { title: "Dashboards e inteligência", text: "Visibilidade em tempo real para decisões mais estratégicas e baseadas em dados.", icon: LineChart, color: "yellow" },
  { title: "Segurança e performance", text: "Infraestrutura confiável, com alta disponibilidade, monitoramento e boas práticas.", icon: ShieldCheck, color: "red" },
] satisfies Array<{ title: string; text: string; icon: LucideIcon; color: Accent }>;

/**
 * Secao "O que construimos".
 *
 * Para adicionar/remover capacidade, altere o array `capabilities`.
 * O grid desktop esta configurado para 5 colunas (`lg:grid-cols-5`).
 */
function CapabilitiesSection() {
  return (
    <SectionReveal className="bg-[#f7f7f4] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-[#171717] md:text-4xl">O que construímos</h2>
          <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-red-500" />
        </div>
        <motion.div variants={stagger} className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          <span className="pointer-events-none absolute -top-4 left-[7%] right-[7%] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(239,68,68,.28),rgba(250,204,21,.28),rgba(37,99,235,.28),transparent)] lg:block" />
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div variants={fadeUp} key={item.title} className={`group relative rounded-3xl border bg-white p-6 text-center shadow-[0_18px_60px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 ${colorClasses(item.color)}`}>
                <span className={`absolute -top-4 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${item.color === "red" ? "bg-red-500" : item.color === "yellow" ? "bg-yellow-400" : "bg-blue-500"}`} />
                <Icon className="mx-auto h-10 w-10 transition group-hover:scale-110" />
                <h3 className="mt-6 text-base font-black text-neutral-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{item.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionReveal>
  );
}

const techs = [
  { name: "Supabase", icon: siSupabase, color: "#3ECF8E" },
  { name: "React.js", icon: siReact, color: "#61DAFB" },
  { name: "Next.js", icon: siNextdotjs, color: "#FFFFFF" },
  { name: "Nest.js", icon: siNestjs, color: "#E0234E" },
  { name: "TypeScript", icon: siTypescript, color: "#3178C6" },
  { name: "Node.js", icon: siNodedotjs, color: "#5FA04E" },
  { name: "Tailwind CSS", icon: siTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", icon: siPostgresql, color: "#4169E1" },
] satisfies Array<{ name: string; icon: SimpleIcon; color: string }>;

/**
 * Renderiza uma logo real do pacote `simple-icons`.
 *
 * Para adicionar nova tecnologia:
 * 1. Importe o icone no topo: `siAlgumaCoisa`.
 * 2. Adicione um item em `techs` com `{ name, icon, color }`.
 *
 * O `path` do SVG vem do simple-icons; por isso a logo fica vetorial.
 */
function TechLogo({ icon, color }: { icon: SimpleIcon; color: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} className="h-12 w-12">
      <path d={icon.path} fill={color} />
    </svg>
  );
}

/**
 * Faixa escura de tecnologias.
 *
 * O grid usa tiles quadrados (`aspect-square`) para manter alinhamento 1x1.
 * Para mexer em quantidade de colunas, altere `grid-cols-2` e `sm:grid-cols-4`.
 */
function TechStackSection() {
  return (
    <SectionReveal className="relative overflow-hidden bg-[#07080c] py-10 text-white md:py-12">
      <FlowLines dark className="opacity-70" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div>
          <h2 className="font-display max-w-sm text-3xl font-semibold leading-tight md:text-4xl">Tecnologias que usamos</h2>
          <div className="mt-5 h-1 w-12 rounded-full bg-red-500" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/58">Stack moderna, ferramentas líderes de mercado e foco em performance, segurança e escalabilidade.</p>
        </div>
        <motion.div variants={stagger} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {techs.map((tech) => (
            <motion.div
              variants={fadeUp}
              key={tech.name}
              className="tech-card group relative flex aspect-square min-h-32 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-center shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.075]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/4.5 transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]">
                <TechLogo icon={tech.icon} color={tech.color} />
              </div>
              <p className="mt-4 text-sm font-black text-white/85">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}

/**
 * Hook simples de count-up para metricas.
 *
 * Ele anima de 0 ate `target` quando `visible` fica true.
 * Usado no mockup de dashboard do case.
 */
function useCountUp(target: number, visible: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, visible]);
  return value;
}

/**
 * Formata as metricas dos cases.
 *
 * `kind` controla a saida:
 * - currency: R$ 1.000,00
 * - number: 128
 * - multiplier: 3,19x
 * - percent: 4,62%
 */
function formatCaseMetric(metric: CaseMetric, value: number) {
  if (metric.kind === "currency") {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (metric.kind === "multiplier") {
    return `${value.toFixed(metric.precision ?? 2)}x`.replace(".", ",");
  }

  if (metric.kind === "percent") {
    return `${value.toFixed(metric.precision ?? 2)}%`.replace(".", ",");
  }

  return Math.round(value).toLocaleString("pt-BR");
}

/**
 * Card pequeno de metrica dentro do mockup do dashboard.
 * Recebe o objeto `metric` completo para reduzir props soltas.
 */
function Metric({
  metric,
  visible,
}: {
  metric: CaseMetric;
  visible: boolean;
}) {
  const count = useCountUp(metric.value, visible);
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3">
      <p className="text-[10px] font-bold text-neutral-500">{metric.label}</p>
      <p className="mt-1 text-sm font-black text-neutral-900">{formatCaseMetric(metric, count)}</p>
    </div>
  );
}

/**
 * Mockup visual do dashboard do case.
 *
 * Importante:
 * - No mobile, usa uma imagem cropada em `/public/nextcube-case-reference.png`.
 * - No desktop, renderiza um mockup em HTML/SVG com metricas reais do case ativo.
 */
function RoiDashboard({ metrics }: { metrics: CaseMetric[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-120px" });
  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.12)]">
      <div className="relative min-h-[205px] md:hidden">
        <Image
          src="/nextcube-case-reference.png"
          alt="Mockup mobile do dashboard RoiInfluencer"
          fill
          sizes="92vw"
          className="object-cover object-left-top"
        />
      </div>
      <div className="hidden min-h-[330px] md:flex">
        <div className="hidden w-24 bg-[#0c111b] p-4 md:block">
          <div className="mb-8 h-7 w-7 rounded-lg bg-red-500/80" />
          {["Campanhas", "Influencers", "Métricas", "Pagamentos", "Config."].map((x) => (
            <div key={x} className="mb-4 h-3 rounded-full bg-white/10" />
          ))}
        </div>
        <div className="flex-1 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-black text-neutral-900">Visão geral</p>
              <p className="text-xs text-neutral-500">Monitoramento em tempo real</p>
            </div>
            <div className="flex gap-2"><span className="h-8 w-8 rounded-full bg-neutral-100" /><span className="h-8 w-8 rounded-full bg-neutral-100" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {metrics.map((metric) => (
              <Metric key={metric.label} metric={metric} visible={visible} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-neutral-200 p-4">
              <p className="mb-4 text-xs font-black text-neutral-800">Desempenho</p>
              <svg viewBox="0 0 360 140" className="h-36 w-full">
                <path d="M0 120 L360 120" stroke="#e5e7eb" />
                <path d="M0 80 L360 80" stroke="#f1f5f9" />
                <motion.path d="M8 112 C52 98, 70 118, 108 84 S170 96, 206 48 S270 70, 318 28 S348 54, 356 42" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} />
              </svg>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4">
              <p className="mb-4 text-xs font-black text-neutral-800">Canais de aquisição</p>
              <div className="mx-auto h-28 w-28 rounded-full bg-[conic-gradient(#2563eb_0_56%,#facc15_56%_82%,#ef4444_82%_100%)] p-4">
                <div className="h-full w-full rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Secao "Cases desenvolvidos".
 *
 * Esta secao funciona como carrossel, mas so mostra controles se existir
 * mais de um item em `developedCases`.
 *
 * Para adicionar cases:
 * - Edite `developedCases` em `src/content/landing.ts`.
 * - Ao adicionar o segundo item, os botoes anterior/proximo e dots aparecem.
 */
function CasesSection() {
  // Indice do case atualmente exibido no carrossel.
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  // Fallback defensivo: se o indice ficar invalido, usa o primeiro case.
  const activeCase = developedCases[activeCaseIndex] ?? developedCases[0];
  // Evita mostrar controles de carrossel quando so existe um case.
  const hasMultipleCases = developedCases.length > 1;

  // Navega para o case anterior, com loop para o ultimo ao chegar no primeiro.
  const showPreviousCase = () => {
    setActiveCaseIndex((current) => (current === 0 ? developedCases.length - 1 : current - 1));
  };

  // Navega para o proximo case, com loop para o primeiro ao chegar no ultimo.
  const showNextCase = () => {
    setActiveCaseIndex((current) => (current === developedCases.length - 1 ? 0 : current + 1));
  };

  // Se o array de cases ficar vazio, a secao nao renderiza.
  if (!activeCase) return null;

  return (
    <SectionReveal id="cases" className="bg-[#f7f7f4] py-14 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.45fr_1.55fr] lg:px-8">
        <div>
          <h2 className="font-display text-4xl font-semibold text-[#171717]">Cases desenvolvidos</h2>
          <div className="mt-5 h-1 w-12 rounded-full bg-red-500" />
          <p className="mt-6 text-base leading-8 text-neutral-600">Soluções que geram impacto real. Tecnologia aplicada a desafios reais de negócio.</p>
          <a href={landingLinks.allCases} className="group mt-10 inline-flex items-center gap-3 rounded-xl border border-red-500/45 bg-white px-6 py-4 text-sm font-black text-neutral-900 transition hover:border-red-500 hover:text-red-500">
            Ver todos os cases <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          {hasMultipleCases && (
            <div className="mt-6 flex items-center gap-3">
              <button type="button" onClick={showPreviousCase} aria-label="Case anterior" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-red-500 hover:text-red-500">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button type="button" onClick={showNextCase} aria-label="Próximo case" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-red-500 hover:text-red-500">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <motion.div key={activeCase.name} variants={fadeUp} className="grid gap-6 rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-[0_24px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.42fr_0.58fr]">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full p-2 shadow-[0_18px_50px_rgba(37,99,235,0.18)]" style={{ background: activeCase.logoGradient }}><div className="h-full w-full rounded-full bg-white" /></div>
              <h3 className="text-3xl font-black tracking-[-0.03em] text-neutral-900">{activeCase.name}</h3>
            </div>
            <p className="mt-8 text-sm font-black text-red-500">{activeCase.eyebrow}</p>
            <p className="mt-4 text-sm leading-7 text-neutral-600">{activeCase.description}</p>
            <a href={activeCase.href} className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-neutral-200 px-5 py-3 text-sm font-black text-neutral-900 transition hover:border-red-500 hover:text-red-500">
              Ver case completo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            {hasMultipleCases && (
              <div className="mt-8 flex gap-2">
                {developedCases.map((caseItem, index) => (
                  <button
                    key={caseItem.name}
                    type="button"
                    onClick={() => setActiveCaseIndex(index)}
                    aria-label={`Ver case ${caseItem.name}`}
                    className={`h-2 rounded-full transition-all ${index === activeCaseIndex ? "w-8 bg-red-500" : "w-2 bg-neutral-300 hover:bg-neutral-400"}`}
                  />
                ))}
              </div>
            )}
          </div>
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <RoiDashboard metrics={activeCase.metrics} />
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}

/**
 * CTA final antes do footer.
 *
 * O lado direito fica vazio de proposito para preservar a composicao/espaco.
 * O link do botao vem de `landingLinks.talkToSpecialist`.
 */
function FinalCTA() {
  return (
    <SectionReveal id="contato" className="relative overflow-hidden bg-[#06070b] py-10 text-white md:py-12">
      <FlowLines dark />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <h2 className="font-display max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">Vamos construir a próxima <span className="text-yellow-300">estrutura digital</span> da sua empresa?</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">Fale com nosso time e descubra como a NextCube pode conectar ideias, processos e tecnologia para impulsionar o crescimento do seu negócio.</p>
          <a href={landingLinks.talkToSpecialist} className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-red-500 px-6 py-4 text-sm font-black text-white transition hover:bg-red-400 hover:shadow-[0_0_35px_rgba(239,68,68,0.25)]">
            Falar com um especialista <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden h-52 w-full overflow-hidden lg:block"
          aria-hidden="true"
        />
      </div>
    </SectionReveal>
  );
}

/**
 * Footer da landing.
 *
 * Atualmente os links sociais sao placeholders (`href="#"`).
 * Se quiser centralizar estes links tambem, mova `socialLinks` para
 * `src/content/landing.ts`, igual fizemos com CTAs, cases e ecossistema.
 */
function Footer() {
  const socialLinks = [
    { label: "LinkedIn", text: "in" },
    { label: "Instagram", icon: Camera },
    { label: "Email", icon: Mail },
  ] satisfies Array<{ label: string; icon?: LucideIcon; text?: string }>;

  return (
    <footer className="border-t border-white/10 bg-[#030407] text-white">
      <div className="h-px bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3"><LogoMark /><span className="text-lg font-black tracking-[0.16em]">NEXTCUBE</span></div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">Tecnologia que conecta ideias, pessoas e processos para construir o futuro das empresas.</p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, icon: Icon, text }) => (
              <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/70 transition hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_24px_rgba(239,68,68,0.22)]">
                {Icon ? <Icon className="h-4 w-4" /> : <span className="text-xs font-black">{text}</span>}
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="EMPRESA" links={["Sobre", "Cases", "Contato"]} />
        <FooterCol title="PRODUTOS" links={["Prisma", "Connect Hub", "Next Core", "Nexis"]} />
        <FooterCol title="LEGAL" links={["Política de Privacidade", "Termos de Serviço"]} />
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-8 text-center text-xs text-white/40 lg:px-8">© 2025 NextCube Inc. Todos os direitos reservados.</div>
    </footer>
  );
}

/**
 * Coluna simples de links do footer.
 * Recebe titulo e lista de textos. Hoje todos apontam para "#".
 */
function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-black tracking-[0.18em] text-white/45">{title}</h4>
      <div className="mt-5 grid gap-3">
        {links.map((link) => <a key={link} href="#" className="text-sm text-white/58 transition hover:text-red-400">{link}</a>)}
      </div>
    </div>
  );
}

/**
 * Componente raiz da pagina.
 *
 * Ordem das secoes na landing:
 * 1. Header
 * 2. HeroSection
 * 3. AboutSection
 * 4. EcosystemSection
 * 5. CapabilitiesSection
 * 6. TechStackSection
 * 7. CasesSection
 * 8. FinalCTA
 * 9. Footer
 */
export default function NextCubeLandingPage() {
  return (
    <main className="min-h-screen scroll-smooth bg-white font-sans text-neutral-950">
      <Header />
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <CapabilitiesSection />
      <TechStackSection />
      <CasesSection />
      <FinalCTA />
      <Footer />
      <style>{`
        /* Scroll suave para os links de ancora do header. */
        html { scroll-behavior: smooth; }

        /* Linhas decorativas reutilizadas pelo componente FlowLines. */
        .flow-line { position:absolute; height:2px; width:72%; left:14%; border-radius:999px; filter: blur(.1px); background-size: 220% 100%; animation: flowMove 5.5s linear infinite; }
        .flow-red { top:30%; background-image:linear-gradient(90deg, transparent, rgba(239,68,68,.85), transparent); transform: rotate(-16deg); }
        .flow-yellow { top:52%; background-image:linear-gradient(90deg, transparent, rgba(250,204,21,.85), transparent); transform: rotate(8deg); animation-delay: -1.2s; }
        .flow-blue { top:69%; background-image:linear-gradient(90deg, transparent, rgba(37,99,235,.9), transparent); transform: rotate(-8deg); animation-delay: -2.4s; }

        /* Pontos luminosos que acompanham a leitura visual das linhas. */
        .flow-dot { position:absolute; height:7px; width:7px; border-radius:999px; box-shadow:0 0 20px currentColor; animation: dotTravel 7s ease-in-out infinite; }
        .dot-one { top:28%; left:10%; color:#ef4444; background:#ef4444; }
        .dot-two { top:52%; left:20%; color:#facc15; background:#facc15; animation-delay:-2s; }
        .dot-three { top:68%; left:5%; color:#2563eb; background:#2563eb; animation-delay:-4s; }

        /* Brilho/scan sutil nos cards da stack. */
        .tech-card:before { content:""; position:absolute; inset:0; transform:translateX(-120%); background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent); animation: scan 4.5s ease-in-out infinite; }

        @keyframes flowMove { 0% { background-position: 220% 0; } 100% { background-position: -220% 0; } }
        @keyframes dotTravel { 0%,100% { transform: translateX(0) translateY(0); opacity:.2; } 50% { transform: translateX(65vw) translateY(22px); opacity:1; } }
        @keyframes scan { 0%,55% { transform:translateX(-120%); } 75%,100% { transform:translateX(120%); } }

        /* Respeita usuarios que preferem menos movimento no sistema operacional. */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
        }
      `}</style>
    </main>
  );
}
