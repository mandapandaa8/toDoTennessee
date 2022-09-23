import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Details.css"

export const Details = () => {
    const [place, setPlace] = useState({})
    const { placeId } = useParams()
    const Navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/places?id=${placeId}&_expand=category`)
                .then(response => response.json())
                .then((data) => {
                    const singlePlace = data[0]
                    setPlace(singlePlace)
                })
        },
        []
    )

    const goAgain = () => {
        if (place.goAgain === true) {
            return (
                <div>Yes!</div>
            )
        }
        else {
            return (
                <div>No!</div>
            )
        }
    }

    return <>
        {
            place.visited
                ? <>
                    <article className="placeVisited">

                        <h2 className="category_header">Category: {place?.category?.categoryName}</h2>
                        <h2 className="placeDetails_header">Place: {place?.placeName}</h2>

                        <div className="detailsComment">What did you think? </div>
                        <div className="inputDetailsComment">{place.comment}</div>

                        <div className="detailsAddress">Where: </div>
                        <div className="inputDetailsAddress">{place.address}</div>

                        <div className="goAgainDetails">Go again: </div>
                        <div className="inputDetailsAgain">{goAgain()}</div>


                    </article>
                </>
                : <>
                    <article className="notVisited">

                        <h2 className="category_header">Category: {place?.category?.categoryName}</h2>
                        <h2 className="placeDetails_header">Place: {place?.placeName}</h2>

                        <div className="detailsComment">Why do you want to go? </div>
                        <div className="inputDetailsComment">{place.comment}</div>

                        <div className="detailsAddress">Where: </div>
                        <div className="inputDetailsAddress">{place.address}</div>

                        <button className="button-55" onClick={() => Navigate(`/editDetails/${place.id}`)}>Been There?</button>
                    </article>
                </>

        }
    </>
}


