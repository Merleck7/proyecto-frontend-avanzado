import { useState } from 'react'
import { useOllama } from "../hooks/useOllama";
import { useChat } from '../context/ChatContext'

export const ChatBox = () => {
  const [input, setInput] = useState('')
  const { sendMessage, loading } = useOllama()
  const { state, dispatch } = useChat()

  const handleSend = async () => {
    if (!input.trim()) return
    dispatch({ type: 'ADD_MESSAGE', payload: { role: 'user', text: input } })

    const response = await sendMessage(input)
    dispatch({ type: 'ADD_MESSAGE', payload: { role: 'bot', text: response } })

    setInput('')
  }

  return (
    <div>
      <div>
        {state.messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleSend} disabled={loading}>Enviar</button>
    </div>
  )
}
