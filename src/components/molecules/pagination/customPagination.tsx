import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import Flex from "@/components/templates/flex";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ttColors } from "@/lib/theme/colors";

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',

  '& > button': {
    width: '42px'
  }
});

interface Props {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

const CustomPagination = ({ count, onChange, page }: Props) => {
  const { items } = usePagination({
    count: count,
    page: page,
    onChange(event, page) {
      onChange(page);
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
    },
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…..';
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                className="pagination-ctrl-btn"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                  backgroundColor: selected ? ttColors.primary : '',
                  color: selected ? '#FFF' : '',
                  fontFamily: 'poppin',
                  width: '42px !important',
                  maxWidth: '42px',
                  height: '42px'
                }}
                {...item}
              >
                <Container>
                  {page}
                </Container>
              </button>
            );
          } else {
            const btn = type === 'previous' ? (
              <button type="button" {...item} className="pagination-ctrl-btn" style={{ maxWidth: '42px' }}>
                <Flex height="42px" align="center" justify="center" width="42px" borderRadius="8px" border="1px solid #F1F1F1">
                  <FaChevronLeft size={10} />
                </Flex>
              </button>
            ) : (
              <button type="button" {...item} className="pagination-ctrl-btn" style={{ maxWidth: '42px' }}>
                <Flex height="42px" align="center" justify="center" width="42px" borderRadius="8px" border="1px solid #F1F1F1">
                  <FaChevronRight size={10} />
                </Flex>
              </button>
            );

            children = (
              btn
            );
          }

          return <li key={index} className="mx-4">{children}</li>;
        })}
      </List>
    </nav >
  );
};

export default CustomPagination;

const Container = ({ children }: any) => {
  return (
    <Flex height="42px" align="center" justify="center" width="42px" borderRadius="8px" border="1px solid #F1F1F1">
      {children}
    </Flex>
  );
};