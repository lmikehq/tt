import { ttColors } from '@/lib/theme/colors'
import { Box, Dialog } from '@mui/material'
import styled from 'styled-components'
import Section from '../../section'
import Flex from '@/components/templates/flex'
import { FaFileUpload } from 'react-icons/fa'
import Text from '@/components/atoms/text'
import { IoMdClose } from 'react-icons/io'
import Button from '@/components/atoms/button'
import { useScreenResolution } from '@/lib/extensions/hook/useScreenResolution'
import toast from 'react-hot-toast'
import useCloudinaryUpload from '@/lib/extensions/hook/useCloudinary'
import { useState } from 'react'
import { useUserStore } from '@/lib/store/useStore'
import { useFormik } from 'formik'
import { BsCheck2Circle } from 'react-icons/bs'


interface Props {
  documentModal: boolean
  setDocumentModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DocumentModalContainer = styled(Dialog)`
  display: block;
  
  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    border-radius: 12px;
  }

  .file-button {
    display: inline-block;
    background-color: ${ttColors.primary300};
    /* Button background color */
    color: ${ttColors.primaryLight};
    /* Button text color */
    border: none;
    cursor: pointer;
    border-radius: 4px;
    height: 56px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Style the input to be hidden */
  input[type="file"] {
    display: none;
  }

`

export const DocumentUploadModal = ({ documentModal, setDocumentModal }: Props) => {
  const { user } = useUserStore(state => state)
  const formik = useFormik({
    initialValues: {},
    validationSchema: '',
    onSubmit: () => { }
  })

  const data = {
    firstName: '',
    lastName: ''
  }
  const [file, setFile] = useState({
    blobData: '',
    fileName: '',
    fileType: '',
    fileSizeMB: 0
  })
  const timestamp = new Date().getTime()
  // const presets = {
  //   publicId: selected?.primaryTraveller?.lastName + timestamp || "unknown",
  //   folder: `${selected?.primaryTraveller?.lastName + timestamp || "unknown"}-files`
  // }
  const presets = {
    publicId: data.firstName || 'unknown',
    folder: `${data.lastName || 'unknown'}-files`
  }

  const { uploadImage, loading: cloudinaryImageLoading, progress, deleteImage, deleting } = useCloudinaryUpload({ presets })
  const getBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const file = files[0]
      const res = await getBase64(file)
      const fileName = file.name
      const fileType = file.type
      const fileSize = file.size

      const newFile = {
        blobData: res,
        fileName: fileName,
        fileType,
        fileSizeMB: fileSize / (1024 * 1024)
      }
      setFile(newFile)

      try {
        const secureUrl = await uploadImage({ file: file })
        // setCloudinaryUrl(secureUrl)
        formik.setFieldValue('cloudinaryUrl', secureUrl)

      } catch (err) {
        toast.error('Error uploading the file')
      }
    }
  }

  const handleClose = () => {
    setDocumentModal(false)
  }
  const { isMobile } = useScreenResolution()

  return (
    <DocumentModalContainer
      onClose={handleClose}
      open={documentModal}>

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
        <Flex direction="column" gap="16px" align="center" justify="center" margin="0 0 44px">
          <Text type='h1' text='Upload Document' weight={600} size={isMobile ? 22 : 32} />
          <Text type='p' text='Kindly Upload the required Document as it will help continue your application' textAlign="center" color={ttColors.lighterGray} />
        </Flex>

        <Flex direction='column' gap='24px'>
          <Text type='p' text='Bio Metric Document Needed' size={18} textAlign='center' />

          <Section>
            <Flex styles={{ padding: '20px', borderRadius: '12px' }} border={`1px dashed ${ttColors.primary600}`} >
              <Flex direction="column" align="center" justify="center" gap="56px">
                <Flex direction="column" align="center" justify="center" gap="21px">
                  <FaFileUpload size={56} color='#87CEEB' />
                  <Text type='p' text='PNG, JPG up to 10MB' styles={{ textAlign: 'center' }} />
                </Flex>
                <Flex direction="column" align="center" justify="center" gap='18px'>
                  <Text type="h5" text='Select your file' />
                  <label htmlFor="file-input" className="file-button">
                    <input
                      type="file"
                      id="file-input"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                      accept=".png, .jpg, .jpeg, .gif"
                    />
                    Choose a File
                  </label>
                </Flex>
              </Flex>
            </Flex>
          </Section>

          <Button
            background={ttColors.dark}
            width='100%'
          >
            <Text type='p' text='Continue' weight={500} />
          </Button>
        </Flex>
      </Box>
    </DocumentModalContainer>
  )
}



const DocumentStatusContainer = styled(Dialog)`
  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    border-radius: 12px;
    width: 647px;
    max-width: 647px;
  }
`

interface IDocumentStatusProps {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const DocumentUploadStatus = ({ state, setState }: IDocumentStatusProps) => {
  const { isMobile } = useScreenResolution()
  const handleClose = () => {
    setState(false)
  }

  return (
    <DocumentStatusContainer
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
        <Flex direction="column" gap="16px" align="center" justify="center" margin="0 0 44px">
          <Text type='h1' text='Upload Document' weight={600} size={isMobile ? 22 : 32} />
          {/* <Text type='p' text='Kindly Upload the required Document as it will help continue your application' textAlign="center" color={ttColors.lighterGray} /> */}
        </Flex>

        <Flex direction='column' gap='24px' align='center' justify='center' margin='0 0 44px'>
          <Flex width='190px' height='190px' align='center' justify='center' background={ttColors.primary300} borderRadius='50%'>
            <BsCheck2Circle size={118} color={ttColors.primaryLight} />
          </Flex>

          <Text type='p' text='Biometric Successfully Uploaded' weight={600} size={20} />
        </Flex>

        <Button background={ttColors.dark} width='100%'>
          <Text type='p' text='Continue' weight={500} />
        </Button>
      </Box>
    </DocumentStatusContainer>
  )
}