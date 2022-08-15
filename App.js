import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";

export default function App() {
	const [working, setWorking] = useState(true);
	const [toDos, setToDos] = useState([]);
	const [text, setText] = useState("");
	const work = () => setWorking(true);
	const travel = () => setWorking(false);

	const onChangeText = (payload) => {
		setText(payload);
	};

	const addToDo = () => {
		if (text === "") return;
		const newToDo = { todo: text, type: working };
		setToDos((previousToDos) => [...previousToDos, newToDo]);
		setText("");
	};

	console.log(toDos);

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
				{toDos.map((toDo, index) =>
					toDo.type === working ? (
						<View key={index} style={styles.todo}>
							<Text style={styles.todoText}>{toDo.todo}</Text>
							<Text style={styles.todoText}>호</Text>
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
