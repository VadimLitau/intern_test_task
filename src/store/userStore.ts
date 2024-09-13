import create from "zustand";

interface User {
	id: string;
	first_name: string;
	last_name: string;
	avatar: string;
	liked: boolean;
	content: string; // Добавьте новое поле для контента
}

interface UserStore {
	users: User[];
	filter: "all" | "liked";
	addUser: (user: User) => void;
	toggleLike: (id: string) => void;
	deleteUser: (id: string) => void;
	setFilter: (filter: "all" | "liked") => void;
}

export const useUserStore = create<UserStore>((set) => ({
	users: [],
	filter: "all",
	addUser: (user) => set((state) => ({ users: [...state.users, user] })),
	toggleLike: (id) =>
		set((state) => ({
			users: state.users.map((user) =>
				user.id === id ? { ...user, liked: !user.liked } : user
			),
		})),
	deleteUser: (id) =>
		set((state) => ({
			users: state.users.filter((user) => user.id !== id),
		})),
	setFilter: (filter) => set({ filter }),
}));
