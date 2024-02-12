'use client';
import { PDFViewer, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { PDFstyles as styles } from "@/styles/pdfStyle";
import Flex from "@/components/templates/flex";
import { ConvertDateToCad } from "@/lib/extensions/helpers/convertToCad";
import ttLogo2 from 'public/assets/images/dashboard/ttlogo-2.png';
import { FamilyMember, OldVisaApplication, VisaApplication } from "@/lib/types/visa";
import { isValidDate } from "@/lib/extensions/helpers/validDate";
import Box from "@/components/molecules/section/box";
import { useGetVisaApplication } from "@/lib/hooks/dashboard/visa.hook";
import { useParams } from "next/navigation";
import { isVisaApplication } from "@/lib/extensions/helpers/type-guard";
import Spinner from "@/components/molecules/icons/spinner";
import { ttColors } from "@/lib/theme/colors";

function DownloadVisaApplicationPage() {
  const router = useParams();

  const { data: visaData, isLoading } = useGetVisaApplication({
    query: router.id as string,
    options: { retry: 2 }
  });

  // console.log({ data });

  const data: VisaApplication | OldVisaApplication = visaData as VisaApplication | OldVisaApplication;


  function renderFamilyMember(data: any, relationship: string): FamilyMember[] | undefined {
    if (isVisaApplication(data)) {
      switch (relationship) {
        case 'Sibling':
          return data.familyInformation.siblingDetails;
        case 'Parent':
          return data.familyInformation.parentDetails;
        case 'Immediate':
          return data.familyInformation.immediateFamilyInfo;
      }
    } else {
      return data && data?.familyMembers?.filter((member: FamilyMember) => {
        if (member.relationshipToPrimary === relationship) {
          return member;
        }
      });
    }
  }

  function getFamilyMember(data: FamilyMember[], relationship: string) {
    if (relationship === 'Spouse') {
      return data.filter((member) => {
        if (member.relationshipToPrimary === 'Spouse') return member;
      });
    }

    if (relationship === 'Children') {
      return data.filter((member) => {
        if (member.relationshipToPrimary === 'Son' || member.relationshipToPrimary === 'Daughter') {
          return member;
        }
      });
    }

    if (relationship === 'Mother') {
      return data.filter((member) => {
        if (member.relationshipToPrimary === 'Mother') {
          return member;
        }
      });
    }

    if (relationship === 'Father') {
      return data.filter((member) => {
        if (member.relationshipToPrimary === 'Father') {
          return member;
        }
      });
    }

  }

  if (isLoading) {
    return <Flex align="center" margin="200px 0" justify="center"><Spinner size="60px" fill={ttColors.blackishBlue} /></Flex>;
  }

  return (
    <PDFViewer width="100%" showToolbar={true} height="900">
      {isVisaApplication(data) ? (
        <Document>
          {/* Page 1 */}
          <Page size="A4" style={[styles.page_one, styles.firstPage, styles.body]}>
            <View style={{ width: '100%' }}>
              {/* eslint-disable jsx-a11y/alt-text */}
              <Image src={ttLogo2.src} style={[styles.image, { marginBottom: 25 }]} />
              <Text style={[styles.header_main, { marginBottom: 10 }]}>THRILLERS TRAVELS</Text>
              <Text style={[styles.white, styles.firstPage_header_sub]}>Visa Application Document</Text>
            </View>

            <View>
              <Text style={[styles.white, styles.firstPage_header_sub]}>To: {data?.primaryTraveller?.personalDetails?.firstName} {data?.primaryTraveller?.personalDetails?.lastName}</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 1 of 9</Text>
            </View>
          </Page>

          {/* PAGE 2 */}
          <Page size="A4">
            <View style={{ margin: '10px 20px' }}>
              <Box styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Box>

              <Box border="1px solid #000" >
                <Flex direction="row">
                  <Flex direction="column" borderRight="1px solid #000" width="60%" height="80px" padding="0px 10px">
                    <Text style={[styles.text_sm]}>1. *Surname/Family name (as shown on your passport / travel document)</Text>

                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.personalDetails?.lastName}</Text>
                  </Flex>
                  <Flex width="40%" borderLeft="none" padding="0px 10px">
                    <Text style={[styles.text_sm]}>Given names (as shown on your passport / travel documents)</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.personalDetails?.firstName} {data?.primaryTraveller?.personalDetails?.middleName}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Flex direction="column" border="1px solid #000" borderTop="">
                <Flex direction="row">
                  <Flex direction="column" width="60%" borderRight="1px solid #000" borderTop="none" height="80px" padding="0px 10px">
                    <Text style={[styles.text_sm]}>2. Have you used any name (e.g. Nickname, maiden Name, alias, etc. )?</Text>
                  </Flex>

                  <Flex width="40%" borderLeft="none" borderTop="none" padding="0px 10px">
                    <Flex direction="row">
                      <Flex direction="row">
                        <Flex direction="row">
                          <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.personalDetails?.firstName ? '#000' : ''}` }}> <></> </Flex>
                          <Text style={[styles.text_sm]}> Yes </Text>
                        </Flex>

                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.personalDetails?.firstName ? '' : '#000'}` }}> <></> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                    <Text style={[styles.text_sm]}>Given name(s)</Text>
                    <Text style={styles.text_response}>
                      {data?.primaryTraveller?.personalDetails?.firstName}
                      {data?.primaryTraveller?.personalDetails?.lastName}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Box>
                <Flex direction="row" height="80px" borderLeft='1px solid #000' borderRight='1px solid #000' borderTop="" justify="space-evenly" padding="0px 10px">
                  <Flex borderRight="1px solid #000" direction="column" width="25%">
                    <Text style={[styles.text_sm, { textAlign: 'left', width: 100 }]}>
                      3. * Sex
                    </Text>
                    <Text style={styles.text_response}>
                      {data?.primaryTraveller?.personalDetails?.gender || 'Nil'}
                    </Text>

                  </Flex>
                  <Flex direction="column" justify="space-between" width="25%" borderRight="1px solid #000" padding="2px 10px">
                    <Text style={[styles.text_sm]}>4. * Date of Birth</Text>
                    <Text style={styles.text_response}>{ConvertDateToCad(data?.primaryTraveller?.personalDetails?.dateOfBirth.trim(), 'en-CA') || 'Nil'}</Text>
                    {/* <Text style={[styles.text_sm]}> YYYY/MM/DD</Text> */}
                  </Flex>
                  <Flex width="50%" direction="row">
                    <Flex direction="column" padding="0px 10px" width="49%">
                      <Box>
                        <Text style={[styles.text_sm]}>5.  Place of Birth</Text>
                        <Text style={[styles.text_sm]}>* City / Town</Text>
                        <Text style={styles.text_response}>{data?.primaryTraveller?.personalDetails?.stateOfOrigin}</Text>
                      </Box>
                    </Flex>
                    <Flex position="relative">
                      <div style={{ paddingTop: '10px', color: '#000', backgroundColor: '#000', width: '1px', height: '70%', position: "absolute", bottom: 0 }}>
                      </div>
                    </Flex>
                    <Flex padding="2px 10px" width="49%">
                      <Text style={[styles.text_sm]}>*Country </Text>
                      <Text style={styles.text_response}>{data?.primaryTraveller?.personalDetails?.placeOfBirth || 'Nil'}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex border="1px solid #000" borderTop="" padding="0 10px" height="25px" gap='24px' direction="row" align="center" justify="flex-start">
                  <Text style={[styles.text_sm]}>6. *Citizenship</Text>
                  <Text style={styles.text_response}>{data?.primaryTraveller?.citizenshipInformation?.countryOfCitizenship?.name || 'Nil'}</Text>
                </Flex>
              </Box>

              <Box>
                <Flex borderLeft="1px solid #000" borderRight='1px solid #000' borderTop="" padding="0 10px" height="25px" direction="row" gap='12px' align="center" justify="flex-start">
                  <Text style={[styles.text_sm]}>7. Country of Residence:</Text>
                  <Text style={styles.text_response}>{data?.primaryTraveller?.citizenshipInformation?.countryOfResidence?.name}</Text>
                </Flex>
              </Box>

              <Box>
                <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Country</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.citizenshipInformation?.countryOfResidence?.name}</Text>
                  </Flex>
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Status</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.citizenshipInformation?.statusOfResidence}</Text>
                  </Flex>
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Other</Text>

                  </Flex>
                  <Flex width="20%" borderRight="1px solid #000" position="relative">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>From</Text>
                    <Text style={styles.text_response}>{ConvertDateToCad(data?.primaryTraveller?.citizenshipInformation?.startDateOfResidence)}</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex width="20%" position="relative">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>To</Text>

                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex border="1px solid #000" borderTop="" padding="0 10px">
                  <Text style={[styles.text_sm]}>8. Previous Countries of Residence: During the past 5 years have you lived in any country than your country of Citizenship or your current country of Residence (indicated above) for more than 6 months</Text>
                  <Box>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences.length > 0 ? '#000' : '' }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences.length > 0 ? '' : '#000' }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
                <Box>
                  <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                    <Flex width="20%" direction='column' align='center' borderRight="1px solid #000" borderBottom='1px solid #000'>
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000', width: '100%' }]}>Country</Text>
                      <Text style={styles.text_response}>{data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[0]?.country?.name}</Text>
                    </Flex>

                    <Flex width="20%" direction='column' borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Status</Text>

                    </Flex>
                    <Flex width="20%" direction='column' borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Other</Text>

                    </Flex>
                    <Flex width="20%" direction='column' borderRight="1px solid #000" position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>From</Text>
                      {data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[0]?.since.length > 0 ? (
                        <Text style={styles.text_response}>{ConvertDateToCad(data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[0]?.since)}</Text>
                      ) : ''}

                    </Flex>
                    <Flex width="20%" direction='column' position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>To</Text>
                      {data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[0]?.till.length > 0 ? (
                        <Text style={styles.text_response}>{ConvertDateToCad(data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[0]?.till)}</Text>
                      ) : ''}
                    </Flex>
                  </Flex>
                </Box>
                <Box>
                  <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={styles.text_response}>{data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[1]?.country?.name}</Text>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <></>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <></>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000" position="relative">
                      {data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[1]?.since ? (
                        <Text style={styles.text_response}>{ConvertDateToCad(data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[1]?.since)}</Text>
                      ) : ''}

                      {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    </Flex>
                    <Flex width="20%" position="relative">
                      {data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[1]?.till ? (
                        <Text style={styles.text_response}>{ConvertDateToCad(data?.primaryTraveller?.citizenshipInformation?.previousCountryOfResidences?.[1]?.till)}</Text>
                      ) : ''}
                      {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    </Flex>
                  </Flex>
                </Box>
              </Box>

              <Box>
                <Flex direction="row" gap="24px" border="1px solid #000" borderTop="" padding="0 10px">
                  <Text style={[styles.text_sm]}>9. Country where applying: Same as current country of Residence ? </Text>
                  <Flex direction="row" justify="flex-end">
                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.citizenshipInformation?.countryApplyingFrom?.name === data?.primaryTraveller?.citizenshipInformation?.countryOfResidence?.name ? '#000' : ''}` }}> </Flex>
                      <Text style={[styles.text_sm]}> Yes </Text>
                    </Flex>

                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.citizenshipInformation?.countryApplyingFrom?.name === data?.primaryTraveller?.citizenshipInformation?.countryOfResidence?.name ? '' : '#000'}` }}> </Flex>
                      <Text style={[styles.text_sm]}> No </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Box>
                  <Flex height="60px" direction="row" borderLeft="1px solid #000" borderRight='1px solid #000' borderTop="">
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Country</Text>
                      <Text style={styles.text_response}>
                        {data?.primaryTraveller?.citizenshipInformation?.countryOfResidence?.name}
                      </Text>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Status</Text>
                      <Text style={[styles.text_response]}>{data?.primaryTraveller?.citizenshipInformation?.statusOfResidence}</Text>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Other</Text>

                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000" position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>From</Text>
                      {data?.primaryTraveller?.citizenshipInformation?.startDateOfResidence.length > 0 ? (
                        <Text style={styles.text_response}> {ConvertDateToCad(data?.primaryTraveller?.citizenshipInformation?.startDateOfResidence)} </Text>
                      ) : ''}

                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                    <Flex width="20%" position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>To</Text>
                      {/* {data?.primaryTraveller?.citizenshipInformation?.}  */}
                      {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    </Flex>
                  </Flex>
                </Box>
              </Box>

              <Box>
                <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>10. * Your Current Marital Status </Text>

                    <Text style={styles.text_response || 'Nil'}>{data?.primaryTraveller?.marriageInformation?.maritalStatus || 'Nil'}</Text>

                  </Flex>
                  <Flex width="50%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>(b) If you are married or in a common-law relationship </Text>
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>
                      Proivde the date on which you were married or enter into the common-law relationship
                    </Text>
                    {/* <Text style={styles.arrow}></Text> */}

                  </Flex>
                  <Flex width="20%">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>*Date</Text>
                    {data?.primaryTraveller?.marriageInformation?.marriageStartDate?.length > 0 ? (
                      <Text style={[styles.text_response]}>{ConvertDateToCad(data?.primaryTraveller?.marriageInformation?.marriageStartDate)}</Text>
                    ) : ''}
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                  <Flex width="50%" borderRight="1px solid #000" direction="column">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>
                      (c) provide the name of your current Spouse / Common-law partner
                    </Text>
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>*Family Name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.marriageInformation?.partnersName || 'Nil'}</Text>
                  </Flex>
                  <Flex width="50%">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>
                      Given name(s)
                    </Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.marriageInformation?.partnersName}</Text>
                  </Flex>
                </Flex>
              </Box>
            </View >

            {/* add footer page 1 */}
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 2 of 9</Text>
            </View>
          </Page>

          {/* PAGE 3 */}
          <Page size="A4">
            <View style={{ margin: '10px 20px' }}>
              <Box styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Box>

              <Box>
                <Flex borderTop="1px solid #000" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex direction="row">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>11. (a) Have you previously been married or in a common-law relationship? </Text>
                    <Flex direction="row">
                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Text style={[styles.text_sm, { padding: '0px 30px' }]}>Provide the following details for your spouse/common-law partner:</Text>
                  <Flex direction="row" height="60px" padding="5px 30px 0px">
                    <Flex width="50%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm]}> Family Name </Text>
                    </Flex>
                    <Flex width="50%">
                      <Text style={[styles.text_sm]}> Given Name(s) </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex border="1px solid #000" borderTop="" direction="row" height="60px">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>Date of Birth</Text>

                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex width="40%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>
                      (d) Type of relationship
                    </Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>From</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex width="15%">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>To</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm, { padding: '5px 10px' }]}>LANGUAGE(S)</Text>

                <Flex direction="row" border="1px solid #000" height="60px">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}> 1. *(a) Native Language / Mother Tongue</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.personalDetails?.nativeLanguage}</Text>
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>* (b) Are you able to communicate with English and/or French </Text>
                  </Flex>
                  <Flex width="30%" direction='column'>
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>
                      * (c) In which language are you most at ease?</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.personalDetails?.nativeLanguage}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm, { padding: '5px 10px' }]}>PASSPORT</Text>

                <Flex direction="row" border="1px solid #000" height="60px">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}> 1. *Passport number </Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.passportInformation?.number}</Text>
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>2. *Country of issue</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.passportInformation?.issuedCountry.name}</Text>
                  </Flex>

                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>3. *Issue Date</Text>
                    <Text style={styles.text_response}>{isValidDate(data?.primaryTraveller?.passportInformation?.issuedDate) === true ? ConvertDateToCad(data?.primaryTraveller?.passportInformation?.issuedDate) : ''}</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                  <Flex width="20%">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>4. *Expiry Date</Text>
                    <Text style={styles.text_response}>{isValidDate(data?.primaryTraveller?.passportInformation?.expiryDate) === true ? ConvertDateToCad(data?.primaryTraveller?.passportInformation?.expiryDate) : ''}</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm, { padding: '5px 10px' }]}>NATIONAL IDENTITY DOCUMENT</Text>
                <Flex borderTop="1px solid #000" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex direction="row">
                    <Text style={styles.text_sm_pl_pr}>1. Do you have a national Identity Document? </Text>
                    <Flex direction="row">
                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.personalDetails?.meansOfId}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex direction="row" height="60px" border="1px solid #000" borderTop="">
                  <Flex width="30%" direction='column' borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>
                      2. Document Number
                    </Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.personalDetails?.idNumber}</Text>
                  </Flex>
                  <Flex width="40%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>3. *Country of Issue</Text>
                    <Text style={[styles.text_response]}> {data?.primaryTraveller?.citizenshipInformation.countryOfCitizenship.name} </Text>
                  </Flex>
                  <Flex width="15%" direction='column' borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}> *Issue date</Text>
                    <Text style={[styles.text_response]}>{isValidDate(data?.primaryTraveller?.personalDetails?.issueDate) ? ConvertDateToCad(data?.primaryTraveller?.personalDetails?.issueDate) : ''}</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                  <Flex width="15%" direction='column'>
                    <Text style={styles.text_sm_pl_pr}> Expiry date</Text>
                    <Text style={[styles.text_response]}>{isValidDate(data?.primaryTraveller?.personalDetails?.expiryDate) ? ConvertDateToCad(data?.primaryTraveller?.personalDetails?.expiryDate) : ''}</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 10px' }]} >US PR CARD</Text>
                <Flex direction="column" borderTop="1px solid #000" borderRight="1px solid #000" borderLeft="1px solid #000">
                  <Text style={styles.text_sm_pl_pr}>1. Are you a lawful Permanent Resident of the United States with a valid alien registration card (green card)
                  </Text>
                  <Flex direction="row" justify="flex-end">
                    <Flex direction="row">
                      <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                      <Text style={[styles.text_sm]}> Yes </Text>
                    </Flex>

                    <Flex direction="row">
                      <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                      <Text style={[styles.text_sm]}> No </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="row" border="1px solid #000" height="60px">
                  <Flex width="50%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>2. Document Number</Text>
                  </Flex>
                  <Flex width="25%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>3. Expiry Date</Text>

                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 10px' }]}>CONTACT INFORMATION</Text>
                <Flex border="1px solid #000" padding="0 10px">
                  <Text style={styles.text_sm_pl_pr}>If submitting application by mail</Text>
                  <ul>
                    <li>
                      <Text style={[styles.text_sm_pl_pr, { marginBottom: '10px' }]}>&#x2022; All Correspondence will go to this address unless you indicate your e-mail address below.
                      </Text>
                    </li>
                    <li>
                      <Text style={[styles.text_sm_pl_pr, { marginBottom: '10px' }]}>&#x2022; Indicating an email address will authorize all correspondence, including file and personal information, to the
                        e-mail address you specify.
                      </Text>
                    </li>
                    <li>
                      <Text style={[styles.text_sm_pl_pr, { marginBottom: '10px' }]}>
                        &#x2022;
                        If you wish to authorize the release of information from your application to a representative, indicate their
                        e-mail and mailing address(es) in this section and on the IMM5476 form
                      </Text>
                    </li>
                  </ul>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 10px' }]}>1. Current Mailing Address</Text>
                <Flex border="1px solid #000" height="40px" direction="row">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>P.O box</Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Apt/Unit</Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Street no.</Text>
                  </Flex>
                  <Flex width="50%">
                    <Text style={styles.text_sm_pl_pr}>*Street name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.personalDetails?.address || 'Nil'}</Text>
                  </Flex>
                </Flex>
                <Flex borderBottom="1px solid #000" borderLeft="1px solid #000" borderRight="1px solid #000" height="40px" direction="row">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*City Town</Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Country</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.citizenshipInformation?.countryOfResidence?.name}</Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                  </Flex>
                  <Flex width="50%" direction="row">
                    <Flex width="35%" borderRight="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>Postal Code</Text>
                    </Flex>
                    <Flex width="65%">
                      <Text style={styles.text_sm_pl_pr}>District</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 3 of 9</Text>
            </View>
          </Page>

          {/* PAGE 4 */}
          <Page size="A4">
            <View style={{ margin: '10px 20px' }}>
              <Box styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { padding: '0 10px' }]}>Residential Address same as mailing address </Text>
                <Flex border="1px solid #000" height="60px" direction="row">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Apt/Unit</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Street no</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={[styles.text_sm_pl_pr]}>Street name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.personalDetails?.address || 'Nil'}</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>City/Town</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.citizenshipInformation?.countryApplyingFrom?.name}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex borderLeft="1px solid #000" borderRight="1px solid #000" borderBottom="1px solid #000" height="60px" direction="row">
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={[styles.text_sm_pl_pr]}>Country</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.citizenshipInformation?.countryOfResidence?.name}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Province/State</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Postal Code</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={[styles.text_sm_pl_pr]}>District</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex direction="row" height="60px" borderRight="1px solid #000" borderLeft="1px solid #000" borderBottom="1px solid #000">
                  <Flex direction="row" width="50%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm_pl_pr]}>Telephone no.</Text>
                    <Text style={styles.text_response}> {data.primaryTraveller.personalDetails.phoneNumber || 'Nil'} </Text>

                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}>
                          <></>
                        </Box>
                        <Text style={[styles.text_sm]}> Canada/US </Text>
                      </Flex>

                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> Other </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex width="50%">
                    <Text style={[styles.text_sm_pl_pr]}>4. Alternative Telephone no.</Text>
                    <Flex direction="row" justify="space-around">
                      <Text style={[styles.text_sm_pl_pr]}>Type</Text>
                      <Text style={[styles.text_sm_pl_pr]}>Country code No.</Text>
                      <Text style={[styles.text_sm_pl_pr]}>Ext.</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="row" borderLeft="1px solid #000" borderRight="1px solid #000" height="60px" borderBottom="1px solid #000">
                  <Flex width="50%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm_pl_pr]}>5. Fax no.</Text>
                    <Flex margin="10px">
                      <Flex direction="row" >
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Flex direction="row" gap="12px" justify="space-between" margin="0 0 10px">
                          <Flex direction="row" margin="0 auto">
                            <Text style={[styles.text_sm]}> Canada/US  </Text>
                            <Text style={[styles.text_sm]}>Country code</Text>
                            <Text style={[styles.text_sm]}>*No.</Text>
                          </Flex>
                          <Text style={[styles.text_sm]}> Ext</Text>
                        </Flex>
                      </Flex>
                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> Other  </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width="50%">
                    <Text style={styles.text_sm_pl_pr}>6. Email Address</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.personalDetails?.email || 'Nil'}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { textTransform: 'uppercase', padding: '2px 10px' }]}>Details of visit to Canada</Text>

                <Flex border="1px solid #000">
                  <Flex direction="row" borderBottom="1px solid #000" height="40px">
                    <Flex width="70%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm_pl_pr]}>1.*a) Purpose of my visit</Text>
                      <Text style={styles.text_response}>{data?.statementOfPurpose || 'Nil'}</Text>
                    </Flex>
                    <Flex width="30%">
                      <Text style={[styles.text_sm_pl_pr]}>b) Other</Text>
                    </Flex>
                  </Flex>
                  <Flex direction="row" height="50px">
                    <Flex width="35%" borderRight="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>Indicate how long you plan to stay</Text>
                    </Flex>
                    <Flex justify="space-between" direction='column' borderRight="1px solid #000" width="20%">
                      <Text style={styles.text_sm_pl_pr}>*From</Text>
                      <Text style={[styles.text_response]}> {data?.tripInformation?.tripDurationStartDate ? ConvertDateToCad(data?.tripInformation?.tripDurationStartDate) : ''} </Text>
                      {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    </Flex>
                    <Flex width="20%" direction='column' borderRight="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>*To</Text>
                      <Text style={[styles.text_response]}>
                        {data?.tripInformation?.tripDurationEndDate ? ConvertDateToCad(data?.tripInformation?.tripDurationEndDate) : ''}
                      </Text>
                      {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    </Flex>
                    <Flex direction='column' width="35%">
                      <Text style={styles.text_sm_pl_pr}>3.* Funds available for my stay (CAD)</Text>
                      <Text style={[styles.text_response]}>10,000</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { textTransform: 'capitalize', padding: '2px 10px' }]}>
                  Name, address and relationship of any person(s) or institution(s) I will visit:
                </Text>
                <Flex border="1px solid #000">
                  <Box>
                    <Flex height="40px" direction='row' borderBottom="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>*Name</Text>
                      <Flex gap='10px' direction='row'>
                        <Text style={[styles.text_response]}>{data?.tripInformation?.contactInLocationFirstName}</Text>
                        <Text style={[styles.text_response]}>{data?.tripInformation?.contactInLocationLastName}</Text>
                      </Flex>
                    </Flex>
                    <Flex direction="row" height="40px">
                      <Flex direction='column' borderRight="1px solid #000">
                        <Text style={styles.text_sm_pl_pr}>Relationship to me</Text>
                        <Text style={[styles.text_response]}>{data?.tripInformation?.contactInLocationRelationship}</Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={styles.text_sm_pl_pr}>*Address in Canada</Text>
                        <Text style={[styles.text_response]}>{data?.tripInformation?.contactInLocationAddress}</Text>
                      </Flex>
                    </Flex>
                  </Box>

                  <Box>
                    <Flex height="40px" borderTop="1px solid #000" borderBottom="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>*Name</Text>
                    </Flex>
                    <Flex direction="row" height="40px">
                      <Flex borderRight="1px solid #000">
                        <Text style={styles.text_sm_pl_pr}>Relationship to me</Text>
                      </Flex>
                      <Flex>
                        <Text style={styles.text_sm_pl_pr}>*Address in Canada</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { textTransform: 'uppercase', padding: '2px 0px' }]}>
                  Education
                </Text>
                <Flex border="1px solid #000">
                  <Text style={[styles.text_sm_pl_pr, { padding: '0 10px' }]}>Have you had any secondary education (including university, college or apprenticeship training)?</Text>
                  <Flex width="100%" align="flex-end">
                    <Flex direction="row">
                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Text style={[styles.text_sm_pl_pr, { padding: '0 10px' }]}>If you answered “Yes”, give full details of your highest level of post-secondary education</Text>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Flex direction='column' gap='2px'>
                      <Text style={styles.text_sm_pl_pr}>From</Text>
                      <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[0]?.startYear || 'Nil'}</Text>
                    </Flex>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM</Text>
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Field of study</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[0]?.fieldOfStudy || 'Nil'}</Text>
                  </Flex>startYear
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>*School/Facility Name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[0]?.school || 'Nil'}</Text>
                  </Flex>
                </Flex>

                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Flex direction='column' gap='2px'>
                      <Text style={styles.text_sm_pl_pr}>To</Text>
                      <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[0]?.endYear || 'Nil'}</Text>
                    </Flex>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM</Text>
                  </Flex>
                  <Flex width="25%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*City/Town</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[0]?.location || 'Nil'}</Text>
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Country</Text>
                  </Flex>
                  <Flex width="25%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[0]?.location || 'Nil'}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 0' }]}>Employment</Text>
                <Flex border="1px solid #000">
                  <Text style={styles.text_sm_pl_pr}>   Give details of your employment for the past 10 years, including if you held any government positions (Such
                    as civil servant, judge, police officer, mayor, member of parliament, hospital administrator, employee of a
                    security organization). Do not leave gaps. If retired, not working or studying, please indicate. If you are retired,
                    please provide the 10 years before your retirement.</Text>
                </Flex>
              </Box>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 4 of 9</Text>
            </View>
          </Page>

          {/* PAGE 5 */}
          <Page size="A4">
            <View style={{ margin: '10px 20px' }}>
              <Box styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Box>

              <Box>
                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%" direction='row'>
                    <Text style={styles.text_sm_pl_pr}>1.From</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[0]?.startYear || 'Nil'}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Current Activity/Occupation</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[0]?.jobTitle || 'Nil'}</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[0]?.companyName}</Text>
                  </Flex>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%" direction='row'>
                    <Text style={styles.text_sm_pl_pr}>To</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[0]?.endYear}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="25%">
                    <Text style={styles.text_sm_pl_pr}>*City/Town</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[0]?.companyLocation}</Text>
                  </Flex>
                  <Flex width="35%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[0]?.companyName || 'Nil'}</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[0]?.companyLocation}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>2.From</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[1]?.startYear || 'Nil'}</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Current Activity/Occupation</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[1]?.jobTitle || 'Nil'}</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[1]?.companyName}</Text>
                  </Flex>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>To</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[1]?.endYear}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="25%">
                    <Text style={styles.text_sm_pl_pr}>*City/Town</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[1]?.companyLocation}</Text>
                  </Flex>
                  <Flex width="35%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[1]?.companyName || 'Nil'}</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[1]?.companyLocation}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box>
                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>3.From</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[2]?.startYear || 'Nil'}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={styles.text_sm_pl_pr}>Current Activity/Occupation</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[2]?.jobTitle || 'Nil'}</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[2]?.companyName}</Text>
                  </Flex>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000" borderBottom="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>To</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                    <Text style={styles.text_response}>{data?.primaryTraveller?.education?.[2]?.endYear}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="25%">
                    <Text style={styles.text_sm_pl_pr}>City/Town</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[2]?.companyLocation}</Text>
                  </Flex>
                  <Flex width="35%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[2]?.companyName || 'Nil'}</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.employment?.[2]?.companyLocation}</Text>
                  </Flex>
                </Flex>
              </Box>

              <Box margin="5px 0">
                <Text style={styles.text_sm_pl_pr}>Background Information</Text>
                <Text style={styles.text_sm_pl_pr}>You must complete this section if you are 18 years of age or older.</Text>

                <Flex border="1px solid #000" padding="0 10px">
                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      1. a) Within the past two years, have you or a family member ever had tuberculosis of the lungs or been in close
                      contact with a person with tuberculosis?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.tuberculosis === 'true' ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{
                          border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.tuberculosis === 'false' ? '#000' : ''}`
                        }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      b) Do you have any physical or mental disorder that would require social and/or health services, other than
                      medication, during a stay in Canada?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.mentalDisorder === 'true' ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{
                          border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.mentalDisorder === 'false' ? '#000' : ''}`
                        }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex direction='column' padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      c) If you answered “yes” to question 1(a) or 1(b), please provide details and the name of the family member
                      (If applicable).
                    </Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.backgroundInformation?.mentalDisorderDetails || 'Nil'}</Text>

                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>

              <Box margin="5px 0">
                <Flex border="1px solid #000" padding="0 10px 30px">
                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      2. a) Have you ever remained beyond the validity of your status, attended school without authorization or
                      worked without authorization in Canada?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{
                          border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.remainbeyondValidity === 'true' ? '#000' : ''}`
                        }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.remainbeyondValidity === 'false' ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      b) Have you ever been refused a visa or permit, denied entry or ordered to leave Canada or any other
                      Country?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.refusedBefore === 'true' ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.refusedBefore === 'false' ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      c) Have you previously applied to enter or remain in Canada?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Box styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Box>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex direction='column' padding="20px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      d) If you answered “yes” to question 2a), 2b), or 2c) please provide details.</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.backgroundInformation?.refusedBeforeDetails || 'Nil'}</Text>
                  </Flex>
                </Flex>
              </Box>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 5 of 9</Text>
            </View>
          </Page>

          {/* PAGE 6 */}
          <Page size="A4">
            <View style={{ margin: '10px 20px' }}>
              <Box styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Box>

              <Flex border='1px solid #000' padding='0 10px 100px'>
                <Text style={styles.text_sm_pl_pr}>3. a) Have you ever committed, been arrested for, been charged with or convicted of any criminal offense?
                </Text>
                <Flex direction="row" justify="flex-end">
                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.arrestedBefore === 'true' ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> Yes </Text>
                  </Flex>

                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.arrestedBefore === 'false' ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> No </Text>
                  </Flex>
                </Flex>

                <Flex direction='column'>
                  <Text style={styles.text_sm_pl_pr}>b) If you answered “yes” to question 3a) above, please provide details</Text>
                  <Text style={[styles.text_response]}> {data?.primaryTraveller?.backgroundInformation?.arrestedBeforeDetails}</Text>
                </Flex>
              </Flex>

              <Flex margin='0px 0 0px' padding='10px 0px 140px' border='1px solid #000'>
                <Flex>
                  <Text style={styles.text_sm_pl_pr}>
                    4. a) Did you serve in any military, militia, or defense unit or serve in a security organization or police force
                    (including non-obligatory national service, reserve or volunteer units)?
                  </Text>
                  <Flex direction="row" justify="flex-end">
                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.servedInMilitary === 'true' ? '#000' : ''}` }}> </Flex>
                      <Text style={[styles.text_sm]}> Yes </Text>
                    </Flex>

                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.servedInMilitary === 'false' ? '#000' : ''}` }}> </Flex>
                      <Text style={[styles.text_sm]}> No </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex direction='column'>
                  <Text style={styles.text_sm_pl_pr}>b) If you answered “yes” to question 4a), please provide details</Text>
                  <Text style={styles.text_response}>{data?.primaryTraveller?.backgroundInformation?.servedInMilitaryDetails || 'Nil'}</Text>
                </Flex>
              </Flex>

              <Flex direction='column' borderLeft='1px solid #000' borderRight='1px solid #000'>
                <Text style={styles.text_sm_pl_pr}>
                  5. Are you, or have you ever been a member or associated with any political party, or other group or organization
                  which has engaged in or advocated violence as a means to achieving a political or religious objective, or which
                  has been associated with criminal activity at any time?
                </Text>

                <Flex direction="row">
                  <Flex direction="row" justify="flex-end">
                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.participatedInViolentActivities === 'true' ? '#000' : ''}` }}> </Flex>
                      <Text style={[styles.text_sm]}> Yes </Text>
                    </Flex>

                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.participatedInViolentActivities === 'false' ? '#000' : ''}` }}> </Flex>
                      <Text style={[styles.text_sm]}> No </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex border='1px solid #000'>
                <Text style={styles.text_sm_pl_pr}>6.Have you ever witnessed or participated in the ill treatment of prisoners or civilians, looting or desecration of
                  religious buildings?</Text>
                <Flex direction="row" justify="flex-end">
                  <Flex direction="row">
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.participatedInViolentActivities === 'true' ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.backgroundInformation?.participatedInViolentActivities === 'false' ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex padding='0 10px 160px' borderLeft='1px solid #000' borderRight='1px solid #000' borderBottom='1px solid #000'>
                <Text style={styles.text_sm_pl_pr}>
                  If you answered “yes” to any of question 3 to 6 above, or upon request of a visa officer, you MAY BE REQUIRED
                  to fill out IMM 5257 Schedule 1
                </Text>
              </Flex>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 6 of 9</Text>
            </View>
          </Page>

          {/* PAGE 7 */}
          <Page size="A4">
            <View style={{ margin: '10px 20px' }}>
              <Box>
                <Text style={[{ fontSize: 20, fontWeight: 600 }]}>Family Information</Text>
                <Flex direction='row' gap='10px' styles={{ margin: '10px 0' }}>
                  <Text style={styles.text_sm}>Type Of Application</Text>
                  <Flex direction='row' gap='10px'>
                    {/* <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${data.visaType === 'visitor' ? '#000' : ''}` }}> </Flex> */}
                    <Text style={styles.text_sm}>Visitor</Text>
                  </Flex>
                  <Flex direction='row' gap='10px'>
                    {/* <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${data.visaType === 'working' ? '#000' : ''}` }}> </Flex> */}
                    <Text style={styles.text_sm}>Worker</Text>
                  </Flex>
                  <Flex direction='row' gap='10px'>
                    {/* <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${data.visaType === 'student' ? '#000' : ''}` }}> </Flex> */}
                    <Text style={styles.text_sm}>Student</Text>
                  </Flex>
                  <Flex direction='row' gap='10px'>
                    {/* <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${!['visitor', 'working', 'student'].includes(data.visaType) ? '#000' : ''}` }}> </Flex> */}
                    <Text style={styles.text_sm}>Other</Text>
                  </Flex>
                </Flex>
                <Text style={[styles.text_sm, { margin: '0 0 10px' }]}>
                  Complete ALL names in English and in your native language (for example, Arabic, Cyrillic, Chinese, Chinese
                  commercial/ telegraphic code, Korean, or Japanese Characters). Include ALL family names even if they are not
                  accompanying you. If you need more space for any section, print out an additional page containing the appropriate
                  section, complete and submit it with your application
                </Text>
              </Box>

              <Box>
                <Text style={styles.text_sm}>SECTION A</Text>
                <Flex direction='row' border='1px solid #000' height='60px'>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Full name</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Relationship SEE NOTE 1</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_extra_sm, { borderBottom: '1px solid #000' }]}>Date of Birth</Text>
                    <Text style={styles.text_extra_sm}>Country of Birth</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Marital Status</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Flex direction='column' borderBottom='1px solid #000' width='100%'>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Address</Text>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>(if deceased give city and date)</Text>
                    </Flex>
                    <Box>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Occupation</Text>
                    </Box>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '20%' }}>
                    <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Will Accompany you to Canada?</Text>
                    <Flex direction='row' gap='10px'>
                      <Text style={styles.text_extra_sm}>YES</Text>
                      <Text style={styles.text_extra_sm}>NO</Text>
                    </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR APPLICANT*/}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.personalDetails?.firstName} {data?.primaryTraveller?.personalDetails?.lastName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>APPLICANT</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response, { borderBottom: '1px solid #000' }]}>{isValidDate(data?.primaryTraveller.personalDetails?.dateOfBirth) ? ConvertDateToCad(data?.primaryTraveller?.personalDetails?.dateOfBirth) : ''}</Text>
                    <Text style={[styles.text_response]}> {data?.primaryTraveller?.citizenshipInformation?.placeOfOrigin} </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.marriageInformation?.maritalStatus}</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response, { borderBottom: '1px solid #000' }]}>{data.primaryTraveller?.personalDetails?.address}</Text>
                    <Text style={styles.text_response}>
                      {data?.primaryTraveller?.employment[data?.primaryTraveller?.employment?.length - 1]?.jobTitle}
                    </Text>
                  </Flex>
                  {/* <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                  <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: `${'true' === 'true' ? '#000' : ''}` }}> </Flex>
                  <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: `${'true' === 'true' ? '#000' : ''}` }}> </Flex>
                </Flex> */}
                </Flex>

                {/* ANSWER FOR SPOUSE */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Immediate') !== undefined ? getFamilyMember(data.familyInformation.immediateFamilyInfo, 'Spouse')?.[0]?.membersName : ''}</Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Immediate') !== undefined ? getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.membersName : ''}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>SPOUSE OR COMMON-LAW PARTNER</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {renderFamilyMember(data, 'Spouse')?.[0]?.dateOfBirth}
                      {isValidDate(getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.dateOfBirth!) ? ConvertDateToCad(getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Spouse')?.[0]?.address}
                      {renderFamilyMember(data, 'Immediate') !== undefined ? getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.address : ''}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    {renderFamilyMember(data, 'Spouse')?.[0]?.status}
                    {renderFamilyMember(data, 'Immediate') !== undefined ? getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.status : ''}
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {renderFamilyMember(data, 'Spouse')?.[0]?.address}
                      {renderFamilyMember(data, 'Immediate') !== undefined ? getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.address : ''}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(renderFamilyMember(data, 'Immediate')!, 'Spouse')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR MOTHER */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Parent') !== undefined ? getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Mother')?.[0]?.membersName : ''}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>MOTHER</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Mother')?.[0]?.dateOfBirth!) ? ConvertDateToCad(getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Mother')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>

                      {getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Mother')?.[0]?.status}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>

                      {getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Mother')?.[0]?.address}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Mother')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Mother')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR FATHER */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Father')?.[0]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>FATHER</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>

                      {isValidDate(getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Father')?.[0]?.dateOfBirth!) ? ConvertDateToCad(getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Father')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}> </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>

                      {getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Father')?.[0]?.address}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Father')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(renderFamilyMember(data, 'Parent')!, 'Father')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* FOOTNOTE */}
                <Flex direction='column' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000'>
                  <Text style={styles.text_sm}>NOTE 1: If no spouse or common-law partner is listed in Section A, read and sign below.</Text>
                  <Flex direction='row' align='flex-end'>
                    <Text style={[styles.text_sm, { width: '60%' }]}>I certify that I do not have a spouse or common-law partner. </Text>
                    <Flex direction='row' align='flex-end' styles={{ width: '30%' }}>
                      <Text style={styles.text_sm}>Signature:</Text>
                      <Box borderBottom='1px solid #000'>
                        <Text></Text>
                      </Box>
                    </Flex>
                    <Flex direction='row' border='1px solid #000' justify='space-around' styles={{ height: '50px', width: '10%' }}>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>Y</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>M</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>D</Text>
                        <Text style={styles.text_response}></Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>

            </View>
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 7 of 9</Text>
            </View>
          </Page>


          {/* PAGE 8 */}
          <Page size="A4">
            <View style={{ margin: '10px 20px' }}>

              {/* SECTION FOR CHILDREN N THE NEW VISA APPLICATION */}
              <Box>
                <Text style={[styles.text_sm, { margin: '10px 0' }]}>
                  SECTION B CHILDREN (Include ALL sons and daughters, including ALL adopted and step-children, regardless of age or
                  place of residence)
                </Text>
                <Flex direction='row' border='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='60px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Full name</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Relationship SEE NOTE 1</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Date of Birth</Text>
                    <Text style={styles.text_extra_sm}>Country of Birth</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Marital Status</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Flex direction='column' borderBottom='1px solid #000' width='100%'>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Address</Text>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>(if deceased give city and date)</Text>
                    </Flex>
                    <Box>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Occupation</Text>
                    </Box>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '20%' }}>
                    <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Will Accompany you to Canada?</Text>
                    <Flex direction='row' gap='10px'>
                      <Text style={styles.text_extra_sm}>YES</Text>
                      <Text style={styles.text_extra_sm}>NO</Text>
                    </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR CHILD ONE IN THE NEW VISA APPLICATION */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>
                      {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.relationshipToPrimary}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.dateOfBirth!) ? ConvertDateToCad(getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.address}
                    </Text>
                    <Text>

                    </Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR CHILD 2 */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>
                      {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.relationshipToPrimary}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.dateOfBirth!) ? getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.dateOfBirth : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[1]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>
              </Box>

              {/* ANSWER FOR CHILD 3 */}
              <Flex direction='row' border='1px solid #000' height='110px'>
                <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                  <Text style={styles.text_response}>{getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.membersName}</Text>
                </Flex>
                <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                  <Text style={styles.text_extra_sm}> {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.relationshipToPrimary} </Text>
                </Flex>
                <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                  <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                    {isValidDate(getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.dateOfBirth!) ? getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.dateOfBirth : ''}
                  </Text>
                  <Text style={styles.text_response}>
                    {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.address}
                  </Text>
                </Flex>
                <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                  <Text style={[styles.text_response]}>
                    {/* {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.status} */}
                  </Text>
                </Flex>
                <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                  <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.address}</Text>
                  <Text></Text>
                </Flex>
                <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                  <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.accompanying === true ? '#000' : '' }}> </Flex>
                  <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[2]?.accompanying === false ? '#000' : '' }}> </Flex>
                </Flex>
              </Flex>

              {/* ANSWER FOR CHILD 4 */}
              <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                  <Text style={styles.text_response}>{getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[3]?.membersName}</Text>
                </Flex>
                <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                  <Text style={styles.text_response}> {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[3]?.relationshipToPrimary} </Text>
                </Flex>
                <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                  <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                    {isValidDate(getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[3]?.dateOfBirth!) ? ConvertDateToCad(getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[3]?.dateOfBirth!) : ''}
                  </Text>
                  <Text style={styles.text_response}>
                    {getFamilyMember(data?.familyInformation?.immediateFamilyInfo, 'Children')?.[3]?.address}
                  </Text>
                </Flex>
                <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                  <Text style={[styles.text_response]}>
                    {/* {renderFamilyMember(data, 'Children')?.[3]?.status} */}
                  </Text></Flex>
                <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                  <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Children')?.[3]?.address}</Text>
                  <Text></Text>
                </Flex>
                <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                  <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[3]?.accompanying === true ? '#000' : '' }}> </Flex>
                  <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[3]?.accompanying === false ? '#000' : '' }}> </Flex>
                </Flex>
              </Flex>

              {/* FOOTNOTE */}
              <Flex direction='column' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000'>
                <Text style={styles.text_sm}>NOTE 2: : If no Children is listed in Section B, read and sign below.</Text>
                <Flex direction='row' align='flex-end'>
                  <Text style={[styles.text_sm, { width: '60%' }]}>I certify that I do not have any children, either natural or adopted. </Text>
                  <Flex direction='row' align='flex-end' styles={{ width: '30%' }}>
                    <Text style={styles.text_sm}>Signature:</Text>
                    <Box borderBottom='1px solid #000'>
                      <Text></Text>
                    </Box>
                  </Flex>
                  <Flex direction='row' border='1px solid #000' justify='space-around' styles={{ height: '50px', width: '10%' }}>
                    <Flex direction='column'>
                      <Text style={[styles.text_extra_sm]}>Y</Text>
                      <Text style={[styles.text_response]}></Text>
                    </Flex>
                    <Flex direction='column'>
                      <Text style={[styles.text_extra_sm]}>M</Text>
                      <Text style={[styles.text_response]}></Text>
                    </Flex>
                    <Flex direction='column'>
                      <Text style={[styles.text_extra_sm]}>D</Text>
                      <Text style={styles.text_response}></Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 8 of 9</Text>
            </View>
          </Page>

          {/* PAGE 9 */}
          <Page>
            <View style={{ margin: "10px 20px" }}>

              {/* SIBLINGS SECTION */}
              <Box>
                <Text style={[styles.text_sm, { margin: '10px 0' }]}>
                  SECTION C BROTHERS AND SISTERS (Include all brothers and sisters, ALL half-brother and sister and stepbrother and
                  sister.)
                </Text>
                <Flex direction='row' border='1px solid #000' height='70px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Full name</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Relationship SEE NOTE 1</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_extra_sm, { borderBottom: '1px solid #000' }]}>Date of Birth</Text>
                    <Text style={styles.text_extra_sm}>Country of Birth</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Marital Status</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Flex direction='column' borderBottom='1px solid #000' width='100%'>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Address</Text>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>(if deceased give city and date)</Text>
                    </Flex>
                    <Box>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Occupation</Text>
                    </Box>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '20%' }}>
                    <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Will Accompany you to Canada?</Text>
                    <Flex direction='row' gap='10px'>
                      <Text style={styles.text_extra_sm}>YES</Text>
                      <Text style={styles.text_extra_sm}>NO</Text>
                    </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING ONE */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[0]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[0]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[0]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[0]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Sibling')?.[0]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Sibling')?.[0]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING TWO */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[1]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[1]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[1]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[1]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[1]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Sibling')?.[1]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Sibling')?.[1]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[1]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[1]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING THREE */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[2]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[2]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[2]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[2]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[2]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Sibling')?.[2]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Sibling')?.[2]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[2]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[2]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING FOUR */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[3]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[3]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[3]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[3]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[3]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Sibling')?.[3]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Sibling')?.[3]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[3]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[3]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>
              </Box>

              {/* FOOTNOTE VERIFY INFORMATION IS ACCURATE */}
              <Box>
                <Flex direction='column' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000'>
                  <Text style={styles.text_extra_sm}>I certify that the information contained on this document is complete, accurate and factual. I also realize that once this document
                    has been completed and signed that it will form part of my immigration record and will be used to verify my family details on
                    future applications.</Text>
                  <Flex direction='row' align='flex-end'>

                    <Flex direction='row' align='flex-end' styles={{ width: '50%' }}>
                      <Text style={styles.text_sm}>Signature:</Text>
                      <Box borderBottom='1px solid #000'>
                        <Text></Text>
                      </Box>
                    </Flex>
                    <Flex direction='row' border='1px solid #000' justify='space-around' styles={{ height: '50px', width: '20%' }}>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>Y</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>M</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>D</Text>
                        <Text style={styles.text_response}></Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>

              <Box margin='10px 0'>
                <Flex border='1px solid #000' padding='5px'>
                  <Text style={styles.text_extra_sm}>
                    The information you provide on this form is collected under the authority of the Immigration And Refuge Protection Act to
                    determine if you may be admitted to Canada as a temporary resident. It will be stored in Personal Information Bank CIC PPU 055,
                    Visitor Case File. It is protected and accessible under the Privacy Act and the access to Information Act
                  </Text>
                </Flex>
              </Box>

            </View>
          </Page>

        </Document>
      ) : (
        <Document>
          {/* Page 1 */}
          <Page size="A4" style={[styles.page_one, styles.firstPage, styles.body]}>
            <View style={{ width: '100%' }}>
              <Image src={ttLogo2.src} style={[styles.image, { marginBottom: 25 }]} />
              <Text style={[styles.header_main, { marginBottom: 10 }]}>THRILLERS TRAVELS</Text>
              <Text style={[styles.white, styles.firstPage_header_sub]}>Visa Application Document</Text>
            </View>

            <View>
              <Text style={[styles.white, styles.firstPage_header_sub]}>To: {data?.primaryTraveller?.firstName} {data?.primaryTraveller?.lastName}</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 1 of 9</Text>
            </View>
          </Page>

          {/* Page 2 */}
          <Page>
            <View style={{ margin: '10px 20px' }}>
              <Flex styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Flex>

              <Flex border="1px solid #000" >
                <Flex direction="row">
                  <Flex direction="column" borderRight="1px solid #000" width="60%" height="80px" padding="0px 10px">
                    <Text style={[styles.text_sm]}>1. *Surname/Family name (as shown on your passport / travel document)</Text>

                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.lastName}</Text>
                  </Flex>
                  <Flex width="40%" borderLeft="none" padding="0px 10px">
                    <Text style={[styles.text_sm]}>Given names (as shown on your passport / travel documents)</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.firstName} {data?.primaryTraveller?.middleName}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex direction="column" border="1px solid #000" borderTop="">
                <Flex direction="row">
                  <Flex direction="column" width="60%" borderRight="1px solid #000" borderTop="none" height="80px" padding="0px 10px">
                    <Text style={[styles.text_sm]}>2. Have you used any name (e.g. Nickname, maiden Name, alias, etc. )?</Text>
                  </Flex>

                  <Flex width="40%" borderLeft="none" borderTop="none" padding="0px 10px">
                    <Flex direction="row">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.firstName ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.firstName ? '' : '#000'}` }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                    <Text style={[styles.text_sm]}>Given name(s)</Text>
                    <Text style={[styles.text_response]}>
                      {data?.primaryTraveller?.firstName}
                      {' '}
                      {data?.primaryTraveller?.lastName}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex direction="row" height="80px" borderLeft='1px solid #000' borderRight='1px solid #000' borderTop="" justify="space-evenly" padding="0px 10px">
                  <Flex borderRight="1px solid #000" direction="column" width="25%">
                    <Text style={[styles.text_sm, { textAlign: 'left', width: 100 }]}>
                      3. * Sex
                    </Text>
                    <Text style={styles.text_response}>
                      {data?.primaryTraveller?.gender || 'Nil'}
                    </Text>

                  </Flex>
                  <Flex direction="column" justify="space-between" width="25%" borderRight="1px solid #000" padding="2px 10px">
                    <Text style={[styles.text_sm]}>4. * Date of Birth</Text>
                    <Text style={styles.text_response}>{ConvertDateToCad(data?.primaryTraveller?.dateOfBirth.trim(), 'en-CA') || 'Nil'}</Text>

                  </Flex>
                  <Flex width="50%" direction="row">
                    <Flex direction="column" padding="0px 10px" width="49%">
                      <Flex>
                        <Text style={[styles.text_sm]}>5.  Place of Birth</Text>
                        <Text style={[styles.text_sm]}>* City / Town</Text>
                        <Text style={styles.text_response}>{data?.primaryTraveller?.stateOfOrigin}</Text>
                      </Flex>
                    </Flex>
                    <Flex position="relative">
                      <div style={{ paddingTop: '10px', color: '#000', backgroundColor: '#000', width: '1px', height: '70%', position: "absolute", bottom: 0 }}>

                      </div>
                    </Flex>
                    <Flex padding="2px 10px" width="49%">
                      <Text style={[styles.text_sm]}>*Country </Text>
                      <Text style={styles.text_response}>{data?.primaryTraveller?.placeOfBirth || 'Nil'}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex border="1px solid #000" borderTop="" padding="0 10px" height="25px" direction="row" align="center" justify="flex-start" gap='30px'>
                  <Text style={[styles.text_sm]}>6. *Citizenship</Text>
                  <Text style={styles.text_response}>{data?.primaryTraveller?.countryOfCitizen || 'Nil'}</Text>
                </Flex>
              </Flex>

              <Flex>
                <Flex borderLeft="1px solid #000" borderRight='1px solid #000' borderTop="" padding="0 10px" height="25px" direction="row" gap='12px' align="flex-start" justify="flex-start">
                  <Text style={[styles.text_sm]}>7. Country of Residence:</Text>
                  <Text style={styles.text_response}> {typeof data?.primaryTraveller?.homeCountry === 'string' ? data?.primaryTraveller?.homeCountry : data?.primaryTraveller?.homeCountry?.name} </Text>
                </Flex>
              </Flex>

              <Flex>
                <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Country</Text>

                  </Flex>
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Status</Text>

                  </Flex>
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Other</Text>

                  </Flex>
                  <Flex width="20%" borderRight="1px solid #000" position="relative">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>From</Text>

                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex width="20%" position="relative">
                    <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>To</Text>

                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex border="1px solid #000" borderTop="" padding="0 10px">
                  <Text style={[styles.text_sm]}>8. Previous Countries of Residence: During the past 5 years have you lived in any country than your country of Citizenship or your current country of Residence (indicated above) for more than 6 months</Text>
                  <Flex>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Country</Text>

                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Status</Text>

                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Other</Text>

                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000" position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>From</Text>

                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                    <Flex width="20%" position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>To</Text>

                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                    <Flex width="20%" borderRight="1px solid #000">
                      <></>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <></>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <></>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000" position="relative">
                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                    <Flex width="20%" position="relative">

                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex direction="row" gap="24px" border="1px solid #000" borderTop="" padding="0 10px">
                  <Text style={[styles.text_sm]}>9. Country where applying: Same as current country of Residence ? </Text>
                  <Flex direction="row" justify="flex-end">
                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                      <Text style={[styles.text_sm]}> Yes </Text>
                    </Flex>

                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                      <Text style={[styles.text_sm]}> No </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex height="60px" direction="row" borderLeft="1px solid #000" borderRight='1px solid #000' borderTop="">
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Country</Text>

                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Status</Text>

                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>Other</Text>

                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000" position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>From</Text>

                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                    <Flex width="20%" position="relative">
                      <Text style={[styles.text_sm, { textAlign: 'center', borderBottom: '1px solid #000' }]}>To</Text>

                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>10. * Your Current Marital Status </Text>

                    <Text style={styles.text_response || 'Nil'}>{data?.primaryTraveller?.maritalStatus || 'Nil'}</Text>

                  </Flex>
                  <Flex width="50%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>(b) If you are married or in a common-law relationship </Text>
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>
                      Proivde the date on which you were married or enter into the common-law relationship
                    </Text>

                  </Flex>
                  <Flex width="20%">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>*Date</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>

                </Flex>
              </Flex>

              <Flex>
                <Flex height="60px" direction="row" border="1px solid #000" borderTop="">
                  <Flex width="50%" borderRight="1px solid #000" direction="column">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>
                      (c) provide the name of your current Spouse / Common-law partner
                    </Text>
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>Family Name</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.partnersName || 'Nil'}</Text>
                  </Flex>
                  <Flex width="50%">
                    <Text style={[styles.text_sm, { padding: '0 10px' }]}>
                      Given name(s)
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </View>

            {/* add footer page 1 */}
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 2 of 9</Text>
            </View>
          </Page>

          {/* Page 3 */}
          <Page>
            <View style={{ margin: '10px 20px' }}>
              <Flex styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Flex>

              <Flex>
                <Flex borderTop="1px solid #000" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex direction="row">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>11. (a) Have you previously been married or in a common-law relationship? </Text>
                    <Flex direction="row">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Text style={[styles.text_sm, { padding: '0px 30px' }]}>Provide the following details for your spouse/common-law partner:</Text>
                  <Flex direction="row" height="60px" padding="5px 30px 0px">
                    <Flex width="50%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm]}> Family Name </Text>
                    </Flex>
                    <Flex width="50%">
                      <Text style={[styles.text_sm]}> Given Name(s) </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex border="1px solid #000" borderTop="" direction="row" height="60px">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>Date of Birth</Text>

                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex width="40%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>
                      (d) Type of relationship
                    </Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>From</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex width="15%">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>To</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm, { padding: '5px 10px' }]}>LANGUAGE(S)</Text>

                <Flex direction="row" border="1px solid #000" height="60px">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}> 1. *(a) Native Language / Mother Tongue</Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.nativeLanguage}</Text>
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>* (b) Are you able to communicate with English and/or French </Text>
                  </Flex>
                  <Flex width="30%">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>* (c) In which language are you most at ease?</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.nativeLanguage}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm, { padding: '5px 10px' }]}>PASSPORT</Text>

                <Flex direction="row" border="1px solid #000" height="60px">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}> 1. *Passport number </Text>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.passportNumber}</Text>
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>2. *Country of issue</Text>
                  </Flex>

                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>3. *Issue Date</Text>
                    <Text style={styles.text_response}>{isValidDate(data?.primaryTraveller?.issueDate) === true ? ConvertDateToCad(data?.primaryTraveller?.issueDate) : ''}</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={[styles.text_sm, { padding: '0px 10px' }]}>4. *Expiry Date</Text>
                    <Text style={styles.text_response}>{isValidDate(data?.primaryTraveller?.passportExpiryDate) === true ? ConvertDateToCad(data?.primaryTraveller?.passportExpiryDate) : ''}</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm, { padding: '5px 10px' }]}>NATIONAL IDENTITY DOCUMENT</Text>
                <Flex borderTop="1px solid #000" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex direction="row" align='center'>
                    <Text style={styles.text_sm_pl_pr}>1. Do you have a national Identity Document? </Text>
                    <Flex direction="row" align='center'>
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.meansOfId}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex direction="row" height="60px" border="1px solid #000" borderTop="">
                  <Flex direction='column' width="30%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>
                      2. Document Number
                    </Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.idNumber}</Text>
                  </Flex>
                  <Flex width="40%" direction='column' borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>3. *Country of Issue</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.countryOfCitizen}</Text>
                  </Flex>
                  <Flex direction='column' width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}> *Issue date</Text>
                    <Text style={[styles.text_response]}>{isValidDate(data?.primaryTraveller?.issueDate) === true ? ConvertDateToCad(data?.primaryTraveller?.issueDate) : ''}</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                  <Flex direction='column' width="15%">
                    <Text style={styles.text_sm_pl_pr}> Expiry date</Text>
                    <Text style={[styles.text_response]}>{isValidDate(data?.primaryTraveller?.expiryDate) === true ? ConvertDateToCad(data?.primaryTraveller?.expiryDate) : ''}</Text>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text> */}
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 10px' }]} >US PR CARD</Text>
                <Flex direction="column" borderTop="1px solid #000" borderRight="1px solid #000" borderLeft="1px solid #000">
                  <Text style={styles.text_sm_pl_pr}>1. Are you a lawful Permanent Resident of the United States with a valid alien registration card (green card)
                  </Text>
                  <Flex direction="row" justify="flex-end">
                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                      <Text style={[styles.text_sm]}> Yes </Text>
                    </Flex>

                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                      <Text style={[styles.text_sm]}> No </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="row" border="1px solid #000" height="60px">
                  <Flex width="50%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>2. Document Number</Text>
                  </Flex>
                  <Flex width="25%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>3. Expiry Date</Text>

                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 10px' }]}>CONTACT INFORMATION</Text>
                <Flex border="1px solid #000" padding="0 10px">
                  <Text style={styles.text_sm_pl_pr}>If submitting application by mail</Text>
                  <ul>
                    <li>
                      <Text style={[styles.text_sm_pl_pr, { marginBottom: '10px' }]}>&#x2022; All Correspondence will go to this address unless you indicate your e-mail address below.
                      </Text>
                    </li>
                    <li>
                      <Text style={[styles.text_sm_pl_pr, { marginBottom: '10px' }]}>&#x2022; Indicating an email address will authorize all correspondence, including file and personal information, to the
                        e-mail address you specify.
                      </Text>
                    </li>
                    <li>
                      <Text style={[styles.text_sm_pl_pr, { marginBottom: '10px' }]}>
                        &#x2022;
                        If you wish to authorize the release of information from your application to a representative, indicate their
                        e-mail and mailing address(es) in this section and on the IMM5476 form
                      </Text>
                    </li>
                  </ul>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 10px' }]}>1. Current Mailing Address</Text>
                <Flex border="1px solid #000" height="40px" direction="row">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>P.O box</Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Apt/Unit</Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Street no.</Text>
                  </Flex>
                  <Flex width="50%" direction='column'>
                    <Text style={styles.text_sm_pl_pr}>*Street name</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.address}</Text>
                  </Flex>
                </Flex>
                <Flex borderBottom="1px solid #000" borderLeft="1px solid #000" borderRight="1px solid #000" height="40px" direction="row">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*City Town</Text>
                  </Flex>
                  <Flex width="15%" direction='column' borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Country</Text>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.countryOfCitizen}</Text>
                  </Flex>
                  <Flex width="15%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                  </Flex>
                  <Flex width="50%" direction="row">
                    <Flex width="35%" borderRight="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>Postal Code</Text>
                    </Flex>
                    <Flex width="65%">
                      <Text style={styles.text_sm_pl_pr}>District</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 3 of 9</Text>
            </View>
          </Page>

          {/* Page 4 */}
          <Page>
            <View style={{ margin: '10px 20px' }}>
              <Flex styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { padding: '0 10px' }]}>Residential Address same as mailing address </Text>
                <Flex border="1px solid #000" height="60px" direction="row">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Apt/Unit</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Street no</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={[styles.text_sm_pl_pr]}>Street name</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.address || 'Nil'}</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>City/Town</Text>
                    {/* <Text style={styles.text_response}>{data.primaryTraveller}</Text> */}
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex borderLeft="1px solid #000" borderRight="1px solid #000" borderBottom="1px solid #000" height="60px" direction="row">
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={[styles.text_sm_pl_pr]}>Country</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Province/State</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={[styles.text_sm_pl_pr]}>Postal Code</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={[styles.text_sm_pl_pr]}>District</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex direction="row" height="60px" borderRight="1px solid #000" borderLeft="1px solid #000" borderBottom="1px solid #000">
                  <Flex direction="row" width="50%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm_pl_pr]}>Telephone no.</Text>
                    <Text style={styles.text_response}> {data.primaryTraveller.phoneNumber || 'Nil'} </Text>

                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}>
                          <></>
                        </Flex>
                        <Text style={[styles.text_sm]}> Canada/US </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> Other </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex width="50%">
                    <Text style={[styles.text_sm_pl_pr]}>4. Alternative Telephone no.</Text>
                    <Flex direction="row" justify="space-around">
                      <Text style={[styles.text_sm_pl_pr]}>Type</Text>
                      <Text style={[styles.text_sm_pl_pr]}>Country code No.</Text>
                      <Text style={[styles.text_sm_pl_pr]}>Ext.</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="row" borderLeft="1px solid #000" borderRight="1px solid #000" height="60px" borderBottom="1px solid #000">
                  <Flex width="50%" borderRight="1px solid #000">
                    <Text style={[styles.text_sm_pl_pr]}>5. Fax no.</Text>
                    <Flex margin="10px">
                      <Flex direction="row" >
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Flex direction="row" gap="12px" justify="space-between" margin="0 0 10px">
                          <Flex direction="row" margin="0 auto">
                            <Text style={[styles.text_sm]}> Canada/US  </Text>
                            <Text style={[styles.text_sm]}>Country code</Text>
                            <Text style={[styles.text_sm]}>*No.</Text>
                          </Flex>
                          <Text style={[styles.text_sm]}> Ext</Text>
                        </Flex>
                      </Flex>
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> Other  </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width="50%">
                    <Text style={styles.text_sm_pl_pr}>6. Email Address</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.email || 'Nil'}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { textTransform: 'uppercase', padding: '2px 10px' }]}>Details of visit to Canada</Text>

                <Flex border="1px solid #000">
                  <Flex direction="row" borderBottom="1px solid #000" height="40px">
                    <Flex width="70%" borderRight="1px solid #000">
                      <Text style={[styles.text_sm_pl_pr]}>1.*a) Purpose of my visit</Text>
                      <Text style={styles.text_response}>{data.primaryTraveller.tripPurpose || 'Nil'}</Text>
                    </Flex>
                    <Flex width="30%">
                      <Text style={[styles.text_sm_pl_pr]}>b) Other</Text>
                    </Flex>
                  </Flex>
                  <Flex direction="row" height="50px">
                    <Flex width="35%" borderRight="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>Indicate how long you plan to stay</Text>
                      <Text style={[styles.text_response]}></Text>
                    </Flex>
                    <Flex justify="space-between" borderRight="1px solid #000" width="20%">
                      <Text style={styles.text_sm_pl_pr}>*From</Text>
                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                    <Flex width="20%" borderRight="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>*To</Text>
                      <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    </Flex>
                    <Flex width="35%">
                      <Text style={styles.text_sm_pl_pr}>3.* Funds available for my stay (CAD)</Text>
                      <Text style={[styles.text_response]}>10,000</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { textTransform: 'capitalize', padding: '2px 10px' }]}>
                  Name, address and relationship of any person(s) or institution(s) I will visit:
                </Text>
                <Flex border="1px solid #000">
                  <Flex>
                    <Flex height="40px" borderBottom="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>*Name</Text>
                    </Flex>
                    <Flex direction="row" height="40px">
                      <Flex borderRight="1px solid #000">
                        <Text style={styles.text_sm_pl_pr}>Relationship to me</Text>
                      </Flex>
                      <Flex>
                        <Text style={styles.text_sm_pl_pr}>*Address in Canada</Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex>
                    <Flex height="40px" borderTop="1px solid #000" borderBottom="1px solid #000">
                      <Text style={styles.text_sm_pl_pr}>*Name</Text>
                    </Flex>
                    <Flex direction="row" height="40px">
                      <Flex borderRight="1px solid #000">
                        <Text style={styles.text_sm_pl_pr}>Relationship to me</Text>
                      </Flex>
                      <Flex>
                        <Text style={styles.text_sm_pl_pr}>*Address in Canada</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { textTransform: 'uppercase', padding: '2px 0px' }]}>
                  Education
                </Text>
                <Flex border="1px solid #000">
                  <Text style={[styles.text_sm_pl_pr, { padding: '0 10px' }]}>Have you had any secondary education (including university, college or apprenticeship training?</Text>
                  <Flex width="100%" align="flex-end">
                    <Flex direction="row">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Text style={[styles.text_sm_pl_pr, { padding: '0 10px' }]}>If you answered “Yes”, give full details of your highest level of post-secondary education</Text>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex width="30%" borderRight="1px solid #000">
                    <Flex direction='column' gap='2px'>
                      <Text style={styles.text_sm_pl_pr}>From</Text>
                      <Text style={styles.text_response}>{data.primaryTraveller.education[0].startYear || 'Nil'}</Text>
                    </Flex>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM</Text> */}
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Field of study</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.education[0].fieldOfStudy || 'Nil'}</Text>
                  </Flex>startYear
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>*School/Facility Name</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.education[0].school || 'Nil'}</Text>
                  </Flex>
                </Flex>

                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex width="20%" borderRight="1px solid #000">
                    <Flex direction='column' gap='2px'>
                      <Text style={styles.text_sm_pl_pr}>To</Text>
                      <Text style={styles.text_response}>{data.primaryTraveller.education[0].endYear || 'Nil'}</Text>
                    </Flex>
                    {/* <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM</Text> */}
                  </Flex>
                  <Flex width="25%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*City/Town</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.education[0].location || 'Nil'}</Text>
                  </Flex>
                  <Flex width="30%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Country</Text>
                  </Flex>
                  <Flex width="25%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.education[0].location || 'Nil'}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Text style={[styles.text_sm_pl_pr, { padding: '5px 0' }]}>Employment</Text>
                <Flex border="1px solid #000">
                  <Text style={styles.text_sm_pl_pr}>   Give details of your employment for the past 10 years, including if you held any government positions (Such
                    as civil servant, judge, police officer, mayor, member of parliament, hospital administrator, employee of a
                    security organization). Do not leave gaps. If retired, not working or studying, please indicate. If you are retired,
                    please provide the 10 years before your retirement.</Text>
                </Flex>
              </Flex>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 4 of 9</Text>
            </View>
          </Page>

          {/* Page 5 */}
          <Page>
            <View style={{ margin: '10px 20px' }}>
              <Flex styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Flex>

              <Flex>
                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%" direction='row'>
                    <Text style={styles.text_sm_pl_pr}>1.From</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.employment[0].startYear || 'Nil'}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Current Activity/Occupation</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.employment[0].jobTitle || 'Nil'}</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.employment[0].companyName}</Text>
                  </Flex>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%" direction='row'>
                    <Text style={styles.text_sm_pl_pr}>To</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.education[0].endYear}</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="25%">
                    <Text style={styles.text_sm_pl_pr}>*City/Town</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.employment[0].companyLocation}</Text>
                  </Flex>
                  <Flex width="35%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.employment[0].companyName || 'Nil'}</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.employment[0].companyLocation}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>2.From</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Current Activity/Occupation</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                  </Flex>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>To</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="25%">
                    <Text style={styles.text_sm_pl_pr}>*City/Town</Text>
                  </Flex>
                  <Flex width="35%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>*Company/Employer/Facility name</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <Flex height="40px" direction="row" border="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>3.From</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="40%">
                    <Text style={styles.text_sm_pl_pr}>Current Activity/Occupation</Text>
                  </Flex>
                  <Flex width="40%">
                    <Text style={styles.text_sm_pl_pr}>Company/Employer/Facility name</Text>
                  </Flex>
                </Flex>
                <Flex height="40px" direction="row" borderLeft="1px solid #000" borderRight="1px solid #000" borderBottom="1px solid #000">
                  <Flex borderRight="1px solid #000" width="20%">
                    <Text style={styles.text_sm_pl_pr}>To</Text>
                    <Text style={[styles.text_sm, { position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }]}>YYYY-MM-DD</Text>
                  </Flex>
                  <Flex borderRight="1px solid #000" width="25%">
                    <Text style={styles.text_sm_pl_pr}>City/Town</Text>
                  </Flex>
                  <Flex width="35%" borderRight="1px solid #000">
                    <Text style={styles.text_sm_pl_pr}>Company/Employer/Facility name</Text>
                  </Flex>
                  <Flex width="20%">
                    <Text style={styles.text_sm_pl_pr}>Province/State</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex margin="5px 0">
                <Text style={styles.text_sm_pl_pr}>Background Information</Text>
                <Text style={styles.text_sm_pl_pr}>You must complete this section if you are 18 years of age or older.</Text>

                <Flex border="1px solid #000" padding="0 10px">
                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      1. a) Within the past two years, have you or a family member ever had tuberculosis of the lungs or been in close
                      contact with a person with tuberculosis?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.tuberculosis === true ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{
                          border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.tuberculosis === false ? '#000' : ''}`
                        }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      b) Do you have any physical or mental disorder that would require social and/or health services, other than
                      medication, during a stay in Canada?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.mentalDisorder ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{
                          border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.mentalDisorder === false ? '#000' : ''}`
                        }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                    <Text style={styles.text_response}>{data.primaryTraveller.mentalDisorderDetails || 'Nil'}</Text>
                  </Flex>
                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      c) If you answered “yes” to question 1(a) or 1(b), please provide details and the name of the family member
                      (If applicable).
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex margin="5px 0">
                <Flex border="1px solid #000" padding="0 10px 30px">
                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      2. a) Have you ever remained beyond the validity of your status, attended school without authorization or
                      worked without authorization in Canada?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{
                          border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.remainbeyondValidity ? '#000' : ''}`
                        }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.remainbeyondValidity === false ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      b) Have you ever been refused a visa or permit, denied entry or ordered to leave Canada or any other
                      Country?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.refusedBefore ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.refusedBefore === false ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                    {/* <Text style={styles.text_response}>{data.primaryTraveller.refusedBeforeDetails || 'Nil'}</Text> */}
                  </Flex>

                  <Flex padding="10px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      c) Have you previously applied to enter or remain in Canada?
                    </Text>
                    <Flex direction="row" justify="flex-end">
                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.refusedBefore === false ? '#000' : ''}` }}> </Flex>
                        <Text style={[styles.text_sm]}> Yes </Text>
                      </Flex>

                      <Flex direction="row">
                        <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px' }}> </Flex>
                        <Text style={[styles.text_sm]}> No </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex direction='column' padding="20px 0">
                    <Text style={styles.text_sm_pl_pr}>
                      d) If you answered “yes” to question 2a), 2b), or 2c) please provide details.</Text>
                    <Text style={styles.text_response}>{data.primaryTraveller.refusedBeforeDetails || 'Nil'}</Text>

                  </Flex>
                </Flex>
              </Flex>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 5 of 9</Text>
            </View>
          </Page>

          {/* Page 6 */}
          <Page>
            <View style={{ margin: '10px 20px' }}>
              <Flex styles={{ marginBottom: '10px' }}>
                <Flex direction="column" align="center" justify="center">
                  <Text style={[styles.text_sm]}>APPLICATION FOR VISITOR VISA</Text>
                  <Text style={[styles.text_sm]}>(TEMPORARY RESIDENT VISA)</Text>
                </Flex>
              </Flex>

              <Flex border='1px solid #000' padding='0 10px 100px'>
                <Text style={styles.text_sm_pl_pr}>3. a) Have you ever committed, been arrested for, been charged with or convicted of any criminal offense?
                </Text>
                <Flex direction="row" justify="flex-end">
                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.arrestedBefore ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> Yes </Text>
                  </Flex>

                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data.primaryTraveller.arrestedBefore === false ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> No </Text>
                  </Flex>
                </Flex>

                <Text style={styles.text_sm_pl_pr}>b) If you answered “yes” to question 3a) above, please provide details</Text>
              </Flex>

              <Flex margin='0px 0 0px' padding='10px 0px 140px' border='1px solid #000'>
                <Flex>
                  <Text style={styles.text_sm_pl_pr}>
                    4. a) Did you serve in any military, militia, or defense unit or serve in a security organization or police force
                    (including non-obligatory national service, reserve or volunteer units)?
                  </Text>
                  <Flex direction="row" justify="flex-end">
                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.servedInMilitary ? '#000' : ''}` }}> </Flex>
                      <Text style={[styles.text_sm]}> Yes </Text>
                    </Flex>

                    <Flex direction="row">
                      <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.servedInMilitary === false ? '#000' : ''}` }}> </Flex>
                      <Text style={[styles.text_sm]}> No </Text>
                    </Flex>
                  </Flex>

                </Flex>

                <Flex>
                  <Text style={styles.text_sm_pl_pr}>b) If you answered “yes” to question 4a), please provide details</Text>
                  <Flex padding='20px'>
                    <Text style={styles.text_response}>{data.primaryTraveller.servedInMilitaryDetails || 'Nil'}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex direction='column' borderLeft='1px solid #000' borderRight='1px solid #000'>
                <Text style={styles.text_sm_pl_pr}>
                  5. Are you, or have you ever been a member or associated with any political party, or other group or organization
                  which has engaged in or advocated violence as a means to achieving a political or religious objective, or which
                  has been associated with criminal activity at any time?
                </Text>
                <Text style={[styles.text_response]}>{data?.primaryTraveller?.participatedInViolentActivities ? 'Yes' : 'No'}</Text>

                <Flex direction='row' justify='flex-end'>
                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.participatedInViolentActivities ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> Yes </Text>
                  </Flex>

                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.participatedInViolentActivities === false ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> No </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex border='1px solid #000'>
                <Text style={styles.text_sm_pl_pr}>6.Have you ever witnessed or participated in the ill treatment of prisoners or civilians, looting or desecration of
                  religious buildings?</Text>
                <Flex direction="row" justify="flex-end">
                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.participatedInViolentActivities === true ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> Yes </Text>
                  </Flex>

                  <Flex direction="row">
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '10px', backgroundColor: `${data?.primaryTraveller?.participatedInViolentActivities === false ? '#000' : ''}` }}> </Flex>
                    <Text style={[styles.text_sm]}> No </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex padding='0 10px 100px' borderLeft='1px solid #000' borderRight='1px solid #000' borderBottom='1px solid #000'>
                <Text style={styles.text_sm_pl_pr}>
                  If you answered “yes” to any of question 3 to 6 above, or upon request of a visa officer, you MAY BE REQUIRED
                  to fill out IMM 5257 Schedule 1
                </Text>
              </Flex>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 6 of 9</Text>
            </View>
          </Page>

          {/* page 7 */}
          <Page>
            <View style={{ margin: '10px 20px' }}>
              <Flex>
                <Text style={[{ fontSize: 20, fontWeight: 600 }]}>Family Information</Text>
                <Flex direction='row' gap='10px' styles={{ margin: '10px 0' }}>
                  <Text style={styles.text_sm}>Type Of Application</Text>
                  <Flex direction='row' gap='10px'>
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${data?.visaType === 'visitor' ? '#000' : ''}` }}> </Flex>
                    <Text style={styles.text_sm}>Visitor</Text>
                  </Flex>
                  <Flex direction='row' gap='10px'>
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${data?.visaType === 'working' ? '#000' : ''}` }}> </Flex>
                    <Text style={styles.text_sm}>Worker</Text>
                  </Flex>
                  <Flex direction='row' gap='10px'>
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${data?.visaType === 'student' ? '#000' : ''}` }}> </Flex>
                    <Text style={styles.text_sm}>Student</Text>
                  </Flex>
                  <Flex direction='row' gap='10px'>
                    <Flex styles={{ border: '1px solid #000', height: '10px', width: '20px', backgroundColor: `${!['visitor', 'working', 'student'].includes(data.visaType) ? '#000' : ''}` }}> </Flex>
                    <Text style={styles.text_sm}>Other</Text>
                  </Flex>
                </Flex>
                <Text style={[styles.text_sm, { margin: '0 0 10px' }]}>
                  Complete ALL names in English and in your native language (for example, Arabic, Cyrillic, Chinese, Chinese
                  commercial/ telegraphic code, Korean, or Japanese Characters). Include ALL family names even if they are not
                  accompanying you. If you need more space for any section, print out an additional page containing the appropriate
                  section, complete and submit it with your application
                </Text>
              </Flex>

              <Flex>
                <Text style={styles.text_sm}>SECTION A</Text>
                <Flex direction='row' border='1px solid #000' height='60px'>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Full name</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Relationship SEE NOTE 1</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_extra_sm, { borderBottom: '1px solid #000' }]}>Date of Birth</Text>
                    <Text style={styles.text_extra_sm}>Country of Birth</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Marital Status</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Flex direction='column' borderBottom='1px solid #000' width='100%'>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Address</Text>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>(if deceased give city and date)</Text>
                    </Flex>
                    <Flex>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Occupation</Text>
                    </Flex>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '20%' }}>
                    <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Will Accompany you to Canada?</Text>
                    <Flex direction='row' gap='10px'>
                      <Text style={styles.text_extra_sm}>YES</Text>
                      <Text style={styles.text_extra_sm}>NO</Text>
                    </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR APPLICANT*/}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>{data?.primaryTraveller?.firstName} {data?.primaryTraveller?.lastName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>APPLICANT</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response, { borderBottom: '1px solid #000' }]}>{isValidDate(data?.primaryTraveller?.dateOfBirth) ? ConvertDateToCad(data.primaryTraveller.dateOfBirth) : ''}</Text>
                    <Text style={[styles.text_response]}>
                      {typeof data?.primaryTraveller?.homeCountry === 'string' ?
                        data?.primaryTraveller?.homeCountry :
                        data?.primaryTraveller?.homeCountry?.name}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{data?.primaryTraveller?.maritalStatus}</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response, { borderBottom: '1px solid #000' }]}>{data.primaryTraveller.address}</Text>
                    <Text style={styles.text_response}>
                      {data?.primaryTraveller?.employment[data?.primaryTraveller?.employment?.length - 1]?.jobTitle}
                    </Text>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SPOUSE */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Spouse') !== undefined ? renderFamilyMember(data, 'Spouse')?.[0]?.membersName : ''}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>SPOUSE OR COMMON-LAW PARTNER</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Spouse')?.[0]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Spouse')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {/* {renderFamilyMember(data, 'Spouse')?.[0]?.address} */}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    {renderFamilyMember(data, 'Spouse')?.[0]?.status}
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {renderFamilyMember(data, 'Spouse')?.[0]?.address}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Spouse')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Spouse')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR MOTHER */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Mother') !== undefined ? renderFamilyMember(data, 'Mother')?.[0]?.membersName : ''}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>MOTHER</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Mother')?.[0]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Mother')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Mother')?.[0]?.status}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {renderFamilyMember(data, 'Mother')?.[0]?.address}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Mother')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Mother')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR FATHER */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Father')?.[0]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>FATHER</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={{ borderBottom: '1px solid #000' }}>
                      {isValidDate(renderFamilyMember(data, 'Father')?.[0]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Father')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}> </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {renderFamilyMember(data, 'Father')?.[0]?.address}
                    </Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Father')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Father')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* FOOTNOTE */}
                <Flex direction='column' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000'>
                  <Text style={styles.text_sm}>NOTE 1: If no spouse or common-law partner is listed in Section A, read and sign below.</Text>
                  <Flex direction='row' align='flex-end'>
                    <Text style={[styles.text_sm, { width: '60%' }]}>I certify that I do not have a spouse or common-law partner. </Text>
                    <Flex direction='row' align='flex-end' styles={{ width: '30%' }}>
                      <Text style={styles.text_sm}>Signature:</Text>
                      <Flex borderBottom='1px solid #000'>
                        <Text></Text>
                      </Flex>
                    </Flex>
                    <Flex direction='row' border='1px solid #000' justify='space-around' styles={{ height: '50px', width: '10%' }}>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>Y</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>M</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>D</Text>
                        <Text style={styles.text_response}></Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>


            </View>
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 7 of 9</Text>
            </View>
          </Page>

          {/* PAGE 8 */}
          <Page>
            {/* SECTION FOR CHILDREN */}
            <View style={{ margin: '10px 20px' }}>
              <Flex>
                <Text style={[styles.text_sm, { margin: '10px 0' }]}>
                  SECTION B CHILDREN (Include ALL sons and daughters, including ALL adopted and step-children, regardless of age or
                  place of residence)
                </Text>
                <Flex direction='row' border='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='60px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Full name</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Relationship SEE NOTE 1</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Date of Birth</Text>
                    <Text style={styles.text_extra_sm}>Country of Birth</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Marital Status</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Flex direction='column' borderBottom='1px solid #000' width='100%'>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Address</Text>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>(if deceased give city and date)</Text>
                    </Flex>
                    <Flex>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Occupation</Text>
                    </Flex>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '20%' }}>
                    <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Will Accompany you to Canada?</Text>
                    <Flex direction='row' gap='10px'>
                      <Text style={styles.text_extra_sm}>YES</Text>
                      <Text style={styles.text_extra_sm}>NO</Text>
                    </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR CHILD ONE */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Children')?.[0]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Children')?.[0]?.relationshipToPrimary}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Children')?.[0]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Children')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Children')?.[0]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Children')?.[0]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {renderFamilyMember(data, 'Children')?.[0]?.address}
                    </Text>
                    <Text>

                    </Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR CHILD 2 */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Children')?.[1]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>
                      {renderFamilyMember(data, 'Children')?.[1]?.relationshipToPrimary}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Children')?.[1]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Children')?.[1]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Children')?.[1]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Children')?.[1]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Children')?.[1]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[1]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[1]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR CHILD 3 */}
                <Flex direction='row' border='1px solid #000' height='100px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Children')?.[2]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}> {renderFamilyMember(data, 'Children')?.[2]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Children')?.[2]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Children')?.[2]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Children')?.[2]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Children')?.[2]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Children')?.[2]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[2]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[2]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR CHILD 4 */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='110px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Children')?.[3]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Children')?.[3]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Children')?.[3]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Children')?.[3]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Children')?.[3]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Children')?.[3]?.status} */}
                    </Text></Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Children')?.[3]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[3]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Children')?.[3]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* FOOTNOTE */}
                <Flex direction='column' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000'>
                  <Text style={styles.text_sm}>NOTE 2: : If no Children is listed in Section B, read and sign below.</Text>
                  <Flex direction='row' align='flex-end'>
                    <Text style={[styles.text_sm, { width: '60%' }]}>I certify that I do not have any children, either natural or adopted. </Text>
                    <Flex direction='row' align='flex-end' styles={{ width: '30%' }}>
                      <Text style={styles.text_sm}>Signature:</Text>
                      <Flex borderBottom='1px solid #000'>
                        <Text></Text>
                      </Flex>
                    </Flex>
                    <Flex direction='row' border='1px solid #000' justify='space-around' styles={{ height: '50px', width: '10%' }}>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>Y</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>M</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>D</Text>
                        <Text style={styles.text_response}></Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>

              </Flex>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 8 of 9</Text>
            </View>
          </Page>

          {/* PAGE 9 */}
          <Page>
            <View style={{ margin: '10px 20px' }}>
              {/* SIBLINGS SECTION */}
              <Flex>
                <Text style={[styles.text_sm, { margin: '10px 0' }]}>
                  SECTION C BROTHERS AND SISTERS (Include all brothers and sisters, ALL half-brother and sister and stepbrother and
                  sister.)
                </Text>
                <Flex direction='row' border='1px solid #000' height='70px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Full name</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Relationship SEE NOTE 1</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Date of Birth</Text>
                    <Text style={styles.text_extra_sm}>Country of Birth</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_extra_sm}>Marital Status</Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Flex direction='column' borderBottom='1px solid #000' width='100%'>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Address</Text>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>(if deceased give city and date)</Text>
                    </Flex>
                    <Flex>
                      <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Present Occupation</Text>
                    </Flex>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '20%' }}>
                    <Text style={[styles.text_extra_sm, { textAlign: 'center' }]}>Will Accompany you to Canada?</Text>
                    <Flex direction='row' gap='10px'>
                      <Text style={styles.text_extra_sm}>YES</Text>
                      <Text style={styles.text_extra_sm}>NO</Text>
                    </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING ONE */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='100px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[0]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[0]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[0]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[0]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[0]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Children')?.[0]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Children')?.[0]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[0]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[0]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING TWO */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='100px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[1]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[1]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[1]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[1]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[1]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Sibling')?.[1]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Sibling')?.[1]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[1]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[1]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING THREE */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='100px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[2]?.membersName}</Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[2]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[2]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[2]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[2]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Sibling')?.[2]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Sibling')?.[2]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[2]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[2]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>

                {/* ANSWER FOR SIBLING FOUR */}
                <Flex direction='row' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000' height='100px'>
                  <Flex align='center' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}>{renderFamilyMember(data, 'Sibling')?.[3]?.membersName}</Text> </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={styles.text_response}> {renderFamilyMember(data, 'Sibling')?.[3]?.relationshipToPrimary} </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>
                      {isValidDate(renderFamilyMember(data, 'Sibling')?.[3]?.dateOfBirth!) ? ConvertDateToCad(renderFamilyMember(data, 'Sibling')?.[3]?.dateOfBirth!) : ''}
                    </Text>
                    <Text style={styles.text_response}>
                      {renderFamilyMember(data, 'Sibling')?.[3]?.address}
                    </Text>
                  </Flex>
                  <Flex align='center' justify='center' styles={{ width: '10%', borderRight: '1px solid #000' }}>
                    <Text style={[styles.text_response]}>
                      {/* {renderFamilyMember(data, 'Sibling')?.[3]?.status} */}
                    </Text>
                  </Flex>
                  <Flex align='center' direction='column' justify='center' styles={{ width: '25%', borderRight: '1px solid #000' }}>
                    <Text style={[{ borderBottom: '1px solid #000' }, styles.text_response]}>{renderFamilyMember(data, 'Sibling')?.[3]?.address}</Text>
                    <Text></Text>
                  </Flex>
                  <Flex direction='row' gap='10px' align='center' justify='center' styles={{ width: '20%' }}>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[3]?.accompanying === true ? '#000' : '' }}> </Flex>
                    <Flex styles={{ border: '1px solid #000', height: '15px', width: '20px', backgroundColor: renderFamilyMember(data, 'Sibling')?.[3]?.accompanying === false ? '#000' : '' }}> </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* FOOTNOTE VERIFY INFORMATION IS ACCURATE */}
              <Flex>
                <Flex direction='column' borderBottom='1px solid #000' borderLeft='1px solid #000' borderRight='1px solid #000'>
                  <Text style={styles.text_extra_sm}>I certify that the information contained on this document is complete, accurate and factual. I also realize that once this document
                    has been completed and signed that it will form part of my immigration record and will be used to verify my family details on
                    future applications.</Text>
                  <Flex direction='row' align='flex-end'>

                    <Flex direction='row' align='flex-end' styles={{ width: '50%' }}>
                      <Text style={styles.text_sm}>Signature:</Text>
                      <Flex borderBottom='1px solid #000'>
                        <Text></Text>
                      </Flex>
                    </Flex>
                    <Flex direction='row' border='1px solid #000' justify='space-around' styles={{ height: '50px', width: '20%' }}>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>Y</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>M</Text>
                        <Text style={[styles.text_response]}></Text>
                      </Flex>
                      <Flex direction='column'>
                        <Text style={[styles.text_extra_sm]}>D</Text>
                        <Text style={styles.text_response}></Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex margin='10px 0'>
                <Flex border='1px solid #000' padding='5px'>
                  <Text style={styles.text_extra_sm}>
                    The information you provide on this form is collected under the authority of the Immigration And Refuge Protection Act to
                    determine if you may be admitted to Canada as a temporary resident. It will be stored in Personal Information Bank CIC PPU 055,
                    Visitor Case File. It is protected and accessible under the Privacy Act and the access to Information Act
                  </Text>
                </Flex>
              </Flex>

            </View>
            <View style={styles.footer}>
              <Text style={styles.footer_text}>Page 8 of 9</Text>
            </View>
          </Page>

        </Document >
      )}
    </PDFViewer>
  );
}

export default DownloadVisaApplicationPage

