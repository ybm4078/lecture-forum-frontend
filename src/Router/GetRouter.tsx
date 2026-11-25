import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import HomePage from "../Pages/HomePage.tsx";
import SignUpPage from "../Pages/auth/signup/SignUpPage.tsx";
import SignInPage from "../Pages/auth/signin/SignInPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "auth",
                children: [
                    { path: "signin", element: <SignInPage /> },
                    { path: "signup", element: <SignUpPage /> },
                ],
            },
        ],
    },
]);

export default router;
