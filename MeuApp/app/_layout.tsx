import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* telas públicas */}
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/cadastro" />
        <Stack.Screen name="auth/recuperarSenha" />

        {/* telas privadas */}
        <Stack.Screen name="(tabs)/index" />
        <Stack.Screen name="(tabs)/favoritos" />
      </Stack>
    </AuthProvider>
  );
}
