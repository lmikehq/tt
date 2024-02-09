import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
// import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { Grid } from "@/components/templates/grid";
import { useEffect, useState } from "react";

type PaginationProp<T> = {
  page: number;
  setPage: (param: string) => void;
  data: T[];
  filteredCount: number;
  totalCount: number;
};

const PaginationCtrl = <T,>({ page, setPage, data, filteredCount, totalCount }: PaginationProp<T>) => {
  // const { isMobile } = useScreenResolution();
  const [_remainingItems, setRemainingItems] = useState(totalCount - filteredCount);
  const pageSize = 10;

  useEffect(() => {
    const remainingItems = totalCount - filteredCount;
    setRemainingItems(remainingItems);

  }, [page, totalCount, filteredCount]);

  // const totalPages = Math.ceil(totalPages/pageSize);
  const totalPages = Math.ceil(filteredCount / pageSize);

  // check if there is any data coming in atall
  const isData = filteredCount === 0;

  return (
    <Flex align="center" justify="center" margin="40px 0 0">
      <Grid columns={''} style={{ gridTemplateColumns: '150px 150px' }} gap="10px">
        <Button
          variant="outline"
          color={ttColors.dark}
          width="100%"
          styles={{ maxWidth: '100%', background: 'transparent !important' }}
          disabled={isData || page === 1}
          background={'transparent'}
          border={`1px solid ${ttColors.dark}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
            setPage('prev');
          }}>
          <Text type="p" text="Prev" weight={600} color={ttColors.dark} />
        </Button>
        <Button
          variant="outline"
          color={ttColors.dark}
          width="100%"
          styles={{ maxWidth: '100%' }}
          disabled={isData || page === totalPages}
          background={'transparent'}
          border={`1px solid ${ttColors.dark}`}
          onClick={() => {
            setPage('next');
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }}>
          <Text type="p" text="Next" weight={600} color={ttColors.dark} />
        </Button>
      </Grid>
    </Flex>
  );
};

export default PaginationCtrl;