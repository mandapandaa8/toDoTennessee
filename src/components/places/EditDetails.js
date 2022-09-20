import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./EditDetails.css"

export const EditDetails = () => {
    const [details, updateDetails] = useState({
        id: 0,
        visited: false,
        placeName: "",
        address: "",
        comment: "",
        goAgain: false,
        userId: 0,
        categoryId: 0,
    })

    const { placeId } = useParams()

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(
        () => {
            fetch(`http://localhost:8088/places?id=${placeId}&_expand=category`)
                .then(response => response.json())
                .then((data) => {
                    const singlePlace = data[0]
                    updateDetails(singlePlace)
                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        details.visited = details.visited === "true"
        details.goAgain = details.goAgain === "true"
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/places/${details.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback(`${details.placeName} successfully updated`)
            })
    }


    return (
        <>
            <form className="editDetails">
                <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                    {feedback}
                </div>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="visited">Did you go?</label>
                        <input type="radio"
                            name="visited"
                            value="true"
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.visited = evt.target.value
                                    updateDetails(copy)
                                }
                            } />Yes
                        <input type="radio"
                            name="visited"
                            value={false}
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.visited = evt.target.value
                                    updateDetails(copy)
                                }
                            } />No
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <input
                            required autoFocus
                            type="textarea"
                            className="form-control"
                            placeholder="What did you think?"
                            value={details.comment}
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.comment = evt.target.value
                                    updateDetails(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="goAgain">Go Again?</label>
                        <input type="radio"
                            name="goAgain"
                            value="true"
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.goAgain = evt.target.value
                                    updateDetails(copy)
                                }
                            } />Yes
                        <input type="radio"
                            name="goAgain"
                            value={false}
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.goAgain = evt.target.value
                                    updateDetails(copy)
                                }
                            } />No
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="button-55">
                    Save Place
                </button>
            </form>
        </>
    )

}