import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CharacterType } from "../context/BudgetContext";

interface CharacterCarouselProps {
  onSelectCharacter: (character: CharacterType) => void;
  selectedCharacter: CharacterType;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_SPACING = 20;

const characters: Array<{ type: CharacterType; name: string; description: string }> = [
  {
    type: "bud",
    name: "Bud",
    description: "A sprout who dreams of blooming! 🌱",
  },
  {
    type: "ramen",
    name: "Ramen",
    description: "A steamy bowl full of energy! 🍜",
  },
];

export default function CharacterCarousel({
  onSelectCharacter,
  selectedCharacter,
}: CharacterCarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(
    characters.findIndex((c) => c.type === selectedCharacter)
  );

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));
    if (index !== activeIndex && index >= 0 && index < characters.length) {
      setActiveIndex(index);
      onSelectCharacter(characters[index].type);
    }
  };

  const scrollToCharacter = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_SPACING),
      animated: true,
    });
    setActiveIndex(index);
    onSelectCharacter(characters[index].type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Buddy! ✨</Text>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="center"
        contentContainerStyle={styles.scrollContent}
      >
        {characters.map((character, index) => (
          <TouchableOpacity
            key={character.type}
            activeOpacity={0.9}
            onPress={() => scrollToCharacter(index)}
            style={[
              styles.card,
              activeIndex === index && styles.cardActive,
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={
                  character.type === "bud"
                    ? require("../../assets/characters/bud/Stage_1.png")
                    : require("../../assets/characters/ramen/Stage_1.png")
                }
                style={styles.characterImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.characterName}>{character.name}</Text>
              <Text style={styles.characterDescription}>
                {character.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {characters.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToCharacter(index)}
            style={[
              styles.dot,
              activeIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
    paddingVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: CARD_SPACING / 2,
    padding: 20,
    borderWidth: 3,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardActive: {
    borderColor: "#14b8a6",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    transform: [{ scale: 1.02 }],
  },
  imageContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  characterImage: {
    width: 180,
    height: 180,
  },
  cardContent: {
    alignItems: "center",
  },
  characterName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  characterDescription: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
  },
  dotActive: {
    width: 24,
    height: 8,
    backgroundColor: "#14b8a6",
  },
});
