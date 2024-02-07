import { Box, Dialog } from "@mui/material";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import { IoMdClose } from "react-icons/io";
import { ttColors } from "@/lib/theme/colors";
import Text from "@/components/atoms/text";
import { useFormik } from "formik";
import Button from "@/components/atoms/button";
import { accompanyArraySchema, accompanyVal } from "@/lib/types/schema";
import AccompanyComponent from "./visa/accompany";
import { accompanyStore } from "@/lib/store/dashboard/accompany.store";
import { useState } from "react";
import { IAccompany } from "@/lib/types";
import ReusableModal from "./dashboardModal";

interface Props {
  open: boolean;
  setState: React.Dispatch<React.SetStateAction<{ open: boolean, type: string; }>>;
}

export const AddVisaAccompanyModal = ({ open, setState }: Props) => {
  const { isMobile } = useScreenResolution();
  const { numberOfDependants, removeDependant } = accompanyStore((state) => state);
  const [dependentsData, setDependentsData] = useState<IAccompany[]>([]);
  const [page, setPage] = useState(1);
  const [disablePrevBtn, setDisablePrevBtn] = useState(true);
  const [disableNextBtn, setDisableNextBtn] = useState(false);

  const handleClose = () => {
    setPage(1);
    setState((prev) => {
      return {
        ...prev,
        open: false,
        type: 'add-accompany'
      };
    });
  };

  // const formik = useFormik({
  //   initialValues: accompanyVal,
  //   validationSchema: accompanySchema,
  //   onSubmit: (values) => {
  //     console.log({ values });
  //   }
  // });

  // const handleSubmit = () => {
  //   formik.handleSubmit();
  // };

  const handleRemove = (index: number) => {
    // REMOVE THE INDEX POSITION
    // console.log({ numberOfDependants });
    removeDependant(index);
    // console.log(index, 'selected');
    // REMOVE THE ELEMENT FROM WHAT I WAMT TO SEND
  };

  const handlePrevPage = () => {
    if (page === 1) {
      return setDisablePrevBtn(true);
    }
    setPage((prev) => (prev - 1));
    setDisablePrevBtn(false);
  };

  const handleNextPage = () => {
    if (page === 5) {
      return setDisableNextBtn(true);
    }

    setPage((prev) => (prev + 1));
  };


  const renderPage = (step: number) => {
    switch (step) {
      case 1:
        return <AccompanyComponent key={`dependent 1`} index={step} handleRemove={handleRemove} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} setDependentsData={setDependentsData} />;
      case 2:
        return <AccompanyComponent key={`dependent 2`} index={step} handleRemove={handleRemove} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} setDependentsData={setDependentsData} />;
      case 3:
        return <AccompanyComponent key={`dependent 3`} index={step} handleRemove={handleRemove} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} setDependentsData={setDependentsData} />;
      case 4:
        return <AccompanyComponent key={`dependent 4`} index={step} handleRemove={handleRemove} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} setDependentsData={setDependentsData} />;
      case 5:
        return <AccompanyComponent key={`dependent 5`} index={step} handleRemove={handleRemove} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} setDependentsData={setDependentsData} />;
      default:
        <AccompanyComponent index={1} handleRemove={handleRemove} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} setDependentsData={setDependentsData} />;
        break;
    }
  };

  return (
    <ReusableModal
      headerText="Add Accompanies"
      description="Enter details of people you want to travel with."
      open={open}
      onClose={() => {
        handleClose();
      }}
      maxWidth="827px"
      width={isMobile ? "90%" : "827px"}
    >
      <Box sx={{ padding: isMobile ? '0 24px 20px' : '0 74px 41px' }}>
        {renderPage(page)}
      </Box>
    </ReusableModal>
  );
};

/**
 *  <Dialog
      open={open}
      onClose={() => {
        setPage(1);
        handleClose();
      }}
      sx={{
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          width: '827px',
          borderRadius: '12px',
          maxWidth: '827px',
        }
      }}
    >
      <Flex align="center" justify="flex-end" width="827px" padding={isMobile ? "20px 20px 0" : "20px 42px 0"}>
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
          <Text type='h1' text='Add Accompanies' weight={600} size={isMobile ? 22 : 32} />
          <Text type='p' text='Enter details of people you want to travel with.' textAlign="center" color={ttColors.lighterGray} />
        </Flex>

      
{ renderPage(page); }

      </Box >
    </Dialog >
 * */