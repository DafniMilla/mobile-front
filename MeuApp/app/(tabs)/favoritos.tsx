// Exemplo de como a sua 'Tela de Favoritos' deveria funcionar
import CardFavoritos from '@/components/CardFavoritos';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
interface FilmeProps {
  id: number;
  title: string;
  imageUrl: string;
  author?: string;
}

  const tokenKey = "token";
// Tela de Favoritos

export default function FavoritesScreen() {
  const [favoritosList, setFavoritosList] = useState<FilmeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchFavoritos = async () => {
      const token = await AsyncStorage.getItem(tokenKey);
      try {
      
        const response = await fetch('http://localhost:8000/favorites/favoriteall',{
          headers: { Authorization: `Bearer ${token}` },
        }); //troquei a porta
        const data = await response.json();
      
        setFavoritosList(data); 
      } catch (error) {
        console.error("Erro ao carregar lista de favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  if (isLoading) {
    return <Text>Carregando favoritos...</Text>;
  }

  if (favoritosList.length === 0) {
    return <Text style={styles.msgFavoritos}>Você não tem nenhum filme favorito salvo!</Text>;
      
  }

  return (
    <FlatList
      data={favoritosList}
      keyExtractor={(item) => String(item.id)}
      numColumns={2} 
      renderItem={({ item }) => <CardFavoritos filmes={item} />}
    />
  );
}

const styles = StyleSheet.create({
  

    msgFavoritos: {
        fontSize: 20,           
        color: '#ff2626ff',       
        textAlign: 'center',    
        paddingHorizontal: 20, 
        fontWeight: 'bold',     
    },
});