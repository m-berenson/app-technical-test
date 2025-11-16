import { TestingProps } from "@/src/theme/types";
import { PressableContainer } from "../PressableContainer/PressableContainer";
import { colors, layout, spacing } from "@/src/theme";
import { StyleSheet } from "react-native";

interface CardProps extends TestingProps {
  onPress?: () => void;
  disabled?: boolean;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  onPress,
  disabled,
  testID,
}) => {
  return (
    <PressableContainer
      style={styles.container}
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
