import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RecentUsers() {
  const users = useSelector((state) => state.users.items.slice(0, 5));

  return (
    <Card className="w-full shadow-md border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-base font-semibold tracking-tight">
          Recent Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={u.avatar} alt={u.name} />
                <AvatarFallback>
                  {u.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium truncate">{u.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
