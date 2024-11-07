import React, {useEffect, useState} from "react";
import {fetchUser, fetchUserForm, updateUserData} from "../api/fetch.ts";
import "./index.css";
import TextInput from "./TextInput.tsx";
import Select, {Option} from "./Select.tsx";
import CountrySelect from "./CountrySelect.tsx";
import DateField from "./DateField.tsx";

type Field = {
  name: string,
  disabled: boolean,
  required: boolean,
  label: string,
  type: string,
  options?: Option[],
};
type ErrorType = Record<string, {
  message: string,
}>;

const UserForm = () => {
  const [schema, setSchema] = useState<Field[]>([]);
  const [formState, setFormState] = useState<{[key: string]: string}>({});
  const [formErrors, setFormErrors] = useState<ErrorType>({});
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const validateForm = () => {
    const validationErrors: ErrorType = {};
    schema.forEach(field => {
      if (field.required && !formState[field.name]) {
        validationErrors[field.name] = {
          message: 'Field should not be blank',
        }
      }
    });
    return validationErrors;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.entries(errors).length > 0) {
      return setFormErrors(errors);
    }

    const response = await updateUserData(formState);
    if (response.ok) {
      setIsDataUpdated(true);
    }
  };

  useEffect(() => {
    fetchUser("1").then(response => response.json()).then(data => {
      const initialFields = Object.entries(data).map(value => value[0]);
      fetchUserForm(initialFields).then(response => response.json()).then((schema: Field[]) => {
        setSchema(schema);
        const initialState = Object.fromEntries(schema.map(field => [field.name, ""]));
        setFormState(prevForm => ({
          ...prevForm,
          ...initialState,
          ...data,
        }));
      });
    });

  }, []);

  if (isDataUpdated) return <p>Thank you for filling form!</p>

  const changeHandler = (inputName: string, newValue: string) => setFormState(prevState => ({
    ...prevState,
    [inputName]: newValue,
  }));

  if (!schema || schema.length === 0) return <p>Something went wrong</p>;

  return <form className="userForm" onSubmit={submitHandler}>
    {
      schema.map(field => {
        switch (field.type) {
          case "text":
          case "address":
            return <TextInput
              key={field.name}
              fieldName={field.name}
              disabled={field.disabled}
              value={formState[field.name]}
              changeHandler={changeHandler}
              label={field.label}
              validationError={formErrors[field.name]}
            />
          case "select":
            return <Select
              key={field.name}
              fieldName={field.name}
              value={formState[field.name]}
              changeHandler={changeHandler}
              disabled={field.disabled}
              label={field.label}
              options={field.options || []}
              validationError={formErrors[field.name]}
            />
          case "date":
            return <DateField
              changeHandler={changeHandler}
              fieldName={field.name} label={field.label}
              value={formState[field.name]}
              disabled={field.disabled}
              validationError={formErrors[field.name]}
            />
          case "country-select":
            return <CountrySelect
              key={field.name}
              fieldName={field.name}
              value={formState[field.name]}
              changeHandler={changeHandler}
              label={field.label}
              disabled={field.disabled}
              validationError={formErrors[field.name] && formErrors[field.name]}
            />
          default:
            console.error("Unknown type of input");
        }
      })
    }
    <button type="submit">Submit</button>
  </form>
};

export default UserForm;
