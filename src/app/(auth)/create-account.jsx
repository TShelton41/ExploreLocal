import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import Screen from "../../components/Screen";
import colors from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";

export default function CreateAccountScreen() {
  const { createAccount } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount() {
    if (!email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing information", "Complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Enter the same password twice.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password is too short", "Use at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await createAccount(email, password);
      router.replace("/favorites");
    } catch (error) {
      Alert.alert("Account creation failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.eyebrow}>JOIN EXPLORE LOCAL</Text>
      <Text style={styles.title}>Make it{`\n`}personal.</Text>
      <Text style={styles.subtitle}>
        Create an account to start saving places you want to visit.
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
        placeholder="At least 6 characters"
        secureTextEntry
      />
      <AppInput
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Enter your password again"
        secureTextEntry
      />

      <AppButton
        title="Create Account"
        onPress={handleCreateAccount}
        loading={loading}
      />

      <View style={styles.linkRow}>
        <Text style={styles.linkPrompt}>Already have an account? </Text>
        <Link href="/sign-in" style={styles.link}>
          Sign in
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginTop: 12,
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
    marginBottom: 12,
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
});
