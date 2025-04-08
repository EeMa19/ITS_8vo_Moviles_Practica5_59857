// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { api } from '../services/api';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (pass: string): boolean => pass.length >= 8;

  const handleLogin = async () => {
    if (!isValidEmail(username)) {
      Alert.alert('Error', 'El username debe ser un correo válido');
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
    try {
      await api.login(username, password);
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      router.push('/index'); // Redirige a la lista de notas
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo iniciar sesión';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Correo"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Link href="/register">
        <Text>Registrarse</Text>
      </Link>
    </View>
  );
}