import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

export default function App() {
	const [working, setWorking] = useState(true);
	const [toDos, setToDos] = useState([]);
	const [text, setText] = useState("");
	const work = () => setWorking(true);
	const travel = () => setWorking(false);

	const onChangeText = (payload) => {
		setText(payload);
	};

	const saveToDos = async (newToDos) => {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
	};

	const addToDo = async () => {
		if (text === "") return;
		const newToDos = { ...toDos, [Date.now()]: { todo: text, type: working } };
		setToDos(newToDos);
		await saveToDos(newToDos);
		setText("");
	};

	const loadToDos = async () => {
		const value = await AsyncStorage.getItem(STORAGE_KEY);
		setToDos(JSON.parse(value));
	};

	const deleteToDo = (key) => {
		Alert.alert("Delete To Do", "Are you sure?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "I'm sure",
				onPress: async () => {
					const newToDos = { ...toDos };
					delete newToDos[key];
					setToDos(newToDos);
					saveToDos(newToDos);
				},
				style: "destructive",
			},
		]);
	};

	useEffect(() => {
		loadToDos();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.header}>
				<TouchableOpacity onPress={work}>
					<Text style={{ ...styles.tab, color: working ? "white" : "#A2B5BB" }}>
						work
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={travel}>
					<Text
						style={{ ...styles.tab, color: !working ? "white" : "#A2B5BB" }}
					>
						Travel
					</Text>
				</TouchableOpacity>
			</View>
			<TextInput
				returnKeyType="done"
				onChangeText={onChangeText}
				onSubmitEditing={addToDo}
				value={text}
				style={styles.input}
				placeholder={working ? "Add a To Do" : "Where do you want to go?"}
			/>
			<ScrollView>
				{Object.keys(toDos).map((key) =>
					toDos[key].type === working ? (
						<View key={key} style={styles.todo}>
							<Text style={styles.todoText}>{toDos[key].todo}</Text>
							<TouchableOpacity onPress={() => deleteToDo(key)}>
								<Fontisto name="trash" size={24} color="#D0C9C0" />
							</TouchableOpacity>
						</View>
					) : null
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
		paddingHorizontal: 20,
	},
	header: {
		paddingTop: 100,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	tab: {
		fontWeight: "700",
		fontSize: 30,
		color: "white",
	},
	input: {
		backgroundColor: "white",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 30,
		marginVertical: 20,
		fontSize: 18,
	},
	todo: {
		backgroundColor: "grey",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		borderRadius: 12,
		marginBottom: 8,
	},
	todoText: {
		color: "white",
		fontSize: 16,
	},
});
