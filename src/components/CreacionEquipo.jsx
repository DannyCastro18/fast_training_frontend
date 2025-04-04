'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeamCreationForm() {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [teamImage, setTeamImage] = useState(null);
  const [inviteLink, setInviteLink] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTeamImage(URL.createObjectURL(file));
    }
  };

  const generateInviteLink = () => {
    const uniqueCode = Math.random().toString(36).substr(2, 8);
    setInviteLink(`https://miapp.com/invite/${uniqueCode}`);
    showModalMessage('¡Enlace de invitación generado!', 'green');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    showModalMessage('Enlace copiado al portapapeles', 'blue');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    generateInviteLink();

    try {
      const response = await axios.post('/api/equipos', {
        teamName,
        description
      });
      
      if (response.status === 200) {
        showModalMessage('¡Equipo creado exitosamente!', 'green');
      }
    } catch (error) {
      showModalMessage('Error al crear el equipo', 'red');
    }
  };

  const showModalMessage = (message, color) => {
    setModalMessage({ text: message, color });
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-20 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[420px] p-6 bg-white shadow-2xl rounded-2xl"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Creación de equipo</h2>
          <p className="text-sm text-gray-500 text-center">Añade una imagen para el escudo de tu equipo (Opcional)</p>

          <label className="cursor-pointer flex flex-col items-center">
            {teamImage ? (
              <img src={teamImage} alt="Escudo del equipo" className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-lg" />
            ) : (
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-full text-gray-500 shadow-md"
              >
                📷
              </motion.div>
            )}
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>

          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">Escribe el nombre de tu equipo</label>
            <input
              type="text"
              placeholder="Ej: Los Invencibles"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 mt-1"
            />
          </div>

          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">Añadir una descripción (opcional)</label>
            <input
              type="text"
              placeholder="Ej: Equipo de amigos apasionados por el fútbol"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 mt-1"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit} 
            className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Crear equipo
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateInviteLink}
            className="w-full p-3 mt-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 transition-all"
          >
            Generar enlace de invitación
          </motion.button>

          {inviteLink && (
            <div className="w-full mt-4">
              <label className="text-sm font-medium text-gray-600">Tu enlace de invitación</label>
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-gray-100">
                <span className="text-gray-700 truncate">{inviteLink}</span>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard} 
                  className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all text-xs"
                >
                  Copiar
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal para alertas */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white ${
              modalMessage.color === 'green' ? 'bg-green-500' : modalMessage.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {modalMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
