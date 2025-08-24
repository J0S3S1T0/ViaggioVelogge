// src/lib/utils.ts

export interface CartItem {
  id: number | string;
  nombre: string;
  precio: number;
  quantity: number;
  imagen: string;
  precioFormateado: string;
  descripcion?: string;
  detalles?: string;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price).replace('COP', '$').trim();
};

// Función para manejar el localStorage de forma segura
export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error al cargar el carrito desde localStorage:', error);
    return [];
  }
};

export const saveCartToStorage = (cartItems: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Disparar evento personalizado para notificar a otras pestañas/páginas
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: cartItems
    }));
  } catch (error) {
    console.error('Error al guardar el carrito en localStorage:', error);
  }
};

// Escuchar cambios en el localStorage desde otras pestañas
export const setupCartSync = (callback: (cartItems: CartItem[]) => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'cartItems') {
      try {
        const newCart = event.newValue ? JSON.parse(event.newValue) : [];
        callback(newCart);
      } catch (error) {
        console.error('Error al procesar cambio de carrito:', error);
      }
    }
  };

  const handleCartEvent = (event: CustomEvent) => {
    callback(event.detail);
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('cartUpdated', handleCartEvent as EventListener);

  // Retornar función para limpiar event listeners
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('cartUpdated', handleCartEvent as EventListener);
  };
};