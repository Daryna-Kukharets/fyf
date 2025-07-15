import { ActivityForm } from "../../components/ActivityForm/ActivityForm";
import { BackPath } from "../../components/BackPath/BackPath";

export const CreateActivity = () => {
  return (
    <section id="create-activity" className="createActivity">
      <BackPath />
      <h1 className="createActivity__title">Створити подію</h1>
      <ActivityForm />
    </section>
  );
};
