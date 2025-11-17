import { spacing, layout, colors, badgeVariants } from "@/src/theme";
import { TestingProps } from "@/src/theme/types";
import { Avatar } from "@/src/ui/atoms/Avatar/Avatar";
import Card from "@/src/ui/atoms/Card/Card";
import { Text } from "@/src/ui/atoms/Text/Text";
import { Badge } from "@/src/ui/molecules/Badge/Badge";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";

interface ContactCardProps extends TestingProps {
  name: string;
  email: string;
  company: string;
  profilePicture?: string;
  onPress?: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  name,
  email,
  company,
  profilePicture,
  onPress,
  testID,
}) => {
  const detailFields = useMemo(
    () =>
      [
        {
          key: "email",
          label: "Email",
          value: email,
          testSuffix: "email",
        },
      ].filter((field) => Boolean(field.value)),
    [email]
  );

  return (
    <Card onPress={onPress} testID={testID}>
      <Animated.View style={styles.container} layout={LinearTransition}>
        <View style={styles.header}>
          <Animated.View entering={FadeInRight} style={styles.avatarContainer}>
            {(!!profilePicture || !!name) && (
              <Avatar
                name={name}
                imageUri={profilePicture}
                size="lg"
                testID={`${testID}-avatar`}
              />
            )}
          </Animated.View>
          <View style={styles.identityContainer}>
            {!!name && (
              <Animated.View entering={FadeInLeft}>
                <Text
                  variant="titleLarge"
                  colorToken="text"
                  testID={`${testID}-name`}
                >
                  {name}
                </Text>
              </Animated.View>
            )}
            {!!company && (
              <Animated.View
                entering={FadeInUp}
                style={styles.companyBadgeWrapper}
              >
                <Badge
                  label={company}
                  variant={badgeVariants.subtle}
                  testID={`${testID}-company-badge`}
                />
              </Animated.View>
            )}
          </View>
        </View>

        {detailFields.length > 0 && <View style={styles.divider} />}

        <Animated.View style={styles.detailsContainer}>
          {detailFields.map((field) => (
            <Animated.View
              key={field.key}
              entering={FadeInUp}
              style={styles.detailRow}
            >
              <Text
                variant="overline"
                colorToken="textLight"
                testID={`${testID}-${field.key}-label`}
              >
                {field.label}
              </Text>
              <Text
                variant="bodyMedium"
                colorToken="text"
                testID={`${testID}-${field.testSuffix}`}
              >
                {field.value}
              </Text>
            </Animated.View>
          ))}
        </Animated.View>
      </Animated.View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  identityContainer: {
    gap: spacing.xs,
    flex: 1,
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    gap: spacing.sm,
  },
  detailRow: {
    gap: spacing.xs,
  },
  companyBadgeWrapper: {
    alignSelf: "flex-start",
  },
  avatarContainer: {
    minWidth: layout.avatar.lg,
    minHeight: layout.avatar.lg,
  },
});
