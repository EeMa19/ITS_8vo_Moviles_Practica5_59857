// app/register.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { api } from '../services/api';

export default function RegisterScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (pass: string): boolean => pass.length >= 8;

  const handleRegister = async () => {
    if (!isValidEmail(username)) {
      Alert.alert('Error', 'El username debe ser un correo válido');
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
    try {
      await api.register(username, password);
      Alert.alert('Éxito', 'Registro exitoso, inicia sesión');
      router.push('/notas');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo registrar';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Cyber Resgistrate</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#00e0ff"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#00e0ff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Link href="/">
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0b2e', // Morado oscuro cyberpunk
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 40,
    color: '#ffeb3b', // Amarillo neón
    fontFamily: 'CyberPunk', // Fuente para el título
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: '#ffeb3b',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#00e0ff', // Azul neón
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    paddingLeft: 20,
    marginVertical: 12,
    color: '#00e0ff',
    fontSize: 16,
    fontFamily: 'terminal', // Fuente para inputs
    height: 50,
  },
  button: {
    backgroundColor: '#6a1b9a', // Morado claro
    padding: 15,
    paddingHorizontal: 30, // Más espacio horizontal para el texto
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#00e0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: '100%', // Asegura que el botón ocupe todo el ancho
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16, // Ajusta a 18 si lo prefieres
    fontFamily: 'SpaceMono', // Fuente para el botón
    lineHeight: 20, // Más espacio vertical para el texto
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '100%',
    paddingVertical: 2, // Margen interno vertical
  },
  link: {
    color: '#00e0ff', // Azul neón
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SpaceMono',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '100%',
    paddingHorizontal: 10,
    textDecorationLine: 'underline',
  },
});