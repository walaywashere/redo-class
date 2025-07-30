export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see styling, Tailwind is working!
        </p>
        <div className="flex gap-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Purple Button
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded">
            Gradient Button
          </button>
        </div>
      </div>
    </div>
  )
} 