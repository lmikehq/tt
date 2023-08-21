import { FormikValues, useField } from "formik";
import { useEffect, useState } from "react";
import Input from "./input";
import Text from "./text";
import { ttColors } from "theme/colors";
import SearchInput, { SearchInputAsString } from "./searchInput";
import { ReactNode } from "react";
import { DatePicker } from "@atom/datepicker";
import EnlargedDate from "./enlargedDate";
import dayjs from "dayjs";

interface FieldProps {
  name: string;
  type?:
    | "text"
    | "number"
    | "file"
    | "textArea"
    | "password"
    | "email"
    | "tel"
    | "address"
    | "checkbox";
  placeholder?: string;
  formik: FormikValues;
  options?: any[];
  addon?: ReactNode;
  views?: ('year' | 'month' | 'day' )[];
  disabled?: boolean;
}

function getNestedValue(obj: any, propertyPath: string) {
  const properties = propertyPath.split(".");
  let value = obj;
  for (const prop of properties) {
    if (value && typeof value === "object") {
      value = value[prop];
    } else {
      return undefined;
    }
  }
  return value;
}

export const FieldInput = (props: FieldProps) => {
  const { name, type, placeholder, formik, addon } = props;
  const [field, meta] = useField(name);

  const { onChange } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue(name, value);
    sessionStorage.setItem(name, value);
    onChange(e);
  };

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <div>
      <Input
        height="40px"
        addon={addon}
        type={type}
        placeholder={placeholder}
        padding="1.5rem"
        {...field}
        onChange={handleChange}
        value={formik.values[name]}
      />
      {meta.touched && meta.error ? (
        <Text type="p" color={ttColors.red} text={meta.error} />
      ) : null}
    </div>
  );
};

export const ArrayInput = (props: FieldProps) => {
  const { name, type, placeholder, formik, addon } = props;
  const [field, meta] = useField(name);

  const { onChange } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue(name, value);
    sessionStorage.setItem(name, value);
    onChange(e);
  };

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  const value = getNestedValue(formik.values, name);

  return (
    <div>
      <Input
        height="40px"
        addon={addon}
        type={type}
        placeholder={placeholder}
        padding="1.5rem"
        {...field}
        onChange={handleChange}
        value={value}
      />
      {meta.touched && meta.error ? (
        <Text type="p" color={ttColors.red} text={meta.error} />
      ) : null}
    </div>
  );
};

export const FieldAsString = (props: FieldProps) => {
  const { name, options = [], formik, placeholder } = props;
  const [field, meta] = useField(name);

  const { onChange } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e);
    onChange({ target: { name: field.name, value: e } });
    sessionStorage.setItem(name, field.value);
  };

  const nestedPropertyPath = name.split(".");
  const value = nestedPropertyPath.reduce((value, property) => {
    return value && value[property];
  }, formik.values);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <SearchInputAsString
      height="20px"
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
    >
      <Text
        type="p"
        text={value}
        color="#1C1B1F"
        weight={100}
        styles={{ cursor: "pointer" }}
      />
    </SearchInputAsString>
  );
};

export const FieldString = (props: FieldProps) => {
  const { name, options = [], formik, placeholder } = props;
  const [field, meta] = useField(name);

  const { onChange } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e);
    onChange({ target: { name: field.name, value: e } });
    sessionStorage.setItem(name, field.value);
  };

  const value = getNestedValue(formik.values, field.name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <SearchInput
      height="20px"
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      value={value?.name}
    >
      <Text
        type="p"
        text={value?.name}
        color="#1C1B1F"
        weight={100}
        styles={{ cursor: "pointer" }}
      />
    </SearchInput>
  );
};

export const FieldAsDate = (props: FieldProps) => {
  const { name, disabled, formik, views } = props;
  const [field, meta] = useField(name);

  const { onChange } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e);
    onChange({ target: { name: field.name, value: e } });
    sessionStorage.setItem(name, field.value);
  };

  const value = getNestedValue(formik.values, field.name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <DatePicker
      label={disabled ? 'Present': ''}
      disabled={disabled}
      views={views}
      value={value}
      onChange={handleChange}
    />
  );
};
