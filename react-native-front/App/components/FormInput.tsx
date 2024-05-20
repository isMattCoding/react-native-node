import { Text, TextInput, View } from "react-native";
import { ErrorType } from "./Alert";

type FormInputType = {
  placeholder: string;
  label: string;
  id: string;
  ariaLabel: string;
  ariaLabelInput: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  error?: ErrorType;
  secureTextEntry?: boolean;
}
export function FormInput({
  placeholder,
  label,
  id,
  ariaLabel,
  ariaLabelInput,
  value,
  setValue,
  error,
  secureTextEntry
}: FormInputType) {

  const {type, message} = error || {};

  return (
    <View>
      <Text
        aria-label={ariaLabel}
        id={id}
        className={`text-sm mb-2 block ${type && "text-red-600"}`}
      >
        {label}
      </Text>
      <TextInput
        className={`${type ? "bg-red-100 border-red-600" : "bg-white border-gray-300"} border w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
        autoCapitalize={"none"}
        aria-labelledby={id}
        aria-label={ariaLabelInput}
        secureTextEntry={secureTextEntry}
      />
      {message && <Text className="text-red-600 mt-2">{message}</Text>}
    </View>
  )
}
