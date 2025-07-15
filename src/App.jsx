import { useForm } from 'react-hook-form'
import { ChatBox } from './components/ChatBox'

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // Aquí puedes integrar lógica si decides guardar el nombre del usuario, por ejemplo
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md"
        >
          <h2 className="text-2xl mb-4 font-bold text-center">Formulario</h2>

          <input
            {...register('nombre', { required: true })}
            placeholder="Nombre"
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">Este campo es obligatorio</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Enviar
          </button>
        </form>

        {/* ChatBox */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
            Clon básico de ChatGPT con DevSeek
          </h1>
          <ChatBox />
        </div>
      </div>
    </div>
  )
}
