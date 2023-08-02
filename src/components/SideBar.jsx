import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../Hooks/useDarkMode";
import boardsSlice from "../redux/boardsSlice";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";
import showSideBar from "../assets/icon-show-sidebar.svg";
import hideSideBar from "../assets/icon-hide-sidebar.svg";
import AddEditBoardModal from "./AddEditBoardModal";

function SideBar({ isSideBarOpen, setIsSideBarOpen }) {
	const dispatch = useDispatch();

	const [colorTheme, setTheme] = useDarkMode();
	const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);

	const [boardModalOpen, setBoardModalOpen] = useState(false);

	const toggleDarkMode = (checked) => {
		setTheme(colorTheme);
		setDarkSide(checked);
	};

	const boards = useSelector((state) => state.boards);

	return (
		<div>
			<div
				className={
					isSideBarOpen
						? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
						: ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
				}
			>
				<div>
					{isSideBarOpen && (
						<div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
							<h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
								All Boards ({boards?.length})
							</h3>

							<div className="flex flex-col h-[70vh] justify-start">
								{boards.map((board, index) => (
									<div
										onClick={() => {
											dispatch(boardsSlice.actions.setBoardActive({ index }));
										}}
										key={index}
										className={`flex items-baseline space-x-2 px-5 mr-8 mb-1 rounded-r-full duration-300 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${
											board.isActive &&
											"bg-[#635fc7] rounded-r-full text-white mr-8 "
										}`}
									>
										<img alt="icon-board" src={boardIcon} className="h-4" />
										<p className="text-lg font-bold">{board.name}</p>
									</div>
								))}

								<div
									onClick={() => {
										setBoardModalOpen(true);
									}}
									className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-300 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
								>
									<img alt="icon-board" src={boardIcon} className="h-4" />
									<p className="text-lg font-bold">Create new board</p>
								</div>
							</div>

							<div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
								<img src={lightIcon} alt="lightIcon" />

								<Switch
									checked={darkSide}
									onChange={toggleDarkMode}
									className={`${
										darkSide ? "bg-[#635fc7]" : "bg-gray-200 "
									} relative inline-flex h-6 w-11 items-center rounded-full`}
								>
									<span className="sr-only">Enable notifications</span>
									<span
										className={`${
											darkSide ? "translate-x-6" : "translate-x-1"
										} inline-block h-4 w-4 transform rounded-full bg-white transition`}
									></span>
								</Switch>

								<img src={darkIcon} alt="darkIcon" />
							</div>
						</div>
					)}

					{isSideBarOpen ? (
						<div
							onClick={() => {
								setIsSideBarOpen((state) => !state);
							}}
							className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635fc7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
						>
							<img className="min-w-[20px]" src={hideSideBar} />
							{isSideBarOpen && <p>Hide sidebar</p>}
						</div>
					) : (
						<div
							onClick={() => {
								setIsSideBarOpen((state) => !state);
							}}
							className="absolute p-5"
						>
							<img src={showSideBar} />
						</div>
					)}
				</div>
			</div>

			{boardModalOpen && (
				<AddEditBoardModal type="add" setBoardModalOpen={setBoardModalOpen} />
			)}
		</div>
	);
}

export default SideBar;
