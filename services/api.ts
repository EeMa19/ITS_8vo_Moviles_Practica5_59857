// services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://reputation-cheese-when-jennifer.trycloudflare.com/api'; // Ajusta si el túnel cambia

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

// Funciones auxiliares para manejar el token
const getToken = async () => await AsyncStorage.getItem('token');
const setToken = async (token: string) => await AsyncStorage.setItem('token', token);

export const api = {
  // Login: Devuelve el token y lo guarda
  login: async (username: string, password: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login fallido: ${response.status} - ${errorText}`);
      }
      const { token } = await response.json();
      await setToken(token);
      return token;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  // Registro: Solo registra, no devuelve token
  register: async (username: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registro fallido: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  // Obtener todas las tareas
  getTareas: async (): Promise<Tarea[]> => {
    const token = await getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/tareas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching tareas: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tareas:', error);
      throw error;
    }
  },

  // Obtener una tarea por ID
  getTarea: async (id: number): Promise<Tarea> => {
    const token = await getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching tarea ${id}: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching tarea ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva tarea
  createTarea: async (tarea: Omit<Tarea, 'id'>): Promise<Tarea> => {
    const token = await getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tarea),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error creando tarea: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating tarea:', error);
      throw error;
    }
  },

  // Actualizar una tarea existente
  updateTarea: async (id: number, tarea: Partial<Tarea>): Promise<Tarea> => {
    const token = await getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tarea),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error actualizando tarea ${id}: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating tarea ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una tarea
  deleteTarea: async (id: number): Promise<void> => {
    const token = await getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error eliminando tarea ${id}: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error(`Error deleting tarea ${id}:`, error);
      throw error;
    }
  },
};