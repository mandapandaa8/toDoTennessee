//* the responsibility for this module will be to render the recommended places from other users
//* will need to have: userFirstName, placeName, and address

import { useEffect, useState } from "react"
import "./Recommended.css"

export const Recommended = () => {
    const [recommend, setRecommend] = useState([])
    const [filterRecs, setFilter] = useState([])

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

    return <>
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
                        </article>
                        : "" 
                })
        }
    </>
}