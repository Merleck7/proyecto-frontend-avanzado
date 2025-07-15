import { useForm } from 'react-hook-form'

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 font-bold text-center">Formulario</h2>

        <input
          {...register("nombre", { required: true })}
          placeholder="Nombre"
          className="w-full p-2 mb-4 border rounded"
        />
        {errors.nombre && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Enviar
        </button>
      </form>
    </div>
  )
}
