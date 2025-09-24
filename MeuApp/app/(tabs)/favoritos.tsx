import { View } from "native-base"
import Header from "@/components/Header"
import { Box, Text } from "native-base";
import Card from "@/components/Card";


export default function Favoritos() {
  return (
     <Box flex={1} bg="#000" safeArea>
      <View>
        <Header />
        <Card/>
      </View>
      </Box>
    );
  }