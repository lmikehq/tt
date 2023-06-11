import { useFormik } from "formik";

const useFormikHook = (initialValues: any, validationSchema: any) => {
  return useFormik({
    initialValues,
    validationSchema,
    onSubmit(values, formikHelpers) {
        console.log('s aslk aklja i g;jb sfukc u', values, formikHelpers)
    },
  });
};

export default useFormikHook;