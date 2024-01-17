import Text from "@atom/text"
import Section from "src/components/molecules/section"
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution"
import ReusableModal from "./components/dashboardModal"
import Input from "@atom/input"
import Flex from "@components/templates/flex"
import Required from "@atom/required"

type AddressModalProps = {
  open: boolean
  onClose: () => void
}

const AddressModal: React.FC<AddressModalProps> = ({ open, onClose }) => {
  const { isMobile } = useScreenResolution()

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Edit Your Address"
      maxWidth={isMobile ? '90%' : '640px'}
      description="Keep us informed: Edit your address"
    >
      {/* Additional content goes here */}
      <Section>
        <Flex align="center" gap="0.5rem">
          <Text
            type="p"
            text="Address"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <Input
          placeholder="St 32 main downtown, Los Angeles, California, USA"
          height="3rem"
          type="text"
          margin="0px 0px 2.5rem"
        />
      </Section>
    </ReusableModal>
  )
}

export default AddressModal
