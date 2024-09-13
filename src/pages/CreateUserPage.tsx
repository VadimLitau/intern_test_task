import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { faker } from "@faker-js/faker";

export const CreateUserPage: FC = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [avatar, setAvatar] = useState<File | null>(null);
	const [errors, setErrors] = useState<{
		firstName?: string;
		lastName?: string;
		avatar?: string;
	}>({});
	const navigate = useNavigate();
	const { addUser } = useUserStore();

	const validateInputs = () => {
		const newErrors: {
			firstName?: string;
			lastName?: string;
			avatar?: string;
		} = {};
		const nameRegex = /^[a-zA-Zа-яА-Я]+$/;

		if (!firstName) {
			newErrors.firstName = "First name is required";
		} else if (!nameRegex.test(firstName)) {
			newErrors.firstName = "First name can only contain letters";
		}

		if (!lastName) {
			newErrors.lastName = "Last name is required";
		} else if (!nameRegex.test(lastName)) {
			newErrors.lastName = "Last name can only contain letters";
		}

		if (!avatar) {
			newErrors.avatar = "Avatar is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!validateInputs()) {
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			const avatarUrl = reader.result as string;
			addUser({
				id: String(Date.now()), // Уникальный ID для нового пользователя
				first_name: firstName,
				last_name: lastName,
				avatar: avatarUrl,
				liked: false,
				content: faker.lorem.sentences(faker.number.int({ min: 2, max: 4 })),
			});
			navigate("/products");
		};
		if (avatar) {
			reader.readAsDataURL(avatar);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setAvatar(e.target.files[0]);
		}
	};

	return (
		<div className="create-user-page">
			<h1>Create New User</h1>
			<form onSubmit={handleSubmit} className="create-user-form">
				<div className="form-group">
					<label htmlFor="firstName">First Name:</label>
					<input
						type="text"
						id="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
					{errors.firstName && (
						<span className="error">{errors.firstName}</span>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="lastName">Last Name:</label>
					<input
						type="text"
						id="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
					{errors.lastName && <span className="error">{errors.lastName}</span>}
				</div>
				<div className="form-group">
					<label htmlFor="avatar">Avatar:</label>
					<input
						type="file"
						id="avatar"
						accept="image/*"
						onChange={handleFileChange}
						required
					/>
					{errors.avatar && <span className="error">{errors.avatar}</span>}
				</div>
				<button type="submit">Create User</button>
			</form>
		</div>
	);
};
