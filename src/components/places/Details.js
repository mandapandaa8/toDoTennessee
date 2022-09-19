import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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
                    <article>

                        <h2 className="category_header">Category: {place?.category?.categoryName}</h2>
                        <h2 className="placeDetails_header">Place: {place?.placeName}</h2>

                        <div className="comment">What did you think? {place.comment}</div>

                        <div className="address">Where: {place.address}</div>

                        <div className="goAgain">Go again: {goAgain()}</div>


                    </article>
                </>
                : <>
                    <article>

                        <h2 className="category_header">Category: {place?.category?.categoryName}</h2>
                        <h2 className="placeDetails_header">Place: {place?.placeName}</h2>

                        <div className="comment">Why do you want to go? {place.comment}</div>

                        <div className="address">Where: {place.address}</div>


                    </article>

                    <button onClick={() => Navigate(`/editDetails/${place.id}`)}>Been There?</button>
                </>

        }
    </>
}


