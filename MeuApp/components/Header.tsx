//barra superior
 

import React from "react";
import { HStack, Box, Image, IconButton, Icon, Text, useColorModeValue } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";


export default function Header() {
  
  const bg = useColorModeValue("primary.500", "primary.900"); //trocar a cor
  const textColor = useColorModeValue("white", "gray.100");
  const iconColor = useColorModeValue("white", "gray.100");

  return (
    <Box safeAreaTop bg={bg} shadow={4}>
      <HStack
        px="4"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo + Nome */}
        <HStack alignItems="center">
          <Image
            source={require("../assets/images/logocinema.jpg")} // seu logo aqui
            alt="Logo"
            size="8"
            mr="2"
            borderRadius="full" 
            bg="white"
          />
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            CineAbaloso
          </Text>
        </HStack>

        {/* Botão de ação */}
        <IconButton
          icon={<Icon as={MaterialIcons} name="menu" color={iconColor} size="lg" />}
          borderRadius="full"
          _pressed={{ bg: "primary.700:alpha.20" }}
          onPress={() => console.log("Menu clicado")}
        />
      </HStack>
    </Box>
  );
}
