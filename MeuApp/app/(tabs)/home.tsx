import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Box, Text } from "native-base";
import { Link } from 'expo-router';
import Card from '@/components/Card';
import SearchBar from '@/components/BarraPesquisa'; // Componente da Barra de Pesquisa



export default function Home() {
  const [filmes, setFilmes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Estados para a Busca ---
  const [searchText, setSearchText] = useState('');
  const [filmesFiltrados, setFilmesFiltrados] = useState<any[]>([]);
  // ---------------------------------

  //  Carregar Filmes
  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/movies`);
        if (!response.ok) throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
        const data = await response.json();
        setFilmes(data);
        setFilmesFiltrados(data); // Inicialmente, os filmes filtrados são todos os filmes
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilmes();
  }, []);
  //---------

  // Filtrar Filmes  pela barra de pesquisa
  useEffect(() => {
    if (searchText === '') {
      // Se a busca estiver vazia, mostre todos os filmes
      setFilmesFiltrados(filmes);
      return;
    }

    // Filtra os filmes
    const filmesFiltrados = filmes.filter(filme =>
      // Converte para minúsculas e verifica se o título inclui o texto de busca
      filme.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilmesFiltrados(filmesFiltrados);
  }, [searchText, filmes]); // Executa sempre que o texto de busca ou a lista principal de filmes mudar

  //Função para manipular a mudança de texto na barra de pesquisa
  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  // Tratamento de Loading e Erro 
  if (loading) {
    return (
      <Box flex={1} bg="#000000ff" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#f7420cff" />
        <Text color="#ff3807ff" mt={2}>Carregando filmes...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} bg="#000000ff" justifyContent="center" alignItems="center">
        <Text color="red">{error}</Text>
      </Box>
    );
  }

  //  Renderização do Componente
  return (
    <Box flex={1} bg="#030303ff" safeArea>

      <SearchBar onChangeText={handleSearch} />


      {filmesFiltrados.length === 0 && searchText !== '' ? (
        // Mensagem se a busca não encontrar resultados
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color="#f7420cff">Nenhum resultado encontrado para "{searchText}".</Text>
        </Box>
      ) : (
        // Se houver filmes filtrados, renderiza o FlatList
        <FlatList
          data={filmesFiltrados} // Usa a lista FILTRADA
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/filmes/${item.id}`} asChild>
              <View>
                <Card filmes={item} />
              </View>
            </Link>
          )}
          numColumns={2} //colunas
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.94)"
  },
});