//* the responsibility for this module will be to render the recommended places from other users
//* will need to have: placeName, comment and address

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Recommended.css"

export const Recommended = () => {
    const [recommend, setRecommend] = useState([])
    const [filterRecs, setFilter] = useState([])
    const navigate = useNavigate()

    const localToDoUser = localStorage.getItem("toDo_user")
    const userObject = JSON.parse(localToDoUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/places`)
                .then(response => response.json())
                .then((data) => {
                    setRecommend(data)
                })
        },
        []
    )

    //* check before adding to list if rec user is current user, then don't put on list
    useEffect(
        () => {
            const rec = recommend.filter(
                recs =>
                    recs.userId !== userObject.id
            )
            setFilter(rec)
        },
        [recommend]
    )

    const handleAddButtonClick = (event, place) => {
        event.preventDefault()

        const favoriteToSendToAPI = {
            userId: userObject.id,
            placeId: parseInt(place)
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch('http://localhost:8088/favorites', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoriteToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/favorite/${userObject.id}`)
            })
    }

    return <>
        <h2 className="recsHeader">Recommendations</h2>
        {
            filterRecs.map(
                recommend => {
                    return recommend?.recommend
                        ? <article key={`recommend--${recommend.id}`} className="recommended">
                            <h2 className="placeDetails_header">Place: {recommend?.placeName}</h2>

                            <div className="detailsComment">What did you think? </div>
                            <div className="recComment">{recommend.comment}</div>

                            <div className="detailsAddress">Where: </div>
                            <div className="recAddress">{recommend.address}</div>

                            <button
                                onClick={(clickEvent) => handleAddButtonClick(clickEvent, recommend.id)}
                                className="button-55">❤️</button>
                        </article>
                        : ""
                })
        }
    </>
}