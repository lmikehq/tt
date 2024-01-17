import React, { useState } from "react" // Import your modal component
import Text from "@atom/text" // Import other necessary components
import Section from "src/components/molecules/section"
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution"
import ReusableModal from "./components/dashboardModal"
import Input, { TextField } from "@atom/input"
import Flex from "@components/templates/flex"
import Required from "@atom/required"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { useToggle } from "@/hooks/useToggle"
import { useFormik } from "formik"
import { updatePasswordSchema, updatePasswordVal } from "@/lib/types/schema"
import { ttColors } from "@/lib/theme/colors"

type PasswordModalProps = {
  open: boolean // Change this type to match your actual type
  onClose: () => void
}

const PasswordModal: React.FC<PasswordModalProps> = ({ open, onClose }) => {
  const { isMobile } = useScreenResolution()
  const { toggle: oldPasswordToggle, handleToogle: handleToggleOld } = useToggle()
  const { toggle: newPasswordToggle, handleToogle: handleToggleNew } = useToggle()
  const { toggle: confirmPasswordToggle, handleToogle: handleToggleConfirm } = useToggle()

  const formik = useFormik({
    initialValues: updatePasswordVal,
    validationSchema: updatePasswordSchema,
    onSubmit: (values) => {
      // console.log({ values })
    }
  })

  return (
    <ReusableModal
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
                type={oldPasswordToggle ? "text" : "password"}
                border="none"
                parentWidth="100%"
                onChange={formik.handleChange}
                width="100%"
              />
              {oldPasswordToggle ? (
                <IoEyeOutline size={20} onClick={handleToggleOld} style={{ cursor: 'pointer' }} />
              ) : (
                <IoEyeOffOutline size={20} onClick={handleToggleOld} style={{ cursor: 'pointer' }} />
              )}
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
                type={newPasswordToggle ? "text" : "password"}
                border="none"
                parentWidth="100%"
                width="100%"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="newPassword"
              />
              {newPasswordToggle ? (
                <IoEyeOutline size={20} onClick={handleToggleNew} style={{ cursor: 'pointer' }} />
              ) : (
                <IoEyeOffOutline size={20} onClick={handleToggleNew} style={{ cursor: 'pointer' }} />
              )}
              {/* <IoEyeOutline /> */}
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
                type={confirmPasswordToggle ? "text" : "password"}
                border="none" parentWidth="100%" width="100%"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {confirmPasswordToggle ? (
                <IoEyeOutline size={20} onClick={handleToggleConfirm} style={{ cursor: 'pointer' }} />
              ) : (
                <IoEyeOffOutline size={20} onClick={handleToggleConfirm} style={{ cursor: 'pointer' }} />
              )}
              {/* <IoEyeOutline /> */}
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
  )
}

export default PasswordModal
