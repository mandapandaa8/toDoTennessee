import { Outlet, Route, Routes } from "react-router-dom"
import { CategoryForm } from "../categories/categoryForm"
import { MainPage } from "../MainPage.js/MainPage"
import { Details } from "../places/Details"
import { EditDetails } from "../places/EditDetails"
import { PlacesForm } from "../places/PlacesForm"
import { Favorite } from "../Recommended/Favorite"
import { Recommended } from "../Recommended/Recommended"
import "./UserViews.css"

export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="toDo_title">To Do: Tennessee</h1>
                    <h2 className="personal">Your personalized TO DO list for the greater Tennessee</h2>

                    <Outlet />
                </>
            }>
                <Route path="mainPage/:userId" element={< MainPage />} />
                <Route path="detailsPage/:placeId" element={< Details />} />
                <Route path="categoryForm" element={< CategoryForm />} />
                <Route path="placeForm" element={< PlacesForm />} />
                <Route path="editDetails/:placeId" element={< EditDetails />} />
                <Route path="recommended" element={< Recommended />} />
                <Route path="favorite/:userId" element={< Favorite />} />
            </Route>
        </Routes>
    )
}