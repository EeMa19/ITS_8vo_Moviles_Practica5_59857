// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
      router.push('/login'); // Redirige a login tras registro
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo registrar';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Registro</Text>
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
      <Button title="Registrarse" onPress={handleRegister} />
      <Link href="/login">
        <Text>Volver al login</Text>
      </Link>
    </View>
  );
}