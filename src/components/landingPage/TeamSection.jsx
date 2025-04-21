import MemberTeamCard from "./MemberTeamCard";

const teamMembers = [
  {
    image: "/team/joan.jpg",
    name: "Joan Pérez",
    rol: "Desarrollador Frontend",
    linkedin: "https://linkedin.com/in/joan",
    github: "https://github.com/joan",
  },
  {
    image: "/team/ana.jpg",
    name: "Ana López",
    rol: "Diseñadora UI/UX",
    linkedin: "https://linkedin.com/in/ana",
    github: "https://github.com/ana",
  },
  // Agrega más miembros si quieres
];

const TeamSection = () => {
  return (
    <section
      id="nosotros"
      className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 py-16 px-4 md:px-10 text-white"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Nuestro Equipo</h2>
        <p className="text-blue-300 text-lg max-w-xl mx-auto">
          Apasionados por el deporte y la tecnología, trabajamos juntos para crear una experiencia única.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <MemberTeamCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
