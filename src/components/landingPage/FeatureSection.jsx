import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
  return (
    <section
      id="caracteristicas"
      className="h-auto flex flex-col items-center py-24 bg-gradient-to-b  from-[#0b121a] to-[#002d5b] text-white"
    >
      <h2 className="text-3xl font-bold mb-8">Características</h2>
      <section className="flex gap-6 px-24 flex-wrap justify-center">
        <FeatureCard
          image={"/images/kid-running-field.jpg"}
          title="Entrenamientos Personalizados"
          description="Generación automática de rutinas adaptadas a nivel, edad y objetivos
        Biblioteca de ejercicios profesionales constantemente actualizada
        Personalización según posición y habilidades a desarrollar"
        />
        <FeatureCard
          image={"/images/stats-card.jpg"}
          title="Estadísticas Avanzadas"
          description="Métricas detalladas de rendimiento individual y grupal
        Identificación de fortalezas y áreas de mejora
        Visualización intuitiva de progreso a lo largo del tiempo"
        />
        <FeatureCard
          image={"/images/football-trainer-teaching.jpg"}
          title="Gestión de Jugadores"
          description="Perfiles detallados con historial y evolución
        Organización por equipos, categorías o posiciones"
        />
        <FeatureCard
          image={"/images/events.jpg"}
          title="Visualización de Eventos"
          description="Calendario integrado de entrenamientos y partidos
          Recordatorios y notificaciones personalizables
          Sincronización con dispositivos móviles"
        />
        <FeatureCard
          image={"/images/anyplace.avif"}
          title="Acceso desde cualquier lugar"
          description="Disponible en múltiples dispositivos con conexión a internet
            Consulta y actualiza datos en tiempo real desde cualquier ubicación
            Ideal para entrenadores, jugadores y coordinadores en movimiento"
        />
      </section>
    </section>
  );
};

export default FeatureSection;
