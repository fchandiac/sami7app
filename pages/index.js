import { Dialog, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [openSplash, setOpenSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpenSplash(false);
    }, 3000);
  }, []);
  return (
    <>
      <h1>Click en Menú</h1>

      {/* <Dialog open={openSplash}>
        <Box
         sx={{
          width: '300px',
          height: '300px',
          backgroundImage: 'url(/splash.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
        >

        </Box>
      </Dialog> */}

    </>
  );
}
