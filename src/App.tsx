import { useState } from "react";
import IntroAnimation from "./components/ui/scroll-morph-hero";
import { HeroParallax } from "./components/ui/hero-parallax";
import { Navbar, Footer } from "./components/ui/navigation";
import { SpaceGlobeCanvas } from "./components/ui/space-globe-canvas";

function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "¿Necesito descargar una app para usar el NFC?",
      a: "No. Cualquier celular moderno con NFC lee los dispositivos de ActionQuantlabs con solo acercarlo. No requiere instalar ninguna app ni crear cuentas externas para la lectura.",
    },
    {
      q: "¿Funciona con todos los modelos de iPhone y Android?",
      a: "Sí. Es totalmente compatible con iPhone XS en adelante (iOS 14+) y con la gran mayoría de dispositivos Android modernos con NFC activo. En casi todos los modelos basta con acercar el celular al dispositivo.",
    },
    {
      q: "¿Qué pasa si pierdo mi Axiom Card?",
      a: "El contenido de tu perfil y la configuración viven de forma segura en AQL Hub, no en el dispositivo físico. Si pierdes tu tarjeta, puedes desactivarla inmediatamente desde la plataforma y activar una nueva sin perder tus datos.",
    },
    {
      q: "¿Cuántas veces puedo cambiar el destino del NFC?",
      a: "Las veces que quieras. No hay límite de actualizaciones. Cualquier cambio de enlace, menú o perfil que realices en el AQL Hub se verá reflejado en tiempo real e inmediatamente al tacto.",
    },
    {
      q: "¿Qué pasa si no renuevo la suscripción anual?",
      a: "El hardware sigue siendo tuyo y seguirá funcionando con el último destino que configuraste. Lo único que se desactiva son las funciones avanzadas del AQL Hub como analíticas detalladas, redirecciones ilimitadas y la edición del destino en vivo.",
    },
    {
      q: "¿Puedo gestionar varios dispositivos desde una sola cuenta?",
      a: "Sí. El AQL Hub está diseñado para control centralizado. Puedes tener múltiples Axiom Cards y Axiom Tags en tu cuenta y asignar un perfil o enlace independiente a cada uno.",
    },
    {
      q: "¿El Axiom Tag funciona sobre metal?",
      a: "Los chips NFC estándar pueden ver interrumpida su señal por interferencia metálica. Para superficies metálicas, disponemos de una versión especial con blindaje anti-metal. Los tags normales funcionan perfecto sobre madera, vidrio, plástico y cerámica.",
    },
    {
      q: "¿Es seguro? ¿Alguien más puede reprogramar mi dispositivo?",
      a: "Totalmente seguro. El chip físico de ActionQuantlabs se bloquea mediante contraseña en la plataforma durante su activación. Nadie externo puede sobrescribir o alterar su comportamiento.",
    },
  ];

  const compareFeatures = [
    {
      name: "Actualización de destino en tiempo real",
      aql: "Sí (Desde AQL Hub en 1s)",
      generic: "No (Requiere reprogramar/grabar)",
      paper: "No (Toca rediseñar y reimprimir)",
    },
    {
      name: "Vida útil garantizada",
      aql: "Infinita (Chip permanente sin batería)",
      generic: "Baja (Materiales económicos/desgaste)",
      paper: "Nula (Se botan o pierden en 48 horas)",
    },
    {
      name: "Analíticas y estadísticas en vivo",
      aql: "Sí (Trazabilidad de toques y geolocalización)",
      generic: "No",
      paper: "No",
    },
    {
      name: "Administración centralizada (Hub)",
      aql: "Sí (Múltiples tags/tarjetas en un panel)",
      generic: "No (De uno en uno)",
      paper: "No",
    },
    {
      name: "Soporte e Infraestructura local (Cali)",
      aql: "Sí (En español por WhatsApp y chat)",
      generic: "No (Nulo o en inglés)",
      paper: "Depende de la imprenta local",
    },
    {
      name: "Fricción del usuario final",
      aql: "Cero (Solo acercar el teléfono)",
      generic: "Baja/Media (Escanear QR)",
      paper: "Alta (Digitar redes, guardar contacto)",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-transparent text-[#F1F5F9] font-sans antialiased flex flex-col items-center">
      {/* 3D Canvas Globe Background (Spans across all sections below the Hero) */}
      <SpaceGlobeCanvas />

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section (Scroll Morphing) - Set to transparent to reveal space background */}
      <section id="hero" className="w-full relative bg-transparent">
        <IntroAnimation />
      </section>

      {/* 3. Malla Parallax (Aceternity Parallax Wall) - Dynamic scroll wall */}
      <section id="products-parallax" className="w-full relative bg-transparent">
        <HeroParallax />
      </section>

      {/* 4. El Problema (Pain Section) */}
      <section className="w-full max-w-7xl px-6 md:px-12 py-24 text-left border-t border-gray-900/30 bg-transparent relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">El Problema</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
            El mundo físico tiene un defecto de fábrica.
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed">
            El código QR que imprimiste la semana pasada o la tarjeta de presentación que entregaste ayer ya quedaron obsoletos. Cada cambio de precio, teléfono o menú te obliga a desechar materiales, esperar imprentas y gastar dinero recurrente.
          </p>
        </div>

        {/* Pain Cards Grid - Glassmorphism style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827]/10 border border-gray-800/20 rounded-xl p-8 backdrop-blur-md transition-all duration-300 hover:border-gray-700/40 hover:shadow-2xl hover:shadow-[#2563EB]/5">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-lg font-bold text-[#F1F5F9]">Pérdida de Dinero</h3>
            <p className="text-sm text-[#94A3B8] mt-4 leading-relaxed">
              Los restaurantes en Cali gastan un promedio de $320.000 COP al año reimprimiendo cartas y QR estáticos por pequeños ajustes de precio.
            </p>
          </div>

          <div className="bg-[#111827]/10 border border-gray-800/20 rounded-xl p-8 backdrop-blur-md transition-all duration-300 hover:border-gray-700/40 hover:shadow-2xl hover:shadow-[#2563EB]/5">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3 className="text-lg font-bold text-[#F1F5F9]">Falta de Agilidad</h3>
            <p className="text-sm text-[#94A3B8] mt-4 leading-relaxed">
              ¿Un cambio de cargo o redes sociales? Tus tarjetas de papel guardadas en el cajón quedan inservibles inmediatamente. La información muere antes de ser entregada.
            </p>
          </div>

          <div className="bg-[#111827]/10 border border-gray-800/20 rounded-xl p-8 backdrop-blur-md transition-all duration-300 hover:border-gray-700/40 hover:shadow-2xl hover:shadow-[#2563EB]/5">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 className="text-lg font-bold text-[#F1F5F9]">Fricción Operativa</h3>
            <p className="text-sm text-[#94A3B8] mt-4 leading-relaxed">
              El recepcionista de un hotel boutique repite la contraseña de WiFi unas 40 veces al día. Un proceso ineficiente que desgasta al equipo y frustra al huésped.
            </p>
          </div>
        </div>
      </section>

      {/* 5. La Solución (Reveal Section / Pillars) - Transparent to show the globe rotating behind it */}
      <section className="w-full py-24 bg-transparent relative z-10">
        <div className="w-full max-w-7xl px-6 md:px-12 text-left">
          <div className="max-w-3xl mb-16">
            <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">La Solución</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
              ActionQuantlabs rompe el ciclo estático.
            </h2>
            <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed">
              Convertimos objetos físicos en nodos dinámicos. El hardware NFC de tu negocio se compra una vez y dura años. Su destino digital lo gestionas en vivo desde la nube en un solo toque.
            </p>
          </div>

          {/* Three Layers Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 text-left bg-gray-900/5 p-6 rounded-xl border border-gray-800/10 backdrop-blur-sm">
              <span className="text-5xl font-extrabold text-[#2563EB]/40">01</span>
              <h3 className="text-xl font-bold text-[#F1F5F9]">Capa 1: Hardware Permanente</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Nuestras Axiom Cards y Axiom Tags cuentan con chips NTAG de alta durabilidad encapsulados en materiales premium. Se instalan una vez y no requieren batería.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-left bg-gray-900/5 p-6 rounded-xl border border-gray-800/10 backdrop-blur-sm">
              <span className="text-5xl font-extrabold text-[#2563EB]/40">02</span>
              <h3 className="text-xl font-bold text-[#F1F5F9]">Capa 2: AQL Hub (Plataforma)</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                El dashboard en la nube desde el cual gestionas todos tus dispositivos. Cambia a dónde apunta tu NFC, visualiza las analíticas y edita tu contenido sin conocimientos técnicos.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-left bg-gray-900/5 p-6 rounded-xl border border-gray-800/10 backdrop-blur-sm">
              <span className="text-5xl font-extrabold text-[#2563EB]/40">03</span>
              <h3 className="text-xl font-bold text-[#F1F5F9]">Capa 3: Destino Dinámico</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Tu perfil interactivo, menú de comida, acceso al WiFi o enlace de cobro. Actualiza a dónde redirige el toque de forma perpetua sin costos adicionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Catálogo de Productos */}
      <section id="products" className="w-full max-w-7xl px-6 md:px-12 py-24 text-left relative z-10 bg-transparent">
        <div className="max-w-3xl mb-16">
          <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">Hardware</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
            Nuestros Dispositivos Físicos
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed">
            Diseñados para resistir y destacar. Elige el formato que mejor se adapte a tu necesidad diaria de contacto.
          </p>
        </div>

        {/* Product Cards Compare */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Axiom Card */}
          <div className="bg-[#111827]/10 backdrop-blur-md border-t-4 border-t-[#2563EB] border border-gray-800/30 rounded-xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#2563EB]/5 transition-all">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="bg-[#2563EB]/15 text-[#38BDF8] text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-[#2563EB]/30">
                  Profesional
                </span>
                <span className="text-[#94A3B8] text-xs font-mono">Chip NTAG 214</span>
              </div>
              <h3 className="text-2xl font-bold text-[#F1F5F9]">Axiom Card</h3>
              <p className="text-sm text-[#94A3B8] mt-4 leading-relaxed">
                La tarjeta de presentación inteligente definitiva. Fabricada en PVC premium mate con acabado antirrayaduras. Comparte tus datos, portafolio y redes con un toque en el celular de tu cliente.
              </p>
              <ul className="mt-8 space-y-3 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                  540 bytes EEPROM de almacenamiento seguro
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                  Garantía de 30 millones de ciclos de lectura
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                  No requiere carga de batería ni apps externas
                </li>
              </ul>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-800/20">
              <a
                href="#cta"
                className="w-full inline-flex justify-center items-center py-3 bg-[#2563EB] hover:bg-[#2563EB]/90 text-sm font-bold text-[#F1F5F9] rounded-md transition"
              >
                Adquirir Axiom Card
              </a>
            </div>
          </div>

          {/* Axiom Tag */}
          <div className="bg-[#111827]/10 backdrop-blur-md border-t-4 border-t-[#7C3AED] border border-gray-800/30 rounded-xl p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#7C3AED]/5 transition-all">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="bg-[#7C3AED]/15 text-[#c084fc] text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-[#7C3AED]/30">
                  Business & Hospitality
                </span>
                <span className="text-[#94A3B8] text-xs font-mono">Chip NTAG 213</span>
              </div>
              <h3 className="text-2xl font-bold text-[#F1F5F9]">Axiom Tag</h3>
              <p className="text-sm text-[#94A3B8] mt-4 leading-relaxed">
                Sticker inteligente circular diseñado para uso comercial rudo. Pegado en las mesas de tu restaurante, vitrinas, counters de recepción o habitaciones. Ideal para menús, WiFi y check-in.
              </p>
              <ul className="mt-8 space-y-3 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
                  144 bytes de memoria optimizada
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
                  Impermeable y resistente a humedad y calor
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
                  Opción de blindaje para superficies metálicas
                </li>
              </ul>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-800/20">
              <a
                href="#cta"
                className="w-full inline-flex justify-center items-center py-3 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-sm font-bold text-[#F1F5F9] rounded-md transition"
              >
                Adquirir Axiom Tags
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cómo Funciona */}
      <section id="how-it-works" className="w-full py-24 bg-transparent relative z-10">
        <div className="w-full max-w-7xl px-6 md:px-12 text-left">
          <div className="max-w-3xl mb-16">
            <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">El Proceso</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
              Tres pasos. Una sola inversión física.
            </h2>
            <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed">
              Sin app para tus usuarios, sin configuraciones complejas para ti. Así de fácil funciona ActionQuantlabs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 relative">
            <div className="flex flex-col gap-4 text-left bg-gray-900/5 p-6 rounded-xl border border-gray-800/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#38BDF8] font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-[#F1F5F9] mt-2">Activa en el Hub</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Recibe tu Axiom Card o Tag. Escanea su código de vinculación único y regístralo en AQL Hub en solo 2 minutos.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-left bg-gray-900/5 p-6 rounded-xl border border-gray-800/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#38BDF8] font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-[#F1F5F9] mt-2">Instala o Entrega</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Coloca los Tags en las mesas de tu negocio o guarda tu Axiom Card en la billetera. Cualquier celular moderno lo leerá al tacto.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-left bg-gray-900/5 p-6 rounded-xl border border-gray-800/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#38BDF8] font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-[#F1F5F9] mt-2">Actualiza en Vivo</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                ¿Cambió tu menú, el WiFi o tu teléfono? Entra a AQL Hub desde el celular, edita el enlace y el hardware se actualizará al instante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Para Quién (Segmentos) */}
      <section id="segments" className="w-full max-w-7xl px-6 md:px-12 py-24 text-left relative z-10 bg-transparent">
        <div className="max-w-3xl mb-16">
          <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">Aplicaciones</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
            Hecho para ti. Sea cual sea tu industria.
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed">
            Descubre cómo ActionQuantlabs optimiza los procesos de contacto físico en tu nicho:
          </p>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111827]/10 border border-gray-800/20 backdrop-blur-md rounded-xl p-8 text-left hover:border-gray-700/40 transition-all flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#F1F5F9]">El Profesional</h3>
              <p className="text-xs text-[#38BDF8] font-mono tracking-wider uppercase mt-1">Identidad Digital</p>
              <p className="text-sm text-[#94A3B8] mt-6 leading-relaxed">
                Deja de deletrear tu Instagram o LinkedIn en reuniones. Entrega tu Axiom Card y permite que tu cliente guarde tu contacto y portafolio en su agenda en 1 segundo.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-800/20 text-xs text-[#94A3B8] font-medium italic">
              "Nunca más reimprimiré una tarjeta de papel."
            </div>
          </div>

          <div className="bg-[#111827]/10 border border-gray-800/20 backdrop-blur-md rounded-xl p-8 text-left hover:border-gray-700/40 transition-all flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#F1F5F9]">El Negocio</h3>
              <p className="text-xs text-[#38BDF8] font-mono tracking-wider uppercase mt-1">Gastronomía y Retail</p>
              <p className="text-sm text-[#94A3B8] mt-6 leading-relaxed">
                Menús actualizables al instante sin costo de imprenta. Axiom Tags fijos en mesas para visualizar la carta en vivo, conectarse al WiFi o calificar directamente en Google Reviews.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-800/20 text-xs text-[#94A3B8] font-medium italic">
              "Actualizamos los precios del almuerzo en 2 minutos."
            </div>
          </div>

          <div className="bg-[#111827]/10 border border-gray-800/20 backdrop-blur-md rounded-xl p-8 text-left hover:border-gray-700/40 transition-all flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#F1F5F9]">Hospitality</h3>
              <p className="text-xs text-[#38BDF8] font-mono tracking-wider uppercase mt-1">Hotelería & Glampings</p>
              <p className="text-sm text-[#94A3B8] mt-6 leading-relaxed">
                Usa las tarjetas físicas como llaves y canal de comunicación. Al tocar la llave de habitación con el celular, el huésped accede al WiFi, a los servicios del hotel o al check-out digital.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-800/20 text-xs text-[#94A3B8] font-medium italic">
              "Menos llamadas a recepción preguntando la contraseña del WiFi."
            </div>
          </div>
        </div>
      </section>

      {/* 9. Grid de Beneficios (Why Us) */}
      <section id="why-us" className="w-full py-24 bg-transparent relative z-10">
        <div className="w-full max-w-7xl px-6 md:px-12 text-left">
          <div className="max-w-3xl mb-16">
            <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">Por qué AQL</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
              La diferencia entre un tag y nuestra infraestructura.
            </h2>
            <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed">
              No vendemos chips sueltos; entregamos la capa de software y hardware que digitaliza tus activos de forma permanente.
            </p>
          </div>

          {/* 6 Grid Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111827]/5 border border-gray-800/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="font-bold text-[#F1F5F9]">Permanencia Absoluta</h4>
              <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
                El hardware físico nunca queda obsoleto. Una sola inversión amortizada perpetuamente.
              </p>
            </div>
            <div className="bg-[#111827]/5 border border-gray-800/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="font-bold text-[#F1F5F9]">Destinos Dinámicos</h4>
              <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
                Modifica el destino a donde apunta tu dispositivo al instante desde cualquier lugar.
              </p>
            </div>
            <div className="bg-[#111827]/5 border border-gray-800/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="font-bold text-[#F1F5F9]">Dashboard Centralizado</h4>
              <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
                Gestiona decenas de Axiom Cards y Tags de tu restaurante o equipo desde un solo panel.
              </p>
            </div>
            <div className="bg-[#111827]/5 border border-gray-800/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="font-bold text-[#F1F5F9]">Métricas & Analíticas</h4>
              <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
                Sabe con precisión cuántas personas interactuaron, a qué hora y desde qué dispositivos.
              </p>
            </div>
            <div className="bg-[#111827]/5 border border-gray-800/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="font-bold text-[#F1F5F9]">Fricción Cero</h4>
              <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
                Tus clientes no tienen que descargar ninguna app externa ni crear cuentas. Solo tocar.
              </p>
            </div>
            <div className="bg-[#111827]/5 border border-gray-800/10 p-6 rounded-xl backdrop-blur-sm">
              <h4 className="font-bold text-[#F1F5F9]">Optimizado para LATAM</h4>
              <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
                Soporte en español y servidores optimizados para garantizar latencia mínima en Latinoamérica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Métricas de Impacto */}
      <section className="w-full max-w-7xl px-6 md:px-12 py-24 text-center relative z-10 bg-transparent">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-extrabold text-[#2563EB]">3.2M</span>
            <span className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1">PyMEs en Colombia con formatos estáticos</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-extrabold text-[#2563EB]">60%</span>
            <span className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1">Reimprimen QR o menús anualmente</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-extrabold text-[#2563EB]">0</span>
            <span className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1">Papeles o plásticos desechados</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-6xl font-extrabold text-[#2563EB]">30M</span>
            <span className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1">Ciclos de lectura garantizados</span>
          </div>
        </div>
      </section>

      {/* 11. Tabla Comparativa */}
      <section className="w-full max-w-5xl px-6 py-12 text-left relative z-10 bg-transparent">
        <div className="text-center mb-12">
          <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">Comparativa</span>
          <h2 className="text-2xl md:text-4xl font-extrabold mt-3">ActionQuantlabs vs Alternativas</h2>
        </div>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-800/20 bg-[#111827]/5 backdrop-blur-md">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-800/30 bg-gray-900/10 text-xs font-bold text-[#F1F5F9] uppercase">
                <th className="py-4 px-6">Característica</th>
                <th className="py-4 px-6 text-gray-400">QR / NFC Genérico</th>
                <th className="py-4 px-6 text-gray-400">Linktree / Tarjetas de Papel</th>
                <th className="py-4 px-6 text-[#38BDF8] bg-[#2563EB]/10">ActionQuantlabs</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {compareFeatures.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-900/10 hover:bg-gray-900/5">
                  <td className="py-4 px-6 font-medium text-[#F1F5F9]">{row.name}</td>
                  <td className="py-4 px-6 text-[#94A3B8]">{row.generic}</td>
                  <td className="py-4 px-6 text-[#94A3B8]">{row.paper}</td>
                  <td className="py-4 px-6 font-bold text-[#F1F5F9] bg-[#2563EB]/5">{row.aql}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. FAQ Accordion */}
      <section id="faq" className="w-full max-w-4xl px-6 md:px-12 py-24 text-left border-t border-gray-900/30 relative z-10 bg-transparent">
        <div className="text-center mb-16">
          <span className="text-[#38BDF8] text-xs font-bold tracking-[0.25em] uppercase">Preguntas Frecuentes</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-800/20 bg-[#111827]/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left font-bold text-[#F1F5F9] hover:text-[#38BDF8] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl ml-4 font-light text-[#94A3B8]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-gray-900/10 py-5 px-6" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. CTA Final */}
      <section id="cta" className="w-full max-w-5xl px-6 py-20 text-center relative z-10 bg-transparent">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB]/40 to-[#7C3AED]/40 backdrop-blur-lg border border-gray-700/30 px-8 py-16 md:py-24 shadow-2xl flex flex-col items-center justify-center">
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-[#070A12]/30 mix-blend-multiply"></div>
          
          <div className="relative z-10 max-w-2xl flex flex-col items-center gap-6">
            <span className="text-xs font-extrabold tracking-[0.3em] text-[#38BDF8] uppercase leading-none">
              El futuro al tacto
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#F1F5F9] leading-tight">
              Deja de reimprimir. <br /> Empieza a conectar.
            </h2>
            <p className="text-sm md:text-base text-[#F1F5F9]/85 max-w-lg mt-2 leading-relaxed">
              Únete a los profesionales y negocios en Cali y Colombia que ya convirtieron sus interacciones físicas en conexiones inteligentes permanentes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
              <a
                href="https://wa.me/573000000000?text=Hola,%20quiero%20más%20información%20sobre%20las%20tarjetas%20y%20tags%20de%20ActionQuantlabs"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-[#070A12]/80 backdrop-blur-md text-[#F1F5F9] text-sm font-bold rounded-lg border border-gray-800/40 hover:border-gray-600/40 transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>Hablar con un asesor</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a
                href="#products"
                className="px-8 py-4 bg-[#F1F5F9] text-[#070A12] text-sm font-bold rounded-lg hover:bg-opacity-95 transition shadow-lg"
              >
                Ver Dispositivos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
