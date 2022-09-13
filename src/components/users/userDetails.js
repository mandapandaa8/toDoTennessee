import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {userId} = useParams()
    const [user, updateUser] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?_expand=user&userId=${userId}`)
            .then(response => response.json())
            .then((data) => {
                const singleUser = data[0]
                updateUser(singleUser)
            })
        }, 
        [userId]
    )

    return <section className="user">
        <header className="user_header">Name: {user.firstName} {user.lastName}</header>
        <div>Email: {user.email}</div>
    </section>
}