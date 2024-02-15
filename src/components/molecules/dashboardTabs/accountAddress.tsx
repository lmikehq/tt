import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Input from "@atom/input";
import Flex from "@components/templates/flex";
import Required from "@atom/required";
import { useFormik } from "formik";
import * as yup from 'yup';
import apiService from "@/lib/extensions/hook/apiService";
import { ttColors } from "@/lib/theme/colors";
import { useState } from "react";
import { RefetchProp } from "types";
import toast from "react-hot-toast";

type AddressModalProps = {
  open: boolean;
  onClose: () => void;
  refetch: RefetchProp;
};

const AddressModal: React.FC<AddressModalProps> = ({ open, onClose, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { isMobile } = useScreenResolution();
  const formik = useFormik({
    initialValues: {
      address: ''
    },
    validationSchema: yup.object().shape({
      address: yup.string().required("Enter Address")
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await apiService(`/user/update`, 'POST', {
          address: values.address
        });
        if (response._id.length > 1) {
          refetch();
          toast.success('Address Updated');
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
      headerText="Edit Your Address"
      maxWidth={isMobile ? '90%' : '640px'}
      description="Keep us informed: Edit your address"
      buttonProps={{
        text: "Save Changes",
        onClick() {
          formik.handleSubmit();
        },
      }}
    >
      {/* Additional content goes here */}
      <Section >
        <Flex align="center" gap="0.5rem">
          <Text
            type="p"
            text="Address"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}

          />
          <Required />
        </Flex>
        <Section margin="0 0 2.5rem">
          <Input
            placeholder="St 32 main downtown, Los Angeles, California, USA"
            height="3rem"
            type="text"
            name="address"
            onBlur={formik.handleBlur}
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.touched.address && formik.errors.address && (
            <Text
              type="p"
              text={formik.errors.address!}
              size={14}
              weight={500}
              color={ttColors.red}
              styles={{ wordBreak: "break-all" }}
              margin={0}
            />
          )}
        </Section>
      </Section >
    </ReusableModal >
  );
};

export default AddressModal;
