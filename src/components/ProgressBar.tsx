import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  percentage: number;
}

function getProgressColor(percentage: number): string {
  if (percentage < 30) return "#10b981"; // green
  if (percentage < 60) return "#3b82f6"; // blue
  if (percentage < 85) return "#f59e0b"; // yellow
  if (percentage < 100) return "#ef4444"; // red
  return "#7c3aed"; // purple
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
