import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../../../components/AppButton";
import Screen from "../../../components/Screen";
import colors from "../../../constants/colors";
import places from "../../../constants/places";
import { useAuth } from "../../../contexts/AuthContext";

export default function PlaceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const place = places.find((item) => item.id === id);

  if (!place) {
    return (
      <Screen>
        <Text style={styles.title}>Place not found</Text>
        <AppButton
          title="Back to Explore"
          onPress={() => router.replace("/")}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹ Back to Explore</Text>
      </Pressable>

      <View style={[styles.hero, { backgroundColor: place.color }]}>
        <Image
          source={place.image}
          style={styles.placeImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.category}>{place.category}</Text>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.location}>{place.location}</Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>About this place</Text>
      <Text style={styles.description}>{place.description}</Text>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Coming in our next data lesson</Text>
        <Text style={styles.noteText}>
          We’ll connect Favorites to Firestore later. For now, this screen
          demonstrates public navigation and route parameters.
        </Text>
      </View>

      <AppButton
        title={user ? "Go to My Favorites" : "Sign In to Save Places"}
        onPress={() => router.push(user ? "/favorites" : "/sign-in")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  backText: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: "700",
  },
  hero: {
    height: 190,
    borderRadius: 24,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  heroIcon: {
    fontSize: 72,
  },
  category: {
    marginTop: 22,
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 7,
    color: colors.navy,
    fontSize: 30,
    fontWeight: "800",
  },
  location: {
    marginTop: 7,
    color: colors.muted,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 19,
    fontWeight: "800",
  },
  description: {
    marginTop: 9,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  note: {
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.lightBlue,
  },
  noteTitle: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "800",
  },
  noteText: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  placeImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
