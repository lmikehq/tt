// import React, { useState } from "react";
// import { DatePicker, Form } from "antd";
// import moment from "moment";
// import styled from "styled-components";

// const StyledDatePickerWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   border: 1px solid #E7E7E7;
//   padding: 0px 10px;
//   border-radius: 8px;
//   border-bottom: 1px solid #E7E7E7;
//   width: 100%;
//   gap: 10px;
// `;

// const DateRangePicker = ({ label }) => {
//   const [dateRange, setDateRange] = useState([moment(), moment()]);

//   const handleChange = (newDateRange) => {
//     console.log(newDateRange);
//     setDateRange(newDateRange);
//   };

//   return (
//     <Form.Item label={label} colon={false}>
//       <StyledDatePickerWrapper>
//         <DatePicker.RangePicker
//           format="MMM Do, YYYY"
//           value={dateRange}
//           separator={"-"}
//           onChange={handleChange}
//           allowClear={false}
//         />
//       </StyledDatePickerWrapper>
//     </Form.Item>
//   );
// };

// export default DateRangePicker;

import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";

const StyledDatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #E7E7E7;
  padding: 0px 10px;
  border-radius: 8px;
  width: 100%;
`;

const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([moment(), moment()]);

  const handleChange = (newDateRange) => {
    console.log(newDateRange);
    setDateRange(newDateRange);
  };

  return (
    <StyledDatePickerWrapper>
      <DatePicker.RangePicker
        format="MMM Do, YYYY"
        value={dateRange}
        separator={"-"}
        onChange={handleChange}
        allowClear={false}
        style={{ width: "100%" }}
      />
    </StyledDatePickerWrapper>
  );
};

export default DateRangePicker;
