# 🚀 React Dashboard with Clerk Authentication

This is a modern dashboard layout built with **React**, **React Router v6**, **Tailwind CSS**, and **Clerk** for authentication.  
It includes a sidebar, header with user info, and dynamic page routing using `Outlet`.

---

## ✨ Features

- 🔑 Authentication with [Clerk](https://clerk.com)
- 🧭 Sidebar navigation with active link highlighting
- 👤 User profile management via `UserButton`
- 📄 Nested routing with `react-router-dom`
- 🌙 Light/Dark mode ready (Tailwind classes)
- 📱 Fully responsive layout

---

## 📂 Project Structure

```
src/
├── components/
│   └── Sidebar.jsx          # Sidebar navigation
├── layouts/
│   └── DashboardLayout.jsx  # Main dashboard layout
├── pages/
│   ├── Home.jsx
│   ├── Users.jsx
│   ├── Todos.jsx
│   ├── Messages.jsx
│   └── Reports.jsx
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation

1. **Clone the repo**

```bash
git clone https://github.com/your-username/dashboard-clerk.git
cd dashboard-clerk
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Clerk**

Create a `.env.local` file in the root with:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. **Run the project**

```bash
npm run dev
```

---

## 🖼️ Example Code

### DashboardLayout.jsx

```jsx
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
            {user?.username || user?.firstName || "Welcome"}
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
```

### App.jsx

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Todos from "./pages/Todos";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
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
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="todos" element={<Todos />} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
```

---

## 🔐 Authentication Flow

1. Users must sign in via Clerk
2. Once authenticated, the dashboard shows:
   - Sidebar navigation
   - Header with username and UserButton
   - Dynamic pages loaded via Outlet

---

## 📸 Layout Preview

```
+-----------------------------------------------------+
| Sidebar      |   Header (shows username + avatar)   |
|              |--------------------------------------|
|              |   Page Content (Outlet)              |
|              |                                      |
|              |                                      |
+-----------------------------------------------------+
```

---

## 🛠️ Tech Stack

- **React** - UI library
- **Shadcn** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **Lucide Icons** - Icon library

---

## 📜 License

This project is licensed under the MIT License.
