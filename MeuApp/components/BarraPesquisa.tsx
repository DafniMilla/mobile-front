// components/SearchBar.tsx
import React, { useState } from "react";
import { Box, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

interface SearchBarProps {
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ onChangeText }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (text: string) => {
    setQuery(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <Box w="100%" px={4} py={2}>
      <Input
        placeholder="Pesquisar filmes..."
        value={query}
        onChangeText={handleChange}
        variant="filled"
        bg="#1a1a1aff"
        color="#fff"
        borderRadius="10"
        InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml={2} color="#ff7300ff" />}
      />
    </Box>
  );
}