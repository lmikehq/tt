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
  views?: ("year" | "month" | "day")[];
  disabled?: boolean;
  onChange?: (x: any) => void;
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

const ErrorText = ({ text }: { text: string }) => {
  return (
    <Section height="fit-content" styles={{ position: "absolute", bottom: 0 }}>
      <Text type="p" size={14} weight={200} color={ttColors.red} text={text} />
    </Section>
  );
};

export const FieldInput = (props: FieldProps) => {
  const { name, type, placeholder, formik, addon, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue(name, value);
    sessionStorage.setItem(name, value);
    console.log("here");
    console.log(formik);
  };
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <Section styles={{ position: "relative" }} padding="0 0 1.2rem 0">
      <Input
        height="40px"
        addon={addon}
        type={type}
        placeholder={placeholder}
        padding="1.5rem"
        onChange={onChange ? onChange : handleChange}
        value={formik.values[name]}
        onBlur={() => formik.setTouched({ ...formik.touched, [name]: true })}
      />
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};

export const ArrayInput = (props: FieldProps) => {
  const { name, type, placeholder, formik, addon } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue(name, value);
    sessionStorage.setItem(name, value);
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
        onChange={handleChange}
        value={value}
        onBlur={formik.handleBlur}
      />
      {/* {meta.touched && meta.error ? (
        <Text type="p" color={ttColors.red} text={meta.error} />
      ) : null} */}
    </div>
  );
};

export const FieldAsString = (props: FieldProps) => {
  const { name, options = [], formik, placeholder } = props;
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);
  // const [field, meta] = useField(name);

  // const { onChange } = field;

  const handleChange = (e: any) => {
    formik.setFieldValue(name, e.name);
    formik.setTouched({ ...formik.touched, [name]: true });
    // onChange({ target: { name: field.name, value: e } });
    sessionStorage.setItem(name, e.name);
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
      <SearchFlagInput
        value={value}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
      />{" "}
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};

export const FieldString = (props: FieldProps) => {
  const { name, options = [], formik, placeholder, onChange } = props;
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);
  // const [field, meta] = useField(name);

  // const { onChange } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(name, e);
    // onChange({ target: { name: field.name, value: e } });
    console.log("ELL");
    console.log(formik.values);
    // sessionStorage.setItem(name, field.value);
  };

  const value = getNestedValue(formik.values, name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  console.log(placeholder);

  console.log(formik);

  return (
    <Section styles={{ position: "relative" }} padding="0 0 1.2rem 0">
      <SearchStringInput
        options={options}
        onChange={onChange ? onChange : handleChange}
        placeholder={placeholder}
        value={value}
      />{" "}
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};

export const FieldAsDate = (props: FieldProps) => {
  const { name, disabled, formik, views, onChange } = props;
  // const [field, meta] = useField(name);
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);
  // const { onChange } = field;

  const handleChange = (e: any) => {
    formik.setFieldValue(name, `${e.$d}`);
    // onChange({ target: { name: field.name, value: e } });
    // sessionStorage.setItem(name, field.value);
  };

  // const value = getNestedValue(formik.values, field.name);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      formik.setFieldValue(name, storedValue);
    }
  }, []);

  return (
    <Section styles={{ position: "relative" }} padding="0 0 1.2rem 0">
      <DatePicker
        label={disabled ? "Present" : ""}
        disabled={disabled}
        views={views}
        // value={value}
        onChange={onChange ? onChange : handleChange}
      />{" "}
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};
