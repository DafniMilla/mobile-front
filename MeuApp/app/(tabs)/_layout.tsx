import { Tabs } from 'expo-router';
import React from 'react';
import { Icon, NativeBaseProvider } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
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
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Icon
              as={MaterialCommunityIcons}
              name="compass"
              size="28px"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
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