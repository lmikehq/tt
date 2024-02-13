import { StyleSheet } from '@react-pdf/renderer';

export const PDFstyles = StyleSheet.create({
  page_one: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    fontFamily: 'Helvetica'
    // paddingHorizontal: 35,
  },
  backgroundImage: {
    position: 'absolute',
    left: 40,
    bottom: 60,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Adjust the object-fit property as needed
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  firstPage: {
    backgroundColor: '#7BBBD6',
  },
  header_main: {
    fontSize: 32,
    color: '#FFF',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Helvetica'
  },
  firstPage_header_sub: {
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Helvetica'
  },
  secondPage_header: {
    color: '#929292',
    fontSize: 9,
    fontWeight: 400,
    marginBottom: 6
  },
  secondPage_info: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  fontType: {
    // fontFamily: 'inter'
  },
  seconndary_color: {
    color: '#929292'
  },
  secondPage_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '33.3%'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    height: '356px',
    width: '376px',
    objectFit: 'cover',
    alignSelf: 'center'
  },
  white: {
    color: '#FFF'
  },
  text_sm: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    fontWeight: 'extrabold'
  },
  text_extra_sm: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    fontWeight: 'extrabold'
  },
  text_sm_pl_pr: {
    padding: '0 10px',
    fontSize: 11,
    fontFamily: 'Helvetica',
    fontWeight: 'extrabold'
  },
  text_response: {
    fontSize: 10,
    marginTop: 12,
    color: '#1E90FF'
  },
  arrow: {
    width: 10,
    height: 10,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '10px solid #333' /* Change the color as needed */
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: '#7BBBD6',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer_text: {
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});