import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./MainPage.css"

export const MainPage = () => {
    const [categories, setCategories] = useState([])
    const [places, setPlaces] = useState([])
    const { userId } = useParams()
    const Navigate = useNavigate()

    const localToDoUser = localStorage.getItem("toDo_user")
    const userObject = JSON.parse(localToDoUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/categories?_expand=user&userId=${userId}`)
                .then(response => response.json())
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/places?_expand=user&userId=${userId}`)
                .then(response => response.json())
                .then((placesArray) => {
                    setPlaces(placesArray)
                })
        },
        []
    )


    const deleteButton = (placeId) => {

        return fetch(`http://localhost:8088/places/${placeId}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/places`)
                    .then(response => response.json())
                    .then((placeArray) => {
                        setPlaces(placeArray)
                    })
            })
    }


    return <article className="mainPage">

        <ul>
            {
                categories.map(
                    (category) => {
                        if (category.userId === userObject.id) {
                            return <section key={`category--${category.id}`} className="category_title">
                                <header>{category.categoryName}:</header>
                                {
                                    places.map(
                                        (place) => {
                                            if (place.categoryId === category.id)
                                                return <ul key={`place--${place.id}`}>
                                                    <header class="place_list">
                                                        <button className="deleteButton" value={place.id} onClick={(evt) => deleteButton(evt.target.value)}>🗑</button>
                                                        <Link to={`/detailsPage/${place.id}`}>{place.placeName}</Link>
                                                    </header>
                                                </ul>
                                        }
                                    )
                                }
                            </section>
                        }
                    }
                )
            }
        </ul>
        <button class="button-55" onClick={() => Navigate("/categoryForm")}>New Category</button>
        <button class="button-55" onClick={() => Navigate("/placeForm")}>New Place</button>
    </article>
}