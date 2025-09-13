import { Outlet } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Sidebar } from "./components/Sidebar";

export default function DashboardLayout() {
  const { user } = useUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b px-6 py-3 bg-white dark:bg-gray-800">
          <h1 className="text-xl font-semibold">
            Welcome{" "}
            <span className="text-2xl font-bold text-gray-400">
              {user?.username || user?.firstName || "Welcome"}
            </span>
          </h1>
          <UserButton afterSignOutUrl="/sign-in" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
