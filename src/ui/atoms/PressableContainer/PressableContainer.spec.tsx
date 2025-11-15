import { render, userEvent } from "@testing-library/react-native";
import { PressableContainer } from "./PressableContainer";
import { triggerImpactLight } from "@/src/services/haptics";

jest.mock("@/src/services/haptics", () => ({
  triggerImpactLight: jest.fn().mockResolvedValue(undefined),
}));

const user = userEvent.setup();

describe("<PressableContainer />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with children", () => {
    const tree = render(
      <PressableContainer testID="pressable-basic">Press me</PressableContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly when disabled", () => {
    const tree = render(
      <PressableContainer disabled testID="pressable-disabled">
        Disabled
      </PressableContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly with custom style", () => {
    const tree = render(
      <PressableContainer
        style={{ padding: 16, backgroundColor: "#FFE016" }}
        testID="pressable-styled"
      >
        Styled
      </PressableContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correctly with enableScale disabled", () => {
    const tree = render(
      <PressableContainer enableScale={false} testID="pressable-no-scale">
        No Scale
      </PressableContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("calls onPress when pressed", async () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <PressableContainer onPress={onPressMock} testID="pressable-onpress">
        Press me
      </PressableContainer>
    );

    const pressable = getByTestId("pressable-onpress");
    await user.press(pressable);

    // Wait for async operations to complete
    await Promise.resolve();

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("calls triggerImpactLight when pressed with haptics enabled", async () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <PressableContainer
        onPress={onPressMock}
        enableHaptics={true}
        testID="pressable-haptics"
      >
        Press me
      </PressableContainer>
    );

    const pressable = getByTestId("pressable-haptics");
    await user.press(pressable);

    // Wait for async operations to complete
    await Promise.resolve();

    expect(triggerImpactLight).toHaveBeenCalledTimes(1);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("does not call triggerImpactLight when haptics disabled", async () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <PressableContainer
        onPress={onPressMock}
        enableHaptics={false}
        testID="pressable-no-haptics"
      >
        Press me
      </PressableContainer>
    );

    const pressable = getByTestId("pressable-no-haptics");
    await user.press(pressable);

    expect(triggerImpactLight).not.toHaveBeenCalled();
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test("does not call onPress when disabled", async () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <PressableContainer
        onPress={onPressMock}
        disabled
        testID="pressable-disabled-press"
      >
        Disabled
      </PressableContainer>
    );

    const pressable = getByTestId("pressable-disabled-press");
    await user.press(pressable);

    expect(onPressMock).not.toHaveBeenCalled();
    expect(triggerImpactLight).not.toHaveBeenCalled();
  });

  test("calls onPressIn handler when provided", async () => {
    const onPressInMock = jest.fn();
    const { getByTestId } = render(
      <PressableContainer onPressIn={onPressInMock} testID="pressable-pressin">
        Press me
      </PressableContainer>
    );
    // Per docs: https://callstack.github.io/react-native-testing-library/docs/api/events/user-event#press
    // "press" will trigger a press in event.
    const pressable = getByTestId("pressable-pressin");
    await user.press(pressable);

    expect(onPressInMock).toHaveBeenCalledTimes(1);
  });

  test("calls onPressOut handler when provided", async () => {
    const onPressOutMock = jest.fn();
    const { getByTestId } = render(
      <PressableContainer
        onPressOut={onPressOutMock}
        testID="pressable-pressout"
      >
        Press me
      </PressableContainer>
    );

    const pressable = getByTestId("pressable-pressout");
    // Per docs: https://callstack.github.io/react-native-testing-library/docs/api/events/user-event#press
    // "press" will trigger a press out event.
    await user.press(pressable);

    expect(onPressOutMock).toHaveBeenCalledTimes(1);
  });

  test("has correct accessibility props", () => {
    const { getByRole } = render(
      <PressableContainer
        accessibilityRole="button"
        accessibilityLabel="Test button"
        testID="pressable-accessibility"
      >
        Press me
      </PressableContainer>
    );

    const pressable = getByRole("button");
    expect(pressable).toBeDefined();
  });

  test("has disabled accessibility state when disabled", async () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <PressableContainer
        onPress={onPressMock}
        disabled
        testID="pressable-accessibility-disabled"
      >
        Disabled
      </PressableContainer>
    );

    const pressable = getByRole("button");
    expect(pressable).toBeDisabled();
    await user.press(pressable);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  test("renders correctly with all props combined", () => {
    const onPressMock = jest.fn();
    const tree = render(
      <PressableContainer
        onPress={onPressMock}
        enableHaptics={true}
        enableScale={true}
        style={{ padding: 10 }}
        accessibilityLabel="Combined props"
        testID="pressable-combined"
      >
        Combined
      </PressableContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
