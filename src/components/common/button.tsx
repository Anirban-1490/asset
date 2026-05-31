import { ReactNode } from "react";
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface IButtonProps {
  text?: string;
  textProps?: TextProps;
  buttonProps?: TouchableOpacityProps;
  children?: ReactNode;
}

export function Button({
  textProps,
  text,
  buttonProps,
  children,
}: IButtonProps) {
  return (
    <TouchableOpacity
      {...buttonProps}
      className={`bg-primary px-7 rounded-xl mt-3 min-h-[4rem] flex items-center flex-row justify-center ${buttonProps?.className}`}
    >
      {children ? (
        children
      ) : (
        <Text
          {...textProps}
          className={`text-lg text-center text-white ${textProps?.className}`}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
