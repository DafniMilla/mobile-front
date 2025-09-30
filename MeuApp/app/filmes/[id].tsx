import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FilmesDetailsScreen() {
  const { id } = useLocalSearchParams(); // pega o id do filme
  const [filmes, setFilmes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tokenKey = "token";
  useEffect(() => {
    if (!id) return; // evita erro se id não estiver definido

    const fetchFilmesDetails = async () => {

      const token = await AsyncStorage.getItem(tokenKey);
      try {
        const response = await fetch(`http://localhost:8000/movies/${id}`,{
          headers: { Authorization: `Bearer ${token}` }
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
      {filmes.imageUrl && (
        <Image
          source={{ uri: filmes.imageUrl }}
          style={styles.poster}
          resizeMode="contain"
        />
      )}
      <View style={styles.detailsBox}>
        <Text style={styles.title}>Titulo:{filmes.title}</Text>
        <Text style={styles.subtitle}>Lançamento: {filmes.releaseDate}</Text>
        <Text style={styles.overview}>Synopsis:{filmes.synopsis}</Text>
        <Text style={styles.overview}>Autor:{filmes.author}</Text>

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
  },
});
