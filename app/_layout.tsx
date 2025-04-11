// app/_layout.tsx
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    CyberPunk: require('../assets/fonts/cyber.otf'),
    terminal: require('../assets/fonts/whitrabt.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Iniciar Sesión',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: 'Registro',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notas"
          options={{
            title: 'Mis Notas',
          }}
        />
        <Stack.Screen
          name="create-note"
          options={{
            title: 'Crear nueva nota',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}