import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { Box, Button, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>("Usuário Desconhecido");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editField, setEditField] = useState<"username" | "email" | "imageUrl" | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const tokenKey = "token";

  useEffect(() => {
    const loadProfile = async () => {
      const token = await AsyncStorage.getItem(tokenKey);
      if (!token) {
        router.replace("/auth/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImageUrl(res.data.imageUrl);
      } catch (err) {
        console.log(err);
        router.replace("/auth/login");
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/auth/login");
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = await AsyncStorage.getItem(tokenKey);
      if (!token) {
        setMessage("Usuário não logado");
        setLoading(false);
        return;
      }

      const res = await axios.patch(
        "http://localhost:8000/users/alterar",
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsername(res.data.username);
      setEmail(res.data.email);
      setImageUrl(res.data.imageUrl);
      setMessage("Perfil atualizado com sucesso!");
      setTimeout(() => setMessage(""), 3000);
      setEditField(null);
    } catch (err) {
      console.log(err);
      setMessage("Erro ao atualizar perfil");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label: string, value: string | null, fieldKey: "username" | "email" | "imageUrl") => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {editField === fieldKey ? (
        <TextInput
          style={styles.input}
          value={value || ""}
          onChangeText={(text) => {
            if (fieldKey === "username") setUsername(text);
            else if (fieldKey === "email") setEmail(text);
            else setImageUrl(text);
          }}
        />
      ) : (
        <Text style={styles.value}>{value || "Desconhecido"}</Text>
      )}
      <TouchableOpacity onPress={() => setEditField(editField === fieldKey ? null : fieldKey)}>
        <Icon
          as={MaterialIcons}
          name={editField === fieldKey ? "check" : "edit"}
          size="sm"
          color="#ff3807"
          ml={2}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Box flex={1} bg="#030303ff" p={4} alignItems="center" justifyContent="center">
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{username?.charAt(0)}</Text>
        </View>
      )}

      {renderField("Usuário:", username, "username")}
      {renderField("Email:", email, "email")}
     

      {loading && <ActivityIndicator size="large" color="#ff3807" style={{ marginVertical: 10 }} />}
      {message !== "" && <Text style={styles.message}>{message}</Text>}

      {editField && !loading && (
        <Button mt={4}  onPress={handleSave} bg={'#ff9100ff'}  _hover={{ 
            bg:"#ff910036" }}>
          Salvar
        </Button>
      )}

      <Button mt={6}  onPress={handleLogout} bg={'#ff9100ff'}  _hover={{ 
            bg:"#ff910036" }}>
        Logout
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff3807",
  },
  value: {
    fontSize: 16,
    marginLeft: 8,
    color: "#fff",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ff3807",
    fontSize: 16,
    marginLeft: 8,
    minWidth: 150,
    paddingVertical: 2,
    color: "#fff",
  },
  message: {
    color: "green",
    fontWeight: "bold",
    marginVertical: 5,
  },
});
