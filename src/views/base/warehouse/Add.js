import React, { useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddWareHouse = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [nameOther, setNameOther] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('1')

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  const onChangeWareHouseName = (event) => {
    event.preventDefault()
    setName(event.target.value)
    console.log(event.target.value)
  }

  const onChangeWareHouseNameAnother = (event) => {
    event.preventDefault()
    setNameOther(event.target.value)
  }

  const onChangeWareHouseAddress = (event) => {
    event.preventDefault()
    setAddress(event.target.value)
  }

  const onChangeWareHouseStatus = (event) => {
    event.preventDefault()
    setStatus(event.target.value)
  }

  const formData = new FormData()

  formData.append('ten_kho', name)
  formData.append('ten_kho2', nameOther)
  formData.append('dia_chi', address)
  formData.append('status', status)
  const handleAddWareHouse = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/warehouse/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Thêm kho hàng thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setTimeout(() => {
        navigate('/warehouse')
      }, 2200)
    } catch (error) {
      toast.error('Vui lòng nhập đầy đủ thông tin', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      console.log(error)
    }
  }

  return (
    <Grid
      style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
      container
    >
      <Grid container>
        <Grid item xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Tạo kho hàng
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeWareHouseName}
            id="wareHouseName"
            label="Tên kho hàng"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeWareHouseNameAnother}
            id="wareHouseNameAnother"
            label="Tên khác"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeWareHouseAddress}
            id="wareHouseAddress"
            label="Địa chỉ"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Trạng thái</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeWareHouseStatus} id="uncontrolled-native">
              <option value="1" selected>
                Hoạt động
              </option>
              <option value="0">Không hoạt động</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleAddWareHouse} variant="contained" color="primary">
            Lưu
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddWareHouse
