import { useEffect, useState } from "react"

export const MainPage = () => {
    const [categories, setCategories] = useState([])
    const [places, setPlaces] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/categories')
            .then(response => response.json())
            .then((categoryArray) => {
                setCategories(categoryArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/places')
            .then(response => response.json())
            .then((placeArray) => {
                setPlaces(placeArray)
            })
        },
        []
    )
    return <article className="mainPage">

        <ul>
        {
           categories.map(
            (category) => {
               return <section className="categories">
                <header>{category.categoryName}</header>
               {
                   places.map(
                       (place) => {
                        if (place.categoryId === category.id)
                            return <ul>
                           <header>{place.placeName}</header>
                           </ul>
                    }
                    )
                }
                </section>
            }
           )
        }
        </ul>
    </article>
}