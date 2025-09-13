import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";
import PostsTable from "../components/posts/PostsTable";

export default function PostsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-6">
      <PostsTable />
    </div>
  );
}
