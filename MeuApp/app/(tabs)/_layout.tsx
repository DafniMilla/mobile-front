// app/(tabs)/_layout.tsx
import { Tabs, Redirect } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Icon, NativeBaseProvider } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import Header from "@/components/Header";

export default function TabLayout() {
  const { token } = useContext(AuthContext);

  // Se não estiver logado, redireciona para login
  if (!token) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <NativeBaseProvider>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors["light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Icon
                as={MaterialCommunityIcons}
                name="home"
                size="28px"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favoritos"
          options={{
            title: "Favoritos",
            tabBarIcon: ({ color }) => (
              <Icon
                as={MaterialCommunityIcons}
                name="heart"
                size="28px"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </NativeBaseProvider>
  );
}
