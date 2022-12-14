import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./places.css"

export const PlacesForm = () => {

    //* for each form field, set up default values in initial state
    //* properties here will be updated each time the user interacts with description and emergency value
    const [place, update] = useState({
        id: 0,
        visited: false,
        placeName: "",
        address: "",
        comment: "",
        goAgain: false,
        recommend: false,
        userId: 0,
        categoryId: 0
    })
    const [category, setCategory] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/categories')
                .then(response => response.json())
                .then((categoryArray) => {
                    setCategory(categoryArray)
                })
        }, []
    )
    /*
        TODO: redirect the user to the ticket list
    */
    const navigate = useNavigate()

    const localToDoUser = localStorage.getItem("toDo_user")
    const userObject = JSON.parse(localToDoUser)

    //* function that will run instructions for when submit button is clicked
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const placeToSendToAPI = {
            userId: userObject.id,
            visited: false,
            placeName: place.placeName,
            address: place.address,
            comment: place.comment,
            goAgain: false,
            recommend: false,
            categoryId: parseInt(place.categoryId)
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch('http://localhost:8088/places', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(placeToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/mainPage/${userObject.id}`)
            })
    }


    return (
        <form className="placeForm">
            <h2 className="placeHeader">New Place to See</h2>
            <fieldset>
                <div className="form-group">
                    <label className="placeName" htmlFor="placeName">Name:</label>
                    <input
                        //* form field for creating ticket
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of place to visit"
                        value={place.placeName}
                        onChange={
                            (evt) => {
                                //* first copy existing state
                                const copy = { ...place } //* copy with spread operator
                                //* modify copy
                                //* new value of description should be current value of input field
                                //* gotten through change event
                                copy.placeName = evt.target.value
                                //* then need to update the state, pass copy back to be new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="placeAddress" htmlFor="address">Address:</label>
                    <input key={`place--${place.id}`}
                        required autoFocus
                        type="textarea"
                        className="form-control"
                        placeholder="Where is it located?"
                        value={place.address}
                        onChange={
                            (evt) => {
                                const copy = { ...place }
                                copy.address = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="selectCategory">
                <label className="categoryLabel" htmlFor="category">Category:</label>
                {
                    category.map(
                        //* if condition that if specific user is logged in, only show their categories
                        category => {
                            if (category.userId === userObject.id) {
                                return <div className="checkCategory" key={`category--${category.id}`}>
                                    <input
                                        onChange={
                                            (evt) => {
                                                const copy = structuredClone(place)
                                                copy.categoryId = evt.target.value
                                                update(copy)
                                            }
                                        } type="checkbox" value={category.id} /> {category.categoryName}
                                </div>
                            }
                        }
                    )
                }
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="placeComment" htmlFor="comment">Comment:</label>
                    <textarea key={`place--${place.id}`}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Why do you want to go?"
                        value={place.comment}
                        onChange={
                            (evt) => {
                                const copy = { ...place }
                                copy.comment = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                class="button-55">
                Save Place
            </button>
        </form>
    )
}