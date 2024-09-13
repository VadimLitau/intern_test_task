import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UserDetailPage } from "./pages/UserDetailPage";
import { CreateUserPage } from "./pages/CreateUserPage";
import { UsersPage } from "./pages/UsersPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/products" element={<UsersPage />} />
				<Route path="/products/:id" element={<UserDetailPage />} />
				<Route path="/create-user" element={<CreateUserPage />} />
			</Routes>
			<Link to="/products">
				<button>Go to Products</button>
			</Link>
		</Router>
	);
}

export default App;
