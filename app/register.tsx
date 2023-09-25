import { A } from '@expo/html-elements';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
  const [fullName, onChangeFullName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  // Register function
  const register = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Please fill out all fields!");
      return;
    }

    let user = {
      fullName: fullName,
      email: email,
      password: password
    }

    // Get users from storage
    let users = await AsyncStorage.getItem('users');
    if (!users) {
      users = JSON.stringify([]);
    }

    // Parse users
    let parsedUsers = JSON.parse(users);

    //Push new user to array
    parsedUsers.push(user);
    
    //Save users to storage
    await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));

    //Redirect to login page
    Alert.alert("You are now registered!");
    router.replace("/");
  }

  return (
    <SafeAreaView className='m-4'>
      <Text className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</Text>
      <Text className="mt-2 text-sm leading-6 text-gray-500">Already a member? <Link href="/" className='font-semibold text-indigo-600 hover:text-indigo-500'>Click here to login</Link></Text>

      <Text className='mt-10 block text-sm font-medium text-xl leading-6 text-gray-900'>Full name</Text>
      <TextInput onChangeText={onChangeFullName} value={fullName} inputMode='text' autoComplete='name' className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'></TextInput>

      <Text className='mt-10 block text-sm font-medium text-xl leading-6 text-gray-900'>Email address</Text>
      <TextInput onChangeText={onChangeEmail} value={email} inputMode='email' autoComplete='email' className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'></TextInput>

      <Text className='mt-10 block text-sm font-medium text-xl leading-6 text-gray-900'>Password</Text>
      <TextInput onChangeText={onChangePassword} value={password} secureTextEntry={true} autoComplete='off' className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'></TextInput>

      <View className='mt-4 border-blue-500 w-full cursor-pointer rounded-md border bg-blue-500 text-base text-white transition hover:bg-opacity-90'>
        <Button onPress={register} title="Register" color="#fff"></Button>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
