import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Welcome Back</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>
          Don’t have an account? <Text style={styles.linkHighlight}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#333",
  },
  linkHighlight: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
