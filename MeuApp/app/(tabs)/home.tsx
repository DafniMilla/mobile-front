import { View } from 'native-base';
import Header from "@/components/Header";
import Card from '@/components/Card';
import { Box, Text } from "native-base";
//tela principal
export default function Home() {
 return (
   <Box flex={1} bg="#000" safeArea>
    <View>
      <Header />
      <Card />
    </View>
    </Box>
  );
}