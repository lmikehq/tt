import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import {
  LiaAngleDoubleLeftSolid,
  LiaAngleDoubleRightSolid,
  LiaAngleLeftSolid,
  LiaAngleRightSolid,
} from "react-icons/lia";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const useStyles = makeStyles((theme) => ({
  paginationWrapper: {
    marginTop: "1rem",
  },
  paginationFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: "4rem auto",
  },
  paginationText: {
    width: "45%",
  },
  paginationButtons: {
    gap: "10px",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "55%",
  },
}));

const CustomPagination = () => {
  const classes = useStyles();

  return (
    <Box className={classes.paginationWrapper}>
      <Box className={classes.paginationFlex}>
        <Box className={classes.paginationText} component="p" color="#19013b">
          Showing 1 to 12 of 42 users
        </Box>
        <Box className={classes.paginationButtons} display="flex">
          <Button
            variant="outlined"
            style={{
              height: "46px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            <LiaAngleDoubleLeftSolid />
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            <LiaAngleLeftSolid />
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            1
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            2
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            3
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "none",
              color: "#19013b",
            }}
          >
            <HiOutlineDotsHorizontal />
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            10
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            <LiaAngleRightSolid />
          </Button>
          <Button
            variant="outlined"
            style={{
              height: "48px",
              width: "48px",
              background: "transparent",
              border: "1px solid #e7e7e7",
              color: "#19013b",
            }}
          >
            <LiaAngleDoubleRightSolid />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomPagination;
