import { FormikValues } from "formik";
import { useEffect } from "react";

function useFormikLocalStorage(
    formik: FormikValues,
    initialValues: any
) {
  useEffect(() => {
    const storedValues = Object.keys(initialValues).reduce((acc, key) => {
      const storedValue = localStorage.getItem(key);
      return { ...acc, [key]: storedValue || initialValues[key] };
    }, {});
    formik.setValues(storedValues);
  }, []);

  const updateFieldValue = (fieldName: string, value: string) => {
    formik.setFieldValue(fieldName, value);
    localStorage.setItem(fieldName, value);
  };

  const clearLocalStorage = () => {
    Object.keys(initialValues).forEach((key) => {
      localStorage.removeItem(key);
    });
    formik.resetForm();
  };

  return { updateFieldValue, clearLocalStorage };
}

export default useFormikLocalStorage;