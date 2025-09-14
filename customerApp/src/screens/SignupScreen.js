import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Create Account</Text>

      {/* Input Fields */}
      <TextInput placeholder="Full Name" style={styles.input} />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
      />

      {/* Signup Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Already have an account?{" "}
          <Text style={styles.linkHighlight}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

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
    backgroundColor: "#34C759",
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
    color: "#34C759",
    fontWeight: "bold",
  },
});
