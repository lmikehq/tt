import { useFormik } from "formik";

const useFormikHook = (initialValues: any, validationSchema: any) => {
  return useFormik({
    initialValues,
    ...validationSchema,
  });
};

export default useFormikHook;
