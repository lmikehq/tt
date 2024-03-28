import React from 'react';
import EmojiPickerComponent  from 'emoji-picker-react';
import { ClickAwayListener } from '@mui/material';
import styled from 'styled-components';

type IPicker = {
    onSelect?: (emoji: any) => void;
    handleCloseEmoji?: () => void;
};


const EmojiPicker: React.FC<IPicker> = ({ onSelect, handleCloseEmoji = () => {} }) => {
    return (
        <ClickAwayListener onClickAway={handleCloseEmoji}>
            <EmojiPickerContainer>
               <EmojiPickerComponent onEmojiClick={onSelect}  />
            </EmojiPickerContainer>
        </ClickAwayListener>
    );
};

export default EmojiPicker;

const EmojiPickerContainer = styled.div`
    position: absolute;
    bottom: -195%;
    left: 50%;
transform: translate(-50%, -50%);
    z-index: 4;
`;