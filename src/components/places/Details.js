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

                        <p className="detailsComment">What did you think? <br />
                        <div className="inputComment">{place.comment}</div></p>

                        <p className="detailsAddress">Where: <br />
                        <div className="inputAddress">{place.address}</div></p>

                        <p className="goAgainDetails">Go again: <br />
                        <div className="inputAgain">{goAgain()}</div></p>


                    </article>
                </>
                : <>
                    <article className="notVisited">

                        <h2 className="category_header">Category: {place?.category?.categoryName}</h2>
                        <h2 className="placeDetails_header">Place: {place?.placeName}</h2>

                        <p className="detailsComment">Why do you want to go? <br />
                        <div className="inputComment">{place.comment}</div></p>

                        <p className="detailsAddress">Where: <br />
                        <div className="inputAddress">{place.address}</div></p>

                        <button className="button-55" onClick={() => Navigate(`/editDetails/${place.id}`)}>Been There?</button>
                    </article>
                </>

        }
    </>
}


