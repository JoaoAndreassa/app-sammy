import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const photos = [
	{
		src: require("../../assets/images/photo1.jpg"),
		caption: "Nosso Primeiro Role, só por você fiz aquela loucura kkkkkkk",
	},
	{
		src: require("../../assets/images/photo2.jpg"),
		caption: "Nossa primeira foto com o Brownie",
	},
	{
		src: require("../../assets/images/photo3.jpg"),
		caption: "Nosso primeiro role no parque",
	},
	{
		src: require("../../assets/images/photo4.jpg"),
		caption: "Nosso primeiro treino juntos",
	},
	{
		src: require("../../assets/images/photo5.jpg"),
		caption: "Minha musa fitness",
	},
	{
		src: require("../../assets/images/photo6.jpeg"),
		caption: "Te amo mais que tudo, meu amor",
	},
];

function getTimeLeftUntilAnniversary(): string {
	const now = new Date();
	let nextAnniversary = new Date(now.getFullYear(), 5, 29); // Junho = mês 5

	if (now > nextAnniversary) {
		nextAnniversary.setFullYear(now.getFullYear() + 1);
	}

	const diff = nextAnniversary.getTime() - now.getTime();
	const totalSeconds = Math.floor(diff / 1000);

	const days = Math.floor(totalSeconds / (60 * 60 * 24));
	const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
	const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
	const seconds = totalSeconds % 60;

	return `Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos para nosso primeiro aniversário 💖`;
}

export default function PhotoGallery() {
	const [index, setIndex] = useState(0);
	const [countdown, setCountdown] = useState(getTimeLeftUntilAnniversary());

	const fadeAnim = useRef(new Animated.Value(1)).current;
	const slideAnim = useRef(new Animated.Value(0)).current;
	const beatAnim = useRef(new Animated.Value(1)).current;
	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(beatAnim, {
					toValue: 1.1,
					duration: 350,
					useNativeDriver: true,
				}),
				Animated.timing(beatAnim, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			])
		).start();
	}, []);

	const animateToNext = (direction: "next" | "prev") => {
		const directionFactor = direction === "next" ? 1 : -1;

		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: directionFactor * -50,
				duration: 150,
				useNativeDriver: true,
			}),
		]).start(() => {
			// troca a imagem após a animação de saída
			setIndex((prev) =>
				direction === "next"
					? (prev + 1) % photos.length
					: (prev - 1 + photos.length) % photos.length
			);

			// reseta valores e faz animação de entrada
			slideAnim.setValue(directionFactor * 50);
			fadeAnim.setValue(0);

			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 250,
					useNativeDriver: true,
				}),
				Animated.timing(slideAnim, {
					toValue: 0,
					duration: 250,
					useNativeDriver: true,
				}),
			]).start();
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(getTimeLeftUntilAnniversary());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const current = photos[index];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Nossas Memórias 📷</Text>

			<View style={styles.carouselContainer}>
				<TouchableOpacity
					onPress={() => animateToNext("prev")}
					style={styles.arrow}
				>
					<Ionicons name="chevron-back-circle" size={42} color="#E91E63" />
				</TouchableOpacity>

				<Animated.View
					style={[
						styles.photoWrapper,
						{
							opacity: fadeAnim,
							transform: [{ translateX: slideAnim }],
						},
					]}
				>
					<Image source={current.src} style={styles.photo} resizeMode="cover" />
				</Animated.View>

				<TouchableOpacity
					onPress={() => animateToNext("next")}
					style={styles.arrow}
				>
					<Ionicons name="chevron-forward-circle" size={42} color="#E91E63" />
				</TouchableOpacity>
			</View>

			<Text style={styles.caption}>{current.caption}</Text>

			<View style={styles.countdownBox}>
				<Text style={styles.countdownLabel}>
					⏳ Contador para nosso aniversário:
				</Text>
				<Text style={styles.countdown}>{countdown}</Text>
			</View>
			<Animated.Text
				style={[styles.loveMessage, { transform: [{ scale: beatAnim }] }]}
			>
				“Você é o meu lugar favorito no mundo inteiro.”
			</Animated.Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: 30,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: "#F06292",
		marginBottom: 20,
	},
	carouselContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
	photoWrapper: {
		width: windowWidth - 160,
		height: 280,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "#E91E63",
		backgroundColor: "#000",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	photo: {
		width: "100%",
		height: "100%",
		borderRadius: 18,
	},
	caption: {
		marginTop: 16,
		fontSize: 16,
		color: "#f3e5f5",
		textAlign: "center",
		maxWidth: "90%",
	},
	countdownBox: {
		marginTop: 30,
		backgroundColor: "#FFE4EC",
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderWidth: 2,
		borderColor: "#E91E63",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 4,
	},
	countdownLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#AD1457",
		marginBottom: 6,
	},
	countdown: {
		fontSize: 16,
		fontWeight: "500",
		color: "#880E4F",
		textAlign: "center",
	},
	arrow: {
		paddingHorizontal: 5,
	},
	loveMessage: {
		marginTop: 30,
		fontSize: 18,
		fontStyle: "italic",
		color: "#BA2D65",
		textAlign: "center",
		paddingHorizontal: 30,
		lineHeight: 24,
	},
});
