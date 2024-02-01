import React, { useState } from "react"; // Import your modal component
import Text from "@atom/text"; // Import other necessary components
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Input, { TextField } from "@atom/input";
import Flex from "@components/templates/flex";
import Required from "@atom/required";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useToggle } from "@/hooks/useToggle";
import { useFormik } from "formik";
import { updatePasswordSchema, updatePasswordVal } from "@/lib/types/schema";
import { ttColors } from "@/lib/theme/colors";
import apiService from "@/lib/extensions/hook/apiService";
import { DashboardAccountService } from "@/lib/services/dashboard/getUser";
import { RefetchProp } from "types";
import toast from "react-hot-toast";

type PasswordModalProps = {
  open: boolean; // Change this type to match your actual type
  onClose: () => void;
  refetch: RefetchProp;
};

const PasswordModal: React.FC<PasswordModalProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { isMobile } = useScreenResolution();

  const formik = useFormik({
    initialValues: updatePasswordVal,
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await DashboardAccountService.updatePassword({
          currentPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        if (response.message === "Password changed") {
          setLoading(false);
          toast.success(response.message);
        }
        onClose();
        formik.resetForm();
      } catch (err) {
        onClose();
        setLoading(false);

      }
    }
  });

  return (
    <ReusableModal
      loading={loading}
      open={open}
      onClose={onClose}
      headerText="Edit Your Password"
      description="Secure your account: Change your password"
      maxWidth={isMobile ? '90%' : '640px'}
      buttonProps={{
        text: 'Save Changes',
        onClick: () => formik.handleSubmit()
      }}
    >
      <form autoComplete="off" autoCorrect="off" method="post" action="/form">
        {/* Additional content goes here */}
        <Section>
          <Flex align="center" gap="0.5rem">
            <Text
              type="p"
              text="Enter Current Password"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <Flex direction="column" gap="8px" >
            <Flex justify="space-between" align="center" border="1px solid #bdbdbd" gap="10px" padding="0 10px 0 0" borderRadius="8px">
              <Input
                placeholder="******"
                height="3rem"
                name="oldPassword"
                onBlur={formik.handleBlur}
                type="password"
                border="none"
                parentWidth="100%"
                onChange={formik.handleChange}
                width="100%"
                value={formik.values.oldPassword}
              />

            </Flex>
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <Text
                type="p"
                text={formik.errors.oldPassword!}
                size={14}
                weight={500}
                color={ttColors.red}
                styles={{ wordBreak: "break-all" }}
                margin={0}
              />
            )}
          </Flex>
        </Section>

        <Section>
          <Flex align="center" gap="0.5rem">
            <Text
              type="p"
              text="Enter New Password"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>

          <Flex direction="column" gap="8px">
            <Flex justify="space-between" borderRadius="8px" align="center" border="1px solid #bdbdbd" gap="10px" padding="0 10px 0 0">
              <Input
                placeholder="******"
                height="3rem"
                type={"password"}
                value={formik.values.newPassword}
                border="none"
                parentWidth="100%"
                width="100%"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="newPassword"
              />

            </Flex>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <Text
                type="p"
                text={formik.errors.newPassword!}
                size={14}
                weight={500}
                color={ttColors.red}
                styles={{ wordBreak: "break-all" }}
                margin={0}
              />
            )}
          </Flex>
        </Section>

        <Section>
          <Flex align="center" gap="0.5rem">
            <Text
              type="p"
              text="Confirm New Password"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <Flex gap="8px" direction="column" margin="0px 0px 2.5rem">
            <Flex justify="space-between" borderRadius="8px" align="center" border="1px solid #bdbdbd" gap="10px" padding="0 10px 0 0">
              <Input
                placeholder="******"
                height="3rem"
                type={"password"}
                border="none" parentWidth="100%" width="100%"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}

              />
              {/* {confirmPasswordToggle ? (
                <IoEyeOutline size={20} onClick={handleToggleConfirm} style={{ cursor: 'pointer' }} />
              ) : (
                <IoEyeOffOutline size={20} onClick={handleToggleConfirm} style={{ cursor: 'pointer' }} />
              )} */}

            </Flex>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <Text
                type="p"
                text={formik.errors.confirmPassword!}
                size={14}
                weight={500}
                color={ttColors.red}
                styles={{ wordBreak: "break-all" }}
                margin={0}
              />
            )}
          </Flex>
        </Section>
      </form>
    </ReusableModal>
  );
};

export default PasswordModal;
