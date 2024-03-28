"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
interface AvatarProps {
    img?: string;
    initial: string;
    width?: string;
    height?: string;
}

interface AvatarWrapperProps {
    width?: string;
    height?: string;
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
    width: ${(props) => props.width || '50px'};
    height: ${(props) => props.height || '50px'};
    border-radius: 50%;
    background: #3733FF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;

    > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

const UserAvatar: React.FC<AvatarProps> = ({ img, initial, height, width }) => {
    const [imgError, setImgError] = useState(false);

  const onImgError = (err: any) => setImgError(true);
    return (
        <AvatarWrapper height={height} width={width}>
            {img && !imgError ? (
                <Image
                    width={100}
                    height={100}
                    src={img}
                    alt=""
                    onError={onImgError}
                />
            ) : (
                <span >
  {initial
    ?.split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')}
</span>
            )}
        </AvatarWrapper>
    );
};

export default UserAvatar;