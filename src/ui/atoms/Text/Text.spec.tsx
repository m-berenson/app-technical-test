import { render } from "@testing-library/react-native";
import { Text } from "@/src/ui/atoms/Text/Text";

describe("<Text />", () => {
  test("renders correctly with basic variant", () => {
    const tree = render(
      <Text variant="bodyMedium" testID="text-basic">
        Hello World
      </Text>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly with displayLarge variant", () => {
    const tree = render(
      <Text variant="displayLarge" testID="text-display">
        Display Text
      </Text>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly with colorToken", () => {
    const tree = render(
      <Text variant="bodyMedium" colorToken="primary" testID="text-colored">
        Colored Text
      </Text>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly with custom style", () => {
    const tree = render(
      <Text
        variant="headingLarge"
        style={{ textAlign: "center" }}
        testID="text-styled"
      >
        Styled Text
      </Text>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly with variant and colorToken combined", () => {
    const tree = render(
      <Text variant="titleLarge" colorToken="error" testID="text-combined">
        Combined Styles
      </Text>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
