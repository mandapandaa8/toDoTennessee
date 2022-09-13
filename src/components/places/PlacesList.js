// export const TicketList = () => {
//     return <h2>List of Tickets</h2>
// }

import { useEffect, useState } from "react"
import "./tickets.css"
import { useNavigate } from "react-router-dom"


//* searchTermState is inherited state variable from the parent

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
//* don't want to modify array of tickets from api
    //* do want to display a list of tickets, create new state variable
    //* will initialize as an empty array
    const [filteredTickets, setFiltered] = useState([])
//* new state variable that will only display only the emergency tickets
    //* do not want to auto toggle all emergency tickets so set to state to false
        //* goal is to toggle to true in function
    const [emergency, setEmergency] = useState(false)
//* the tickets that are open for the user, set initially to false, set to true when clicked
    const [openOnly, updateOpenOnly] = useState(false)
//* need a navigate hook that will re-route user in browser
    //* import from react router dom
    const navigate = useNavigate()
    
//* get honey_user out of local storage, just a string
    const localHoneyUser = localStorage.getItem("honey_user")
//* convert to object, 2 keys, id and staff, use staff property as part of logic
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            //* filter original ticket list from API
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [ searchTermState ] //* TicketList is observing when the parent SearchTermState is changing
    )

    useEffect(
        () => {
            //* only if emergency is true
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets) //* set the state variable that we are displaying
            }
            else {
                //* the logic that presents that change from true back to false
                setFiltered(tickets)
            }
        },
        [emergency] //* the state you want to observe
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/serviceTickets')
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

//* when you get tickets, and data comes back, if user = customer, just their tickets output
    //* any time a ticket state changes, should all be shown or just customer?

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //& for employees
                setFiltered(tickets)
            }
            else {
                //& for customers
                //* looking at data, service ticket unique id for customer is attached
                //* compare that key and the unique id of logged in person
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

     //* the useEffect for the tickets that are open for users
    useEffect(
        () => {
            if (openOnly) {
                //* filter all tickets for user and whose date completed is equal to an empty string
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )



    //* create a button that shows only the emergency tickets
        //* update button so that if staff key is true, only staff can see it
        //* create another button that will show all tickets again
        //* initially wont show all tickets because the state was auto set to false
            //* need to create logic for what happens that if it changes for true back to false in the use effect
        //* we now need to add a button for customers who need to submit a ticket
    return <>
        {
            honeyUserObject.staff
                ? <>
                <button onClick={ () => { setEmergency(true) } } >Emergency only</button>
                <button onClick={ () => { setEmergency(false) } } >Show all</button>
                </>
                : <>
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "🤯" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}

