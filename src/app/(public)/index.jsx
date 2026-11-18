import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import colors from "../../constants/colors";
import places from "../../constants/places";
import { useAuth } from "../../contexts/AuthContext";

export default function ExploreScreen() {
  const { user } = useAuth();

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>EXPLORE LOCAL</Text>
          <Text style={styles.title}>Find your next{`\n`}favorite place.</Text>
        </View>
        <View style={styles.logoMark}>
          <Text style={styles.logoText}>EL</Text>
        </View>
      </View>

      <Text style={styles.intro}>
        Discover welcoming places and things to do around Indiana.
      </Text>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Places to explore</Text>
        <Text style={styles.sectionNote}>A few local favorites</Text>
      </View>

      {places.map((place) => (
        <Link
          key={place.id}
          href={{
            pathname: "/place/[id]",
            params: { id: place.id },
          }}
          asChild
        >
          <Pressable style={styles.card}>
            <View style={[styles.placeIcon, { backgroundColor: place.color }]}>
              <Text style={styles.iconText}>{place.icon}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.category}>{place.category}</Text>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.location}>{place.location}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
      ))}

      <View style={styles.accountCard}>
        <Text style={styles.accountTitle}>
          {user ? "Your local list is waiting." : "Save places you love."}
        </Text>
        <Text style={styles.accountDescription}>
          Sign in to visit your favorites and profile.
        </Text>
        <AppButton
          title={user ? "My Favorites" : "Sign In"}
          onPress={() => router.push(user ? "/favorites" : "/sign-in")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  eyebrow: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  title: {
    marginTop: 8,
    color: colors.navy,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  logoMark: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: "900",
  },
  intro: {
    marginTop: 14,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  sectionHeading: {
    marginTop: 30,
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: "800",
  },
  sectionNote: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 13,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeIcon: {
    width: 56,
    height: 56,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 25,
  },
  cardText: {
    flex: 1,
    marginLeft: 13,
  },
  category: {
    color: colors.coral,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  placeName: {
    marginTop: 3,
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  location: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 13,
  },
  chevron: {
    color: colors.blue,
    fontSize: 30,
    paddingHorizontal: 5,
  },
  accountCard: {
    marginTop: 12,
    padding: 18,
    borderRadius: 18,
    backgroundColor: colors.lightBlue,
  },
  accountTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "800",
  },
  accountDescription: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 14,
  },
});
