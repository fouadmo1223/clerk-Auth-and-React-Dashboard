import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  MessageSquare,
  FileText,
  ThumbsUp,
  Loader2,
} from "lucide-react";
import { fetchUsers } from "../../redux/usersSlice";
import { fetchPosts } from "../../redux/postsSlice";
import { fetchComments } from "../../redux/commentsSlice";
import { fetchTodos } from "../../redux/todosSlice";

const icons = {
  users: Users,
  posts: FileText,
  comments: MessageSquare,
  todos: ThumbsUp,
};

export default function Stats() {
  const dispatch = useDispatch();

  const { users, posts, comments, todos } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(fetchComments());
    dispatch(fetchTodos());
  }, [dispatch]);

  const items = [
    {
      title: "Users",
      key: "users",
      hover: "hover:bg-blue-500 hover:text-white",
    },
    {
      title: "Posts",
      key: "posts",
      hover: "hover:bg-green-500 hover:text-white",
    },
    {
      title: "Comments",
      key: "comments",
      hover: "hover:bg-purple-500 hover:text-white",
    },
    {
      title: "Todos",
      key: "todos",
      hover: "hover:bg-yellow-500 hover:text-black",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, key, hover }) => {
        const Icon = icons[key];
        const slice = { users, posts, comments, todos }[key];

        return (
          <Card
            key={key}
            className={`bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${hover}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              {slice.loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">
                  {slice.items.length.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
