import Image from 'next/image';

export default function TeamLineup() {
  const players = [
    { id: 1, name: 'Juan Gonzales', number: 1, position: 'Portero', img: '/player1.png' },
    { id: 2, name: 'Juan Gonzales', number: 13, position: 'Portero', img: '/player1.png' },
    { id: 3, name: 'Manuel Carvajal', number: 2, position: 'Defensa', img: '/player2.png' },
    { id: 4, name: 'Manuel Lopez', number: 3, position: 'Defensa', img: '/player3.png' },
    { id: 5, name: 'Manuel Lopez', number: 4, position: 'Defensa', img: '/player3.png' },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen p-6">
      <header className="w-full max-w-5xl flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <Image src="/Fast_largo.png" alt="Fast Training" width={150} height={80} />
        </div>
        <input type="text" placeholder="Buscar" className="border border-gray-300 p-2 rounded-lg w-1/3" />
        <div className="flex items-center gap-6">
          <i className="fa-solid fa-moon text-5xl text-azul-principal cursor-pointer"></i>
          <i className="fa-solid fa-bell text-5xl text-azul-principal cursor-pointer"></i>
          <i className="fa-solid fa-user-circle text-5xl text-azul-principal cursor-pointer"></i>
        </div>
      </header>

      <div className="flex w-full max-w-5xl mt-6">
        <aside className="w-1/5 bg-white shadow-md p-4 rounded-lg flex flex-col items-center space-y-4">
          <button className="p-2 text-blue-600 hover:bg-gray-200 rounded-lg">🏠</button>
          <button className="p-2 text-blue-600 hover:bg-gray-200 rounded-lg">👥</button>
          <button className="p-2 text-blue-600 hover:bg-gray-200 rounded-lg">📂</button>
          <button className="p-2 text-blue-600 hover:bg-gray-200 rounded-lg">🔔</button>
          <button className="p-2 text-blue-600 hover:bg-gray-200 rounded-lg">⚠️</button>
          <button className="p-2 text-blue-600 hover:bg-gray-200 rounded-lg">❓</button>
        </aside>
        
        <main className="flex-1 bg-white shadow-md p-6 rounded-lg ml-4">
          <h2 className="text-xl font-semibold text-blue-600">Equipo Guangzhou</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {players.map((player) => (
              <div key={player.id} className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center">
                <Image src={player.img} alt={player.name} width={100} height={100} className="rounded-full" />
                <h3 className="text-lg font-semibold mt-2">{player.name}</h3>
                <span className="text-sm text-gray-600">{player.position}</span>
                <span className="text-sm font-bold bg-blue-500 text-white px-3 py-1 rounded-lg mt-2">{player.number}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
