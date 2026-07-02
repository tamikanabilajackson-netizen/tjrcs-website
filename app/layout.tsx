import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Navbar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build & Launch | Tamika Jackson Recreation and Consulting Services",
  description: "A 4-month recreation-based career exploration program for autistic and neurodivergent young adults.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <NavBar />

        {children}

        {/* Site footer — social icons only */}
        <footer className="bg-[#1C3B3A] py-10">
          <div className="flex items-center justify-center gap-10">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=100090760395314&sk=about"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#F9F4EC]/75 hover:text-[#E8924B] transition-colors focus-visible:outline-2 focus-visible:outline-[#E8924B] focus-visible:outline-offset-4 rounded"
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/tamika-jackson-6484b4226/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#F9F4EC]/75 hover:text-[#E8924B] transition-colors focus-visible:outline-2 focus-visible:outline-[#E8924B] focus-visible:outline-offset-4 rounded"
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/trcsfun/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#F9F4EC]/75 hover:text-[#E8924B] transition-colors focus-visible:outline-2 focus-visible:outline-[#E8924B] focus-visible:outline-offset-4 rounded"
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@RecreationThatConnects"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-[#F9F4EC]/75 hover:text-[#E8924B] transition-colors focus-visible:outline-2 focus-visible:outline-[#E8924B] focus-visible:outline-offset-4 rounded"
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
              </svg>
            </a>

          </div>

          {/* Copyright */}
          <div style={{ paddingTop: '16px', textAlign: 'center' }}>
            <p style={{ color: '#F9F4EC', fontSize: '12px', fontFamily: 'var(--font-lato)' }}>
              &copy; 2026 Tamika Jackson Recreation and Consulting Services. All rights reserved.
            </p>
          </div>

        </footer>

      </body>
    </html>
  );
}
