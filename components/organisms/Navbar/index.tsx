"use client";
import styled from "styled-components";
import { useState } from "react";
import NavbarLayout from "@components/layouts/sectionLayout";
import Flex from "@atom/flex";
import Link from "@atom/link";
import { GiPassport } from "react-icons/gi";
import { IoAirplaneSharp, IoBedSharp } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import Logo from "@image/brand/favicon.svg";
import Divider from "@mui/material/Divider";
import Input from "@atom/input";
// Modal from material ui
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// Modal from material ui ends

const NavbarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  background: transparent;
  z-index: 100;
  padding: 3rem 0;

  & button {
    background: var(--secondary-color);
    // color: var(--default-color);
    color: #fff;
    padding: 0.5rem 2rem;
    text-transform: capitalize;
    font-weight: 600;
    &:hover {
      background: var(--secondary-color);
    }
  }
`;
const NavLink = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: 0.1rem;
  text-transform: capitalize;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding-top: 1.5rem;

  & a {
    color: var(--text-color);

    &:hover {
      color: var(--primary-color);
    }
  }
`;
const NavLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  & a {
    color: var(--text-color);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1rem;
    letter-spacing: 0.1rem;
    text-transform: capitalize;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: var(--primary-color);
    }
  }
  & button {
    padding: 1rem 3rem;
    margin-left: 1rem;
    border-radius: 0.8rem;

    &.btnWithIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;

// Modal
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll" as "scroll",
  p: 4,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
`;

// const Button = styled.input`
//   margin-top: 20px;
//   padding: 10px;
//   color: white;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//
//   &:hover {
// background-color: #0056b3;
//   }
// `;
// Modal

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <NavbarWrapper>
      <NavbarLayout>
        <Flex justify="space-between">
          <NavLink>
            <Link href="/">
              <GiPassport /> Book Visa
            </Link>
            <Link href="/">
              <IoAirplaneSharp /> Find Flight
            </Link>
            <Link href="/">
              <IoBedSharp /> Find Stays
            </Link>
          </NavLink>

          <NavLogo>
            <Link href="/">
              <Image src={Logo} height="71" width="71" alt="TTLogo" />
            </Link>
          </NavLogo>

          <NavMenu>
            <Button
              className="btnWithIcon"
              onClick={handleOpen}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--secondary-color)",
              }}
            >
              <BsGlobe />
              EN
              <Divider orientation="vertical" flexItem />
              <BiDollar />
              USD
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    style={{ textAlign: "center" }}
                  >
                    Please Choose Your Country & Currency Preferences
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <Form>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={isoLangs}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Language" />
                        )}
                      />


                      <Button variant="contained" size="medium" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
            <Link href="/">Login</Link>
            <Button variant="contained" size="small">
              Sign up
            </Button>
          </NavMenu>
        </Flex>
      </NavbarLayout>
    </NavbarWrapper>
  );
};

export default Navbar;


