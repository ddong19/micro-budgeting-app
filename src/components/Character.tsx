import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface CharacterProps {
  spendingPercentage: number;
}

type CharacterState = "thriving" | "happy" | "nervous" | "worried" | "stressed" | "ruined";

function getCharacterState(percentage: number): CharacterState {
  if (percentage < 25) return "thriving";   // 0-25% spent (100%-75% budget remaining)
  if (percentage < 50) return "happy";      // 25-50% spent (75%-50% budget remaining)
  if (percentage < 65) return "nervous";    // 50-65% spent
  if (percentage < 80) return "worried";    // 65-80% spent
  if (percentage < 100) return "stressed";  // 80-100% spent
  return "ruined";                          // 100%+ spent (over budget)
}

function getMicrocopy(state: CharacterState): string {
  const messages = {
    thriving: "Thriving! You're crushing it! 🌱",
    happy: "Looking healthy and happy! 😊",
    nervous: "Getting a little thirsty... 💧",
    worried: "Things are looking rough... 😰",
    stressed: "Struggling to survive! 😫",
    ruined: "Oh no! Completely wilted! 💀",
  };
  return messages[state];
}

// Import character images
const characterImages = {
  thriving: require('../../assets/characters/Stage_1.png'),
  happy: require('../../assets/characters/Stage_2.png'),
  nervous: require('../../assets/characters/Stage_3.png'),
  worried: require('../../assets/characters/Stage_4.png'),
  stressed: require('../../assets/characters/Stage_5.png'),
  ruined: require('../../assets/characters/Stage_6.png'),
};

export default function Character({ spendingPercentage }: CharacterProps) {
  const state = getCharacterState(spendingPercentage);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={characterImages[state]}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.microcopy}>{getMicrocopy(state)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 16,
  },
  imageContainer: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  characterImage: {
    width: 220,
    height: 220,
  },
  microcopy: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b7280",
    textAlign: "center",
  },
});
