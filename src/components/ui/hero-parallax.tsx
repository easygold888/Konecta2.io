"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const defaultProducts = [
  {
    title: "Axiom Card (NTAG 214) - Premium PVC",
    link: "#products",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
  },
  {
    title: "Menú Digital Dinámico - Rest. El Escudo",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  },
  {
    title: "Check-in Express - Glamping Nido de Cóndor",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?w=600&q=80",
  },
  {
    title: "Dashboard AQL Hub - Analítica en Vivo",
    link: "#platform",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    title: "Reseñas al Toque - Barbería La Clásica",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
  },
  {
    title: "Axiom Tag (NTAG 213) - Resistente al Agua",
    link: "#products",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "Tarjeta Inteligente de Habitación - Hotel Boutique",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
  },
  {
    title: "WiFi en un Toque - Café San Alberto Cali",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
  },
  {
    title: "Agendamiento NFC - Consultorio Dr. Gómez",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
  },
  {
    title: "Axiom Card (NTAG 214) - Edición Mate",
    link: "#products",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    title: "Acceso Rápido - Gimnasio Valle-Fit",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  },
  {
    title: "Tag de Cristal - Axiom Glass",
    link: "#products",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  },
  {
    title: "Información de Estadía - Hostal Cali-Wood",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
  },
  {
    title: "Carta de Servicios - Spa Sentidos Cali",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
  },
  {
    title: "Catálogo en Vitrina - Boutique El Peñón",
    link: "#use-cases",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
  }
];

export const HeroParallax = ({
  products = defaultProducts,
}: {
  products?: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-20 mb-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 text-left">
      <h1 className="text-3xl md:text-7xl font-extrabold text-[#F1F5F9] leading-tight">
        Malla de Conexiones <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
          Físico-Digitales
        </span>
      </h1>
      <p className="max-w-3xl text-base md:text-xl mt-8 text-[#94A3B8] leading-relaxed">
        Explora la infraestructura de ActionQuantlabs implementada en los principales negocios y profesionales de Cali y Latinoamérica. Cada dispositivo físico NFC es permanente; su destino se actualiza al instante desde el AQL Hub.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 rounded-2xl overflow-hidden border border-gray-800/40"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl h-full w-full"
      >
        <img
          src={product.thumbnail}
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-105"
          alt={product.title}
          loading="lazy"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-40 group-hover/product:opacity-85 bg-black pointer-events-none transition duration-200"></div>
      <h2 className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 text-[#F1F5F9] font-bold text-lg transition duration-200">
        {product.title}
      </h2>
    </motion.div>
  );
};
