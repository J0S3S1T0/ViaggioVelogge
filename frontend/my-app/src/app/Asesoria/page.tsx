// En /app/contacto-asesor/page.js
'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-16 px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contacta a un Asesor Especializado</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre completo</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Teléfono</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="interest" className="block text-sm font-medium mb-2">¿Qué te interesa?</label>
            <select
              id="interest"
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="compra">Compra de vehículo</option>
              <option value="accesorios">Accesorios personalizados</option>
              <option value="reparacion">Reparación y mantenimiento</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition"
          >
            Solicitar contacto de asesor
          </button>
        </form>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <h2 className="text-xl font-bold mb-4">Otras formas de contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Teléfono directo</h3>
              <p className="text-blue-400">+52 55 1234 5678</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Correo electrónico</h3>
              <p className="text-blue-400">asesores@viaggioveloce.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}