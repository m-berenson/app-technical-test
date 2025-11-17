import { TestingProps } from "@/src/theme/types";
import { PressableContainer } from "../PressableContainer/PressableContainer";
import { colors, layout, spacing } from "@/src/theme";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

interface CardProps extends TestingProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  onPress,
  disabled,
  style,
  testID,
}) => {
  return (
    <PressableContainer
      style={StyleSheet.flatten([styles.container, style])}
      onPress={onPress}
      disabled={disabled}
      testID={`${testID}-card-pressable`}
    >
      {children}
    </PressableContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiaryDark,
    borderRadius: layout.radius.lg,
    padding: spacing.md,
  },
});

export default Card;
