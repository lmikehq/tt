import { DateRange, DateRangePicker, RangeKeyDict } from 'react-date-range';
import { useEffect, useRef, useState } from 'react';
import { addDays, format } from 'date-fns';
import styled from "styled-components";

const Container = styled.div`
  .rdrDay {
    width: 44.56px !important;
    font-family: poppins;
    font-weight: medium;
  }

  // .rdrDateDisplayWrapper{
  //   display: none;
  // }

  .rdrDayNumber {
    font-weight: 500 !important;
  }

  .rdrDayEndOfWeek .rdrInRange, .rdrEndEdge {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .rdrDayStartOfWeek .rdrInRange, .rdrStartEdge {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

`;

type DateRangeProp = {
  onChange: (item: RangeKeyDict) => void;
  state: {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    key?: string | undefined;
  }[];
};

const DateRangeComponent = ({ onChange, state }: DateRangeProp) => {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    let handler = (e: any) => {
      if (!calendarRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <section
        className='calendar-container'
        ref={calendarRef}
      >
        <div
          className='calendar-trigger'
          onClick={() => {
            setOpen(!open);
          }}
        >
          <input
            className='calendar-input'
            value={format(state[0].startDate!, 'dd/MM/yyyy')}
            defaultValue="dd/mm/yyyy"
            readOnly
          />
          <input
            className='calendar-input'
            value={state[0].endDate === undefined ? 'dd/MM/yyyy' : format(state[0].endDate!, 'dd/MM/yyyy')}
            defaultValue="dd/mm/yyyy"
            readOnly
          />
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <Container>
            <DateRange
              onChange={onChange}
              className='calendarStyle'
              ranges={state}
              // showSelectionPreview={false}
              editableDateInputs={false}
              showMonthAndYearPickers={false}
              moveRangeOnFirstSelection={false}
              showDateDisplay={false}
              // showDateDisplay={false}
              rangeColors={['#87CEEB', '#DAF0F9', '#4A7181']}
              months={2}
              direction='horizontal'
            />
          </Container>
        </div>
      </section>
    </>
  );
};

export default DateRangeComponent; 