const isoLangs = [
  { code: "aa", label: "Afar" },
  { code: "ab", label: "Abkhaz" },
  { code: "ae", label: "Avestan" },
  { code: "af", label: "Afrikaans" },
  { code: "ak", label: "Akan" },
  { code: "am", label: "Amharic" },
  { code: "an", label: "Aragonese" },
  { code: "ar", label: "Arabic" },
  { code: "ar_ae", label: "Arabic (United Arab Emirates)" },
  { code: "ar_bh", label: "Arabic (Bahrain)" },
  { code: "ar_dz", label: "Arabic (Algeria)" },
  { code: "ar_eg", label: "Arabic (Egypt)" },
  { code: "ar_iq", label: "Arabic (Iraq)" },
  { code: "ar_jo", label: "Arabic (Jordan)" },
  { code: "ar_kw", label: "Arabic (Kuwait)" },
  { code: "ar_lb", label: "Arabic (Lebanon)" },
  { code: "ar_ly", label: "Arabic (Libya)" },
  { code: "ar_ma", label: "Arabic (Morocco)" },
  { code: "ar_om", label: "Arabic (Oman)" },
  { code: "ar_qa", label: "Arabic (Qatar)" },
  { code: "ar_sa", label: "Arabic (Saudi Arabia)" },
  { code: "ar_sd", label: "Arabic (Sudan)" },
  { code: "ar_sy", label: "Arabic (Syria)" },
  { code: "ar_tn", label: "Arabic (Tunisia)" },
  { code: "ar_ye", label: "Arabic (Yemen)" },
  { code: "as", label: "Assamese" },
  { code: "av", label: "Avaric" },
  { code: "ay", label: "Aymara" },
  { code: "az", label: "Azerbaijani" },
  { code: "ba", label: "Bashkir" },
  { code: "be", label: "Belarusian" },
  { code: "be_by", label: "Belarusian (Belarus)" },
  { code: "bg", label: "Bulgarian" },
  { code: "bg_bg", label: "Bulgarian (Bulgaria)" },
  { code: "bh", label: "Bihari" },
  { code: "bi", label: "Bislama" },
  { code: "bm", label: "Bambara" },
  { code: "bn", label: "Bengali" },
  { code: "bo", label: "Tibetan Standard, Tibetan, Central" },
  { code: "br", label: "Breton" },
  { code: "bs", label: "Bosnian" },
  { code: "ca", label: "Catalan; Valencian" },
  { code: "ca_es", label: "Catalan (Spain)" },
  { code: "ce", label: "Chechen" },
  { code: "ch", label: "Chamorro" },
  { code: "co", label: "Corsican" },
  { code: "cr", label: "Cree" },
  { code: "cs", label: "Czech" },
  { code: "cs_cz", label: "Czech (Czech Republic)" },
  {
    code: "cu",
    label:
      "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
  },
  { code: "cv", label: "Chuvash" },
  { code: "cy", label: "Welsh" },
  { code: "da", label: "Danish" },
  { code: "da_dk", label: "Danish (Denmark)" },
  { code: "de", label: "German" },
  { code: "de_at", label: "German (Austria)" },
  { code: "de_ch", label: "German (Switzerland)" },
  { code: "de_de", label: "German (Germany)" },
  { code: "de_lu", label: "German (Luxembourg)" },
  { code: "dv", label: "Divehi; Dhivehi; Maldivian;" },
  { code: "ee", label: "Ewe" },
  { code: "el", label: "Greek, Modern" },
  { code: "el_cy", label: "Greek (Cyprus)" },
  { code: "el_gr", label: "Greek (Greece)" },
  { code: "en", label: "English" },
  { code: "en_au", label: "English (Australia)" },
  { code: "en_ca", label: "English (Canada)" },
  { code: "en_gb", label: "English (United Kingdom)" },
  { code: "en_ie", label: "English (Ireland)" },
  { code: "en_in", label: "English (India)" },
  { code: "en_mt", label: "English (Malta)" },
  { code: "en_nz", label: "English (New Zealand)" },
  { code: "en_ph", label: "English (Philippines)" },
  { code: "en_sg", label: "English (Singapore)" },
  { code: "en_us", label: "English (United States)" },
  { code: "en_za", label: "English (South Africa)" },
  { code: "eo", label: "Esperanto" },
  { code: "es", label: "Spanish; Castilian" },
  { code: "es_ar", label: "Spanish (Argentina)" },
  { code: "es_bo", label: "Spanish (Bolivia)" },
  { code: "es_cl", label: "Spanish (Chile)" },
  { code: "es_co", label: "Spanish (Colombia)" },
  { code: "es_cr", label: "Spanish (Costa Rica)" },
  { code: "es_do", label: "Spanish (Dominican Republic)" },
  { code: "es_ec", label: "Spanish (Ecuador)" },
  { code: "es_es", label: "Spanish (Spain)" },
  { code: "es_gt", label: "Spanish (Guatemala)" },
  { code: "es_hn", label: "Spanish (Honduras)" },
  { code: "es_mx", label: "Spanish (Mexico)" },
  { code: "es_ni", label: "Spanish (Nicaragua)" },
  { code: "es_pa", label: "Spanish (Panama)" },
  { code: "es_pe", label: "Spanish (Peru)" },
  { code: "es_pr", label: "Spanish (Puerto Rico)" },
  { code: "es_py", label: "Spanish (Paraguay)" },
  { code: "es_sv", label: "Spanish (El Salvador)" },
  { code: "es_us", label: "Spanish (United States)" },
  { code: "es_uy", label: "Spanish (Uruguay)" },
  { code: "es_ve", label: "Spanish (Venezuela)" },
  { code: "et", label: "Estonian" },
  { code: "et_ee", label: "Estonian (Estonia)" },
  { code: "eu", label: "Basque" },
  { code: "fa", label: "Persian" },
  { code: "ff", label: "Fula; Fulah; Pulaar; Pular" },
  { code: "fi", label: "Finnish" },
  { code: "fi_fi", label: "Finnish (Finland)" },
  { code: "fj", label: "Fijian" },
  { code: "fo", label: "Faroese" },
  { code: "fr", label: "French" },
  { code: "fr_be", label: "French (Belgium)" },
  { code: "fr_ca", label: "French (Canada)" },
  { code: "fr_ch", label: "French (Switzerland)" },
  { code: "fr_fr", label: "French (France)" },
  { code: "fr_lu", label: "French (Luxembourg)" },
  { code: "fy", label: "Western Frisian" },
  { code: "ga", label: "Irish" },
  { code: "ga_ie", label: "Irish (Ireland)" },
  { code: "gd", label: "Scottish Gaelic; Gaelic" },
  { code: "gl", label: "Galician" },
  { code: "gn", label: "Guaraní" },
  { code: "gu", label: "Gujarati" },
  { code: "gv", label: "Manx" },
  { code: "ha", label: "Hausa" },
  { code: "he", label: "Hebrew (modern)" },
  { code: "hi", label: "Hindi" },
  { code: "hi_in", label: "Hindi (India)" },
  { code: "ho", label: "Hiri Motu" },
  { code: "hr", label: "Croatian" },
  { code: "hr_hr", label: "Croatian (Croatia)" },
  { code: "ht", label: "Haitian; Haitian Creole" },
  { code: "hu", label: "Hungarian" },
  { code: "hu_hu", label: "Hungarian (Hungary)" },
  { code: "hy", label: "Armenian" },
  { code: "hz", label: "Herero" },
  { code: "ia", label: "Interlingua" },
  { code: "id", label: "Indonesian" },
  { code: "ie", label: "Interlingue" },
  { code: "ig", label: "Igbo" },
  { code: "ii", label: "Nuosu" },
  { code: "ik", label: "Inupiaq" },
  { code: "in", label: "Indonesian" },
  { code: "in_id", label: "Indonesian (Indonesia)" },
  { code: "io", label: "Ido" },
  { code: "is", label: "Icelandic" },
  { code: "is_is", label: "Icelandic (Iceland)" },
  { code: "it", label: "Italian" },
  { code: "it_ch", label: "Italian (Switzerland)" },
  { code: "it_it", label: "Italian (Italy)" },
  { code: "iu", label: "Inuktitut" },
  { code: "iw", label: "Hebrew" },
  { code: "iw_il", label: "Hebrew (Israel)" },
  { code: "ja", label: "Japanese" },
  { code: "ja_jp", label: "Japanese (Japan)" },
  { code: "jv", label: "Javanese" },
  { code: "ka", label: "Georgian" },
  { code: "kg", label: "Kongo" },
  { code: "ki", label: "Kikuyu, Gikuyu" },
  { code: "kj", label: "Kwanyama, Kuanyama" },
  { code: "kk", label: "Kazakh" },
  { code: "kl", label: "Kalaallisut, Greenlandic" },
  { code: "km", label: "Khmer" },
  { code: "kn", label: "Kannada" },
  { code: "ko", label: "Korean" },
  { code: "ko_kr", label: "Korean (South Korea)" },
  { code: "kr", label: "Kanuri" },
  { code: "ks", label: "Kashmiri" },
  { code: "ku", label: "Kurdish" },
  { code: "kv", label: "Komi" },
  { code: "kw", label: "Cornish" },
  { code: "ky", label: "Kirghiz, Kyrgyz" },
  { code: "la", label: "Latin" },
  { code: "lb", label: "Luxembourgish, Letzeburgesch" },
  { code: "lg", label: "Luganda" },
  { code: "li", label: "Limburgish, Limburgan, Limburger" },
  { code: "ln", label: "Lingala" },
  { code: "lo", label: "Lao" },
  { code: "lt", label: "Lithuanian" },
  { code: "lt_lt", label: "Lithuanian (Lithuania)" },
  { code: "lu", label: "Luba-Katanga" },
  { code: "lv", label: "Latvian" },
  { code: "lv_lv", label: "Latvian (Latvia)" },
  { code: "mg", label: "Malagasy" },
  { code: "mh", label: "Marshallese" },
  { code: "mi", label: "Māori" },
  { code: "mk", label: "Macedonian" },
  { code: "mk_mk", label: "Macedonian (Macedonia)" },
  { code: "ml", label: "Malayalam" },
  { code: "mn", label: "Mongolian" },
  { code: "mr", label: "Marathi (Marāṭhī)" },
  { code: "ms", label: "Malay" },
  { code: "ms_my", label: "Malay (Malaysia)" },
  { code: "mt", label: "Maltese" },
  { code: "mt_mt", label: "Maltese (Malta)" },
  { code: "my", label: "Burmese" },
  { code: "na", label: "Nauru" },
  { code: "nb", label: "Norwegian Bokmål" },
  { code: "nd", label: "North Ndebele" },
  { code: "ne", label: "Nepali" },
  { code: "ng", label: "Ndonga" },
  { code: "nl", label: "Dutch" },
  { code: "nl_be", label: "Dutch (Belgium)" },
  { code: "nl_nl", label: "Dutch (Netherlands)" },
  { code: "nn", label: "Norwegian Nynorsk" },
  { code: "no", label: "Norwegian" },
  { code: "no_no", label: "Norwegian (Norway)" },
  { code: "nr", label: "South Ndebele" },
  { code: "nv", label: "Navajo, Navaho" },
  { code: "ny", label: "Chichewa; Chewa; Nyanja" },
  { code: "oc", label: "Occitan" },
  { code: "oj", label: "Ojibwe, Ojibwa" },
  { code: "om", label: "Oromo" },
  { code: "or", label: "Oriya" },
  { code: "os", label: "Ossetian, Ossetic" },
  { code: "pa", label: "Panjabi, Punjabi" },
  { code: "pi", label: "Pāli" },
  { code: "pl", label: "Polish" },
  { code: "pl_pl", label: "Polish (Poland)" },
  { code: "ps", label: "Pashto, Pushto" },
  { code: "pt", label: "Portuguese" },
  { code: "pt_br", label: "Portuguese (Brazil)" },
  { code: "pt_pt", label: "Portuguese (Portugal)" },
  { code: "qu", label: "Quechua" },
  { code: "rm", label: "Romansh" },
  { code: "rn", label: "Kirundi" },
  { code: "ro", label: "Romanian, Moldavian, Moldovan" },
  { code: "ro_ro", label: "Romanian (Romania)" },
  { code: "ru", label: "Russian" },
  { code: "ru_ru", label: "Russian (Russia)" },
  { code: "rw", label: "Kinyarwanda" },
  { code: "sa", label: "Sanskrit (Saṁskṛta)" },
  { code: "sc", label: "Sardinian" },
  { code: "sd", label: "Sindhi" },
  { code: "se", label: "Northern Sami" },
  { code: "sg", label: "Sango" },
  { code: "si", label: "Sinhala, Sinhalese" },
  { code: "sk", label: "Slovak" },
  { code: "sk_sk", label: "Slovak (Slovakia)" },
  { code: "sl", label: "Slovene" },
  { code: "sl_si", label: "Slovenian (Slovenia)" },
  { code: "sm", label: "Samoan" },
  { code: "sn", label: "Shona" },
  { code: "so", label: "Somali" },
  { code: "sq", label: "Albanian" },
  { code: "sq_al", label: "Albanian (Albania)" },
  { code: "sr", label: "Serbian" },
  { code: "sr_ba", label: "Serbian (Bosnia and Herzegovina)" },
  { code: "sr_cs", label: "Serbian (Serbia and Montenegro)" },
  { code: "sr_me", label: "Serbian (Montenegro)" },
  { code: "sr_rs", label: "Serbian (Serbia)" },
  { code: "ss", label: "Swati" },
  { code: "st", label: "Southern Sotho" },
  { code: "su", label: "Sundanese" },
  { code: "sv", label: "Swedish" },
  { code: "sv_se", label: "Swedish (Sweden)" },
  { code: "sw", label: "Swahili" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "tg", label: "Tajik" },
  { code: "th", label: "Thai" },
  { code: "th_th", label: "Thai (Thailand)" },
  { code: "ti", label: "Tigrinya" },
  { code: "tk", label: "Turkmen" },
  { code: "tl", label: "Tagalog" },
  { code: "tn", label: "Tswana" },
  { code: "to", label: "Tonga (Tonga Islands)" },
  { code: "tr", label: "Turkish" },
  { code: "tr_tr", label: "Turkish (Turkey)" },
  { code: "ts", label: "Tsonga" },
  { code: "tt", label: "Tatar" },
  { code: "tw", label: "Twi" },
  { code: "ty", label: "Tahitian" },
  { code: "ug", label: "Uighur, Uyghur" },
  { code: "uk", label: "Ukrainian" },
  { code: "uk_ua", label: "Ukrainian (Ukraine)" },
  { code: "ur", label: "Urdu" },
  { code: "uz", label: "Uzbek" },
  { code: "ve", label: "Venda" },
  { code: "vi", label: "Vietlabelse" },
  { code: "vi_vn", label: "Vietlabelse (Vietnam)" },
  { code: "vo", label: "Volapük" },
  { code: "wa", label: "Walloon" },
  { code: "wo", label: "Wolof" },
  { code: "xh", label: "Xhosa" },
  { code: "yi", label: "Yiddish" },
  { code: "yo", label: "Yoruba" },
  { code: "za", label: "Zhuang, Chuang" },
  { code: "zh", label: "Chinese" },
  { code: "zh_cn", label: "Chinese (Simplified, China)" },
  { code: "zh_hk", label: "Chinese (Hong Kong)" },
  { code: "zh_sg", label: "Chinese (Singapore)" },
  { code: "zh_tw", label: "Chinese (Traditional, Taiwan)" },
];

