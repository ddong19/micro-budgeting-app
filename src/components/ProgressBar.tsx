import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  percentage: number;
}

function getProgressColor(percentage: number): string {
  if (percentage < 25) return "#10b981";  // Thriving - bright green
  if (percentage < 50) return "#86efac";  // Happy - light green
  if (percentage < 65) return "#fde047";  // Nervous - yellow
  if (percentage < 80) return "#fb923c";  // Worried - orange
  if (percentage < 100) return "#f87171"; // Stressed - red
  return "#78716c";                       // Ruined - brown/grey
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const color = getProgressColor(clampedPercentage);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedPercentage}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 6,
  },
});
