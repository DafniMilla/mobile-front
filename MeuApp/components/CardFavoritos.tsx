// components/Card.tsx
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Icon, IconButton, Image, Text, Pressable } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Mesmo interface usada na tela de favoritos
interface FilmeProps {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  releaseDate: string;
  synopsis?: string;
  genreId?: number;
  userId?: number;
}
interface FavoriteItem {
  id: number;
  movieId: number;
  userId: number;
  createdAt: string;
  movie?: FilmeProps;
}

interface CardProps {
  favorite: FavoriteItem;
}

const tokenKey = "token";

export default function Card({ favorite }: CardProps) {
  const router = useRouter();
  const movie = favorite.movie;
  const [favorito, setFavorito] = useState(true);

  if (!movie) {
    // Se não tiver dados de filme, não renderiza
    return null;
  }

  const toggleFavorito = async () => {
    const token = await AsyncStorage.getItem(tokenKey);
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8000/favorites/${movie.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao favoritar/desfavoritar");

      // Alterna visualmente
      setFavorito((prev) => !prev);
    } catch (err) {
      console.error("Erro no toggle favorito:", err);
    }
  };


  return (
    <Pressable >
      <Box style={styles.cardContainer}>
        {movie.imageUrl && (
          <Box>
            <Image
              source={{ uri: movie.imageUrl }}
              alt={movie.title}
              style={styles.poster}
              rounded="lg"
            />
            <IconButton
              icon={
                <Icon
                  as={MaterialIcons}
                  name={favorito ? "favorite" : "favorite-border"}
                  color={favorito ? "#ff9100ff" : "white"}
                  size="lg"
                />
              }
              onPress={toggleFavorito}
              position="absolute"
              top={3}
              right={2}
              zIndex={1}
              _pressed={{ opacity: 0.7 }}
            />
          </Box>
        )}
        <Text
          color="#fff"
          bold
          mt={2}
          textAlign="center"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {movie.title}
        </Text>
        <Text color="#ccc" fontSize="xs" textAlign="center">
          Autor: {movie.author}
        </Text>
      </Box>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    margin: 8,
    alignItems: "center",
    backgroundColor: "#4e4545f3",
    borderRadius: 5,
    overflow: "hidden",
  },
  poster: {
    width: 160,
    height: 240,
    borderRadius: 8,
  },
});
