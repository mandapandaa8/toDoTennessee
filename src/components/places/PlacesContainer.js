//* the parent that will contain the two items in ticket rout to allow access state
    //* will maintain the state
        //* TicketList and TicketSearch will gain access to state via props
        //* keep in mind two siblings cant talk directly to each other, they have to go through a pair

import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    //* cut the TicketList and TicketSearch from the rout and paste here for return
    return <>
        <TicketSearch setterFunction={setSearchTerms} />  {/* the input field, aka the searchTerms, therefor needs the setter function, then can put onChange */}
        <TicketList searchTermState={searchTerms} />  {/*needs to know what current search terms are, and display only tickets with those terms, needs access to actual state */}
    </>
}