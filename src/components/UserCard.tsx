import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

interface UserCardProps {
	user: {
		id: string;
		first_name: string;
		last_name: string;
		avatar: string;
		liked: boolean;
		content: string;
	};
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
	const { toggleLike, deleteUser } = useUserStore();
	const navigate = useNavigate();

	// Обработчик клика на карточку
	const handleCardClick = () => {
		navigate(`/products/${user.id}`);
	};

	return (
		<div className="user-card" onClick={handleCardClick}>
			<img
				src={user.avatar}
				alt={`${user.first_name} ${user.last_name}`}
				style={{ width: 100, height: 100 }}
			/>
			<h3>
				{user.first_name} {user.last_name}
			</h3>
			<p className="card-content">{user.content}</p>

			<button
				className={user.liked ? "liked" : ""}
				onClick={(e) => {
					e.stopPropagation(); // Предотвращает срабатывание обработчика клика карточки
					toggleLike(user.id);
				}}
			>
				{user.liked ? "❤️" : "🤍"}
			</button>

			<button
				onClick={(e) => {
					e.stopPropagation(); // Предотвращает срабатывание обработчика клика карточки
					deleteUser(user.id);
				}}
			>
				Delete
			</button>
		</div>
	);
};
