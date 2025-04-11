// app/index.tsx
import React, { useState, useEffect } from 'react';
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
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';
import { api } from '../services/api';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [terminalText, setTerminalText] = useState<string>('');
  const router = useRouter();

  // Efecto de glitch
  const glitchOffset = useSharedValue(0);
  const glitchStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: glitchOffset.value }],
  }));

  useEffect(() => {
    // Animación de glitch
    glitchOffset.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(0, { duration: 50 })
      ),
      -1, // Repetir infinitamente
      true // Reverso
    );

    // Generación de texto de terminal
    const commands = [
      'Initializing system...',
      'LOADING MODULES...',
      'Scanning network...',
      'BYPASSING FIREWALL...',
      'Access granted.',
      'ERROR 404: NOT FOUND',
      'RUNNING DIAGNOSTICS...',
      'HACKING DETECTED',
    ];
    let currentText = '';
    let index = 0;

    const interval = setInterval(() => {
      if (currentText.length < commands[index].length) {
        currentText = commands[index].slice(0, currentText.length + 1);
        setTerminalText(currentText);
      } else {
        setTimeout(() => {
          currentText = '';
          setTerminalText('');
          index = (index + 1) % commands.length;
        }, 1000); // Pausa antes de cambiar al siguiente comando
      }
    }, 100); // Velocidad de escritura

    return () => clearInterval(interval);
  }, []);

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
      router.push('/notas');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo iniciar sesión';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Animated.View style={[styles.background, glitchStyle]}>
        <Text style={styles.terminalText}>{terminalText}</Text>
      </Animated.View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Cybernotes</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Link href="/register">
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
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
  background: {
    ...StyleSheet.absoluteFillObject, // Cubre todo el contenedor
    backgroundColor: '#1a0b2e',
    zIndex: -1, // Detrás de los elementos principales
  },
  terminalText: {
    color: '#00e0ff', // Azul neón
    fontFamily: 'SpaceMono',
    fontSize: 12,
    opacity: 0.3, // Baja opacidad para que no distraiga
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    textAlign: 'left',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
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
    fontFamily: 'SpaceMono', // Cambiado a SpaceMono
    height: 50,
  },
  button: {
    backgroundColor: '#6a1b9a', // Morado claro
    padding: 20,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00e0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: '100%',
    minWidth: 300,
    minHeight: 60,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'SpaceMono', // Cambiado a SpaceMono
    lineHeight: 24,
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '100%',
    paddingVertical: 2,
  },
  link: {
    color: '#00e0ff', // Azul neón
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SpaceMono', // Cambiado a SpaceMono
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '100%',
    paddingHorizontal: 10,
    textDecorationLine: 'underline',
  },
});