// Exemplo de como a sua 'Tela de Favoritos' deveria funcionar
import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { StyleSheet } from "react-native";

import Card from '@/components/Card';
interface FilmeProps {
  id: number;
  title: string;
  imageUrl: string;
  author?: string;
}

// Tela de Favoritos

export default function FavoritesScreen() {
  const [favoritosList, setFavoritosList] = useState<FilmeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
      
        const response = await fetch('http://localhost:8081/favorites'); //troquei a porta
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
      renderItem={({ item }) => <Card filmes={item} />}
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