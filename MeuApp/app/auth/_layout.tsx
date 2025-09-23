import { Stack } from "expo-router";

//rotas públicas


export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="recuperarSenha" />
    </Stack>
  );
}
