"use client";

import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Center from "@/components/templates/center";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const { isMobile } = useScreenResolution();

    return (
        <Center height="100vh">
            <Flex direction="column" align="center">
                {/* <Text
            type="p"
            text="Oopss!!"
            size={30}
            weight={700}
            color="#000000"
          /> */}

                <Text
                    type="p"
                    text="Something went wrong!"
                    size={isMobile ? 16 : 18}
                    weight={600}
                    color="#888888"
                    textAlign="center"
                />

                <Button margin="1rem 0 0" onClick={() => reset()}>
                    <Text type="p" text="Retry" size={16} weight={600} />
                </Button>
            </Flex>
        </Center>
    );
}
