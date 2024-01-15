import Flex from '@/components/templates/flex';
import { Box, Fade, Popper, PopperPlacementType, PopperProps, styled } from '@mui/material';
import React, { ReactElement, ReactNode, useRef, useState } from 'react';
const arrowStyles = {
  position: 'absolute',
  fontSize: 7,
  width: '3em',
  height: '3em',
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderColor: '#333333'
  },
};

const StyledPopper = styled(Popper)(({ theme }) => ({ // You can replace with `PopperUnstyled` for lower bundle size.
  //   zIndex: 1,
  //   maxWidth: '375px',
  //   width: '100%',
  '&[data-popper-placement*="bottom"] .arrow': {
    top: 0,
    left: 0,
    marginTop: '-0.9em',
    width: '3em',
    height: '1em',
    '&::before': {
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent #333333 transparent`,
    },
  },
  '&[data-popper-placement*="top"] .arrow': {
    bottom: 0,
    left: 0,
    marginBottom: '-0.9em',
    width: '3em',
    height: '1em',
    '&::before': {
      borderWidth: '1em 1em 0 1em',
      borderColor: `#333333 transparent transparent transparent`,
    },
  },
  '&[data-popper-placement*="right"] .arrow': {
    left: 0,
    marginLeft: '-0.9em',
    height: '3em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 1em 1em 0',
      borderColor: `transparent #333333 transparent transparent`,
    },
  },
  '&[data-popper-placement*="left"] .arrow': {
    right: 0,
    marginRight: '-0.9em',
    height: '3em',
    width: '1em',
    '&::before': {
      borderWidth: '1em 0 1em 1em',
      borderColor: `transparent transparent transparent #333333`,
    },
  },
}));


function SimplePopper({ children, open, anchorEl, placement, ...props }: {
  children: ReactElement,
  open: boolean,
  anchorEl: HTMLElement | null,
  placement?: PopperPlacementType;
} & PopperProps) {
  const [arrowRef, setArrowRef] = useState(null);
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <StyledPopper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement={placement ?? 'top'}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      transition
      {...props}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box sx={{ width: 'max-content' }}>
            {children}
            <Box component="span" className="arrow" ref={setArrowRef} sx={arrowStyles} />
          </Box>
        </Fade>
      )}
    </StyledPopper>
  );
}

export default SimplePopper;