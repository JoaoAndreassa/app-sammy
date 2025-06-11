import { Link } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
	return (
		<ImageBackground
			source={require("../assets/images/bg.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<View style={styles.overlay}>
				<Text style={styles.title}>Olá, baby 💖</Text>

				<Link href="/gallery" asChild>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Clique aqui!</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});