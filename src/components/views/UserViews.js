import { Outlet, Route } from "react-router-dom"

export const UserViews = () => {
    return (
        <Route path="/" element={
            <>
                <h1>Your personalized TO DO list for the greater Tennessee</h1>

                <Outlet />
            </>
        }>
            <Route path="mainPage" element={ <></> } />
            <Route path="editPlace" element={ <></> } />
            <Route path="addCategory" element={ <></> } />
            <Route path="addPlace" element={ <></> } />
            <Route path="logOut" element={ <></> } />
            <Route path="recommended" element={ <></> } />
        </Route>
    )
}