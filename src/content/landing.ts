/**
 * Este arquivo concentra os dados mais provaveis de serem alterados manualmente.
 *
 * Regra pratica:
 * - Trocar textos, links, cases e produtos: mexa aqui.
 * - Trocar layout, grid, animacoes e estilos: mexa nos componentes em `src/app/page.tsx`
 *   ou em `components/sections/HeroSection.tsx`.
 *
 * Mantive os tipos neste arquivo para o TypeScript avisar quando faltar algum campo.
 */

/**
 * Chaves dos icones desenhados internamente para os cards do Ecossistema.
 * Se quiser criar outro icone por codigo, adicione a chave aqui e implemente
 * o desenho correspondente em `EcosystemIcon`, dentro de `src/app/page.tsx`.
 */
export type EcosystemIconKey = "prisma" | "hub" | "core" | "nexis";

/**
 * Configuracao de cada card da secao "Ecossistema NextCube".
 */
export type EcosystemCard = {
  /** Nome exibido como titulo do card. */
  name: string;
  /** Texto curto abaixo do nome. Idealmente manter entre 1 e 2 linhas. */
  description: string;
  /** Link aberto quando o usuario clica no card inteiro. */
  href: string;
  /** Icone interno usado quando `logoSrc` nao foi informado. */
  icon: EcosystemIconKey;
  /**
   * Caminho opcional para uma logo propria em `/public`.
   *
   * Exemplo:
   * logoSrc: "/logos/prisma.svg"
   *
   * Se este campo existir, ele substitui o icone interno.
   */
  logoSrc?: string;
};

/**
 * Tipos de metrica aceitos no mockup/dashboard de cases.
 * O formato visual e controlado por `formatCaseMetric` em `src/app/page.tsx`.
 */
export type CaseMetricKind = "currency" | "number" | "multiplier" | "percent";

/**
 * Uma metrica exibida no mockup do dashboard do case.
 */
export type CaseMetric = {
  /** Rotulo pequeno do card de metrica. */
  label: string;
  /** Valor numerico bruto. A formatacao e aplicada automaticamente pelo `kind`. */
  value: number;
  /** Define como o valor sera exibido: dinheiro, numero, multiplicador ou percentual. */
  kind: CaseMetricKind;
  /** Casas decimais para `multiplier` e `percent`. Se omitido, usa 2. */
  precision?: number;
};

/**
 * Um item do carrossel da secao "Cases desenvolvidos".
 */
export type DevelopedCase = {
  /** Nome do case exibido em destaque. */
  name: string;
  /** Label vermelho acima da descricao. Ex.: "Case desenvolvido para cliente externo". */
  eyebrow: string;
  /** Descricao curta do projeto/case. */
  description: string;
  /** Link do botao "Ver case completo". */
  href: string;
  /**
   * Fundo do circulo/logo abstrato do case.
   * Aceita qualquer valor CSS valido de background.
   */
  logoGradient: string;
  /** Metricas exibidas no mockup de dashboard do case. */
  metrics: CaseMetric[];
};

/**
 * Links globais da landing.
 * Troque estes valores para apontar para WhatsApp, Calendly, Typeform, email etc.
 */
export const landingLinks = {
  // Botao "Falar com a NextCube" no header.
  talkToNextCube: "mailto:contato@nextcube.inc",
  // Botao "Falar com um especialista" no CTA final.
  talkToSpecialist: "mailto:contato@nextcube.inc?subject=Quero%20falar%20com%20um%20especialista",
  // Botao "Ver todos os cases". Pode virar uma rota futura, ex.: "/cases".
  allCases: "#cases",
} as const;

/**
 * Cards do ecossistema.
 *
 * Para adicionar um produto:
 * 1. Copie um objeto existente.
 * 2. Troque `name`, `description`, `href`.
 * 3. Use uma das chaves de `icon`, ou informe `logoSrc`.
 *
 * Para usar uma logo propria:
 * logoSrc: "/sua-logo.svg"
 */
export const ecosystemCards: EcosystemCard[] = [
  {
    name: "Prisma",
    description: "Gestão inteligente de anúncios, audiências e performance.",
    href: "#",
    icon: "prisma",
    logoSrc: "/Prisma-logo.png"

  },
  // {
  //   name: "Connect Hub",
  //   description: "Integrações, automações e orquestração operacional entre sistemas.",
  //   href: "#",
  //   icon: "hub",
  // },
  // {
  //   name: "Next Core",
  //   description: "Camada base para autenticação, dados e infraestrutura.",
  //   href: "#",
  //   icon: "core",
  // },
  // {
  //   name: "Nexis",
  //   description: "Ecossistema unificado para produtos e operações digitais.",
  //   href: "#",
  //   icon: "nexis",
  // },
];

/**
 * Cases usados no carrossel.
 *
 * Hoje existe apenas um case. Quando voce adicionar um segundo objeto,
 * a interface passa a mostrar controles de anterior/proximo e indicadores.
 */
export const developedCases: DevelopedCase[] = [
  {
    name: "RoiInfluencer",
    eyebrow: "Case desenvolvido para cliente externo",
    description: "Plataforma para campanhas com influenciadores, análise de ROI e gestão de resultados em tempo real.",
    href: "#",
    logoGradient: "conic-gradient(#ef4444,#2563eb,#facc15,#ef4444)",
    metrics: [
      { label: "Investimento", value: 800, kind: "currency" },
      { label: "Receita gerada", value: 6980, kind: "currency" },
      { label: "ROAS", value: 3.19, kind: "multiplier", precision: 2 },
      { label: "Influenciadores", value: 128, kind: "number" },
      { label: "Campanhas ativas", value: 12, kind: "number" },
      { label: "Engajamento médio", value: 4.62, kind: "percent", precision: 2 },
    ],
  },
  // Para adicionar outro case no carrossel, duplique o objeto acima e altere os campos.
];
