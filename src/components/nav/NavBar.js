import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/mainPage">Main Page</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/categoryForm">Create Category</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/placeForm">Create Place</Link>
            </li>
            {
                localStorage.getItem("toDo_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="__link" to="" onClick={() => {
                            localStorage.removeItem("toDo_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}