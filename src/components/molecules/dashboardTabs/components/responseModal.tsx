import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Box, Dialog } from "@mui/material";
import Section from "../../section";
import Image from "@/components/atoms/image";
import { ttColors } from "@/lib/theme/colors";
import { IoMdClose } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import confetti from 'public/assets/images/dashboard/confetti.png';
import { usePathname, useRouter } from "next/navigation";

interface Props<T> {
  state: T;
  onClose: () => void;
  headerText: string;
  description: string;
}
const ResponseModal = <T,>({ state, onClose, headerText, description }: Props<T>) => {
  const { isMobile } = useScreenResolution();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Dialog
      open={!!state}
      onClose={onClose}
      aria-labelledby="account-submission-successful"
      aria-describedby="your-reward-has-been-claimed-you-will-recieve-a-mail-shortly."
      sx={{
        fontFamily: 'nunito',
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          borderRadius: '12px',
          width: isMobile ? "90%" : "647px",
          maxWidth: isMobile ? "90%" : "647px"
        }
      }}
    >
      <Box sx={{ width: isMobile ? "90%" : "647px", maxWidth: isMobile ? "90%" : "647px", backgroundColor: "#FFF", borderRadius: '12px' }}>
        <Flex align="center" justify="flex-end" padding={isMobile ? "20px 20px 0" : "20px 42px 0"} position="relative">
          <Section styles={{ position: 'absolute', overflow: 'hidden', top: 0, right: 0, left: 0, zIndex: 0 }}>
            <Image src={confetti} alt="confetti-celebration-successful" styles={{ position: 'relative', objectFit: 'cover', overflow: 'hidden', zIndex: 1 }} />
          </Section>
          <Flex
            align="center"
            justify="center"
            borderRadius="6px"
            styles={{ cursor: 'pointer', zIndex: 99, }}
            height="30px"
            width="30px"
            onClick={onClose}
            position="relative"
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

        <Box sx={{ padding: isMobile ? '35px 20px' : '35px 62px', zIndex: 5 }}>
          <div style={{ padding: isMobile ? '0px' : '20px', fontFamily: 'inter', paddingTop: '0px', marginTop: '0px' }} className='submission-successful-confetti-bg'>
            <Flex align="center" justify="center">
              <FaCircleCheck size={95} color='#6092A7' style={{ position: 'relative', zIndex: 5 }} />
            </Flex>

            <Flex align="center" justify="center" gap="32px" direction="column" margin="0 0 56px">
              <Text type="h1" text={headerText} weight={700} size={32} styles={{ textAlign: 'center', position: 'relative', zIndex: 5 }} />
              <Text
                type='p'
                text={description}
                styles={{ textAlign: 'center' }}
                color={ttColors.lighterGray}
              />
            </Flex>

            <Button height="56px" width="100%" background={ttColors.dark} onClick={() => {
              if (pathname.includes('/dashboard')) {
                return onClose();
              } else {
                onClose();
                router.push('/dashboard');
              }
            }}>
              <Text type="p" text='Return to Dashboard' weight={500} />
            </Button>
          </div>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ResponseModal;