import { useEffect, useState } from "react";
import { BackPath } from "../../components/BackPath/BackPath";
import { UsersForm } from "../../components/UsersForm/UsersForm";
import { FadeIn } from "../../components/FadeIn/FadeIn";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export const Registration = () => {
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      navigate(location.pathname, { replace: true });
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="registration" className="registration">
      {loading ? (
        <Loader />
      ) : (
        <>
          <FadeIn direction="left" delay={0.2}>
            <BackPath />
          </FadeIn>
          <FadeIn direction="left" delay={0.4}>
            <h1 className="registration__title">Реєстрація</h1>
          </FadeIn>
          <FadeIn direction="left" delay={0.6}>
            <UsersForm
              mode="register"
              values={values}
              checked={checked}
              setChecked={setChecked}
              onChange={handleChange}
            />
          </FadeIn>
        </>
      )}
    </section>
  );
};
