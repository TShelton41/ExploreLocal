import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}) {
  const secondary = variant === "secondary";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        secondary ? styles.secondaryButton : styles.primaryButton,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? colors.blue : colors.surface} />
      ) : (
        <Text
          style={[
            styles.label,
            secondary ? styles.secondaryLabel : styles.primaryLabel,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: colors.blue,
  },
  secondaryButton: {
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
  primaryLabel: {
    color: colors.surface,
  },
  secondaryLabel: {
    color: colors.blue,
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.82,
  },
});
