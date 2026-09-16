// components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/colors';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
}

export default function Header({ title, showBack = false, rightIcon, onRightPress }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.side}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}

      <Text style={styles.title} numberOfLines={1}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.side}>
          <Text style={styles.icon}>{rightIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: Colors.primaryGreen,
  },
  side: { width: 40, alignItems: 'center' },
  icon: { fontSize: 20, color: Colors.white },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
