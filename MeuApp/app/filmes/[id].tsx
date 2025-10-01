import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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

  const tokenKey = 'token';

  useEffect(() => {
    if (!id) return;

    const fetchFilmesDetails = async () => {
      const token = await AsyncStorage.getItem(tokenKey);
      if (!token) {
        setError('Token de autenticação não encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Falha ao buscar os detalhes do filme');
        const data = await response.json();
        setFilmes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmesDetails();
  }, [id]);

  const toggleFavorito = async () => {
    const token = await AsyncStorage.getItem(tokenKey);
    if (!token) {
      setError('Token de autenticação não encontrado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/favorites/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao favoritar o filme');
      }

      setFavorito(true); // Marca como favorito localmente
    } catch (err: any) {
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
        <Text style={styles.subtitle}>Lançamento: {filmes.releaseDate}</Text>
        <Text style={styles.overview}>Sinopse: {filmes.synopsis}</Text>
        <Text style={styles.overview}>Autor: {filmes.author}</Text>
      </View>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 15,
  },
  overview: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
});
