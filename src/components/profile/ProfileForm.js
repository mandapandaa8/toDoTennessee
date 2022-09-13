import { useEffect, useState } from "react"
import "./index.css"

export const ProfileForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const toDoUser = localStorage.getItem("toDo_user")
    const userObject = JSON.parse(toDoUser)


    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${userObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const toDoUserObject = data[0]
                updateProfile(toDoUserObject)
            })
    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        return fetch(`http://localhost:8088/employees/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("User profile successfully saved")
            })
    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">Edit Your Information</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.firstName}
                            onChange={
                                (evt) => {
                                    const copy = structuredClone(profile)
                                    copy.firstName = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.lastName}
                            onChange={
                                (evt) => {
                                    const copy = structuredClone(profile)
                                    copy.lastName = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.email}
                            onChange={
                                (evt) => {
                                    const copy = structuredClone(profile)
                                    copy.email = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}
