import { View, Text, TextInput } from "react-native";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}

export const Input = (props: InputProps) => {
  return (
    <View
      style={{
        width: "100%",
        gap: 8,
      }}
    >
      <Text>{props.label}:</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={{
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "#E5E7EB",
          width: "100%",
          borderRadius: 4,
        }}
      />
    </View>
  );
};
