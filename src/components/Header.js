// //Компонент для відображення заголовка веб-додатку.
// // import React, { useState } from 'react';
// import { Typography, Box } from '@mui/material';

// function Header() {
//     return (
//         <Box bgcolor="#517664" color="#FBF3D5" p={2}>
//     <Typography variant="h4">Plagiarism Checker</Typography>
//   </Box>
//     )
// }
// export default Header;

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#517664' }}>
      <Toolbar>
        <FileCopyIcon sx={{ marginRight: 2 }} />
        <Typography variant="h6" noWrap component="div">
          Plagiarism Checker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;