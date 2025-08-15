'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function GaleriaPage() {
  const autos = [
    {
      id: 1,
      nombre: "Chevrolet Impala",
      año: "1959",
      descripcion: "Calle 30 Avance 2020",
      imagen: "/Impala.png",
      detallesLink: "/impala",
      vista3D: true
    },
    {
      id: 2,
      nombre: "Ferrari",
      modelo: "Testarossa",
      descripcion: "Leyes del Italiano",
      imagen: "/testarossa.png",
      detallesLink: "/testarossa",
      vista3D: true
    },
    {
      id: 3,
      nombre: "Buick LeSabre",
      año: "1959",
      descripcion: "Kate Hano",
      imagen: "/BuickLeSabre1959.png",
      detallesLink: "/buick-lesabre",
      vista3D: true
    },
    {
      id: 4,
      nombre: "Ferrari 250 GT",
      descripcion: "Elegancia Clásica",
      imagen: "/Ferrari250.png",
      detallesLink: "/ferrari-250",
      vista3D: false
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galería de Autos Clásicos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestra colección de vehículos icónicos en impresionante 3D
          </p>
        </div>
      </header>

      {/* Grid de autos */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {autos.map((auto) => (
            <div key={auto.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Imagen completa */}
              <div className="relative h-64 w-full">
                <Image
                  src={auto.imagen}
                  alt={`${auto.nombre} ${auto.modelo || ''}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Información del auto */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{auto.nombre}</h2>
                  {auto.modelo && <p className="text-lg text-gray-700">{auto.modelo}</p>}
                  {auto.año && <p className="text-gray-500">{auto.año}</p>}
                  <p className="text-gray-600 mt-2 italic">{auto.descripcion}</p>
                </div>

                {/* Botones */}
                <div className="flex justify-between">
                  <Link
                    href={auto.detallesLink}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Más detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  {auto.vista3D ? (
                    <Link
                      href={`/3d-viewer?id=${auto.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Ver en 3D
                    </Link>
                  ) : (
                    <span className="text-gray-400 px-4 py-2">3D no disponible</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de contacto */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Buscas algo específico?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Nuestros expertos pueden ayudarte a encontrar el auto perfecto o accesorios personalizados.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition"
          >
            Contactar a un experto
          </Link>
        </div>
      </div>
    </div>
  );
}