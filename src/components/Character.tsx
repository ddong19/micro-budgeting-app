import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CharacterProps {
  spendingPercentage: number;
}

type CharacterState = "happy" | "neutral" | "nervous" | "stressed" | "ruined";

function getCharacterState(percentage: number): CharacterState {
  if (percentage < 30) return "happy";
  if (percentage < 60) return "neutral";
  if (percentage < 85) return "nervous";
  if (percentage < 100) return "stressed";
  return "ruined";
}

function getMicrocopy(state: CharacterState): string {
  const messages = {
    happy: "You're doing great! 🌟",
    neutral: "Looking good so far",
    nervous: "Careful now... 👀",
    stressed: "Maybe skip takeout tonight 😅",
    ruined: "This is getting out of hand! 😱",
  };
  return messages[state];
}

interface CharacterConfig {
  colors: [string, string];
  face: string;
  scale: number;
  rotation: string;
}

const characterConfigs: Record<CharacterState, CharacterConfig> = {
  happy: {
    colors: ["#10b981", "#34d399"],
    face: "😊",
    scale: 1,
    rotation: "0deg",
  },
  neutral: {
    colors: ["#3b82f6", "#60a5fa"],
    face: "😐",
    scale: 1,
    rotation: "0deg",
  },
  nervous: {
    colors: ["#f59e0b", "#fbbf24"],
    face: "😰",
    scale: 0.95,
    rotation: "-3deg",
  },
  stressed: {
    colors: ["#ef4444", "#f87171"],
    face: "😫",
    scale: 0.9,
    rotation: "-5deg",
  },
  ruined: {
    colors: ["#7c3aed", "#a78bfa"],
    face: "💀",
    scale: 0.85,
    rotation: "-8deg",
  },
};

export default function Character({ spendingPercentage }: CharacterProps) {
  const state = getCharacterState(spendingPercentage);
  const config = characterConfigs[state];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.circle,
          {
            transform: [
              { scale: config.scale },
              { rotate: config.rotation },
            ],
          },
        ]}
      >
        <Text style={styles.face}>{config.face}</Text>
      </LinearGradient>
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
  circle: {
    width: 192,
    height: 192,
    borderRadius: 96,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 10,
  },
  face: {
    fontSize: 96,
  },
  microcopy: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});
