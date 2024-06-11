import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect, FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddEventMarketingDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [eventMarketingDetail, setEventMarketingDetail] = useState({
    name: '',
    nguoi_phu_trach: '',
    address_event: '',
    date_start: '',
    date_end: '',
    status: '',
    event_marketing_id: '',
  })

  const [listEventMarketing, setListEventMarketing] = useState([])

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/eventMarketingDetail/detail?id=${id}`)
        setEventMarketingDetail(response.data.data)
        console.log('detail event marketing:', response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [API_URL, id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/eventMarketing/getAll`)
        setListEventMarketing(response.data.data)
        console.log('list event:', response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [API_URL])

  const handleChange = (event) => {
    const { name, value } = event.target
    setEventMarketingDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }))
  }

  const formatDateToYMD = (dateString) => {
    return dateString.replace(/-/g, '/')
  }

  const handleUpdateEventMarketingDetail = async () => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', eventMarketingDetail.name)
    formData.append('nguoi_phu_trach', eventMarketingDetail.nguoi_phu_trach)
    formData.append('address_event', eventMarketingDetail.address_event)
    if (eventMarketingDetail.date_start) {
      formData.append('date_start', formatDateToYMD(eventMarketingDetail.date_start))
    }
    if (eventMarketingDetail.date_end) {
      formData.append('date_end', formatDateToYMD(eventMarketingDetail.date_end))
    }
    formData.append('status', eventMarketingDetail.status)
    formData.append('event_marketing_id', eventMarketingDetail.event_marketing_id)

    try {
      await axios.post(`${API_URL}/api/eventMarketingDetail/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Cập nhật thông tin thành công', {
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
      toast.error('Vui lòng nhập đầy đủ thông tin', {
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
                Cập nhật thông tin sự kiện
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            name="name"
            onChange={handleChange}
            id="name"
            value={eventMarketingDetail.name}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            name="nguoi_phu_trach"
            onChange={handleChange}
            id="nguoi-phu-trach"
            value={eventMarketingDetail.nguoi_phu_trach}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            name="address_event"
            onChange={handleChange}
            id="address"
            value={eventMarketingDetail.address_event}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography style={{ marginTop: '-30px', marginBottom: '10px' }}>Ngày bắt đầu</Typography>
          <TextField
            name="date_start"
            onChange={handleChange}
            value={eventMarketingDetail.date_start}
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
            Ngày kết thúc
          </Typography>
          <TextField
            name="date_end"
            onChange={handleChange}
            id="date-end"
            value={eventMarketingDetail.date_end}
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Chiến dịch</Typography>
          <FormControl fullWidth>
            <NativeSelect
              name="event_marketing_id"
              value={eventMarketingDetail.event_marketing_id}
              onChange={handleChange}
              id="uncontrolled-native"
            >
              <option selected disabled>
                Chọn chiến dịch
              </option>
              {listEventMarketing.map((item) => (
                <option key={item.id} value={item.id} disabled={item.status === 0}>
                  {item.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Trạng thái</Typography>
          <FormControl fullWidth>
            <NativeSelect
              name="status"
              value={eventMarketingDetail.status}
              onChange={handleChange}
              id="uncontrolled-native"
            >
              <option value="1">Hoạt động</option>
              <option value="0">Không hoạt động</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleUpdateEventMarketingDetail} variant="contained" color="primary">
            Lưu
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddEventMarketingDetail
