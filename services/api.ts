// services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://bad-plugins-az-adipex.trycloudflare.com';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

const getToken = async () => await AsyncStorage.getItem('token');
const setToken = async (token: string) => await AsyncStorage.setItem('token', token);

export const api = {
  login: async (username: string, password: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

  register: async (username: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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

  getTareas: async (): Promise<Tarea[]> => {
    const token = await getToken();
    if (!token) throw new Error('No hay token de autenticación');
    try {
      const response = await fetch(`${API_BASE_URL}/api/tareas`, {
        headers: {
          'Content-Type': 'application/json',
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

  getTarea: async (id: number): Promise<Tarea> => {
    const token = await getToken();
    if (!token) throw new Error('No hay token de autenticación');
    try {
      const response = await fetch(`${API_BASE_URL}/api/tareas/${id}`, {
        headers: {
          'Content-Type': 'application/json',
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

  createTarea: async (tarea: Omit<Tarea, 'id'>): Promise<Tarea> => {
    const token = await getToken();
    if (!token) throw new Error('No hay token de autenticación');
    try {
      const response = await fetch(`${API_BASE_URL}/api/tareas`, {
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

  updateTarea: async (id: number, tarea: Partial<Tarea>): Promise<Tarea> => {
    const token = await getToken();
    if (!token) throw new Error('No hay token de autenticación');
    try {
      const response = await fetch(`${API_BASE_URL}/api/tareas/${id}`, {
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

  deleteTarea: async (id: number): Promise<void> => {
    const token = await getToken();
    if (!token) throw new Error('No hay token de autenticación');
    try {
      const response = await fetch(`${API_BASE_URL}/api/tareas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
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