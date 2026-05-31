import { AuthPage } from "@/modules/auth";
import { useAuth, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, ToastAndroid, View } from "react-native";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (isSignedIn || signUp.status == "complete") {
    return null;
  }

  const sendEmailCode = async () => {
    await signUp.verifications.sendEmailCode();
  };
  const signUpHandler = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });

    if (error) {
      ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
    if (!error) {
      await sendEmailCode();
    }
  };

  const verifyHandler = async (code: string) => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status == "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      ToastAndroid.showWithGravity(
        "Signup not completed",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <AuthPage
      subTitle="Find your dream home today"
      title=" Create your account"
      authHandler={signUpHandler}
      fetchStatus={fetchStatus}
      actionButtonContent="Create Account"
      type="sign-up"
      showVerificationPage={
        signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        !signUp.missingFields.length
      }
      codeVerifyHandler={verifyHandler}
      resendVerificationCodeHandler={sendEmailCode}
      codeErrorMessage={errors.fields.code?.message}
    >
      <View>
        <TextInput
          placeholder="Enter email..."
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          className="border border-primary/30 rounded-lg p-3 w-full"
        />
        {errors.fields.emailAddress && (
          <Text className="text-red-500">
            {errors.fields.emailAddress.message}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Enter password..."
          placeholderTextColor="#666666"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          className="border border-primary/30 rounded-lg p-3 w-full"
        />
        {errors.fields.password && (
          <Text className="text-red-500">{errors.fields.password.message}</Text>
        )}
      </View>
    </AuthPage>
  );
}
