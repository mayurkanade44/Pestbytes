import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Footer, Navbar, ScrollToTop, ProtectedRoute } from "./components";
import {
  Home,
  Login,
  Register,
  ResetPassword,
  SingleBlog,
  VerifyAccount,
  UserProfile,
  AddBlog,
  AllBlogs,
  AboutUs,
} from "./pages";

function App() {
  const Layout = () => {
    return (
      <div className="App font-opensans">
        <ToastContainer position="top-center" autoClose={2000} />
        <Navbar />
        <Outlet />
        <ScrollToTop />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-pestbytes" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/add-blog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/blog/:id" element={<SingleBlog />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
