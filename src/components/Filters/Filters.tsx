import { categories } from "../../types/Categories";
import { getDateOptions } from "../../types/Date";
import { forWho } from "../../types/ForWho";
import { kyivDistricts } from "../../types/KyivDistrict";
import { regime } from "../../types/Regime";
import { CustomSelect } from "../CustomSelect/CustomSelect";

type Props = {
  handleFilterBy: (value: string) => void;
  filter: string;
};

export const Filters: React.FC<Props> = ({ handleFilterBy, filter }) => {
  const dateOptions = getDateOptions();
  return (
    <article className="filters">
      <div className="filters__sort-box">
        <div className="filters__sort">Київ</div>
        <CustomSelect
          options={kyivDistricts}
          onChange={handleFilterBy}
          value={filter}
        />

        <CustomSelect
          options={categories}
          onChange={handleFilterBy}
          value={filter}
        />

        <CustomSelect
          options={dateOptions}
          onChange={handleFilterBy}
          value={filter}
        />

        <CustomSelect
          options={forWho}
          onChange={handleFilterBy}
          value={filter}
        />

        <CustomSelect
          options={regime}
          onChange={handleFilterBy}
          value={filter}
        />
      </div>
    </article>
  );
};
