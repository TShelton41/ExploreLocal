import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";

function RootNavigator() {
  // const { user, loading } = useAuth();
  const user = null;
  const loading = false;

  if (loading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" />

      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={Boolean(user)}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
