import { FormikProvider, FormikValues, useField } from "formik";
import { useEffect } from "react";
import Input from "./input";
import Text from "./text";
import { ttColors } from "theme/colors";
import { ReactNode } from "react";
import { DatePicker } from "@atom/datepicker";
import SearchStringInput from "@molecule/searchInputs/searchStringInput";
import SearchFlagInput from "@molecule/searchInputs/searchFlagInput";
import Section from "@molecule/section";
import dayjs, { Dayjs } from "dayjs";

interface FieldProps {
  value?: string;
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
  views?: ("year" | "month" | "day")[];
  disabled?: boolean;
  onChange?: (x: any) => void;
  minDate?: Dayjs | null;
  maxDate?: Dayjs;
  max?: number;
  min?: number;
}

window.onbeforeunload = () => {
  sessionStorage.clear();
};

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

export const ErrorText = ({ text }: { text: string }) => {
  return (
    <Section styles={{ position: "relative" }}>
      <Section
        height="fit-content"
        styles={{ position: "absolute", top: "0.25rem" }}
      >
        <Text
          type="p"
          size={14}
          weight={200}
          color={ttColors.red}
          styles={{ wordBreak: "break-all" }}
          text={text}
        />
      </Section>
    </Section>
  );
};

export const FieldInput = (props: FieldProps) => {
  const { name, type, placeholder, formik, addon, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue(name, value);
    sessionStorage.setItem(name, value);
  };
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  return (
    <Section padding="0 0 1.2rem 0">
      <Input
        height="45px"
        addon={addon}
        type={type}
        placeholder={placeholder}
        padding="0 0 0 14px"
        onChange={onChange ? onChange : handleChange}
        value={formik.values[name]}
        onBlur={() => formik.setTouched({ ...formik.touched, [name]: true })}
      />

      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};

export const ArrayInput = (props: FieldProps) => {
  const { name, type, placeholder, formik, addon, max, min } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if(type === 'number') {
      parseFloat(value) > 5 ? value = "5" : value
    }
    formik.setFieldValue(name, value);
    sessionStorage.setItem(name, value);
  };

  const value = getNestedValue(formik.values, name);
  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <div>
      <Input
        height="45px"
        addon={addon}
        type={type}
        max={max}
        min={min}
        placeholder={placeholder}
        padding="0 0 0 14px"
        onChange={handleChange}
        value={value}
        onBlur={formik.handleBlur}
      />
    </div>
  );
};

export const FieldAsString = (props: FieldProps) => {
  const { name, options = [], formik, placeholder, value } = props;
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  const handleChange = (e: any) => {
    formik.setFieldValue(name, e.name);
    sessionStorage.setItem(name, e.name);
  };

  const formikvalue = getNestedValue(formik.values, name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <Section styles={{ position: "relative" }} padding="0 0 1.2rem 0">
      <SearchFlagInput
        value={value ? value : formikvalue}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
      />{" "}
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};

export const FieldString = (props: FieldProps) => {
  const { name, options = [], formik, placeholder, onChange, value } = props;
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  const handleChange = (e: any) => {
    formik.setFieldValue(name, e);
    sessionStorage.setItem(name, e);
  };

  const formikvalue = getNestedValue(formik.values, name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <Section styles={{ position: "relative" }} padding="0 0 1.2rem 0">
      <SearchStringInput
        options={options}
        onChange={onChange ? onChange : handleChange}
        placeholder={placeholder}
        value={value ? value : formikvalue}
      />
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};

export const FieldAsDate = (props: FieldProps) => {
  const {
    name,
    disabled,
    formik,
    views,
    onChange,
    minDate,
    maxDate,
    placeholder,
  } = props;
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  const handleChange = (e: any) => {
    formik.setFieldValue(name, `${e.$d}`);
    sessionStorage.setItem(name, e);
  };

  const value = getNestedValue(formik.values, name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <Section styles={{ position: "relative" }} padding="0 0 1.2rem 0">
      <DatePicker
        disabled={disabled}
        views={views}
        placeholder={placeholder}
        maxDate={maxDate}
        minDate={minDate}
        value={value === "" ? null : dayjs(value)}
        onChange={onChange ? onChange : handleChange}
      />

      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};


