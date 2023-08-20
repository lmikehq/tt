import { FormikValues, useField } from "formik";
import { FC, useEffect } from "react";
import Input from "./input";
import Text from "./text";
import { ttColors } from "theme/colors";

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
  | "checkbox"
  placeholder?: string;
  formik: FormikValues
}

export const FieldInput: FC<FieldProps> = (props: FieldProps) => {
  const { name, type, placeholder, formik } = props;
  const [field, meta] = useField(name);

  const { onChange } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.setFieldValue(name, value);
    sessionStorage.setItem(name, value)
    onChange(e)
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