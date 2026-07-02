import React, { useEffect, useRef, useState } from "react";

interface CityNode {
  name: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  visible: boolean;
}

export const SpaceGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = window.scrollY / totalHeight;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Globe parameters
    const R = 220; // Radius of the globe
    const focalLength = 400;
    let angleY = 0.002; // Initial rotation speed
    let currentRotationY = 0;
    let currentRotationX = 0;

    // Generate random stars in background (fixed deep space)
    const starCount = 150;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    // Generate 3D grid points (Fibonacci sphere)
    const pointCount = 180;
    const globePoints = Array.from({ length: pointCount }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      return {
        x: R * Math.sin(phi) * Math.cos(theta),
        y: R * Math.sin(phi) * Math.sin(theta),
        z: R * Math.cos(phi),
      };
    });

    // Key business nodes (Cali Hub and target markets)
    const citiesData = [
      { name: "Cali (HUB)", lat: 3.4516, lon: -76.5320 },
      { name: "Bogotá", lat: 4.7110, lon: -74.0721 },
      { name: "Medellín", lat: 6.2518, lon: -75.5636 },
      { name: "Miami", lat: 25.7617, lon: -80.1918 },
      { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
      { name: "Lima", lat: -12.0464, lon: -77.0428 },
      { name: "Cd. de México", lat: 19.4326, lon: -99.1332 },
      { name: "Santiago", lat: -33.4489, lon: -70.6693 },
    ];

    // Convert cities lat/lon to 3D coords
    const cities: CityNode[] = citiesData.map((c) => {
      const theta = ((90 - c.lat) * Math.PI) / 180;
      const phi = ((c.lon + 180) * Math.PI) / 180;
      return {
        name: c.name,
        lat: c.lat,
        lon: c.lon,
        x: R * Math.sin(theta) * Math.sin(phi),
        y: R * Math.cos(theta),
        z: R * Math.sin(theta) * Math.cos(phi),
        px: 0,
        py: 0,
        visible: false,
      };
    });

    // Pulse animation parameters for beams of light
    let pulseTime = 0;

    // Animation Loop
    const draw = () => {
      ctx.fillStyle = "rgba(7, 10, 18, 0.2)"; // Soft trails for dynamic glow
      ctx.fillRect(0, 0, width, height);

      // 1. Draw static deep space stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      // Globe opacity fades in after 10% of page scroll (representing "El Problema" trigger)
      let globeOpacity = 0;
      if (scrollProgress > 0.08) {
        // Fade in from 0.08 to 0.18
        globeOpacity = Math.min((scrollProgress - 0.08) * 10, 0.85);
      }

      if (globeOpacity > 0) {
        // Dynamically speed up rotation or change angle based on scroll
        currentRotationY += angleY + scrollProgress * 0.008;
        currentRotationX = (scrollProgress - 0.5) * 0.5; // Tilt based on scroll

        const cosY = Math.cos(currentRotationY);
        const sinY = Math.sin(currentRotationY);
        const cosX = Math.cos(currentRotationX);
        const sinX = Math.sin(currentRotationX);

        // Center of the canvas
        // Move the globe slightly to the right on larger screens, center on mobile
        const centerX = width > 768 ? width * 0.65 : width * 0.5;
        const centerY = height * 0.5;

        // Project and sort points for depth calculation
        const projectedPoints = globePoints.map((p) => {
          // Rotate Y
          let x1 = p.x * cosY - p.z * sinY;
          let z1 = p.z * cosY + p.x * sinY;
          // Rotate X
          let y2 = p.y * cosX - z1 * sinX;
          let z2 = z1 * cosX + p.y * sinX;

          const scale = focalLength / (focalLength + z2);
          const px = x1 * scale + centerX;
          const py = y2 * scale + centerY;

          return { px, py, z: z2 };
        });

        // 2. Draw globe grid connections (constellation mesh)
        ctx.strokeStyle = `rgba(37, 99, 235, ${globeOpacity * 0.12})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < projectedPoints.length; i++) {
          for (let j = i + 1; j < projectedPoints.length; j++) {
            const dx = projectedPoints[i].px - projectedPoints[j].px;
            const dy = projectedPoints[i].py - projectedPoints[j].py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Connect only close points and points in the front hemisphere
            if (dist < 65 && projectedPoints[i].z < 50 && projectedPoints[j].z < 50) {
              ctx.beginPath();
              ctx.moveTo(projectedPoints[i].px, projectedPoints[i].py);
              ctx.lineTo(projectedPoints[j].px, projectedPoints[j].py);
              ctx.stroke();
            }
          }
        }

        // 3. Draw globe surface dots
        projectedPoints.forEach((p) => {
          // Opacity based on depth (z)
          const dotAlpha = Math.max(0.1, (focalLength - p.z) / (focalLength * 2)) * globeOpacity;
          const size = p.z < 0 ? 1.8 : 1.0; // Larger dots in front
          ctx.fillStyle = p.z < 0 ? `rgba(56, 189, 248, ${dotAlpha})` : `rgba(37, 99, 235, ${dotAlpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
          ctx.fill();
        });

        // 4. Project key business nodes (cities)
        cities.forEach((c) => {
          let x1 = c.x * cosY - c.z * sinY;
          let z1 = c.z * cosY + c.x * sinY;
          let y2 = c.y * cosX - z1 * sinX;
          let z2 = z1 * cosX + c.y * sinX;

          const scale = focalLength / (focalLength + z2);
          c.px = x1 * scale + centerX;
          c.py = y2 * scale + centerY;
          c.z = z2;
          c.visible = z2 < 40; // Visible if not on the absolute back side
        });

        // 5. Draw connection beams of light from Cali Hub to other cities
        // Beams intensity increases as user scrolls down
        const connectionProgress = Math.max(0, Math.min(1, (scrollProgress - 0.15) * 1.5));
        pulseTime += 0.015;

        const caliNode = cities[0]; // Cali is the first element

        if (caliNode.visible && connectionProgress > 0) {
          cities.slice(1).forEach((city, idx) => {
            if (city.visible) {
              // Draw static connection line
              ctx.strokeStyle = `rgba(56, 189, 248, ${globeOpacity * 0.18 * connectionProgress})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(caliNode.px, caliNode.py);
              ctx.lineTo(city.px, city.py);
              ctx.stroke();

              // Draw animated beam of light (particle pulse)
              // Alternate starting time based on index
              const offsetTime = (pulseTime + idx * 0.25) % 1.0;
              
              // Only draw if scroll progress is past activation thresholds
              if (connectionProgress > idx * 0.12) {
                const px = caliNode.px + (city.px - caliNode.px) * offsetTime;
                const py = caliNode.py + (city.py - caliNode.py) * offsetTime;

                // Pulsing glow circle
                const glowGrad = ctx.createRadialGradient(px, py, 1, px, py, 6);
                glowGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
                glowGrad.addColorStop(0.3, "rgba(56, 189, 248, 0.8)");
                glowGrad.addColorStop(1, "rgba(37, 99, 235, 0.0)");

                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(px, py, 6, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          });
        }

        // 6. Draw city nodes and text labels
        cities.forEach((c) => {
          if (c.visible) {
            const isCali = c.name.includes("HUB");
            const nodeAlpha = Math.max(0.2, (focalLength - c.z) / (focalLength * 2)) * globeOpacity;

            // Draw glowing outer ring
            ctx.strokeStyle = isCali ? `rgba(124, 58, 237, ${nodeAlpha})` : `rgba(56, 189, 248, ${nodeAlpha * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(c.px, c.py, isCali ? 6 : 4, 0, Math.PI * 2);
            ctx.stroke();

            // Draw solid inner core
            ctx.fillStyle = isCali ? "#7C3AED" : "#38BDF8";
            ctx.beginPath();
            ctx.arc(c.px, c.py, isCali ? 3.5 : 2.0, 0, Math.PI * 2);
            ctx.fill();

            // Draw city name label (slightly offset)
            ctx.fillStyle = isCali ? "rgba(167, 139, 250, 0.95)" : "rgba(148, 163, 184, 0.85)";
            ctx.font = isCali ? "bold 10px Inter, sans-serif" : "9px Inter, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(` ${c.name}`, c.px + 8, c.py + 3);
          }
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#070A12] transition-colors duration-300"
    />
  );
};
