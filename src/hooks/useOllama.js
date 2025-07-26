import { useState } from "react";

export function useOllama() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          prompt: message,
          stream: false
        })
      });

      const data = await response.json();
      console.log("Respuesta de Ollama:", data); // 👀 Verifica aquí
      return data.response || "Sin respuesta del modelo.";
    } catch (error) {
      console.error("Error al consultar Ollama:", error);
      return "Error al conectar con el modelo.";
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
}
