import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddEventMarketingDetail = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [nguoiPhuTrach, setNguoiPhuTrach] = useState('')
  const [address, setAddress] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [status, setStatus] = useState('1')
  const [listEventMarketing, setListEventMarketing] = useState([])
  const [eventMarketing, setEventMarketing] = useState('')

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/eventMarketing/getAll`)

        setListEventMarketing(response.data.data)
        console.log(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  const onChangeNguoiPhuTrach = (event) => {
    event.preventDefault()
    setNguoiPhuTrach(event.target.value)
  }
  const onChangeName = (event) => {
    event.preventDefault()
    setName(event.target.value)
    console.log(event.target.value)
  }

  const onChangeAddress = (event) => {
    event.preventDefault()
    setAddress(event.target.value)
    console.log(event.target.value)
  }

  const onChangeDateStart = (event) => {
    event.preventDefault()
    setDateStart(event.target.value)
    console.log(event.target.value)
  }

  const onChangeDateEnd = (event) => {
    event.preventDefault()
    setDateEnd(event.target.value)
    console.log(event.target.value)
  }

  const onChangeEventMarketing = (event) => {
    event.preventDefault()
    setEventMarketing(event.target.value)
    console.log('data event:', event.target.value)
  }

  const onChangeStatus = (event) => {
    event.preventDefault()
    console.log('data status', event.target.value)
    setStatus(event.target.value)
  }

  const formData = new FormData()

  formData.append('name', name)
  formData.append('nguoi_phu_trach', nguoiPhuTrach)
  formData.append('address_event', address)
  formData.append('date_start', dateStart)
  formData.append('date_end', dateEnd)
  formData.append('status', status)
  formData.append('event_marketing_id', eventMarketing)
  const handleAddEventMarketingDetail = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/eventMarketingDetail/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Thêm sự kiện thành công', {
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
        navigate('/eventMarketingDetail')
      }, 2200)
    } catch (error) {
      toast.error('Vui lòng nhập đầy đủ dữ liệu', {
        position: 'top-right',
        autoClose: 3000,
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
                Tạo thêm sự kiện
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeName}
            id="name"
            label="Tên sự kiện"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeNguoiPhuTrach}
            id="nguoi-phu-trach"
            label="Người phụ trách"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeAddress}
            id="address"
            label="Địa chỉ diễn ra"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography style={{ marginTop: '-30px', marginBottom: '10px' }}>
            {' '}
            Ngày bắt đầu{' '}
          </Typography>
          <TextField
            onChange={onChangeDateStart}
            id="date-start"
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography style={{ marginTop: '-15px', marginBottom: '10px' }}>
            {' '}
            Ngày kết thúc{' '}
          </Typography>
          <TextField
            onChange={onChangeDateEnd}
            id="date-end"
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Chiến dịch</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeEventMarketing} id="uncontrolled-native">
              <option selected disabled>
                Chọn chiến dịch
              </option>
              {listEventMarketing.map((item) =>
                item.id ? (
                  <option key={item.id} value={item.id} disabled={item.status === 0}>
                    {item.name}
                  </option>
                ) : null,
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Trạng thái</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeStatus} id="uncontrolled-native">
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
          <Button onClick={handleAddEventMarketingDetail} variant="contained" color="primary">
            Lưu
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddEventMarketingDetail
