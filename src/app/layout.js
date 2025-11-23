import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Emendo — Reportar Ineficiências nos Cuidados de Saúde Primários",
  description: "Plataforma de cidadania digital para identificar, reportar e mapear ineficiências sistémicas nos Centros de Saúde e USF em Portugal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
