import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonte principal usada pelo Tailwind via `--font-geist-sans`.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Fonte mono disponivel via `--font-geist-mono`, caso precise em trechos tecnicos.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata padrao da pagina. Ajuste aqui titulo e descricao para SEO/social preview.
export const metadata: Metadata = {
  title: "NextCube Inc. | Software House e Produtos Digitais",
  description:
    "Produtos digitais, plataformas SaaS, integrações, automações, dashboards e infraestrutura escalável para empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      `lang="pt-BR"` ajuda acessibilidade e SEO.
      As variaveis de fonte entram na classe do html para ficarem disponiveis no CSS global.
    */
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Body como flex column permite paginas futuras ocuparem altura total com mais previsibilidade. */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
