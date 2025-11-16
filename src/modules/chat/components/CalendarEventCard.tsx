import { spacing } from "@/src/theme";
import { TestingProps } from "@/src/theme/types";
import Card from "@/src/ui/atoms/Card/Card";
import { Text } from "@/src/ui/atoms/Text/Text";
import { StyleSheet, View } from "react-native";

interface CalendarEventCardProps extends TestingProps {
  title: string;
  date: string;
  time: string;
  status: string;
  onPress?: () => void;
}

const CalendarEventCard: React.FC<CalendarEventCardProps> = ({
  title,
  date,
  time,
  status,
  testID,
  onPress,
}) => {
  return (
    <Card onPress={onPress} testID={testID}>
      <View style={styles.container}>
        <Text
          variant="titleMedium"
          colorToken="text"
          testID={`${testID}-title`}
        >
          {title}
        </Text>
        <Text variant="bodyMedium" colorToken="text" testID={`${testID}-date`}>
          {date}
        </Text>
        <Text variant="bodyMedium" colorToken="text" testID={`${testID}-time`}>
          {time}
        </Text>
        <Text
          variant="bodyMedium"
          colorToken="text"
          testID={`${testID}-status`}
        >
          {status}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});

export default CalendarEventCard;
