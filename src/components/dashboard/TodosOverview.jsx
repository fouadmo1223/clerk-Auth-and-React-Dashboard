import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { CheckCircle2, Clock } from "lucide-react";

export default function TodosOverview() {
  const todos = useSelector((state) => state.todos.items);
  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  return (
    <Card className="w-full shadow-md border border-gray-200 dark:border-gray-700 transition hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-base font-semibold tracking-tight">
          Todos Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Completed */}
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-600">
              Completed: {completed}
            </span>
          </div>

          {/* Pending */}
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-600">
              Pending: {pending}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
