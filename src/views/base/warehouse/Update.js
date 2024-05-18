import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

const UpdateWareHouse = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [wareHouse, setWareHouse] = useState({
    ten_kho: '',
    ten_kho2: '',
    dia_chi: '',
    status: '',
  })

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const URL_APP = process.env.REACT_APP_API_IMAGE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouse/getWareHouseByID?id=${id}`)
        console.log(response.data.data)
        setWareHouse(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const onChangeWareHouseName = (event) => {
    event.preventDefault()
    setWareHouse({
      ...wareHouse,
      ten_kho: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeWareHouseAddress = (event) => {
    event.preventDefault()
    setWareHouse({
      ...wareHouse,
      dia_chi: event.target.value,
    })
  }
  const onChangeWareAnother = (event) => {
    event.preventDefault()
    setWareHouse({
      ...wareHouse,
      ten_kho2: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeWareHouseStatus = (event) => {
    setWareHouse({
      ...wareHouse,
      status: event.target.value,
    })
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('id', id)
  formData.append('ten_kho', wareHouse.ten_kho)
  formData.append('ten_kho2', wareHouse.ten_kho2)
  formData.append('dia_chi', wareHouse.dia_chi)
  formData.append('status', wareHouse.status)

  const handleUpdateWareHouse = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/warehouse/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Cập nhật dữ liệu thành công')
      navigate(`/warehouse`)
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
                Cập nhật danh mục kho
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Tên kho"
            onChange={onChangeWareHouseName}
            id="name"
            variant="outlined"
            fullWidth
            value={wareHouse.ten_kho}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Tên khác"
            onChange={onChangeWareAnother}
            id="name-other"
            variant="outlined"
            fullWidth
            value={wareHouse.ten_kho2}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Địa chỉ"
            onChange={onChangeWareHouseAddress}
            id="address"
            variant="outlined"
            fullWidth
            value={wareHouse.dia_chi}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <FormControl fullWidth>
            <NativeSelect
              placeholder="Trạng thái"
              value={wareHouse.status}
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
            onClick={() => handleUpdateWareHouse(wareHouse.id)}
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
