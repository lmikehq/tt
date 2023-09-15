import { FormikProvider, FormikValues, useField } from "formik";
import Input from "@atom/input";
import Text from "@atom/text";
import { ttColors } from "@lib/theme/colors";
import { ReactNode } from "react";
import { DatePicker } from "@organism/datepicker";
import SearchStringInput from "src/components/molecules/searchInputs/searchStringInput";
import SearchFlagInput from "src/components/molecules/searchInputs/searchFlagInput";
import Section from "src/components/molecules/section";
import dayjs, { Dayjs } from "dayjs";

interface FieldProps {
  value?: string;
  defaultValue?: string;

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
  step?: string;
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
  format?: string;
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

export const ErrorText = ({ text }: { text: string }) => {
  return (
    <Section styles={{ position: "relative", marginBottom: "1rem" }}>
      <Section
        height="fit-content"
        styles={{ position: "absolute", top: "0.25rem" }}
      >
        <Text
          type="p"
          size={14}
          weight={500}
          color={ttColors.red}
          styles={{ wordBreak: "break-all" }}
          text={text}
        />
      </Section>
    </Section>
  );
};

export const FieldInput = (props: FieldProps) => {
  const { name, type, placeholder, formik, addon, onChange, disabled } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue(name, value);
  };
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  return (
    <Section>
      <Input
        height="45px"
        addon={addon}
        readOnly={disabled}
        type={type}
        placeholder={placeholder}
        padding="0 0 0 14px"
        onChange={onChange ? onChange : handleChange}
        value={getNestedValue(formik.values, name)}
        onBlur={() => formik.setTouched({ ...formik.touched, [name]: true })}
        error={touched && error}
      />
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};

export const ArrayInput = (props: FieldProps) => {
  const {
    name,
    type,
    placeholder,
    formik,
    addon,
    max,
    min,
    defaultValue,
    step,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if(name.includes('cgpa')) {
      parseFloat(value) > 5 ? (value = "5") : value;
    }

    formik.setFieldValue(name, value);
  };

  const value = getNestedValue(formik.values, name);
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  return (
    <div>
      <Input
        height="45px"
        addon={addon}
        step={step}
        type={type}
        max={max}
        min={min}
        defaultValue={defaultValue}
        placeholder={placeholder}
        padding="0 0 0 14px"
        onChange={handleChange}
        value={value == 0 ? "" : value}
        onBlur={formik.handleBlur}
        error={touched && error}
      />
      {touched && error ? <ErrorText text={error} /> : null}
    </div>
  );
};

export const FieldAsString = (props: FieldProps) => {
  const { name, options = [], formik, placeholder, value, onChange, disabled } = props;
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  const handleChange = (e: any) => {
    formik.setFieldValue(name, e.name);
  };

  const formikvalue = getNestedValue(formik.values, name);

  return (
    <Section styles={{ position: "relative" }}>
      <SearchFlagInput
        value={value ? value : formikvalue}
        options={options}
        onChange={onChange ? onChange : handleChange}
        placeholder={placeholder}
        disabled={disabled}
        error={touched && error}
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
  };

  const formikvalue = getNestedValue(formik.values, name);

  return (
    <Section styles={{ position: "relative" }}>
      <SearchStringInput
        options={options}
        onChange={onChange ? onChange : handleChange}
        placeholder={placeholder}
        value={value ? value : formikvalue}
        error={touched && error}
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
    format
  } = props;
  const touched = getNestedValue(formik.touched, name);
  const error = getNestedValue(formik.errors, name);

  const handleChange = (e: any) => {
    formik.setFieldValue(name, `${e.$d}`);
  };

  const value = getNestedValue(formik.values, name);

  return (
    <Section styles={{ position: "relative" }} padding="0 0 1.2rem 0">
      <DatePicker
        disabled={disabled}
        views={views}
        placeholder={placeholder}
        maxDate={maxDate}
        minDate={minDate}
        value={value === "" ? null : dayjs(`${value}`)}
        onChange={onChange ? onChange : handleChange}
        error={touched && error}
        format={format}
      />
      {touched && error ? <ErrorText text={error} /> : null}
    </Section>
  );
};