// src/pages/TodosPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchTodos } from "@/redux/todosSlice";
import TodosTable from "@/components/todos/TodosTable";

export default function TodosPage() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <motion.div
      className="container mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      <TodosTable />
    </motion.div>
  );
}
