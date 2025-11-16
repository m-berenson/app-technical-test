import { render } from "@testing-library/react-native";
import { Button } from "@/src/ui/molecules/Button/Button";
import { buttonVariants } from "@/src/theme";
import { colors } from "@/src/theme/colors";

describe("<Button />", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders primary variant with correct styles and colors", () => {
    const { getByTestId } = render(
      <Button
        label="Primary Button"
        variant={buttonVariants.primary}
        onPress={mockOnPress}
        testID="button-primary"
      />
    );

    const button = getByTestId("button-primary-pressable");

    expect(button).toHaveStyle({ backgroundColor: colors.primary });
    expect(button).toHaveStyle({ borderRadius: 12 });
    expect(button).toHaveStyle({ paddingHorizontal: 24 });
    expect(button).toHaveStyle({ paddingVertical: 16 });
    expect(button).toHaveStyle({ minHeight: 44 });
  });

  test("renders secondary variant with correct styles and colors", () => {
    const { getByTestId } = render(
      <Button
        label="Secondary Button"
        variant={buttonVariants.secondary}
        onPress={mockOnPress}
        testID="button-secondary"
      />
    );

    const button = getByTestId("button-secondary-pressable");

    expect(button).toHaveStyle({ backgroundColor: colors.transparent });
    expect(button).toHaveStyle({ borderWidth: 1 });
    expect(button).toHaveStyle({ borderColor: colors.primary });
    expect(button).toHaveStyle({ borderRadius: 12 });
  });

  test("renders disabled primary variant with correct styles", () => {
    const { getByTestId } = render(
      <Button
        label="Disabled Primary"
        variant={buttonVariants.primary}
        onPress={mockOnPress}
        disabled
        testID="button-disabled-primary"
      />
    );

    const button = getByTestId("button-disabled-primary-pressable");

    expect(button).toHaveStyle({ backgroundColor: colors.secondary });
  });

  test("renders disabled secondary variant with correct border color", () => {
    const { getByTestId } = render(
      <Button
        label="Disabled Secondary"
        variant={buttonVariants.secondary}
        onPress={mockOnPress}
        disabled
        testID="button-disabled-secondary"
      />
    );

    const button = getByTestId("button-disabled-secondary-pressable");

    expect(button).toHaveStyle({ borderColor: colors.border });
  });

  test("renders correctly with default variant", () => {
    const tree = render(
      <Button
        label="Default Button"
        onPress={mockOnPress}
        testID="button-default"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
