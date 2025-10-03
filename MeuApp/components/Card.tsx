
import { Box, Icon, IconButton, Image, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";

// CARD PARA EXIBIR FILME 

// dados que o componente espera
interface FilmeProps {
  id: number;
  title: string;
  imageUrl: string;
  author?: string;
}

interface CardProps {
  filmes: FilmeProps;
}

//-------
export default function Card({ filmes }: CardProps) {
  const [favorito, setFavorito] = useState(false);

  const api = axios.create({
    baseURL: "http://192.168.0.100:8000", 
  });

  // Verifica no backend se o filme já é favorito
  useEffect(() => {
    const checkFavorito = async () => {
      try {
        const response = await api.get(`/favorites/${filmes.id}`);
        setFavorito(response.data.isFavorito);
      } catch (error) {
        console.error("Erro ao verificar favorito:", error);
      }
    };

    checkFavorito();
  }, [filmes.id]);

  // função para alternar favorito
  //const toggleFavorito = async () => {
   // try {
    //  if (favorito) {
        // remover favorito
   //     await api.delete(`/favorites/${filmes.id}`);
    //    setFavorito(false);
     // } else {
        // adicionar favorito
      //  await api.post(`/favorites`, { movieId: filmes.id });
      //  setFavorito(true);
   //   }
  //  } catch (error) {
  //    console.error("Erro ao atualizar favorito:", error);
  //  }
 // };

  return (
    <Box style={styles.cardContainer}>
      {filmes.imageUrl && (
        <Box>
          <Image
            source={{ uri: filmes.imageUrl }}
            alt={filmes.title}
            style={styles.poster}
            rounded="lg"
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
        {filmes.title}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    margin: 8,
    alignItems: "center",
    backgroundColor: "#6e6565a8",
    borderRadius: 5,
  },
  poster: {
    width: 160,
    height: 240,
    borderRadius: 8,
  },
});
