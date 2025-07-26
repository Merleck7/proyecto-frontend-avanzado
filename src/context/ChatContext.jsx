import { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  messages: [],
};

// Acciones disponibles
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
};

// Crear contexto
const ChatContext = createContext();

// Custom hook para usar el contexto
export const useChat = () => useContext(ChatContext);

// Provider
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

