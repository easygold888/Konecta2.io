import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "backdrop-blur-md bg-[#070A12]/85 py-3 border-gray-800/60 shadow-lg"
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:scale-105"
          >
            <polygon
              points="50,15 15,85 85,85"
              stroke="#2563EB"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <line x1="36.7" y1="41.6" x2="63.3" y2="41.6" stroke="#38BDF8" strokeWidth="6" />
            <circle cx="50" cy="15" r="7" fill="#2563EB" />
            <circle cx="50" cy="52" r="6" fill="#7C3AED" />
          </svg>
          <div className="flex flex-col">
            <span className="text-[#F1F5F9] font-extrabold tracking-wider text-sm leading-none">
              AXIOM
            </span>
            <span className="text-[#38BDF8] text-[8px] tracking-[0.25em] font-bold leading-none mt-1">
              QUANT LABS
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#products"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            Productos
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            Cómo Funciona
          </a>
          <a
            href="#segments"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            Para Quién
          </a>
          <a
            href="#why-us"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            Beneficios
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <div>
          <a
            href="#cta"
            className="relative group inline-flex items-center justify-center px-5 py-2 text-xs font-bold text-[#F1F5F9] rounded-md transition-all duration-300 overflow-hidden"
          >
            {/* Glow effect background */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"></span>
            <span className="absolute inset-0 w-full h-full bg-[#38BDF8] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative">Quiero mi Axiom</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-[#070A12] border-t border-gray-800/40 py-16 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Brand Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="50,15 15,85 85,85"
                stroke="#2563EB"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              <line x1="36.7" y1="41.6" x2="63.3" y2="41.6" stroke="#38BDF8" strokeWidth="6" />
              <circle cx="50" cy="15" r="7" fill="#2563EB" />
              <circle cx="50" cy="52" r="6" fill="#7C3AED" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="text-[#F1F5F9] font-extrabold tracking-wider text-sm leading-none">
                AXIOM
              </span>
              <span className="text-[#38BDF8] text-[8px] tracking-[0.25em] font-bold leading-none mt-1">
                QUANT LABS
              </span>
            </div>
          </div>
          <p className="text-sm text-[#94A3B8] max-w-sm text-left">
            ActionQuantlabs es una empresa tecnológica de Cali, Colombia, que desarrolla hardware NFC y la plataforma de software que lo gestiona.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-8 text-sm text-[#94A3B8]">
          <a href="#products" className="hover:text-[#38BDF8] transition-colors">Productos</a>
          <a href="#how-it-works" className="hover:text-[#38BDF8] transition-colors">Cómo funciona</a>
          <a href="#segments" className="hover:text-[#38BDF8] transition-colors">Para quién</a>
          <a href="#faq" className="hover:text-[#38BDF8] transition-colors">Preguntas frecuentes</a>
        </div>
      </div>

      {/* Dividir */}
      <div className="max-w-7xl mx-auto border-t border-gray-900/60 my-10"></div>

      {/* Bottom Info */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#94A3B8]">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
          <span>© 2025 ActionQuantlabs. Todos los derechos reservados.</span>
          <span>Cali, Colombia | LATAM | El Mundo</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#38BDF8] transition-colors">Términos y Condiciones</a>
          <a href="#" className="hover:text-[#38BDF8] transition-colors">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};
