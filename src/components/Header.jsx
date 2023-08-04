import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import ElipsisMenu from "./ElipsisMenu";
import { useDispatch, useSelector } from "react-redux";
import AddEditBoardModal from "./AddEditBoardModal";
import AddEditTasksModal from "./AddEditTasksModal";
import DeleteModal from "./DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Header({ boardModalOpen, setBoardModalOpen }) {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [boardType, setBoardType] = useState("add");
	const [openAddEditTask, setOpenAddEditTask] = useState(false);

	const dispatch = useDispatch();

	const boards = useSelector((state) => state.boards);
	const board = boards.find((board) => board.isActive);

	const [isElipsisOpen, setIsElipsisOpen] = useState(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const setOpenEditModal = () => {
		setBoardModalOpen(true);
		setIsElipsisOpen(false);
	};

	const setOpenDeleteModal = () => {
		setIsDeleteModalOpen(true);
		setIsElipsisOpen(false);
	};

	const onDeleteBtnClick = () => {
		dispatch(boardsSlice.actions.deleteBoard());
		dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
		setIsDeleteModalOpen(false);
	};

	const onDropDownClick = () => {
		setOpenDropdown((state) => !state);
		setIsElipsisOpen(false);
		setBoardType("add");
	};

	return (
		<div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
			<header className="flex justify-between dark:text-white items-center">
				{/* Left Side */}
				<div className="flex items-center space-x-2 md:space-x-4">
					<img src={logo} alt="logo" className="h-6 w-6" />
					<h3 className="md:text-4xl  hidden md:inline-block font-bold  font-sans">
						Kanban
					</h3>
					<div className="flex items-center">
						<h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
							{board.name}
						</h3>
						<img
							src={openDropdown ? iconDown : iconUp}
							alt="dropdown icon"
							className="w-3 ml-2 md:hidden"
							onClick={onDropDownClick}
						/>
					</div>
				</div>
				{/* Right Side */}
				<div className="flex space-x-4 items-center md:space-x-6">
					<button
						className="hidden button md:block"
						onClick={() => {
							setOpenAddEditTask((state) => !state);
						}}
					>
						+ Add New Tasks
					</button>

					<button
						className="button py-1 px-3 md:hidden"
						onClick={() => {
							setOpenAddEditTask((state) => !state);
						}}
					>
						+
					</button>

					<img
						src={ellipsis}
						alt="ellipsis"
						className="cursor-pointer h-6"
						onClick={() => {
							setBoardType("edit");
							setOpenDropdown(false);
							setIsElipsisOpen((state) => !state);
						}}
					/>

					{isElipsisOpen && (
						<ElipsisMenu
							setOpenEditModal={setOpenEditModal}
							setOpenDeleteModal={setOpenDeleteModal}
							type="Boards"
						/>
					)}
				</div>
			</header>

			{openDropdown && (
				<HeaderDropdown
					setBoardModalOpen={setBoardModalOpen}
					setOpenDropdown={setOpenDropdown}
				/>
			)}

			{boardModalOpen && (
				<AddEditBoardModal setBoardModalOpen={setBoardModalOpen} type={boardType} />
			)}

			{openAddEditTask && (
				<AddEditTasksModal
					setOpenAddEditTask={setOpenAddEditTask}
					device="mobile"
					type="add"
				/>
			)}

			{isDeleteModalOpen && (
				<DeleteModal
					type="board"
					title={board.name}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					onDeleteBtnClick={onDeleteBtnClick}
				/>
			)}
		</div>
	);
}

export default Header;
