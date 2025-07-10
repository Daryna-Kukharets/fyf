import { useState } from "react";
import { BackPath } from "../../components/BackPath/BackPath";
import { UsersForm } from "../../components/UsersForm/UsersForm";

export const Registration = () => {
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="registration">
      <BackPath />
      <h1 className="registration__title">Реєстрація</h1>
      <UsersForm
        mode="register"
        values={values}
        checked={checked}
        setChecked={setChecked}
        onChange={handleChange}
      />
    </div>
  );
};
