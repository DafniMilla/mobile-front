import axios from "axios";
import { useRouter } from "expo-router";
import { Box, Button, Heading, HStack, Image, Input, Text, VStack } from "native-base";
import React, { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRecover = async () => {
    setMessage("");
    setError("");
    try {
      await axios.post("http://localhost:8000/auth/esqueceusenha", { email });
      setMessage("Se o email estiver cadastrado, você receberá instruções.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao enviar email.");
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
          Recuperar Senha
        </Heading>
      <VStack space={4} w="100%" bg="rgba(0,0,0,0.94)" p={4} borderRadius={12}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          bg="#000"
          color="#fff"
        />
        {message ? <Text color="green.500">{message}</Text> : null}
        {error ? <Text color="red.500">{error}</Text> : null}
        <Button onPress={handleRecover} colorScheme="red">
          Enviar instruções
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
