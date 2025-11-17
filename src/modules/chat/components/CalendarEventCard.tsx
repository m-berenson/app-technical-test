import { spacing, colors, badgeVariants } from "@/src/theme";
import { BadgeVariant, TestingProps } from "@/src/theme/types";
import Card from "@/src/ui/atoms/Card/Card";
import { Text } from "@/src/ui/atoms/Text/Text";
import { Badge } from "@/src/ui/molecules/Badge/Badge";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";

interface CalendarEventCardProps extends TestingProps {
  title: string;
  date: string;
  time: string;
  status: string;
  onPress?: () => void;
}

const STATUS_VARIANT_MAP: Record<string, BadgeVariant> = {
  confirmed: badgeVariants.positive,
  proposed: badgeVariants.informative,
  cancelled: badgeVariants.negative,
};

const CalendarEventCard: React.FC<CalendarEventCardProps> = ({
  title,
  date,
  time,
  status,
  testID,
  onPress,
}) => {
  const normalizedStatus = status?.toLowerCase();
  const statusLabel = status?.toUpperCase();
  const statusVariant = normalizedStatus
    ? STATUS_VARIANT_MAP[normalizedStatus] ?? badgeVariants.subtle
    : badgeVariants.subtle;

  const detailFields = useMemo(
    () =>
      [
        { key: "date", label: "Date", value: date, testSuffix: "date" },
        { key: "time", label: "Time", value: time, testSuffix: "time" },
      ].filter((field) => Boolean(field.value)),
    [date, time]
  );

  return (
    <Card onPress={onPress} testID={testID}>
      <Animated.View style={styles.container} layout={LinearTransition}>
        <View style={styles.header}>
          {!!title && (
            <Animated.View entering={FadeInRight} style={styles.headerText}>
              <Text
                variant="titleLarge"
                colorToken="text"
                testID={`${testID}-title`}
              >
                {title}
              </Text>
            </Animated.View>
          )}
          {!!status && (
            <Animated.View entering={FadeInRight}>
              <Badge
                label={statusLabel}
                variant={statusVariant}
                testID={`${testID}-status-badge`}
              />
            </Animated.View>
          )}
        </View>

        {detailFields.length > 0 && <View style={styles.divider} />}

        <View style={styles.detailsContainer}>
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
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    gap: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailRow: {
    gap: spacing.xs,
  },
});

export default CalendarEventCard;
