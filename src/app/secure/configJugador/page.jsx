"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    email: "",
    position: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTimer, setMessageTimer] = useState(null);

  // Function to show temporary messages
  const showMessage = (msg, isError = false) => {
    setMessage(isError ? `Error: ${msg}` : msg);
    
    // Clear any existing timer
    if (messageTimer) clearTimeout(messageTimer);
    
    // Set a new timer to clear the message after 5 seconds
    const timer = setTimeout(() => setMessage(""), 5000);
    setMessageTimer(timer);
  };

  // Fetch all players
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/jugadores/ver");
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setPlayers(data);
      showMessage("Jugadores cargados correctamente");
    } catch (error) {
      console.error("Error:", error);
      showMessage(error.message, true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific player
  const fetchPlayerById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/jugadores/${id}`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setSelectedPlayer(data);
      showMessage("Jugador cargado correctamente");
    } catch (error) {
      console.error("Error:", error);
      showMessage(error.message, true);
    } finally {
      setLoading(false);
    }
  };

  // Create a new player
  const createPlayer = async () => {
    // Validate required fields
    if (!newPlayer.name || !newPlayer.email) {
      showMessage("El nombre y el email son obligatorios", true);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/jugadores/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      showMessage(`Jugador creado correctamente. Contraseña temporal: ${data.tempPassword}`);
      
      // Reset form and refresh player list
      setNewPlayer({ name: "", email: "", position: "", age: "" });
      fetchPlayers();
    } catch (error) {
      console.error("Error:", error);
      showMessage(error.message, true);
    } finally {
      setLoading(false);
    }
  };

  // Update player info
  const updatePlayerInfo = async (id) => {
    if (!selectedPlayer || !selectedPlayer.name || !selectedPlayer.email) {
      showMessage("El nombre y el email son obligatorios", true);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/jugadores-info/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedPlayer.name,
          email: selectedPlayer.email,
          position: selectedPlayer.position,
          age: selectedPlayer.age
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      showMessage("Información del jugador actualizada correctamente");
      
      // Update the selected player with the returned data
      setSelectedPlayer(data);
      
      // Refresh the player list
      fetchPlayers();
    } catch (error) {
      console.error("Error:", error);
      showMessage(error.message, true);
    } finally {
      setLoading(false);
    }
  };

  // Delete a player
  const deletePlayer = async (id) => {
    // Confirm deletion
    if (!window.confirm("¿Estás seguro de que deseas eliminar este jugador? Esta acción no se puede deshacer.")) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/jugadores/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `${response.status}: ${response.statusText}`);
      }
      
      showMessage("Jugador eliminado correctamente");
      setSelectedPlayer(null);
      fetchPlayers(); // Refresh player list
    } catch (error) {
      console.error("Error:", error);
      showMessage(error.message, true);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (player.position && player.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Load players on component mount
  useEffect(() => {
    fetchPlayers();
    
    // Cleanup function to clear any message timers when component unmounts
    return () => {
      if (messageTimer) clearTimeout(messageTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white w-[100%] pl-[95px]">
      {/* Encabezado */}
      <header className="w-[100%] bg-white py-4 px-6 flex items-center justify-between">
        <Image src="/Fast_largo.png" alt="Logo" width={150} height={120} />
        <input
          type="text"
          placeholder="Buscar jugador..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 bg-blue-100 mr-10 px-2 py-2 rounded-lg w-[800px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </header>

      <div className="flex p-6">
        {/* Menú lateral */}
        <div className="w-[50%] flex flex-col items-center pt-14 ">
          <h2 className="text-2xl font-semibold mb-4 text-azul-principal">Mi Cuenta</h2>
          <div className="w-52 h-52 flex justify-center items-center">
            <Image
              src="/usuario.png"
              alt="Perfil"
              width={300}
              height={300}
              className="rounded-full border-4 border-azul-principal object-cover"
            />
          </div>
          
          {/* API Testing Controls */}
          <div className="mt-8 w-full">
            <h3 className="text-xl font-medium text-azul-principal mb-4">Gestión de Jugadores</h3>
            <div className="space-y-4">
              <button 
                onClick={fetchPlayers}
                className="w-full px-4 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Ver Todos los Jugadores"}
              </button>
              
              <div>
                <input
                  type="text"
                  placeholder="ID del Jugador"
                  className="w-full px-4 py-2 border rounded-lg mb-2"
                  onChange={(e) => {
                    const id = e.target.value.trim();
                    if (id) {
                      setSelectedPlayer(prev => prev ? {...prev, id} : {id});
                    }
                  }}
                />
                <button 
                  onClick={() => selectedPlayer?.id && fetchPlayerById(selectedPlayer.id)}
                  className="w-full px-4 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition"
                  disabled={loading || !selectedPlayer?.id}
                >
                  {loading ? "Cargando..." : "Buscar Jugador por ID"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <main className="w-[600px] p-6">
          {/* Mensajes de estado */}
          {message && (
            <div className={`p-4 mb-4 rounded-lg ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}
          
          {loading && <p className="text-center text-gray-500">Cargando...</p>}
          
          {/* Formulario para crear jugador */}
          <div className="bg-white p-6 rounded-lg mb-6 border border-gray-200">
            <h3 className="text-xl font-medium text-azul-principal mb-4">Crear Nuevo Jugador</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Nombre <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={newPlayer.email}
                  onChange={(e) => setNewPlayer({...newPlayer, email: e.target.value})}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Posición</label>
                <input
                  type="text"
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Edad</label>
                <input
                  type="number"
                  value={newPlayer.age}
                  onChange={(e) => setNewPlayer({...newPlayer, age: e.target.value})}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="120"
                />
              </div>
              
              <button
                onClick={createPlayer}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear Jugador"}
              </button>
            </div>
          </div>
          
          {/* Mostrar jugador seleccionado */}
          {selectedPlayer && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-medium text-azul-principal mb-4">Detalles del Jugador</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">ID</label>
                  <input
                    type="text"
                    value={selectedPlayer.id || ""}
                    className="w-full bg-gray-100 border px-4 py-2 rounded-lg"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Nombre <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={selectedPlayer.name || ""}
                    onChange={(e) => setSelectedPlayer({...selectedPlayer, name: e.target.value})}
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={selectedPlayer.email || ""}
                    onChange={(e) => setSelectedPlayer({...selectedPlayer, email: e.target.value})}
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Posición</label>
                  <input
                    type="text"
                    value={selectedPlayer.position || ""}
                    onChange={(e) => setSelectedPlayer({...selectedPlayer, position: e.target.value})}
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Edad</label>
                  <input
                    type="number"
                    value={selectedPlayer.age || ""}
                    onChange={(e) => setSelectedPlayer({...selectedPlayer, age: e.target.value})}
                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="120"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => updatePlayerInfo(selectedPlayer.id)}
                    className="flex-1 px-4 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Actualizando..." : "Actualizar"}
                  </button>
                  
                  <button
                    onClick={() => deletePlayer(selectedPlayer.id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Lista de jugadores */}
          {filteredPlayers.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-medium text-azul-principal mb-4">Lista de Jugadores</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {filteredPlayers.map((player) => (
                    <li 
                      key={player.id} 
                      className="py-3 px-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => fetchPlayerById(player.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{player.name}</span>
                        <div className="flex flex-col items-end">
                          <span className="text-sm text-gray-500">{player.email}</span>
                          {player.position && <span className="text-xs text-gray-500">{player.position}</span>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Línea separadora */}
      <hr className="border-t-2 border-gray-300 my-6" />
      
      {/* Sección adicional */}
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-azul-principal">Seguridad</h2>
        <p className="text-gray-700 mt-2">Al cambiar tu contraseña, se cerrará sesión en todos los dispositivos </p>
        <button className="mt-4 px-6 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition">Cambiar Contraseña</button>
      </div>

      {/* Línea separadora */}
      <hr className="border-t-2 border-gray-300 my-6" />
      
      {/* Sección adicional */}
      <div className="text-center p-6">
        <p className="text-gray-700 mt-2">Si eliminas tu cuenta no podrás tener acceso a ningún tipo de información que proporcione tu entrenador en Fast Training</p>
        <button className="mt-4 px-6 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition">Eliminar Cuenta</button>
      </div>
    </div>
  );
}