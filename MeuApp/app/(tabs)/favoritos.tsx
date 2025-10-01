// app/favorites/index.tsx   (ou onde sua rota de favoritos estiver)
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/CardFavoritos"; // ou onde você colocou o Card
import { Box } from "native-base";

// Interfaces compatíveis com o que a API retorna
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
  movie?: FilmeProps;  // pode ser undefined, tratar depois
}

export default function FavoritesScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const tokenKey = "token";

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = await AsyncStorage.getItem(tokenKey);
      if (!token) {
        setError("Token de autenticação não encontrado");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:8000/favorites/favoriteall", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Falha ao buscar favoritos");
        }
        const data = await response.json();
        // Data esperado: array de FavoriteItem (alguns podem ter movie undefined)
        setFavorites(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      {favorites.length === 0 && (
        <Text style={styles.noFavText}>Você ainda não favoritou nenhum filme.</Text>
      )}
      <Box flexDirection="row" flexWrap="wrap" justifyContent="center">
        {favorites.map((fav) => {
          // Só renderiza card se o favorite.movie existir
          if (!fav.movie) return null;
          return <Card key={fav.id} favorite={fav} />;
        })}
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  noFavText: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
});
