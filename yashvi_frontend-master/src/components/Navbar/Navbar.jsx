import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Product
        </Typography>
        <Typography variant="h6" component={Link} to="/category" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
          Category
        </Typography>
        <Typography variant="h6" component={Link} to="/material" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
          Material
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar