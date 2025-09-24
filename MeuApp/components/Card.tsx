import { Center } from "native-base";
import React from "react";

export default function Card() {
  return (
    <Center>
      <Center
        bg="#ffff"
        _text={{
          color: "white",
          fontWeight: "bold",
        }}
         h={400}       // altura 
        w="90%"          // 90% da largura da tela
        maxW="400px"     // nunca passa de 400px em telas grandes
        mt={8}           // margem em cima
        borderRadius="lg"
      >
        
      </Center>
    </Center>
  );
}
