"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 75;  // Slightly larger for better readability
const IMG_HEIGHT = 105;

// Info mapping from the Axiom Quant Labs Brand Bible
const CARD_INFO = [
    { category: "PRODUCTO", title: "Axiom Card", subtitle: "NTAG214. 540 bytes" },
    { category: "SEGMENTO", title: "El Profesional", subtitle: "Conéctate en un toque" },
    { category: "PRODUCTO", title: "Axiom Tag", subtitle: "NTAG213. 144 bytes" },
    { category: "NEGOCIO", title: "Restaurantes", subtitle: "Menú digital dinámico" },
    { category: "HOSPITALITY", title: "Hostales", subtitle: "Check-in sin fricción" },
    { category: "PLATAFORMA", title: "Axiom Hub", subtitle: "Dashboard unificado" },
    { category: "VALOR 01", title: "Precisión", subtitle: "Soluciones exactas" },
    { category: "VALOR 02", title: "Fluidez", subtitle: "Cero fricción siempre" },
    { category: "VALOR 03", title: "Confianza", subtitle: "Datos seguros, no venta" },
    { category: "VALOR 04", title: "Audacia", subtitle: "Escala continental" },
    { category: "DIFERENCIADOR", title: "Hardware", subtitle: "Amortizado de por vida" },
    { category: "DIFERENCIADOR", title: "Destino", subtitle: "Edita en tiempo real" },
    { category: "DIFERENCIADOR", title: "Plataforma", subtitle: "WiFi, reservas, perfiles" },
    { category: "HOSPITALITY", title: "Hoteles / Glamping", subtitle: "Experiencia premium" },
    { category: "NEGOCIO", title: "Tiendas / Barberías", subtitle: "Reseñas automáticas" },
    { category: "SEGMENTO", title: "Vendedores", subtitle: "Infinitas reuniones" },
    { category: "SEGMENTO", title: "Creadores", subtitle: "Portafolio al instante" },
    { category: "TECNOLOGÍA", title: "NFC Type 2", subtitle: "13.56 MHz frecuencia" },
    { category: "TECNOLOGÍA", title: "Resistencia IP68", subtitle: "Agua, temp -25 a +70 C" },
    { category: "TECNOLOGÍA", title: "Seguridad", subtitle: "Protección por contraseña" }
];

function FlipCard({
    src,
    index,
    target,
}: FlipCardProps) {
    const info = CARD_INFO[index] || { category: "AXIOM", title: "Quant Labs", subtitle: "NFC Infrastructure" };

    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-[#1E293B] border border-gray-800"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`axiom-brand-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face (Axiom Brand Bible custom card) */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-[#070A12] flex flex-col items-center justify-between p-2 border border-blue-500/40"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center w-full mt-1">
                        <p className="text-[7px] font-bold text-blue-400 uppercase tracking-widest">
                            {info.category}
                        </p>
                    </div>
                    <div className="text-center w-full px-1">
                        <p className="text-[10px] font-bold text-[#F1F5F9] leading-tight">
                            {info.title}
                        </p>
                    </div>
                    <div className="text-center w-full mb-1">
                        <p className="text-[7px] font-medium text-gray-400 leading-snug">
                            {info.subtitle}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000; // Virtual scroll range

// Unsplash Images matching Axiom Brand Bible context:
// Cards, tags, business meetings, luxury hotel, modern restaurants, technology chips, NFC interaction
const IMAGES = [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&q=80", // Smart card
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80", // Professional woman
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80", // NFC tech/diagram
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=80", // Restaurant
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80", // Hotel lobby
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80", // Dashboard/analytics
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80", // Precision technology
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80", // Flow/fluidity
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=300&q=80", // Trust
    "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=300&q=80", // Boldness/adventure
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=80", // Hardware
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80", // Dynamic/rainbow
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&q=80", // Unified platform
    "https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?w=300&q=80", // Glamping dome
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&q=80", // Barber shop
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80", // Executive man
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&q=80", // Creator workspace
    "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=300&q=80", // Coding/frecuency
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=300&q=80", // Water resistance
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&q=80", // Password/security
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0); // Keep track of scroll value without re-renders

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Prevent default to stop browser overscroll/bounce
            e.preventDefault();

            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Touch support
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Attach listeners to container instead of window for portability
        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Happens between scroll 0 and 600
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling): Starts after morph (e.g., > 600)
    // Rotates the bottom arc as user continues scrolling
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;

            // Normalize -1 to 1
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            // Move +/- 100px
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    // --- Render Loop ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    // Fade in content when arc is formed (morphValue > 0.8)
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-[#070A12] overflow-hidden select-none">
            
            {/* Header Brand Logo */}
            <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="50,15 15,85 85,85" stroke="#2563EB" strokeWidth="6" strokeLinejoin="round" />
                    <line x1="33" y1="58" x2="67" y2="58" stroke="#38BDF8" strokeWidth="6" />
                    <circle cx="50" cy="15" r="7" fill="#2563EB" />
                    <circle cx="50" cy="68" r="6" fill="#7C3AED" />
                </svg>
                <div className="flex flex-col">
                    <span className="text-[#F1F5F9] font-extrabold tracking-wider text-sm leading-none">AXIOM</span>
                    <span className="text-[#38BDF8] text-[8px] tracking-[0.25em] font-bold leading-none mt-1">QUANT LABS</span>
                </div>
            </div>

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-4xl font-extrabold tracking-tight text-[#F1F5F9] md:text-6xl"
                    >
                        Cada toque, una acción.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.6 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-[10px] font-bold tracking-[0.3em] text-[#38BDF8] uppercase"
                    >
                        Desliza para explorar la infraestructura
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[12%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-[#F1F5F9] tracking-tight mb-3">
                        Infraestructura de Contacto Dinámico
                    </h2>
                    <p className="text-xs md:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
                        Tu identidad digital y la de tu negocio en un toque. <br className="hidden md:block" />
                        El objeto físico es permanente. El destino lo editas tú en tiempo real.
                    </p>
                </motion.div>

                {/* Main Interactive Showcase */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 85; // Adjusted spacing for slightly wider cards
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            // Responsive Calculations
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // A. Calculate Circle Position
                            const circleRadius = Math.min(minDimension * 0.33, 330);

                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // B. Calculate Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.6);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

                            const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.28);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.3 : 1.6,
                            };

                            // C. Interpolate (Morph)
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
