import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import colors from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";

export default function FavoritesScreen() {
  const { user } = useAuth();

  return (
    <Screen>
      <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
      <Text style={styles.title}>My Favorites</Text>
      <Text style={styles.subtitle}>
        Your saved places will appear here in a later Firestore lesson.
      </Text>

      <View style={styles.emptyCard}>
        <Text style={styles.heart}>♡</Text>
        <Text style={styles.emptyTitle}>Your list starts here</Text>
        <Text style={styles.emptyText}>
          We’ve protected this screen behind Firebase Authentication. Next,
          we’ll store each user’s favorites in Firestore.
        </Text>
      </View>

      <View style={styles.userCard}>
        <Text style={styles.userLabel}>SIGNED IN AS</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <Link href="/profile" asChild>
        <AppButton
          title="View Profile"
          variant="secondary"
          onPress={() => {}}
        />
      </Link>
      <Link href="/" style={styles.exploreLink}>
        Browse places
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginTop: 12,
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
  },
  title: {
    marginTop: 8,
    color: colors.navy,
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  emptyCard: {
    alignItems: "center",
    marginTop: 28,
    padding: 24,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heart: {
    color: colors.coral,
    fontSize: 52,
  },
  emptyTitle: {
    marginTop: 10,
    color: colors.navy,
    fontSize: 20,
    fontWeight: "800",
  },
  emptyText: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  userCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 15,
    backgroundColor: colors.lightBlue,
  },
  userLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  userEmail: {
    marginTop: 5,
    color: colors.navy,
    fontSize: 15,
    fontWeight: "700",
  },
  exploreLink: {
    alignSelf: "center",
    marginTop: 22,
    color: colors.blue,
    fontSize: 14,
    fontWeight: "800",
  },
});
