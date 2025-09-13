// src/components/todos/TodosTable.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { addTodo, deleteTodo, toggleTodo } from "@/redux/todosSlice";
import { CheckCircle, Circle, Trash2, PlusCircle } from "lucide-react";

// Modal for adding todos
function TodoModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    onSave({ title });
    setTitle("");
    onClose();
    toast.success("Todo added!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6"
      >
        <h2 className="text-lg font-bold mb-4">Add Todo</h2>
        <input
          type="text"
          placeholder="Todo title"
          className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function TodosTable() {
  const dispatch = useDispatch();
  const { items: todos, loading } = useSelector((state) => state.todos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all"); // all | completed | pending
  const todosPerPage = 5;

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast.info("Todo deleted");
  };

  const handleAdd = (todo) => {
    dispatch(addTodo(todo));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  // Filtering
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const startIndex = (currentPage - 1) * todosPerPage;
  const currentTodos = filteredTodos.slice(
    startIndex,
    startIndex + todosPerPage
  );

  if (loading) {
    return (
      <motion.div
        className="p-6 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading todos...
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-bold">Todos</h2>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1); // reset to first page on filter change
            }}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="w-4 h-4 mr-1" /> Add Todo
          </Button>
        </div>
      </div>

      {/* Table for md+ */}
      <div className="hidden md:block">
        <div className="max-h-[28rem] overflow-auto rounded-lg border">
          <motion.table
            className="min-w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
              <tr>
                <th className="w-12 p-4 text-left">#</th>
                <th className="p-4 text-left min-w-[250px]">Title</th>
                <th className="p-4 text-left">Status</th>
                <th className="w-28 p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {currentTodos.map((todo, idx) => (
                  <motion.tr
                    key={todo.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="p-4">{startIndex + idx + 1}</td>
                    <td className="p-4 truncate">{todo.title}</td>
                    <td className="p-4">
                      <span
                        onClick={() => handleToggle(todo.id)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          todo.completed
                            ? "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-300"
                        }`}
                      >
                        {todo.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors inline-flex items-center gap-1"
                        onClick={() => handleDelete(todo.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="wait">
          {currentTodos.map((todo, idx) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition flex flex-col gap-2 bg-white dark:bg-gray-900"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{todo.title}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <span
                onClick={() => handleToggle(todo.id)}
                className={`inline-flex w-fit items-center gap-1 px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                  todo.completed
                    ? "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-300"
                }`}
              >
                {todo.completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                {todo.completed ? "Completed" : "Pending"}
              </span>
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

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdd}
      />
    </div>
  );
}
