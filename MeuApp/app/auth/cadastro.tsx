import axios from "axios";
import { useRouter } from "expo-router";
import { Box, Button, Heading, HStack, Image, Input, Text, VStack } from "native-base";
import React, { useState } from "react";

export default function Cadastro() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
       
      });
      router.replace("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro no cadastro");
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={4} bg="#030303ff">
      
      {/* Logo + Nome do App */}
      <HStack alignItems="center" mb={6}>
        <Image
                  source={require("../../assets/images/logocinema.jpg")}
                  alt="Logo CineAbaloso"
                  size="12"
                  borderRadius={50}
                  resizeMode="contain"
                  mr={2}
                />
        <Heading color="#ff9100ff" fontSize="2xl">
          CineAbaloso
        </Heading>
      </HStack>

      <Heading mb={4} color="#ff9100ff">
        Cadastro
      </Heading>

      <VStack space={4} w="100%" bg="rgba(0,0,0,0.94)" p={4} borderRadius={12}>
        <Input placeholder="Nome de usuário" value={username} onChangeText={setUsername} bg="#000" color="#fff" />
        <Input placeholder="Email" value={email} onChangeText={setEmail} bg="#000" color="#fff" />
        <Input placeholder="Senha" type="password" value={password} onChangeText={setPassword} bg="#000" color="#fff" />
        {error ? <Text color="red.500">{error}</Text> : null}
        <Button onPress={handleRegister} bg="#ff9100ff"  _hover={{ 
            bg:"#ff910036" }}>
          Cadastrar
        </Button>
        <Button variant="link" onPress={() => router.push("/auth/login")} _text={{ color: "#ff9100ff" }}>
          Já tenho conta
        </Button>
      </VStack>
    </Box>
  );
}
