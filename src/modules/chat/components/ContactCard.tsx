import { spacing } from "@/src/theme";
import { TestingProps } from "@/src/theme/types";
import { Avatar } from "@/src/ui/atoms/Avatar/Avatar";
import Card from "@/src/ui/atoms/Card/Card";
import { Text } from "@/src/ui/atoms/Text/Text";
import { StyleSheet, View } from "react-native";

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
  return (
    <Card onPress={onPress} testID={testID}>
      <View style={styles.container}>
        <Avatar
          name={name}
          imageUri={profilePicture}
          size="lg"
          testID={`${testID}-avatar`}
        />
        <View style={styles.infoContainer}>
          <Text
            variant="titleMedium"
            colorToken="text"
            testID={`${testID}-name`}
          >
            {name}
          </Text>
          <Text
            variant="bodyMedium"
            colorToken="text"
            style={{ fontStyle: "italic" }}
            testID={`${testID}-company`}
          >
            {company}
          </Text>
          <Text
            variant="bodyMedium"
            colorToken="text"
            testID={`${testID}-email`}
          >
            {email}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  infoContainer: {
    gap: spacing.xs,
  },
});
