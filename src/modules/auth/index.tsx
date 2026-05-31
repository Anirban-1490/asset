import type { SignUpSignalValue } from "@clerk/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { PropsWithChildren, ReactNode, useState } from "react";

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IAuthPageProps {
  fetchStatus: SignUpSignalValue["fetchStatus"];
  authHandler: () => Promise<void>;
  codeVerifyHandler: (code: string) => Promise<void>;
  resendVerificationCodeHandler: () => Promise<void>;
  title: string;
  subTitle: string;
  actionButtonContent: ReactNode;
  type: "sign-in" | "sign-up";
  showVerificationPage: boolean;
  codeErrorMessage?: string;
}

export function AuthPage({
  children,
  fetchStatus,
  authHandler,
  title,
  subTitle,
  actionButtonContent,
  type,
  showVerificationPage,
  codeVerifyHandler,
  resendVerificationCodeHandler,
  codeErrorMessage,
}: PropsWithChildren & IAuthPageProps) {
  const [code, setCode] = useState("");

  if (showVerificationPage) {
    return (
      <SafeAreaView>
        <View className="px-10 w-full h-full flex justify-center items-center gap-5">
          <Text id="logo" className=" text-5xl font-bold">
            AsseT
          </Text>
          <View className="mb-10">
            <Text className="text-center font-bold mb-2">
              Verify your account
            </Text>
            <Text className="text-center font-light opacity-40">
              Check your email address for verification code
            </Text>
          </View>
          <View className="w-full flex flex-col gap-6">
            <View>
              <TextInput
                placeholder="Enter code..."
                placeholderTextColor="#666666"
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                value={code}
                onChangeText={setCode}
                className="border border-primary/30 rounded-lg p-3 w-full"
              />
              {codeErrorMessage && (
                <Text className="text-red-500">{codeErrorMessage}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => codeVerifyHandler(code)}
              disabled={fetchStatus === "fetching"}
              className=" bg-primary px-7 rounded-xl mt-3 min-h-[4rem] flex items-center flex-row justify-center"
            >
              {fetchStatus == "fetching" ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text className="text-lg text-center text-white">
                  Verify Account
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resendVerificationCodeHandler}
              disabled={fetchStatus === "fetching"}
              className=" "
            >
              <Text className="text-lg text-center text-primary">
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <View className="px-10 w-full h-full flex justify-center items-center gap-5">
        <Text id="logo" className=" text-4xl font-bold">
          AsseT
        </Text>
        <View className="mb-10">
          <Text className="text-center font-semibold mb-1 text-2xl">
            {title}
          </Text>
          <Text className="text-center font-light opacity-40">{subTitle} </Text>
        </View>
        <View className="w-full flex flex-col gap-6">
          {children}
          <TouchableOpacity
            disabled={fetchStatus === "fetching"}
            onPress={authHandler}
            className=" bg-primary px-7 rounded-xl mt-3 min-h-[4rem] flex items-center flex-row justify-center"
          >
            {fetchStatus == "fetching" ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text className="text-lg text-center text-white">
                {actionButtonContent}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center gap-2">
          <Text>
            {type == "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>
          <Link href={type == "sign-up" ? "/sign-in" : "/sign-up"}>
            <Text className=" underline text-primary">
              {type == "sign-up" ? "Sign In" : "Sign Up"}
            </Text>
          </Link>
        </View>
        <TouchableOpacity
          // onPress={signUpHandler}
          className="flex flex-row items-center gap-4 bg-transparent border border-primary px-7 py-3 rounded-xl mt-8"
        >
          <Ionicons
            name="logo-google"
            size={20}
            className=" text-primary"
            color="#F5004F"
          />
          <Text className="text-lg  text-primary">Sign In With Google</Text>
        </TouchableOpacity>

        {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
        <View nativeID="clerk-captcha" />
      </View>
    </SafeAreaView>
  );
}
