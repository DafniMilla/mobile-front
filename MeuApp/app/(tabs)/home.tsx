// app/(tabs)/index.tsx
import SearchBar from '@/components/BarraPesquisa'; // ajuste o caminho conforme a localização real
import Card from '@/components/Card';
import { Link, useRouter } from 'expo-router';
import { Box, Text } from 'native-base';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  const [filmes, setFilmes] = useState<any[]>([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState('');

  // Protege a rota: redireciona para login se não logado
  useEffect(() => {
    if (!token) {
      router.replace('/auth/login');
    }
  }, [token]);

  // Carregar filmes
  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await fetch('http://localhost:8000/movies',{
          headers: { Authorization: `Bearer ${token}` }
        })
         
        
        if (!response.ok) throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
        const data = await response.json();
        setFilmes(data);
        setFilmesFiltrados(data);
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };
    fetchFilmes();
  }, []);

  // Filtrar filmes pela barra de pesquisa
  useEffect(() => {
    if (searchText === '') {
      setFilmesFiltrados(filmes);
      return;
    }

    const filtrados = filmes.filter(filme =>
      filme.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilmesFiltrados(filtrados);
  }, [searchText, filmes]);

  const handleSearch = (text: string) => setSearchText(text);

  // Loading / Verificação de token
  if (!token || loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="#000">
        <ActivityIndicator size="large" color="#ff3807" />
        <Text color="#ff3807" mt={2}>Carregando...</Text>
      </Box>
    );
  }

  // Tratamento de erro
  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="#000">
        <Text color="red">{error}</Text>
      </Box>
    );
  }

  // Renderização da lista de filmes
  return (
    <Box flex={1} bg="#030303ff" safeArea>
      <SearchBar onChangeText={handleSearch} />

      {filmesFiltrados.length === 0 && searchText !== '' ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color="#f7420cff">Nenhum resultado encontrado para "{searchText}".</Text>
        </Box>
      ) : (
        <FlatList
          data={filmesFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/filmes/${item.id}`} asChild>
              <View>
                <Card filmes={item} />
              </View>
            </Link>
          )}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.94)',
  },
});
