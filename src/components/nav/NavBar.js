import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const toDoUser = localStorage.getItem("toDo_user")
    const userObject = JSON.parse(toDoUser)

    return (
        <div className="container amber pullLeft">
            <a>
                <Link to={`/mainPage/${userObject.id}`}>My List</Link>
            </a>
            <a>
                <Link to="/categoryForm">Create Category</Link>
            </a>
            <a>
                <Link to="/placeForm">Create Place</Link>
            </a>
            <a>
                <Link to="/recommended">Recommendations</Link>
            </a>
            {
                localStorage.getItem("toDo_user")
                    ? <a className="navbar__logout">
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