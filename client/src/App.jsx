import "./App.css";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  ForgotPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  SingleBlog,
  VerifyAccount,
  UserProfile,
  AddBlog,
} from "./pages";

function App() {
  const Layout = () => {
    return (
      <div className="App font-opensans">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
