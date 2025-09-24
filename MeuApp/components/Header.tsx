//barra superior
 

import React from "react";
import { HStack, Box, Image, IconButton, Icon, Text, useColorModeValue } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";


export default function Header() {
  
  const bg = useColorModeValue("#f87311", "#f87311"); //trocar a cor
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

     
      </HStack>
    </Box>
  );
}
