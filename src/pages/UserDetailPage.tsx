import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export const UserDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { users } = useUserStore();
	const navigate = useNavigate();
	const user = users.find((user) => user.id === id);

	if (!user) {
		return <div>User not found</div>;
	}

	return (
		<div className="user-detail-page">
			<button onClick={() => navigate("/products")}>Back to Products</button>
			<div className="user-detail-card">
				<img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
				<h1>
					{user.first_name} {user.last_name}
				</h1>
				<p>{user.content}</p>
			</div>
		</div>
	);
};
