import EntrenamientoForm from "@/components/entrenamiento/EntrenamientoForm";

export default function sesionesEntrenamiento() {
  return (
    <div className="flex flex-col text-black p-6 bg-gray-100 shadow-lg rounded-lg overflow-y-auto">
      <EntrenamientoForm />
    </div>
  );
}
