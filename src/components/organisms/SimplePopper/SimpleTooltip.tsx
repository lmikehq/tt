import React from 'react'
import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { ttColors } from '@/lib/theme/colors';


const SimpleTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip placement='top' arrow={true} {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: ttColors.darkBg,
    color: 'white',
    fontSize: 14,
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontFamily: 'Poppins'    },
}));

export default SimpleTooltip