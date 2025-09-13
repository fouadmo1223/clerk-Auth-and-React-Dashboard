// src/components/posts/PostsTable.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addPost, deletePost } from "@/redux/postsSlice";
import { Button } from "@/components/ui/button";

// Modal component
function Modal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title || !body) {
      toast.error("Please fill out all fields");
      return;
    }
    onSave({ title, body });
    setTitle("");
    setBody("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6"
      >
        <h2 className="text-lg font-bold mb-4">Add New Post</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body"
            className="w-full border rounded p-2"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
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

export default function PostsTable() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.posts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const handleDelete = (index) => {
    dispatch(deletePost(index));
    toast.info("Post deleted");
  };

  const handleAdd = (post) => {
    dispatch(addPost({ ...post, id: Date.now() }));
    toast.success("Post added!");
  };

  // Pagination logic
  const totalPages = Math.ceil(items.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = items.slice(startIndex, startIndex + postsPerPage);

  if (loading) {
    return (
      <motion.div
        className="p-6 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading posts...
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-bold">Posts</h2>
        <Button className="ml-auto" onClick={() => setIsModalOpen(true)}>
          + Add Post
        </Button>
      </div>

      {/* Table for md and up */}
      <div className="hidden md:block overflow-x-auto">
        <motion.table
          className="min-w-full border rounded-lg overflow-y-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="w-12 p-2 text-left">#</th>
              <th className="w-40 p-2 text-left">Title</th>
              <th className="p-2 text-left">Body</th>
              <th className="w-28 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-hidden">
            <AnimatePresence mode="wait">
              {currentPosts.map((post, idx) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td className="p-2">{startIndex + idx + 1}</td>
                  <td className="p-2 truncate max-w-xs" title={post.title}>
                    {post.title}
                  </td>
                  <td className="p-2 truncate max-w-md" title={post.body}>
                    {post.body}
                  </td>
                  <td className="p-2 text-center whitespace-nowrap">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="wait">
          {currentPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="border max-w-[330px] rounded-lg p-4 shadow-sm hover:shadow-lg transition flex flex-col gap-2 bg-white dark:bg-gray-900 md:max-w-full"
            >
              <span className="font-semibold">#{startIndex + idx + 1}</span>
              <h3 className="font-medium truncate" title={post.title}>
                {post.title}
              </h3>
              <Button
                variant="destructive"
                size="sm"
                className="self-start mt-2"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
              <p className="truncate mt-1" title={post.body}>
                {post.body}
              </p>
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
