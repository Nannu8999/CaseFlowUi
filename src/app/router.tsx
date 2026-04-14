import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import ClientListingPage from "../features/clients/pages/ClientListingPage";
import ClientAddPage from "../features/clients/pages/ClientAddPage";

function Router() {
    return (
        <BrowserRouter>
            <Routes >

                <Route path="/" element={<LoginPage />} />

                <Route element={<MainLayout />} >

                    <Route path="/dashboard" element={<Dashboard />} />

                    // Clients
                    <Route path="/clients" element={<ClientListingPage />} />
                    <Route path="/clients/add" element={<ClientAddPage />} />



                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default Router;