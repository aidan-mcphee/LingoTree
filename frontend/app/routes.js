import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/LandingPage.jsx"),
    route("home", "routes/home.jsx"),
    route("login", "routes/login.jsx"),
    route("logout", "routes/Logout.jsx"),
    route("callback", "routes/Callback.jsx"),
];
