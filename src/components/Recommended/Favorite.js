import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Favorite.css"

export const Favorite = () => {
    const [favorites, setFavorite] = useState([])
    const { userId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/favorites?_expand=place&_expand=user&userId=${userId}`)
                .then(response => response.json())
                .then((data) => {
                    setFavorite(data)
                })
        },
        []
    )

    const deleteButton = (favoriteId) => {

        return fetch(`http://localhost:8088/favorites/${favoriteId}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/favorites?_expand=place&_expand=user&userId=${userId}`)
                    .then(response => response.json())
                    .then((favoriteArray) => {
                        setFavorite(favoriteArray)
                    })
            })
    }

    return <>

        <h2 className="favHeader">Favorite Recommendations</h2>

        {
            favorites.map(
                favorite => {
                    return favorite?.placeId
                        ? <article key={`favorite--${favorite.id}`} className="favorite">
                            <h2 className="placeDetails_header">Place: {favorite?.place?.placeName}</h2>

                            <div className="detailsComment">What did you think? </div>
                            <div className="recComment">{favorite?.place?.comment}</div>

                            <div className="detailsAddress">Where: </div>
                            <div className="recAddress">{favorite?.place?.address}</div>

                            <button className="button-55" value={favorite.id} onClick={(evt) => deleteButton(evt.target.value)}>🗑</button>
                        </article>
                        : ""
                })
        }
    </>
}
