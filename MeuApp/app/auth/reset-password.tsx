import React, { useState } from "react";
import { Box, Input, Button, Heading, VStack, Text, HStack, Image } from "native-base";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = useLocalSearchParams(); // Pega o token da URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setMessage("");
    setError("");
    if (!token || typeof token !== "string") {
      setError("Token inválido ou ausente.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/auth/redefinirsenha", {
        token,
        newPassword,
      });

      setMessage("Senha redefinida com sucesso!");
      setTimeout(() => {
        router.push("/auth/login"); // Redireciona para login após sucesso
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao redefinir senha.");
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={4} bg="#030303ff">
      <HStack alignItems="center" mb={6}>
        <Image
          source={require("../../assets/images/logocinema.jpg")}
          alt="Logo CineAbaloso"
          size="12"
          resizeMode="contain"
          mr={2}
        />
        <Heading color="#fff" fontSize="2xl">
          CineAbaloso
        </Heading>
      </HStack>

      <Heading mb={4} color="#ff3807ff">
        Criar Nova Senha
      </Heading>

      <VStack space={4} w="100%" bg="rgba(0,0,0,0.94)" p={4} borderRadius={12}>
        <Input
          placeholder="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          bg="#000"
          color="#fff"
        />
        {message ? <Text color="green.500">{message}</Text> : null}
        {error ? <Text color="red.500">{error}</Text> : null}
        <Button onPress={handleReset} colorScheme="red">
          Redefinir Senha
        </Button>
        <Button
          variant="link"
          onPress={() => router.push("/auth/login")}
          _text={{ color: "#ff3807ff" }}
        >
          Voltar para Login
        </Button>
      </VStack>
    </Box>
  );
}
