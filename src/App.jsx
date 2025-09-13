import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignIn,
  SignUp,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import TodosPage from "./pages/Todos";

export default function App() {
  return (
    <Routes>
      {/* Clerk Auth Pages */}
      <Route
        path="/sign-in/*"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <SignIn routing="path" path="/sign-in" />
          </div>
        }
      />

      <Route
        path="/sign-up/*"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <SignUp routing="path" path="/sign-up" />
          </div>
        }
      />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <>
            <SignedIn>
              <DashboardLayout />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      >
        <Route index element={<DashboardHome />} /> {/* ✅ Stats page */}
        <Route path="posts" element={<Posts />} />
        <Route path="users" element={<Users />} />
        <Route path="todos" element={<TodosPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
