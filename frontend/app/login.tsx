import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../lib/supabase';
import GoogleIcon from '../components/google-icon';

WebBrowser.maybeCompleteAuthSession();

type AuthMethod = 'phone' | 'google' | 'email';
type PhoneStep = 'enter' | 'verify';

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');

    // Phone auth state
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneStep, setPhoneStep] = useState<PhoneStep>('enter');
    const [otpCode, setOtpCode] = useState('');

    // Email auth state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    // ============ PHONE AUTH LOGIC ============
    const onSendOTP = async () => {
        if (!phoneNumber.trim()) {
            Alert.alert('Error', 'Please enter your phone number');
            return;
        }
        let formattedPhone = phoneNumber.trim();
        if (!formattedPhone.startsWith('+')) {
            formattedPhone = '+1' + formattedPhone.replace(/\D/g, '');
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
            if (error) throw error;
            setPhoneStep('verify');
            Alert.alert('Code Sent', `Verification code sent to ${formattedPhone}`);
        } catch (err: any) {
            Alert.alert('Error', err.message);
        } finally {
            setLoading(false);
        }
    };

    const onVerifyOTP = async () => {
        if (!otpCode.trim() || otpCode.length !== 6) return;
        let formattedPhone = phoneNumber.trim();
        if (!formattedPhone.startsWith('+')) {
            formattedPhone = '+1' + formattedPhone.replace(/\D/g, '');
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.verifyOtp({
                phone: formattedPhone,
                token: otpCode,
                type: 'sms',
            });
            if (error) throw error;
        } catch (err: any) {
            Alert.alert('Error', err.message);
        } finally {
            setLoading(false);
        }
    };

    // ============ GOOGLE AUTH LOGIC ============
    const onGoogleLogin = async () => {
        setLoading(true);
        try {
            const redirectUrl = Linking.createURL('/google-auth/callback');
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUrl,
                    skipBrowserRedirect: true,
                },
            });
            if (error) throw error;
            if (data?.url) await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
        } catch (err: any) {
            Alert.alert('Error', err.message);
        } finally {
            setLoading(false);
        }
    };

    // ============ EMAIL AUTH LOGIC ============
    const onEmailAuth = async () => {
        if (!email.trim() || !password.trim()) return;
        setLoading(true);
        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email: email.trim(),
                    password: password,
                });
                if (error) throw error;
                Alert.alert('Check Email', 'Confirmation link sent.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password,
                });
                if (error) throw error;
            }
        } catch (err: any) {
            Alert.alert('Error', err.message);
        } finally {
            setLoading(false);
        }
    };

    // ============ RENDER HELPERS ============
    // We remove the complex View wrappers here to prevent NativeWind crashes
    const renderPhoneAuth = () => (
        <View className="w-full">
            {phoneStep === 'enter' ? (
                <>
                    <Text className="text-sm text-gray-600 mb-2">Phone Number</Text>
                    <TextInput
                        className="w-full border border-gray-300 rounded-xl px-4 py-4 text-lg mb-4 bg-white"
                        placeholder="+1 (555) 123-4567"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <Pressable onPress={onSendOTP} disabled={loading} className="bg-black rounded-xl py-4 items-center">
                        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Send Code</Text>}
                    </Pressable>
                </>
            ) : (
                <>
                    <Text className="text-sm text-gray-600 mb-2">Enter Code</Text>
                    <TextInput
                        className="w-full border border-gray-300 rounded-xl px-4 py-4 text-2xl text-center mb-4 bg-white"
                        placeholder="000000"
                        keyboardType="number-pad"
                        maxLength={6}
                        value={otpCode}
                        onChangeText={setOtpCode}
                    />
                    <Pressable onPress={onVerifyOTP} disabled={loading} className="bg-black rounded-xl py-4 items-center mb-3">
                        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Verify</Text>}
                    </Pressable>
                    <Pressable onPress={() => setPhoneStep('enter')}>
                        <Text className="text-gray-500 text-center">Change Number</Text>
                    </Pressable>
                </>
            )}
        </View>
    );

    const renderGoogleAuth = () => (
        <View className="w-full">
            <Pressable onPress={onGoogleLogin} disabled={loading} className="flex-row items-center justify-center bg-black rounded-xl py-4 px-6 w-full shadow-md">
                {loading ? <ActivityIndicator color="#fff" /> : (
                    <>
                        <GoogleIcon width={24} height={24} />
                        <Text className="text-white font-bold text-lg ml-3">Continue with Google</Text>
                    </>
                )}
            </Pressable>
        </View>
    );

    const renderEmailAuth = () => (
        <View className="w-full">
            <Text className="text-sm text-gray-600 mb-2">Email</Text>
            <TextInput
                className="w-full border border-gray-300 rounded-xl px-4 py-4 text-lg mb-3 bg-white"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <Text className="text-sm text-gray-600 mb-2">Password</Text>
            <TextInput
                className="w-full border border-gray-300 rounded-xl px-4 py-4 text-lg mb-4 bg-white"
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={onEmailAuth} disabled={loading} className="bg-black rounded-xl py-4 items-center mb-3">
                {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">{isSignUp ? 'Sign Up' : 'Sign In'}</Text>}
            </Pressable>
            <Pressable onPress={() => setIsSignUp(!isSignUp)}>
                <Text className="text-gray-500 text-center">{isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}</Text>
            </Pressable>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">

                <View className="mb-8 items-center">
                    <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome</Text>
                    <Text className="text-gray-500 text-center">Sign in to your AI Coach</Text>
                </View>

                {/* TABS - Stabilized structure */}
                <View className="flex-row mb-6 bg-gray-100 rounded-xl p-1 w-full">
                    {(['phone', 'google', 'email'] as AuthMethod[]).map((method) => (
                        <Pressable
                            key={method}
                            onPress={() => setAuthMethod(method)}
                            className={`flex-1 py-3 rounded-lg ${authMethod === method ? 'bg-white shadow-sm' : ''}`}
                        >
                            <Text className={`text-center font-semibold capitalize ${authMethod === method ? 'text-black' : 'text-gray-500'}`}>
                                {method}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* CONTENT */}
                {authMethod === 'phone' && renderPhoneAuth()}
                {authMethod === 'google' && renderGoogleAuth()}
                {authMethod === 'email' && renderEmailAuth()}

            </ScrollView>
        </View>
    );
}
