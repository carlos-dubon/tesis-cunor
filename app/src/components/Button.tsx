import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderRadius: 4,
        padding: 12,
        backgroundColor: props.disabled ? "#99A1AF" : "#2B7FFF",
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
        width: "100%",
      }}
      disabled={props.disabled || props.isLoading}
    >
      {props.isLoading ? (
        <ActivityIndicator size={24} color="white" />
      ) : (
        <Text
          style={{
            color: "white",
          }}
        >
          {props.children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
