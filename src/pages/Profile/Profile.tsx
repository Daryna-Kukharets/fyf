import { useEffect, useState } from "react";
import { BackPath } from "../../components/BackPath/BackPath";
import { UsersForm } from "../../components/UsersForm/UsersForm";
import { ProfileTop } from "../../components/ProfileTop/ProfileTop";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "../../components/Loader/Loader";
import { getProfile } from "../../api/auth";

export const Profile = () => {
  const token = useAuthStore((state) => state.token);
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  });

  const [photoPath, setPhotoPath] = useState('');
  const [loading, setLoading] = useState(true);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

   useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const user = await getProfile();
        setValues((prev) => ({
          ...prev,
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phoneNumber || "",
          photoPath: user.photoPath || "",
        }));
        setPhotoPath( user.photoPath || "");
      } catch (error) {
        console.error("Помилка при отриманні профілю:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <section id="profile" className="profile">
      <BackPath />
      <ProfileTop />
      {loading ? (
        <Loader />
      ) : (
        <UsersForm
          mode="profile"
          photoPath={photoPath}
          values={values}
          onChange={handleChange}
        />
      )}
    </section>
  );
};
