import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";

import boardsSlice from "../redux/boardsSlice";

function AddEditTasksModal({ type, device, setOpenAddEditTask, taskIndex, prevColIndex = 0 }) {
	const [title, setTitle] = useState("");

	const [description, setDescription] = useState("");

	const [subtasks, setSubtasks] = useState([
		{ title: "", isCompleted: false, id: uuid() },
		{ title: "", isCompleted: false, id: uuid() },
	]);

	const [isValid, setIsValid] = useState(true);

	const board = useSelector((state) => state.boards).find((board) => board.isActive);
	const columns = board.columns;
	const col = columns.find((col, index) => index === prevColIndex);
	const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
	const [newColIndex, setNewColIndex] = useState(prevColIndex);

	const [status, setStatus] = useState(columns[prevColIndex].name);

	const dispatch = useDispatch();

	const onDelete = (id) => {
		setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
	};

	const onChangeSubtasks = (id, newValue) => {
		setSubtasks((prevState) => {
			const newState = [...prevState];
			const subtask = newState.find((subtask) => subtask.id === id);
			subtask.title = newValue;
			return newState;
		});
	};

	const onChangeStatus = (e) => {
		setStatus(e.target.value);
		setNewColIndex(e.target.selectedIndex);
	};

	const onSubmit = (type) => {
		if (type === "add") {
			dispatch(
				boardsSlice.actions.addTask({
					title,
					description,
					subtasks,
					status,
					newColIndex,
				})
			);
		} else {
			dispatch(
				boardsSlice.actions.editTask({
					title,
					description,
					subtasks,
					status,
					taskIndex,
					prevColIndex,
					newColIndex,
				})
			);
		}
	};

	const validate = () => {
		setIsValid(false);
		if (!title.trim()) {
			return false;
		}

		for (let i = 0; i < subtasks.length; i++) {
			if (!subtasks[i].title.trim()) {
				return false;
			}
		}

		setIsValid(true);
		return true;
	};

	return (
		<div
			onClick={(e) => {
				if (e.target !== e.currentTarget) {
					return;
				}
				setOpenAddEditTask(false);
			}}
			className={
				device === "mobile"
					? "scrollbar-hide py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
					: "scrollbar-hide py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
			}
		>
			<div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
				<h3 className="text-lg">{type === "edit" ? "Edit" : "Add new"}</h3>

				{/* Task Name */}

				<div className="mt-8 flex flex-col space-y-1">
					<label className="text-sm dark:text-white text-gray-500">Task name:</label>
					<input
						value={title}
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-500 focus:outline-[#635fc7] ring-0"
						placeholder="e.g Task name"
					/>
				</div>

				{/* Description */}

				<div className="mt-8 flex flex-col space-y-1">
					<label className="text-sm dark:text-white text-gray-500">Description:</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="min-h-[150px] bg-transparent px-4 py-2 rounded-md text-sm border border-gray-400 focus:outline-[#635fc7] ring-0"
						placeholder="e.g Task description..."
					/>
				</div>

				{/* SubTasks */}

				<div className="mt-8 flex flex-col space-y-1">
					<label className="text-sm dark:text-white text-gray-500">Subtasks:</label>
					{subtasks.map((subtask, index) => (
						<div key={index} className="flex items-center w-full">
							<input
								className="bg-transparent px-4 py-2 rounded-md text-sm flex-grow border border-gray-400 focus:outline-[#635fc7]"
								placeholder={`e.g Subtask name ${index + 1}`}
								type="text"
								value={subtask.title}
								onChange={(e) => {
									onChangeSubtasks(subtask.id, e.target.value);
								}}
							/>
							<img
								src={crossIcon}
								className="m-3 cursor-pointer"
								onClick={() => {
									onDelete(subtask.id);
								}}
							/>
						</div>
					))}

					{/* Add more subtasks */}

					<button
						onClick={() => {
							setSubtasks((state) => [
								...state,
								{ title: "", isCompleted: false, id: uuid() },
							]);
						}}
						className="w-full items-center hover:opacity-75 dark:bg-white dark:text-[#635fc7] mt-3 relative text-white bg-[#635fc7] py-2 rounded-full"
					>
						+ Add new subtask
					</button>
				</div>

				{/* Current status */}

				<div className="mt-8 flex flex-col space-y-3">
					<label className="text-sm dark:text-white text-gray-600">Current status</label>
					<select
						className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent border border-gray-400 focus:outline-[#635fc7] outline-1"
						value={status}
						onChange={(e) => onChangeStatus(e)}
					>
						{columns.map((column, index) => (
							<option value={column.name} key={index}>
								{column.name}
							</option>
						))}
					</select>

					<button
						className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full hover:opacity-75"
						onClick={() => {
							const isValid = validate();
							if (isValid) {
								onSubmit(type);
							}
						}}
					>
						{type === "edit" ? "Save edit" : "Create task"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddEditTasksModal;
