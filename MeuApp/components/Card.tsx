import { Box, Text, Image, IconButton, Icon } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface FilmeProps {
  //detalhes do filme
  id: number;
  title: string;
  imageUrl: string;
  author?: string; 
}

interface CardProps {
  filmes: FilmeProps;
}

export default function Card({ filmes }: CardProps) {
  const [favorito, setFavorito] = useState(false);

  const toggleFavorito = async () => {
    try {
      // Chama a url para salvar/desmarcar favorito
      await fetch(`http://localhost:8000/favorites/${filmes.id}`, {
        method: "POST",
      });

      // Alterna o estado local
      setFavorito(!favorito);
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

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
                color={favorito ? "#ff6f0eff" : "white"}
                size="lg"
              />
            }
            onPress={toggleFavorito}
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
