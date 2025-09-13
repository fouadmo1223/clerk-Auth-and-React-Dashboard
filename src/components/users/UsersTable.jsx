// src/components/users/UsersTable.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { addUser, deleteUser } from "@/redux/usersSlice";
import { User, Mail, Phone, Building, MapPin, Search } from "lucide-react";

// Modal Component
function Modal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.company) newErrors.company = "Company is required";
    if (!form.address) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields");
      return;
    }
    onSave({ ...form, id: Date.now() });
    setForm({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: "",
      address: "",
    });
    setErrors({});
    onClose();
    toast.success("User added!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4">Add New User</h2>
        <div className="space-y-4">
          {[
            { label: "Name", key: "name" },
            { label: "Username", key: "username" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Website", key: "website" },
            { label: "Company", key: "company" },
            { label: "Address", key: "address" },
          ].map(({ label, key }) => (
            <div key={key}>
              <input
                type="text"
                placeholder={label}
                className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
              {errors[key] && (
                <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 flex-wrap">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Users Table Component
export default function UsersTable() {
  const dispatch = useDispatch();
  const { items: users, loading } = useSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(""); // 🔍 Search state
  const usersPerPage = 5;

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    toast.info("User deleted");
  };

  const handleAdd = (user) => {
    dispatch(addUser(user));
  };

  // 🔍 Filter users by search term
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination (applies to filtered list)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  if (loading) {
    return (
      <motion.div
        className="p-6 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading users...
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header with Search */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-bold">Users</h2>
        <div className="flex items-center gap-2 flex-1 max-w-sm ml-auto">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
              className="w-full pl-8 pr-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)}>+ Add User</Button>
        </div>
      </div>

      {/* Table for md and up */}
      <div className="hidden md:block">
        <div className="max-h-96 overflow-auto rounded-lg border">
          <motion.table
            className="min-w-full max-w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
              <tr>
                <th className="w-12 p-4 text-left">#</th>
                <th className="p-4 text-left min-w-[150px]">User</th>
                <th className="p-4 text-left min-w-[200px]">Email</th>
                <th className="p-4 text-left min-w-[150px]">Phone</th>
                <th className="p-4 text-left min-w-[150px]">Company</th>
                <th className="w-28 p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {currentUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="p-4">{startIndex + idx + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="truncate">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="truncate">{user.phone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="truncate">{user.company.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      </div>

      {/* Card layout for mobile (unchanged) */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="wait">
          {currentUsers.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition flex flex-col gap-2 bg-white dark:bg-gray-900 w-full"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="sm:mt-0 mt-2 self-start"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  <Mail className="w-3 h-3" /> {user.email}
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  <Phone className="w-3 h-3" /> {user.phone}
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  <Building className="w-3 h-3" /> {user.company.name}
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  <MapPin className="w-3 h-3" />{" "}
                  {typeof user.address === "object"
                    ? `${user.address.street}, ${user.address.city}`
                    : user.address}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdd}
      />
    </div>
  );
}
