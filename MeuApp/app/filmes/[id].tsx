import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from "expo-router";
import { Button, Text } from "native-base";
import { Linking } from 'react-native';
import axios from "axios";

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FilmesDetailsScreen() {
  const { id } = useLocalSearchParams(); // Pega o ID do filme da rota
  const [filmes, setFilmes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorito, setFavorito] = useState(false);

  const router = useRouter();
  const tokenKey = 'token';

  //função para formatar data
  const dataFormatada = filmes?.releaseDate
    ? new Date(filmes.releaseDate).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "Data não disponível";


  useEffect(() => {
    if (!id) return;

    const axiosFilmesDetails = async () => {
      const token = await AsyncStorage.getItem(tokenKey);
      if (!token) {
        setError('Token de autenticação não encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response) throw new Error('Falha ao buscar os detalhes do filme');
        setFilmes(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    axiosFilmesDetails();
  }, [id]);

  const toggleFavorito = async () => {
    try {
      const token = await AsyncStorage.getItem(tokenKey);

      if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        return;
      }

      const method = favorito ? "DELETE" : "POST";

      const response = await axios.request({
        url: `http://localhost:8000/favorites/${id}`,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setError("Não autorizado. Faça login novamente.");
        return;
      }

      // Se chegou aqui, deu certo → atualiza o estado
      setFavorito(!favorito);
    } catch (err: any) {
      console.error("Erro no toggleFavorito:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Erro: {error}</Text>;
  }

  if (!filmes) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={{ position: 'relative' }}>
        {filmes.imageUrl && (
          <Image
            source={{ uri: filmes.imageUrl }}
            style={styles.poster}
            resizeMode="contain"
          />
        )}

        <TouchableOpacity onPress={toggleFavorito} style={styles.heartButton}>
          <MaterialIcons
            name={favorito ? 'favorite' : 'favorite-border'}
            size={32}
            color={favorito ? '#ff0000' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsBox}>
        <Text style={styles.title}>Título: {filmes.title}</Text>
        <Text style={styles.subtitle}>Lançamento: {dataFormatada}</Text>
        <Text style={styles.overview}>Autor: {filmes.author}</Text>
        <Text style={styles.subtitle}>Sinopse:</Text>
        <Text style={styles.overview}>{filmes.synopsis}</Text>
      </View>

      <Button
        onPress={() => {
          if (filmes.movieLink) {
            Linking.openURL(filmes.movieLink);
          } else {
            setError("Link do filme não disponível.");
          }
        }}
        mb={12}
        borderRadius={15}
        bg={'#ff7300e5'}
        _hover={{ bg: "#ff910036" }}
      >
        <Text color="white" bold>Assista Agora</Text>
      </Button>

      <Button
        startIcon={<MaterialIcons name="arrow-back" size={20} color="#ffffffff" />}
        onPress={() => router.push("/home")}
        mb={12}
        borderRadius={15}
        bg={'#ff7300e5'}
        _hover={{ bg: "#ff910036" }}
      >
        <Text color="white" bold>Voltar</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  heartButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(238, 197, 197, 0.18)',
    borderRadius: 20,
    padding: 5,
  },
  detailsBox: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 19,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 15,
  },
  overview: {
    fontSize: 19,
    color: '#ccc',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
});
