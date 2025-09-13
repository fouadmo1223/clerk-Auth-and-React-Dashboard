import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/redux/usersSlice";
import UsersTable from "@/components/users/UsersTable";

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <UsersTable />;
}
