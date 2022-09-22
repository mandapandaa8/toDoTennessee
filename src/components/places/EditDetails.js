import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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

    const navigate = useNavigate()

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
            // .then(() => {
            //     setFeedback(`${details.placeName} successfully updated`)
            // })
            .then(() => {
                navigate(`/detailsPage/${details.id}`)
            })
    }


    return (
        <>
            <form className="editDetails">
                <h1 className="editDetailsHeader">{details.placeName}</h1>
                {/* <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                    {feedback}
                </div> */}
                <fieldset>
                    <div className="form-group">
                        <label className="editVisited" htmlFor="visited">Did you go?</label>
                        <div className="radioResponse" ><input type="radio"
                            name="visited"
                            value="true"
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.visited = evt.target.value
                                    updateDetails(copy)
                                }
                            } />Yes</div>
                        <div className="radioResponse"><input type="radio"
                            name="visited"
                            value={false}
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.visited = evt.target.value
                                    updateDetails(copy)
                                }
                            } />No</div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="editDetailsComment" htmlFor="comment">Comment:</label>
                        <textarea
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
                        <label class="editGoAgain" htmlFor="goAgain">Go Again?</label>
                        <div className="radioResponse"><input type="radio"
                            name="goAgain"
                            value="true"
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.goAgain = evt.target.value
                                    updateDetails(copy)
                                }
                            } />Yes</div>
                        <div className="radioResponse"><input type="radio"
                            name="goAgain"
                            value={false}
                            onChange={
                                (evt) => {
                                    const copy = { ...details }
                                    copy.goAgain = evt.target.value
                                    updateDetails(copy)
                                }
                            } />No</div>
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