import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import { useReactToPrint } from "react-to-print";

export default function PrintContainer(props) {
    const { children, printState } = props;
  const printRef = useRef(null);

    useEffect(() => {
            print();
    }, [printState]);

  const print = useReactToPrint({
    content: () => printRef.current,
  })
  return (
    <>
      <Box ref={printRef}>{children}</Box>
    </>
  );
}
