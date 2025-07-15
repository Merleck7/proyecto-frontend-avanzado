import { useState } from 'react'

export const useOllama = () => {
  const [loading, setLoading] = useState(false)

  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'devseek:1.1',
          prompt: message,
        }),
      })

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Error al consultar Ollama:', error)
      return 'Hubo un error.'
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}
