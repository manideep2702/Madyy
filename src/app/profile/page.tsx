import ProfilePage from "@/components/ProfilePage";
import RequireAuth from "@/components/auth/require-auth";

export default function Page() {
  return (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  );
}
