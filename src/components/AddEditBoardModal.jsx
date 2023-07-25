import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

function AddEditBoardModal({ setBoardModalOpen, type }) {
	const [name, setName] = useState("");

	const [newColumn, setNewColumn] = useState([
		{ name: "Todo", task: [], id: uuid() },
		{ name: "Doing", task: [], id: uuid() },
		{ name: "Done", task: [], id: uuid() },
	]);

	const [isValid, setIsValid] = useState(true);

	const dispatch = useDispatch();

	const onChange = (id, newValue) => {
		setNewColumn((prevState) => {
			const newState = [...prevState];
			const column = newState.find((col) => col.id === id);
			column.name = newValue;
			return newState;
		});
	};

	const onDelete = (id) => {
		setNewColumn((prevState) => prevState.filter((el) => el.id !== id));
	};

	const validate = () => {
		setIsValid(false);
		if (!name.trim()) {
			return false;
		}

		for (let i = 0; i < newColumn.length; i++) {
			if (!newColumn[i].name.trim()) {
				return false;
			}
		}

		setIsValid(true);
		return true;
	};

	const onSubmit = (type) => {
		setBoardModalOpen(false);
		if (type === "add") {
			dispatch(boardsSlice.actions.addBoard({ name, newColumn }));
		} else {
			dispatch(boardsSlice.actions.editBoard({ name, newColumn }));
		}
	};

	return (
		<div
			onClick={(e) => {
				if (e.target !== e.currentTarget) {
					return;
				}
				setBoardModalOpen(false);
			}}
			className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]"
		>
			<div
				className="scrollbar-hide overflow-y-scroll max-h-[95vh]
             bg-white dark:bg-[#2b2c37] text-black dark:text-white
             font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
			>
				<h3 className="text-lg">{type === "edit" ? "Edit" : "Add new"} Board</h3>
				<div className="mt-8 flex flex-col space-y-3">
					<label className="text-sm dark:text-white text-gray-500">Board name</label>
					<input
						className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline focus:outline-[#635fc7] outline-1 ring-0"
						placeholder="e.g column name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						id="board-name-input"
					/>
				</div>

				<div className="mt-8 flex flex-col space-y-3">
					<label className="text-sm dark:text-white text-gray-500">Board columns</label>
					{newColumn.map((column, index) => (
						<div key={index} className="flex items-center w-full">
							<input
								className="bg-transparent flex-grow px-4 py-2 rounded-md 
                                text-sm border border-gray-600 outline focus:outline-[#635fc7] outline-1 ring-0"
								onChange={(e) => {
									onChange(column.id, e.target.value);
								}}
								value={column.name}
								type="text"
							/>
							<img
								src={crossIcon}
								className="cursor-pointer m-4"
								onClick={() => {
									onDelete(column.id);
								}}
							/>
						</div>
					))}
				</div>

				<div>
					<button
						className="w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] mt-8 py-2 rounded-full"
						onClick={() => {
							setNewColumn((state) => [...state, { name: "", task: [], id: uuid() }]);
						}}
					>
						+ Add New Column
					</button>

					<button
						className="w-full items-center hover:opacity-75 dark:text-white mt-2 relative text-white bg-[#635fc7] py-2 rounded-full"
						onClick={() => {
							const isValid = validate();
							if (isValid) {
								onSubmit(type);
							}
						}}
					>
						{type === "add" ? "Create New Board" : "Save Changes"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddEditBoardModal;
