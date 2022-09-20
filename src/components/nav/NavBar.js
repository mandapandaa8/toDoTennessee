import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const toDoUser = localStorage.getItem("toDo_user")
    const userObject = JSON.parse(toDoUser)

    return (
        <div class="container amber pullLeft">
            <a className="navbar__item active">
                <Link className="navbar__link" to={`/mainPage/${userObject.id}`}>Main Page</Link>
            </a>
            <a className="navbar__item active">
                <Link className="navbar__link" to="/categoryForm">Create Category</Link>
            </a>
            <a className="navbar__item active">
                <Link className="navbar__link" to="/placeForm">Create Place</Link>
            </a>
            {
                localStorage.getItem("toDo_user")
                    ? <a className="navbar__item navbar__logout">
                        <Link className="__link" to="" onClick={() => {
                            localStorage.removeItem("toDo_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </a>
                    : ""
            }
            </div>
    )
}