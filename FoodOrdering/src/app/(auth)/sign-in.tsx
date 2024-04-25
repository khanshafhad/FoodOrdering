import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { DefaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const SignIn = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
 
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  
  
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: 'Sing in' }}
      />
     
      <Text style={styles.label}>Email</Text>

      <TextInput
        placeholder="example@gmail.com"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button onPress={signInWithEmail} disabled={loading}text={loading?'Signing in...':"Sing in"} />
    
        {/* <Text onPress={confirmDelete} style={styles.textButton}>
          Create an account
        </Text> */}
        <Link href={'/(auth)/sign-up'} style={styles.textButton} > Create an account</Link>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "grey",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
export default SignIn;
