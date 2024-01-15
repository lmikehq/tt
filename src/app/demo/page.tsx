'use client'

import Flex from '@/components/templates/flex'
import ttLogo from 'public/assets/images/brand/tt_blue_logo_with_text1.png'
import { ttColors } from '@/lib/theme/colors'
import Text from '@/components/atoms/text'
import Button from '@/components/atoms/button'
import { useState } from 'react'
import { Box, Dialog } from '@mui/material'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import { IoMdClose } from 'react-icons/io'
import Section from '@/components/molecules/section'
import styled from 'styled-components'
import { FaFileUpload } from 'react-icons/fa'
import { useUserStore } from '@/lib/store/useStore'
import useCloudinaryUpload from '@/lib/extensions/hook/useCloudinary'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { DocumentUploadModal } from '@/components/molecules/dashboardTabs/components/uploadDocumentModal'
import { BsCheck2Circle } from "react-icons/bs"
import { FaCircleCheck } from "react-icons/fa6"
import VisaPaymentModal from "@/components/molecules/dashboardTabs/visaPayment"


function Demo() {
  const [documentModal, setDocumentModal] = useState(false)
  const [paymentModal, setPaymentModal] = useState(true)
  return (
    <>
      <Button background={ttColors.dark} onClick={() => setDocumentModal(true)}>
        <Text type='p' text='show modal' />
      </Button>

      {documentModal && <ApplicationStatus state={documentModal} setState={setDocumentModal} />}

      <VisaPaymentModal
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        visaDetails={{
          id: '1',
          intent: 'FORM FEE',
          accompanying: 0,
          refetch: () => { }
        }}
      />
    </>
  )
}

export default Demo


const ApplicationStatusModalContainer = styled(Dialog)`
  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    border-radius: 12px;
    width: 647px;
    max-width: 647px;
  }

  .confetti-bg {

  }
`

interface Props {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ApplicationStatus = ({ state, setState }: Props) => {
  const { isMobile } = useScreenResolution()
  const handleClose = () => {
    setState(false)
  }

  return (
    <ApplicationStatusModalContainer
      onClose={handleClose}
      open={state}
    >

      <Flex align="center" justify="flex-end" padding={isMobile ? "20px 20px 0" : "20px 42px 0"}>
        <Flex
          align="center"
          justify="center"
          borderRadius="4px"
          styles={{ cursor: 'pointer' }}
          height="30px"
          width="30px"
          onClick={() => handleClose()}
        >
          <Flex
            background={ttColors.grayishAsh}
            height="30px"
            width="30px"
            align="center"
            justify="center"
          >
            <IoMdClose />
          </Flex>
        </Flex>
      </Flex>

      <Box sx={{ padding: isMobile ? '0 24px 20px' : '0 74px 41px' }}>
        <div className="submission-successful-confetti-bg">
          <Flex direction="column" gap="16px" align="center" justify="center" margin="0 0 22px">
            <Flex align="center" justify="center">
              <FaCircleCheck size={95} color='#6092A7' />
            </Flex>
            <Text type='h1' text='Application Successful' weight={600} size={isMobile ? 22 : 32} />
            {/* <Text type='p' text='Kindly Upload the required Document as it will help continue your application' textAlign="center" /> */}
          </Flex>

          <Flex direction='column' gap='4px' align='center' justify='center' margin='0 0 44px'>
            <Text type="p" text="Congratulations!!." size={16} textAlign="center" color={ttColors.lighterGray} />
            <Text
              type='p'
              text={`Your Documents have been submitted and is currently being reviewed. Your Documents will be saved on your dashboard for 30 days and you are permitted to download once. `} weight={400}
              size={isMobile ? 14 : 16}
              color={ttColors.lighterGray}
              textAlign="center"
            />
          </Flex>

          <Flex align="center" gap="12px">
            <Button background={'transparent'} width='100%' border={`1px solid ${ttColors.dark}`}>
              <Text type='p' text='Download Application' weight={500} color={ttColors.dark} />
            </Button>

            <Button background={ttColors.dark} width='100%'>
              <Text type='p' text='Pay Processing Fee' weight={500} />
            </Button>
          </Flex>
        </div>
      </Box>
    </ApplicationStatusModalContainer>
  )
}