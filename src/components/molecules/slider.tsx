import MuiSlider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomizedSlider = styled(MuiSlider)(({ theme }) => ({
  color: '#7BBBD6',
  height: 3,
    padding: '13px 0',
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
  },
  "& .MuiSlider-thumb .center-dot": {
    height: 12,
    width: 12,
    borderRadius: '20px',
    backgroundColor: 'currentColor',
    marginLeft: 1,
    marginRight: 1,
  },
  "& .MuiSlider-track": {
    color: '#7BBBD6',
    height: 10,
  },
  "& .MuiSlider-markLabel[data-index='0']": {
      left: '14px !important',
      fontSize: '14px'
  },
  "& .MuiSlider-markLabel[data-index='1']": {
      left: '96% !important',
      fontSize: '14px'
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === 'dark' ? '#7BBBD6' : '#DAF0F9',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 10,
  },
}));

interface ThumbComponentProps extends React.HTMLAttributes<unknown> {}

function ThumbComponent(props: ThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="center-dot" />
    </SliderThumb>
  );
}

interface Mark {
  value: number;
  label: string;
}

interface SliderProps {
  marks: Mark[];
  defaultValue: number[];
  onChange?: (event: Event, newValue: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function CustomSlider({ marks, defaultValue, onChange, min, max, step }: SliderProps) {
  return (
    <CustomizedSlider
      components={{ Thumb: ThumbComponent }}
      marks={marks}
      defaultValue={defaultValue}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
    />
  );
}
