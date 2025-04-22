'use client'
import { useEffect, useState } from "react"
import axios from "axios";

export default function TablaUsuarios(){
    const [users, setUsers]= useState([]);
    const [filtroUser, setFiltroUser] = useState([]);
    const [equipo, setEquipo]=useState("");
    const [rol, setRol]=useState("")
    const [equiposDisponibles, setEquiposDisponibles] = useState([]);


    const obtenerNombreRol = (rolId) => {
        switch (rolId) {
          case 1:
            return "Administrador";
          case 2:
            return "Entrenador";
          case 3:
            return "Jugador";
          default:
            return "Desconocido";
        }
      };

    const handleRolChange = (e) => {
        const value = e.target.value;
        setRol(value === "" ? "" : Number(value));
    };
    

    const listarEquipos = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/equipos", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });
          setEquiposDisponibles(response.data);
        } catch (error) {
          console.error("Error al obtener los equipos:", error);
        }
      };

    const listarUsers = async()=>{
        try{
            const listaUsers = await axios.get("http://localhost:5000/api/usuarios/todos/ver", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },});
                console.log("Usuarios recibidos:", listaUsers.data);
            setUsers(listaUsers.data);
        }catch(e){
            console.error("Error desde La función de listarUser en el Frontend", e)
        }
    }
    useEffect(() => {
        listarUsers();
        listarEquipos();
    }, []);

    useEffect(() => {
        const resultado = users.filter((usuario) => {
            const cumpleRol = rol === "" || Number(usuario.rol_id) === rol;
            const usuarioEquipo = usuario.equipo_id;
    
            const cumpleEquipo =
                equipo === "" ||
                (equipo === "no-asignado" && (usuarioEquipo === null || usuarioEquipo === undefined)) ||
                Number(equipo) === Number(usuarioEquipo);
    
            return cumpleRol && cumpleEquipo;
        });
        setFiltroUser(resultado);
    }, [rol, equipo, users]);
    return(
        <>
            <section className="p-4 bg-black rounded-lg shadow-lg">
            <div className="flex gap-4 mb-4">
                <select
                    value={rol}
                    onChange={handleRolChange}
                    className="border rounded px-2 py-1 text-blue-400"
                    style={{ zIndex: 9999 }}
                >
                    <option value="">Todos los roles</option>
                    <option value="1">Administrador</option>
                    <option value="2">Entrenador</option>
                    <option value="3">Jugador</option>
                </select>

                <select
                    value={equipo}
                    onChange={(e) => setEquipo(e.target.value)}
                    className="border rounded px-2 py-1 text-blue-400"
                    style={{ zIndex: 9999 }}

                >
                    <option value="">Todos los equipos</option>
                    <option value="no-asignado">No Asignado</option>
                    {equiposDisponibles.map((e)=>(
                         <option key={e.id} value={e.id}>{e.nombre}</option>
                    ))}

                </select>
                </div>

                <section className="overflow-x-auto bg-white rounded-lg shadow-md overflow-auto scroll">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-[#002D5B]">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-white">Correo del usuario</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-white">Rol</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-white">Equipo</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-white">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtroUser.map((usuarios) => {
                                return (
                                    <tr key={usuarios.id} className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2 text-sm text-gray-600">{usuarios.email}</td>
                                        <td className="px-4 py-2 text-sm text-gray-400">{obtenerNombreRol(usuarios.rol_id)}</td>
                                        <td className="px-4 py-2 text-sm text-gray-400">{usuarios.equipo_id? equiposDisponibles.find((eq) => eq.id === Number(usuarios.equipo_id))?.nombre || "No asignado": "No asignado"}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <button className="inline-block rounded-sm bg-yellow-500 px-4 py-2 text-xs font-medium text-white hover:bg-yellow-600 mx-2 transition duration-200"
                                                onClick={() => Delete(usuarios.id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
                <section>
                    <svg className="h-20 w-20 text-blue-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  stroke-linecap="round"  stroke-linejoin="round">  
                        <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                </section>
            </section>
        </>
    )
} 