import { useState } from "react";
import { BackPath } from "../../components/BackPath/BackPath";
import { UsersForm } from "../../components/UsersForm/UsersForm";
import { Link } from "react-router-dom";
import { ProfileTop } from "../../components/ProfileTop/ProfileTop";

export const Profile = () => {
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account");
  };
  return (
    <div className="profile">
      <BackPath />
      <ProfileTop />
      <UsersForm
        mode="profile"
        values={values}
        onChange={handleChange}
        onPhotoUpload={() => alert("Upload photo")}
        onPhotoCapture={() => alert("Capture photo")}
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
};
