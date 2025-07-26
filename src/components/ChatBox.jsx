import { useState } from 'react';
import { useOllama } from '../hooks/useOllama';
import { useChat } from '../context/ChatContext';

export const ChatBox = () => {
  const [input, setInput] = useState('');
  const { messages, dispatch } = useChat();
  const { sendMessage, isLoading } = useOllama();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Evita recargar la página
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    dispatch({ type: 'ADD_MESSAGE', payload: { role: 'user', text: input } });

    // Llamar a Ollama
    const response = await sendMessage(input);

    // Agregar mensaje del bot
    dispatch({ type: 'ADD_MESSAGE', payload: { role: 'bot', text: response } });

    setInput(''); // ✅ Limpia el input
  };

  return (
    <div>
      {/* Mensajes */}
      <div className="space-y-2 mb-4 max-h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.role === 'user'
                ? 'bg-blue-100 text-right'
                : 'bg-gray-200 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-500 italic animate-pulse">Escribiendo...</div>
        )}
      </div>

      {/* Formulario para enviar mensaje */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe algo..."
          className="flex-1 border p-2 rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
