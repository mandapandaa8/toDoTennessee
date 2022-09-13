import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { UserViews } from "./views/UserViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./toDo.css"


export const ToDo = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<UserViews />
				</>
			</Authorized>

		} />
	</Routes>
}

