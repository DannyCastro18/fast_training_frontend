
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const players = {
  "Delanteros destacados": [
    { src: "/images/coach.png", name: "Andres" },
    { src: "/images/coach.png", name: "Dylan" },
    { src: "/images/coach.png", name: "Tómas" },
    { src: "/images/coach.png", name: "Sebastian" },
  ],
  "Mediocampistas destacados": [
    { src: "/images/coach.png", name: "Juan" },
    { src: "/images/coach.png", name: "Felipe" },
    { src: "/images/coach.png", name: "Daniel" },
    { src: "/images/coach.png", name: "Zacarias" },
  ],
  "Defensores destacados": [
    { src: "/images/coach.png", name: "David" },
    { src: "/images/coach.png", name: "Carlos" },
    { src: "/images/coach.png", name: "Richard" },
    { src: "/images/coach.png", name: "Manuel" },
  ],
  "Arquero destacado": [
    { src: "/images/coach.png", name: "Camilo " },
  ],
};

const FeaturedPlayers = () => {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 p-6 rounded-2xl text-white w-full h-9/10 mb-4 max-w-4xl mx-auto shadow-lg"
    >
      {/* Contenedor Flex para mostrar las categorías en dos por fila */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(players).map(([position, players]) => (
          <motion.div
            key={position}
            className="w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-gray-200">{position}</h2>
            <div className="flex gap-1"> {/* Ajuste el gap entre las imágenes */}
              {players.map((player, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-18 relative transform transition-all duration-100"
                  onMouseEnter={() => setHoveredPlayer(player)}
                  onMouseLeave={() => setHoveredPlayer(null)}
                  animate={hoveredPlayer === player ? { scale: 1.2 } : { scale: 1 }}
                >
                  <div className="w-15 h-18 flex justify-center items-center">
                    <Image
                      src={player.src}
                      alt={player.name}
                      layout="intrinsic"
                      width={100}
                      height={100}
                      className="rounded-full object-cover border-3 border-white"
                    />
                  </div>
                  {hoveredPlayer === player && (
                    <div className="absolute bottom-4 text-center w-full bg-gradient-to from-black to-transparent rounded-b-xl">
                      <h3 className="text-sm font-semibold text-white">{player.name}</h3> {/* Nombre más pequeño */}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedPlayers;
