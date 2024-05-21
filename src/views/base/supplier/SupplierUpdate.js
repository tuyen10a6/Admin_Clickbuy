import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

const UpdateWareHouse = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [supplier, setSupplier] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    status: '',
  })

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/supplier/getSupplierByID?id=${id}`)
        console.log(response.data.data)
        setSupplier(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const onChangeSupplierName = (event) => {
    event.preventDefault()
    setSupplier({
      ...supplier,
      name: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeSupplierAddress = (event) => {
    event.preventDefault()
    setSupplier({
      ...supplier,
      address: event.target.value,
    })
  }
  const onChangeSupplierPhone = (event) => {
    event.preventDefault()
    setSupplier({
      ...supplier,
      phone: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeSupplierEmail = (event) => {
    event.preventDefault()
    setSupplier({
      ...supplier,
      email: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeWareHouseStatus = (event) => {
    setSupplier({
      ...supplier,
      status: event.target.value,
    })
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('id', id)
  formData.append('name', supplier.name)
  formData.append('address', supplier.address)
  formData.append('phone', supplier.phone)
  formData.append('email', supplier.email)
  formData.append('status', supplier.status)

  const handleUpdateSupplier = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/supplier/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Cập nhật dữ liệu thành công')
      navigate(`/supplier`)
    } catch (error) {
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
                Cập nhật nhà cung cấp
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Tên nhà cung cấp"
            onChange={onChangeSupplierName}
            id="name"
            variant="outlined"
            fullWidth
            value={supplier.name}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Địa chỉ"
            onChange={onChangeSupplierAddress}
            id="name-other"
            variant="outlined"
            fullWidth
            value={supplier.address}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Số điện thoại"
            onChange={onChangeSupplierPhone}
            id="address"
            type="number"
            variant="outlined"
            fullWidth
            value={supplier.phone}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Email"
            onChange={onChangeSupplierEmail}
            id="email"
            variant="outlined"
            fullWidth
            value={supplier.email}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <FormControl fullWidth>
            <NativeSelect
              placeholder="Trạng thái"
              value={supplier.status}
              onChange={onChangeWareHouseStatus}
              inputProps={{
                name: 'Trạng thái',
                id: 'uncontrolled-native',
              }}
            >
              <option value="1">Hoạt động</option>
              <option value="0">Không hoạt động</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button
            onClick={() => handleUpdateSupplier(supplier.id)}
            variant="contained"
            color="primary"
          >
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UpdateWareHouse
