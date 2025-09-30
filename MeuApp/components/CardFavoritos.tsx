import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Icon, IconButton, Image, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

//CARD PARA EXIBIR FILME

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

const tokenKey = "token";
export default function Card({ filmes }: CardProps) {

  //função de favoritos
  const [favorito, setFavorito] = useState(false);
  useEffect(() => {
    const checkFavorito = async () => {
        const token = await AsyncStorage.getItem(tokenKey);
      try {
        const response = await fetch(`http://localhost:8000/favorites/favoriteall`,{
            headers: { Authorization: `Bearer ${token}` }
        });//troquei a porta
        const data = await response.json();
        console.log(data)
        setFavorito(data.isFavorito);
      } catch (error) {
        console.error("Erro ao verificar favorito:", error);
      }
    };

    checkFavorito();
  }, [filmes.id]);


  //estrutura visual
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

          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name={favorito ? "favorite" : "favorite-border"}
                color={favorito ? "#850000ff" : "white"}
                size="lg"
              />
            }
           // onPress={}
            position="absolute"
            top={3}
            right={2}
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
    backgroundColor: "#4e4545f3",
    borderRadius: 5,
  },
  poster: {
    width: 160,
    height: 240,
    borderRadius: 8,
  },
});
