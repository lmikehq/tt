import { FormikValues, useField } from "formik";
import { useEffect, useState } from "react";
import Input from "./input";
import Text from "./text";
import { ttColors } from "theme/colors";
import { SearchInputAsString } from "./searchInput";
import { ReactNode } from "react";
import { DatePicker } from "@atom/datepicker";
import dayjs from "dayjs";
import SearchStringInput from "@molecule/searchInputs/searchStringInput";
import SearchFlagInput from "@molecule/searchInputs/searchFlagInput";

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
  placeholder: string;
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

  const value = getNestedValue(formik.values, field.name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <SearchFlagInput
      value={value?.name}
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
    />
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

  console.log(placeholder)

  return (
    <SearchStringInput
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
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
