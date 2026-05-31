import { AuthPage } from "@/modules/auth";
import { useSignIn } from "@clerk/expo";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, ToastAndroid, View } from "react-native";

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const sendEmailCode = async () => {
    await signIn.mfa.sendEmailCode();
  };
  const signInHandler = async () => {
    const { error } = await signIn.password({
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
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");

          router.push(url as Href);
        },
      });
    } else if (signIn.status == "needs_client_trust") {
      const emailCodeFactor = signIn.supportedFirstFactors.find((fact) => {
        fact.strategy == "email_code";
      });

      if (emailCodeFactor) {
        await sendEmailCode();
      }
    } else {
      ToastAndroid.showWithGravity(
        "Sign in not completed",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const verifyHandler = async (code: string) => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status == "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");

          router.push(url as Href);
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
      subTitle="Sign in to your account"
      title="Welcome Back"
      authHandler={signInHandler}
      fetchStatus={fetchStatus}
      actionButtonContent="Sign In"
      type="sign-in"
      showVerificationPage={signIn.status == "needs_client_trust"}
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
        {errors.fields.identifier && (
          <Text className="text-red-500">
            {errors.fields.identifier.message}
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
