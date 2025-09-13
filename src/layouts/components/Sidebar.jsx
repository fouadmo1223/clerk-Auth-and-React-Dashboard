import { FileText, Home, ListTodo, Users } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  return (
    <aside className="w-20 lg:w-64 bg-gray-100 dark:bg-gray-900 p-4 space-y-4 transition-all">
      <h2 className="text-lg font-bold hidden lg:block">My Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 justify-center lg:justify-start",
              isActive && "bg-gray-300 dark:bg-gray-700 font-semibold"
            )
          }
        >
          <Home className="h-8 w-8 lg:h-5 lg:w-5" />
          <span className="hidden lg:inline">Home</span>
        </NavLink>

        <NavLink
          to="/dashboard/posts"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 justify-center lg:justify-start",
              isActive && "bg-gray-300 dark:bg-gray-700 font-semibold"
            )
          }
        >
          <FileText className="h-8 w-8 lg:h-5 lg:w-5" />
          <span className="hidden lg:inline">Posts</span>
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 justify-center lg:justify-start",
              isActive && "bg-gray-300 dark:bg-gray-700 font-semibold"
            )
          }
        >
          <Users className="h-8 w-8 lg:h-5 lg:w-5" />
          <span className="hidden lg:inline">Users</span>
        </NavLink>

        <NavLink
          to="/dashboard/todos"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 justify-center lg:justify-start",
              isActive && "bg-gray-300 dark:bg-gray-700 font-semibold"
            )
          }
        >
          <ListTodo className="h-8 w-8 lg:h-5 lg:w-5" />
          <span className="hidden lg:inline">Todos</span>
        </NavLink>
      </nav>
    </aside>
  );
};
