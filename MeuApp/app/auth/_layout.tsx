// app/auth/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { NativeBaseProvider } from "native-base";

export default function AuthLayout() {
  return (
    <NativeBaseProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="recuperarSenha" />
         <Stack.Screen name="reset-password" />
      </Stack>
    </NativeBaseProvider>
  );
}
