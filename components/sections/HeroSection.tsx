"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Animacao base usada nos elementos do Hero.
 *
 * Para deixar a entrada mais sutil, reduza `y`.
 * Para deixar mais lenta/rapida, altere o `transition` nos componentes `motion.*`
 * onde `variants={fadeUp}` e usado.
 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Faz os filhos entrarem um depois do outro.
 * `staggerChildren` controla o intervalo entre badge, titulo, texto e botoes.
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
 * Hero principal da landing.
 *
 * Estrutura visual:
 * - Fundo escuro com gradientes radiais e grid discreto.
 * - Conteudo textual ocupa quase toda a largura para valorizar a headline.
 * - Nao existe imagem/3D aqui atualmente.
 *
 * Onde editar:
 * - Badge: bloco com "Software House / Produtos Digitais / Infraestrutura".
 * - Headline: `motion.h1`.
 * - Subtexto: `motion.p`.
 * - Botoes: dois `<a>` no bloco final.
 */
export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#050608] pt-24 text-white md:pt-28">
      {/* Camada de fundo: altera clima visual sem mexer no conteudo. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(239,68,68,0.14),transparent_30%),radial-gradient(circle_at_82%_42%,rgba(37,99,235,0.13),transparent_36%),radial-gradient(circle_at_55%_82%,rgba(255,204,51,0.09),transparent_30%),linear-gradient(180deg,#050608_0%,#080A0F_100%)]" />
      {/* Grid sutil. Para remover, apague este `div`. */}
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      {/* Circulo decorativo discreto no canto direito. */}
      <div className="absolute -right-24 top-32 h-80 w-80 rounded-full border border-white/10 bg-white/[0.015]" />
      {/* Linha inferior separando o hero da proxima secao. */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-red from-transparent via-white/16 to-transparent" />

      {/* Altura do hero: ajuste `min-h-[650px]` e `lg:min-h-[740px]` se quiser mais/menos respiro. */}
      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 pb-16 lg:min-h-[740px] lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-6xl">
          {/* Badge superior. Mantive spans pequenos para os pontos coloridos entre os textos. */}
          <motion.div
            variants={fadeUp}
            className="mb-7 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/14 bg-white/[0.035] px-4 py-2 text-xs font-bold text-white/72 shadow-2xl backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#2A66C2]" />
            Software House
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B3B]" />
            Produtos Digitais
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFCC33]" />
            Infraestrutura Escalável
          </motion.div>

          {/* Headline principal. O tamanho grande fica em `text-6xl`, `md:text-8xl`, `lg:text-[7.25rem]`. */}
          <motion.h1
            variants={fadeUp}
            className="font-display max-w-6xl text-6xl font-semibold leading-[0.92] text-white md:text-8xl lg:text-[7.25rem]"
          >
            Construímos a próxima camada digital das <span className="text-[#FFCC33]">empresas</span>
            <span className="text-[#FF3B3B]">.</span>
          </motion.h1>

          {/* Texto de apoio. Limite `max-w-2xl` evita linhas muito longas no desktop. */}
          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
            Produtos digitais, sistemas sob medida, integrações, dados e automações para empresas que precisam escalar
            com clareza, performance e estrutura.
          </motion.p>

          {/* CTAs do Hero. Troque os hrefs se quiser apontar para outras secoes ou links externos. */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#sobre"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#EF4444] px-6 py-4 text-sm font-black text-white shadow-[0_20px_50px_rgba(239,68,68,0.24)] transition hover:bg-[#FF3B3B] hover:shadow-[0_0_36px_rgba(255,59,59,0.22)]"
            >
              Conheça a NextCube
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#produtos"
              className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/16 bg-white/[0.03] px-6 py-4 text-sm font-black text-white transition hover:bg-white/[0.08]"
            >
              Ver produtos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
