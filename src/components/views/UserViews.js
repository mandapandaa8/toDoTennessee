import { Outlet, Route, Routes } from "react-router-dom"
import { CategoryForm } from "../categories/categoryForm"
import { MainPage } from "../MainPage.js/MainPage"
import { Details } from "../places/Details"
import { PlacesForm } from "../places/PlacesForm"

export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>To Do: Tennessee</h1>
                    <h2>Your personalized TO DO list for the greater Tennessee</h2>

                    <Outlet />
                </>
            }>
                <Route path="mainPage" element={ < MainPage/> } />
                <Route path="detailsPage/:placeId" element={ < Details /> } />
                <Route path="categoryForm" element={ < CategoryForm /> } />
                <Route path="placeForm" element={ < PlacesForm/> } />
                <Route path="recommended" element={ <></> } />
            </Route>
        </Routes>
    )
}