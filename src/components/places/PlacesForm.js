import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const PlacesForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */

//* for each form field, set up default values in initial state
    //* properties here will be updated each time the user interacts with description and emergency value
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    //* function that will run instructions for when submit button is clicked
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        
           // {
              //  "userId": 3,
              //  "description": "Saepe ex sapiente deserunt et voluptas fugiat vero quasi. Ipsam est non ipsa. Occaecati rerum ipsa consequuntur. Ratione commodi unde sint non rerum. Sit quia et aut sunt.",
              //  "emergency": false,
              //  "dateCompleted": "Fri Apr 29 2022 14:02:20 GMT-0500 (Central Daylight Time)"
            // }
        
        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch('http://localhost:8088/serviceTickets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }
    

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                    //* form field for creating ticket
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                //* first copy existing state
                                const copy = {...ticket} //* copy with spread operator
                                //* modify copy
                                //* new value of description should be current value of input field
                                    //* gotten through change event
                                copy.description = evt.target.value
                                //* then need to update the state, pass copy back to be new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                    //* form field for check if emergency
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                //* cant capture the value, wont work with checkbox, need to use checked
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}