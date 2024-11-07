import * as React from "react";

type DateInputType = {
  changeHandler: (name: string, value: string) => void,
  fieldName: string,
  label: string,
  value: string,
  disabled: boolean,
  validationError?: {
    message: string,
  },
};
const DateInput: React.FC<DateInputType> = ({changeHandler, fieldName, value, disabled, validationError, label}) => {
  return <div className="fieldWrapper">
    <label htmlFor={fieldName}>{label}</label>
    <input
      key={fieldName}
      id={fieldName}
      disabled={disabled}
      type="date"
      value={value}
      onChange={(e) => changeHandler(fieldName, e.target.value)}
    />
    {validationError && <p className="errorMessage">{validationError.message}</p>}
  </div>
};

export default DateInput;
