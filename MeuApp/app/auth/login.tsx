import axios from "axios";
import { useRouter } from "expo-router";
import { Box, Button, Heading, HStack, Image, Input, Text, VStack } from "native-base";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"; // importa o contexto

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext); // pega a função do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      // Faz login e pega apenas o token
      const res = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      const { token } = res.data; // backend retorna apenas { token }

      // Pega os dados do usuário logado
      const userRes = await axios.get("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userRes.data;

      // Atualiza o contexto (isso permite acesso às páginas protegidas)
      await login(token, user);

      // Redireciona para a Home
      router.replace("/home");
    } catch (err: any) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Erro no login");
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
        <Heading color="#ff9100ff" fontSize="2xl">
          CineAbaloso
        </Heading>
      </HStack>

      <Heading mb={4} color="#ff9100ff">
        Login
      </Heading>

      <VStack space={4} w="100%" bg="rgba(0,0,0,0.94)" p={4} borderRadius={12}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          bg="#000"
          color="#fff"
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChangeText={setPassword}
          bg="#000"
          color="#fff"
        />
        {error ? <Text color="red.500">{error}</Text> : null}

        <Button onPress={handleLogin}  _hover={{ 
            bg:"#ff910036" }} bg={'#ff9100ff'}>
          Entrar
        </Button>

        <Button
          variant="link"
          onPress={() => router.push("/auth/cadastro")}
          _text={{ color: "#ff9100ff" }}
        >
          Criar conta
        </Button>

        <Button
          variant="link"
          onPress={() => router.push("/auth/recuperarSenha")}
          _text={{ color: "#ff9100ff" }}
        >
          Esqueci minha senha
        </Button>
      </VStack>
    </Box>
  );
}
