import { A } from '@expo/html-elements';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';

export default function Page() {
  //Define variables
  const [user, onChangeUser] = React.useState<any>({});
  
  //Load user if already logged in
  const fetchLoggedInUser = async () => {
    let loggedInUser = await AsyncStorage.getItem('loggedInUser');
    //If not logged in, redirect to login page
    if (!loggedInUser) {
      router.replace("/");
      Alert.alert("You are not logged in!");
    } else {
      onChangeUser(JSON.parse(loggedInUser));
    }
  }

  useEffect(() => {
    fetchLoggedInUser();
  })

  return (
    <SafeAreaView className='ml-4'>
      <Text className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile</Text>
      <Text className="mt-2 text-sm leading-6 text-gray-500">Want to sign out? <Link href="/" className='font-semibold text-indigo-600 hover:text-indigo-500'>Click here</Link></Text>
      
      <Text className="mt-10 text-xl leading-6 text-gray-500">Hello {user.fullName}</Text>
      <Text className="mt-10 text-xl leading-6 text-gray-500">Your name is: {user.fullName}</Text>
      <Text className="mt-10 text-xl leading-6 text-gray-500">Your email is: {user.email}</Text>
      <Text className="mt-10 text-xl leading-6 text-gray-500">Your password is: {user.password}</Text>
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
