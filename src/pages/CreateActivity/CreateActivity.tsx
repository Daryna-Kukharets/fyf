import { ActivityForm } from "../../components/ActivityForm/ActivityForm";
import { BackPath } from "../../components/BackPath/BackPath";
import { FadeIn } from "../../components/FadeIn/FadeIn";

export const CreateActivity = () => {
  return (
    <section id="create-activity" className="createActivity">
      <div className="createActivity__box">
        <FadeIn direction="left" delay={0.2}>
          <BackPath />
        </FadeIn>
        <FadeIn direction="left" delay={0.4}>
          <h1 className="createActivity__title">Створити подію</h1>
        </FadeIn>
        <FadeIn direction="left" delay={0.6}>
          <ActivityForm />
        </FadeIn>
      </div>
    </section>
  );
};
