import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Checkbox,
  TextField,
} from '@mui/material'
import ButtonCreate from '@mui/icons-material/AddCircle'
import { useNavigate } from 'react-router-dom'

const columns = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Tên khách hàng', minWidth: 180, align: 'center' },
  { id: 'phone', label: 'SĐT', minWidth: 120, align: 'center' },
  { id: 'product', label: 'Sản phẩm', minWidth: 110, align: 'center' },
  { id: 'star', label: 'Sao đánh giá', minWidth: 50, align: 'center' },
  { id: 'comment', label: 'Bình luận', minWidth: 120, align: 'center' },
  { id: 'update', label: 'Thao tác', minWidth: 120, align: 'center' },
]

export default function CommentList() {
  const API_URL = process.env.REACT_APP_API_URL
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/review/getAll`)
        setComments(response.data.data)
        console.log('response comment:', response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const update = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1
      const response = await axios.post(
        `${API_URL}/api/review/update`,
        {
          id: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log('response', response.data.status)
      if (response.data.status === true) {
        toast.success('Cập nhật comment thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.ReviewID === id ? { ...comment, status: newStatus } : comment,
          ),
        )
      } else {
        alert('Đã xảy ra lỗi trong quá trình update')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = async (event) => {
    const value = event.target.value
    setSearch(value)
    if (value) {
      try {
        const response = await axios.get(`${API_URL}/api/review/searchProduct?name=${search}`)
        setComments(response.data.data)
      } catch (error) {
        console.error('Error fetching search data:', error)
      }
    } else
      try {
        const response = await axios.get(`${API_URL}/api/review/getAll`)
        setComments(response.data.data)
        console.log('response comment:', response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Container>
      {loading ? (
        <Paper>
          <Box>
            <Button sx={{ m: 2 }} variant="contained" endIcon={<ButtonCreate />}>
              Thêm mới
            </Button>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm khách hàng"
              value={search}
              onChange={handleSearch}
              style={{ marginRight: '20px', height: '50px', padding: '0px !important' }}
            />
          </Box>
          <TableContainer style={{ minHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        top: 0,
                        minWidth: column.minWidth,
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress size={60} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Paper style={{ width: '100%', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              style={{ margin: '20px', fontSize: '24px', fontWeight: 'bold', color: '#3f51b5' }}
            >
              DANH SÁCH BÌNH LUẬN
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm"
              value={search}
              onChange={handleSearch}
              style={{ marginRight: '20px', height: '50px', padding: '0px !important' }}
            />
          </Box>
          <TableContainer style={{ maxHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        top: 0,
                        minWidth: column.minWidth,
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ReviewID}>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.ReviewID}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.customer ? row.customer.CustomerName : ''}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.customer ? row.customer.CustomerPhone : ''}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.product ? row.product.ProductName : ''}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.Rating}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.Comment}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      <Checkbox
                        checked={row.status === 1}
                        onChange={() => update(row.ReviewID, row.status)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                    <ToastContainer />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={comments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Container>
  )
}
