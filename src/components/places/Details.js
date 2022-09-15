import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Details = () => {
    const [user, setUser] = useState([])
    const [place, setPlace] = useState([])
    const {placeId} = useParams()
    

    useEffect(
        () => {
            fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then((userArray) => {
                setUser(userArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/places')
            .then(response => response.json())
            .then((placeArray) => {
                setPlace(placeArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/places?id=${placeId}&_expand=category`)
            .then(response => response.json())
            .then((data) => {
                const singlePlace = data[0]
                setPlace(singlePlace)
            })
        },
        [placeId]
    )


    return <article>

        <h2 className="category_header">Category: {place?.category?.categoryName}</h2>
        <h2 className="placeDetails_header">Place: {place?.placeName}</h2>

        <div className="comment">Why do you want to go? {place.comment}</div>

        <div className="address">Where: {place.address}</div>


    </article>
}