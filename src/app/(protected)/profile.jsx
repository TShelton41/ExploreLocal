import { router } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Screen from "../../components/Screen";
import colors from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, logOut } = useAuth();

  async function handleLogOut() {
    try {
      await logOut();
      router.replace("/");
    } catch (error) {
      Alert.alert("Sign out failed", error.message);
    }
  }

  return (
    <Screen>
      <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>
        This is a protected screen. Only signed-in users can view it.
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.detail}>Firebase User ID: {user?.uid}</Text>
      </View>

      <AppButton
        title="My Favorites"
        variant="secondary"
        onPress={() => router.push("/favorites")}
      />
      <AppButton title="Sign Out" onPress={handleLogOut} />
      <AppButton
        title="Explore Public Places"
        variant="secondary"
        onPress={() => router.replace("/")}
      />
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
  profileCard: {
    alignItems: "center",
    marginTop: 26,
    padding: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  avatarText: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: "900",
  },
  email: {
    marginTop: 15,
    color: colors.navy,
    fontSize: 17,
    fontWeight: "800",
  },
  detail: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
  },
});
