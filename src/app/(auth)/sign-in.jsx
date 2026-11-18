import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import Screen from "../../components/Screen";
import colors from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email.trim() || !password) {
      Alert.alert("Missing information", "Enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace("/favorites");
    } catch (error) {
      Alert.alert("Sign in failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.eyebrow}>EXPLORE LOCAL</Text>
      <Text style={styles.title}>Welcome{`\n`}back.</Text>
      <Text style={styles.subtitle}>
        Sign in to see your saved local favorites.
      </Text>

      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
      />
      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <AppButton title="Sign In" onPress={handleSignIn} loading={loading} />

      <View style={styles.linkRow}>
        <Text style={styles.linkPrompt}>New to ExploreLocal? </Text>
        <Link href="/create-account" style={styles.link}>
          Create an account
        </Link>
      </View>

      <Link href="/" style={styles.backLink}>
        Continue exploring
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginTop: 20,
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  title: {
    marginTop: 12,
    color: colors.navy,
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 22,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  linkPrompt: {
    color: colors.muted,
    fontSize: 14,
  },
  link: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: "800",
  },
  backLink: {
    alignSelf: "center",
    marginTop: 24,
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
  },
});
