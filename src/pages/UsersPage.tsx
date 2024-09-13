/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { UserCard } from "../components/UserCard";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const fetchUsers = async () => {
	const response = await axios.get("https://reqres.in/api/users");
	return response.data.data.map((user: any) => ({
		id: uuidv4(),
		first_name: user.first_name,
		last_name: user.last_name,
		avatar: user.avatar,
		liked: false,
		content: faker.lorem.sentences(faker.number.int({ min: 2, max: 4 })), // Генерация контента
	}));
};

export const UsersPage = () => {
	const { users, addUser, filter, setFilter } = useUserStore();
	const [currentPage, setCurrentPage] = useState(1); // Текущее состояние страницы
	const itemsPerPage = 2; // Количество карточек на одной странице
	const totalPages = Math.ceil(users.length / itemsPerPage);
	const paginatedUsers = users.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};
	const navigate = useNavigate();
	useEffect(() => {
		const loadUsers = async () => {
			const fetchedUsers = await fetchUsers();
			fetchedUsers.forEach((user: any) => addUser(user));
		};
		users.length === 0 ? loadUsers() : "";
	}, []);

	const filteredUsers =
		filter === "liked" ? users.filter((user) => user.liked) : users;

	return (
		<div className="page-container">
			<div className="filter-buttons">
				<button onClick={() => setFilter("all")}>Все</button>
				<button onClick={() => setFilter("liked")}>Избранные</button>
				<button onClick={() => navigate("/create-user")}>
					Добавить карточку
				</button>
			</div>

			<div className="cards-container">
				{filter === "all"
					? paginatedUsers.map((user) => (
							<UserCard key={uuidv4()} user={user} />
					  ))
					: filteredUsers.map((user) => (
							<UserCard key={uuidv4()} user={user} />
					  ))}
			</div>
			{filter === "all" && (
				<div className="pagination">
					<button onClick={handlePrevPage} disabled={currentPage === 1}>
						Previous
					</button>
					<span>{` Page ${currentPage} of ${totalPages} `}</span>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};
