import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateOrder = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState({
    OrderStatusID: '',
    note_address: '',
  })

  const [orderStatus, setOrderStatus] = useState([])
  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/order/detail?id=${id}`)
        setOrder(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/order/status`)
        setOrderStatus(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const onChangeStatus = (event) => {
    event.preventDefault()
    setOrder({
      ...order,
      OrderStatusID: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeNotAddress = (event) => {
    event.preventDefault()
    setOrder({
      ...order,
      note_address: event.target.value,
    })
    console.log(event.target.value)
  }

  const handleUpdateStatusOrder = async () => {
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('status', order.OrderStatusID)
      formData.append('note_address', order.note_address)

      const response = await axios.post(`${API_URL}/api/order/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Cập nhật dữ liệu thành công')
      navigate(`/order`)
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
                Cập nhật đơn hàng
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeNotAddress}
            id="note-address"
            name="note_address"
            variant="outlined"
            fullWidth
            value={order.note_address}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="order-status-label">Trạng thái</InputLabel>
            <Select
              labelId="order-status-label"
              id="order-status"
              name="status"
              value={order.OrderStatusID}
              onChange={onChangeStatus}
              label="Trạng thái"
            >
              {orderStatus.map((status) => (
                <MenuItem key={status.OrderStatusID} value={status.OrderStatusID}>
                  {status.OrderStatusName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleUpdateStatusOrder} variant="contained" color="primary">
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UpdateOrder
