//* adding an input field that an employee can search through tickets
    //* first step is to add new component of TicketSearch
        //* all it's going to do is return an input field
        //* want to place above list of tickets when rout is /tickets, routs in applicationviews
//* deconstruct with the name of the key, which is setterFunction from TicketsContainer
    
export const TicketSearch = ({ setterFunction }) => {
    return (
        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        //*change the state in the parent component
                        setterFunction(changeEvent.target.value)
                    }
                }
            
            type="text" placeholder="Enter search terms" />
        </div>
    )
}