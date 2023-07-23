import React, { useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";

function App() {
	const [boardModalOpen, setBoardModalOpen] = useState(false);

	return (
		<div>
			{/*Header Section*/}
			<Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
			<br></br>

			{/*Cente Section
			<Center />*/}
		</div>
	);
}

export default App;
