import * as React from "react";
import {getCountryDataList} from "countries-list";

export type CountrySelect = {
  changeHandler: (name: string, value: string) => void,
  fieldName: string,
  label: string,
  value: string,
  disabled: boolean,
  validationError?: {
    message: string,
  },
};

const countries = getCountryDataList();

const CountrySelect: React.FC<CountrySelect> = ({ changeHandler, fieldName, value, disabled, validationError, label }) => {
  return <div className="fieldWrapper">
    <label htmlFor={fieldName}>{label}</label>
    <select
      key={fieldName}
      name={fieldName}
      value={value}
      onChange={(e) => changeHandler(fieldName, e.target.value)}
      disabled={disabled}
    >
      {!value && <option value=""></option>}
      {
        countries.map(country => <option key={country.iso2} value={country.iso2}>{country.name}</option>)
      }
    </select>
    {validationError && <p className="errorMessage">{validationError.message}</p>}
  </div>
};

export default CountrySelect;
