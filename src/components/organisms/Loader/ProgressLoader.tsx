import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { ttColors } from '@/lib/theme/colors';


export default function ProgressLoader({ duration, color, width }: { duration?: number; color?: LinearProgressProps['color']; width?: string }) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev === 100) {
                    return 0;
                }
                const diff = Math.random() * 20;
                return Math.min(prev + diff, 100);
            });
        }, 1000);

        return () => clearInterval(timer)
    }, []);

    return (
        <Box
            width={width ?? "100%"}
            sx={{
                ".MuiLinearProgress-root": {
                    bgcolor: ttColors.lightestGray
                },
                ".MuiLinearProgress-bar.MuiLinearProgress-barColorPrimary": {
                    bgcolor: ttColors.primary
                },
            }}
        >
            <LinearProgress variant="determinate" value={progress} sx={{ height: '12px', borderRadius: '10px' }} color={color ?? 'primary'} />
        </Box>
    );
}