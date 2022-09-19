//* This page is responsible for creating a new category
//* fetch the categories in a useEffect
//* create a useEffect to 

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CategoryForm = () => {
    const [category, setCategory] = useState({
        userId: 0,
        categoryName: ""
    })

    const navigate = useNavigate()

    const toDoUser = localStorage.getItem("toDo_user")
    const userObject = JSON.parse(toDoUser)

    useEffect(
        () => {
            fetch('http://localhost:8088/categories')
                .then(response => response.json())
                .then((categoryArray) => {
                    setCategory(categoryArray)
                })
        }, []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const categoryToSendToAPI = {
            userId: userObject.id,
            categoryName: category.categoryName
        }

        return fetch('http://localhost:8088/categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/mainPage/${userObject.id}`)
            })
    }


    return (
        <form className="categoryForm">
            <h2 className="categoryForm_title">Add New Category</h2>
            <fieldset>
                <div className="from-group">
                    <label htmlFor="name">Category Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Category name goes here"
                        value={category.name}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(category)
                                copy.categoryName = evt.target.value
                                setCategory(copy)
                            }
                        } />

                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Category
            </button>
        </form>
    )
}