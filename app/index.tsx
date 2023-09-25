import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
  //Define variables
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  //Login function
  const login = async () => {
    //Get users from storage
    let users = await AsyncStorage.getItem('users');
    if (!users) {
      users = JSON.stringify([]);
    }

    //Parse users
    let parsedUsers = JSON.parse(users);

    //Check if user exists
    let match = false;
    for (let i = 0; i < parsedUsers.length; i++) {
      //Check if email and password match
      if (parsedUsers[i].email == email && parsedUsers[i].password == password) {
        //Set match to true and save user to storage
        match = true;
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(parsedUsers[i]));
        //Redirect to profile page
        router.replace("/profile");
        break;
      }
    }

    //If no match, show error
    if (!match) {
      Alert.alert("Invalid credentials!");
    }
  };

  return (
    <SafeAreaView className='m-4'>
      <Text className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account </Text>
      <Text className="mt-2 text-sm leading-6 text-gray-500">Not a member? <Link href="/register" className='font-semibold text-indigo-600 hover:text-indigo-500'>Click here to register</Link></Text>

      <Text className='mt-10 block text-sm font-medium text-xl leading-6 text-gray-900'>Email address</Text>
      <TextInput onChangeText={onChangeEmail} value={email} className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'></TextInput>

      <Text className='mt-10 block text-sm font-medium text-xl leading-6 text-gray-900'>Password</Text>
      <TextInput onChangeText={onChangePassword} value={password} secureTextEntry={true} className='border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none'></TextInput>

      <View className='mt-4 border-blue-500 w-full cursor-pointer rounded-md border bg-blue-500 text-base text-white transition hover:bg-opacity-90'>
        <Button title="Sign in" color="#fff" onPress={login}></Button>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});