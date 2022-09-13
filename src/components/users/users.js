import { Link } from "react-router-dom"

export const Users = ({ id, firstName, lastName, email }) => {
    return <section className="users">
        <div>
            <Link to={`/users/${id}`}>Name: {firstName} {lastName}</Link>
        </div>
        <div>Email: {email}</div>
    </section>
}