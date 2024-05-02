import { Container, Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import axios from 'axios'

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const username = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (response.status === 200) {
        window.location.href = `/`
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } else {
        alert('Lỗi else')
      }
    } catch (error) {
      alert('Lỗi')
      console.log(error)
    }
  }

  return (
    <Container sx={{ textAlign: 'right', mb: 3, mt: 2 }}>
      <Button variant="text" endIcon={<AccountCircleIcon />} onClick={handleMenuClick}>
        {username}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Thông tin tài khoản</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </Container>
  )
}

export default AppHeader
