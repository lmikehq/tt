"use client";

import React, { useState, useEffect } from "react";
import Loader from "@organism/Loader/loader";
import styled from "styled-components";
import { CONVERSION_RATE_KEY } from "@/lib/extensions/constants";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { Backdrop } from "@mui/material";
import Spinner from "@/components/molecules/icons/spinner";
import { ttColors } from "@/lib/theme/colors";

const LayoutWrapper = styled.div``;

interface LayoutProps {
    children: React.ReactNode;
}

const LoaderLayout: React.FC<LayoutProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { setConversionRate, showBackDropLoader } = useUserPreferencesStore(
        (state) => state,
    );

    const initializeApp = () => {
        const conversionRate = window.localStorage.getItem(CONVERSION_RATE_KEY);
        if (conversionRate) setConversionRate(parseInt(conversionRate));
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            initializeApp();
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LayoutWrapper>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {showBackDropLoader ? <BackDropLoader /> : null}
                    {children}
                </>
            )}
        </LayoutWrapper>
    );
};

export default LoaderLayout;

const BackDropLoader = () => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <Spinner size="40px" fill={ttColors.primary} />
        </Backdrop>
    );
};
