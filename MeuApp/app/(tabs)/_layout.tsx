// app/(tabs)/_layout.tsx
import Header from "@/components/Header";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { Icon, NativeBaseProvider } from "native-base";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
                name="home-outline"
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
