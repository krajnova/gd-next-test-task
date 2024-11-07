import * as React from "react";

type Option = {
  label: string;
  value: string;
};
type Select = {
  changeHandler: (name: string, value: string) => void,
  fieldName: string,
  label: string,
  value: string,
  disabled: boolean,
  options: Option[],
  validationError?: {
    message: string,
  },
};

const Select = ({ changeHandler, fieldName, value, disabled, validationError, label, options }: Select) => {
  return <div className="fieldWrapper">
    <label htmlFor={fieldName}>{label}</label>
    <select
      key={fieldName}
      name={fieldName}
      value={value}
      disabled={disabled}
      onChange={(e) => changeHandler(fieldName, e.target.value)}
    >
      {!value && <option value=""></option>}
      {
        options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
      }
    </select>
    {validationError && <p className="errorMessage">{validationError.message}</p>}
  </div>
};

export default Select;
