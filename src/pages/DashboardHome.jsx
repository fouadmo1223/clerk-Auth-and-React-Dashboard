import Stats from "../components/dashboard/Stats";
import RecentUsers from "../components/dashboard/RecentUsers";
import TodosOverview from "../components/dashboard/TodosOverview";
import ActivityChart from "../components/dashboard/ActivityChart";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Dashboard Overview</h1>

      {/* Stats */}
      <Stats />

      {/* Grid for other sections */}
      <div className="grid gap-6 grid-cols-1">
        <RecentUsers />
        <TodosOverview />
        <div className="md:col-span-2 lg:col-span-3">
          <ActivityChart />
        </div>
      </div>
    </div>
  );
}
