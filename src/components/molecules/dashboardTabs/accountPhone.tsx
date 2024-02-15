import React, { useState } from "react"; // Import your modal component
import Text from "@atom/text"; // Import other necessary components
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Flex from "@components/templates/flex";
import Required from "@atom/required";
import PhoneInput from "react-phone-input-2";
import { RefetchProp } from "types";
import { useFormik } from "formik";
import * as yup from 'yup';
import apiService from "@/lib/extensions/hook/apiService";
import toast from "react-hot-toast";

type PhoneModalProps = {
  open: boolean; // Change this type to match your actual type
  onClose: () => void;
  refetch: RefetchProp;
};

const PhoneModal: React.FC<PhoneModalProps> = ({ open, onClose, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { isMobile } = useScreenResolution();
  const formik = useFormik({
    initialValues: {
      phoneNumber: ''
    },
    validationSchema: yup.object().shape({
      phoneNumber: yup.string().required("Enter Phone Number")
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await apiService(`/user/update`, 'POST', {
          phoneNumber: values.phoneNumber
        });
        if (response._id.length > 1) {
          refetch();
          toast.success('Phone Number Updated');
          formik.resetForm();
        }
        setLoading(false);
        onClose();
      }
      catch (err) {
        setLoading(false);
        throw err;
      }
    },
  });

  return (
    <ReusableModal
      loading={loading}
      open={open}
      onClose={onClose}
      headerText="Edit Your Phone Number"
      maxWidth={isMobile ? '90%' : '640px'}
      description="Stay connected always: Update your phone number"
      buttonProps={{
        text: "Save Changes",
        onClick() {
          // console.log('clicked');
          formik.handleSubmit();
        },
      }}
    >
      {/* Additional content goes here */}
      <Section styles={{ margin: "0px 0px 2.5rem" }}>
        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text="Phone Number"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <PhoneInput
          country={"ng"}
          autoFormat={true}
          inputProps={{
            name: "phoneNumber",
          }}
          inputClass="w"
          placeholder="Enter phone number"
          value={formik.values.phoneNumber}
          onChange={(e) => {
            console.log(e);
            formik.setFieldValue('phoneNumber', e);
          }}
          onBlur={formik.handleBlur}
        />
      </Section>
    </ReusableModal>
  );
};

export default PhoneModal;
