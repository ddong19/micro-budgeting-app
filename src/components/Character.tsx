import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CharacterType } from "../context/BudgetContext";

interface CharacterProps {
  spendingPercentage: number;
  characterType: CharacterType;
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

function getMicrocopy(state: CharacterState, characterType: CharacterType): string {
  if (characterType === "bud") {
    const messages = {
      thriving: "Thriving! You're crushing it! 🌱",
      happy: "Looking healthy and happy! 😊",
      nervous: "Getting a little thirsty... 💧",
      worried: "Things are looking rough... 😰",
      stressed: "Struggling to survive! 😫",
      ruined: "Oh no! Completely wilted! 💀",
    };
    return messages[state];
  } else {
    // Ramen character messages
    const messages = {
      thriving: "Piping hot and perfect! 🍜",
      happy: "Still steaming nicely! 😊",
      nervous: "Getting a bit lukewarm... 💧",
      worried: "Starting to get cold... 😰",
      stressed: "Almost gone cold! 😫",
      ruined: "Stone cold and soggy! 💀",
    };
    return messages[state];
  }
}

// Import character images
const budImages = {
  thriving: require('../../assets/characters/bud/Stage_1.png'),
  happy: require('../../assets/characters/bud/Stage_2.png'),
  nervous: require('../../assets/characters/bud/Stage_3.png'),
  worried: require('../../assets/characters/bud/Stage_4.png'),
  stressed: require('../../assets/characters/bud/Stage_5.png'),
  ruined: require('../../assets/characters/bud/Stage_6.png'),
};

const ramenImages = {
  thriving: require('../../assets/characters/ramen/Stage_1.png'),
  happy: require('../../assets/characters/ramen/Stage_2.png'),
  nervous: require('../../assets/characters/ramen/Stage_3.png'),
  worried: require('../../assets/characters/ramen/Stage_4.png'),
  stressed: require('../../assets/characters/ramen/Stage_5.png'),
  ruined: require('../../assets/characters/ramen/Stage_6.png'),
};

export default function Character({ spendingPercentage, characterType }: CharacterProps) {
  const state = getCharacterState(spendingPercentage);
  const characterImages = characterType === "bud" ? budImages : ramenImages;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={characterImages[state]}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.microcopy}>{getMicrocopy(state, characterType)}</Text>
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
