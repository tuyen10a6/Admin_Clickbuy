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
import { Button, Container, Typography } from '@mui/material'
import ButtonCreate from '@mui/icons-material/AddCircle'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

const columns = [
  { id: 'name', label: 'Tên danh mục', minWidth: 200, align: 'center' },
  { id: 'priority', label: 'Độ ưu tiên', minWidth: 130, align: 'center' },

  {
    id: 'image',
    label: 'Hình ảnh',
    minWidth: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'update',
    label: 'Thao tác',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
]

export default function CategoryList() {
  const API_URL = process.env.REACT_APP_API_URL
  const URL_IMAGE = process.env.REACT_APP_API_IMAGE

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/category/getAll`)
        setCategory(response.data.response.data)
        console.log('response category:', response.data.response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData().finally(() => {
      setLoading(true)
    })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleAddProduct = () => {
    navigate('add')
  }

  const handleDeleteProduct = async (id) => {
    try {
      await axios
        .delete(`${API_URL}/api/product/delete?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert('Xoá sản phẩm thành công')
          window.location.reload()
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      {loading ? (
        <Paper style={{ width: '100%', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
          <Box>
            <Button
              onClick={handleAddProduct}
              sx={{ m: 2 }}
              variant="contained"
              endIcon={<ButtonCreate />}
            >
              Thêm mới
            </Button>
          </Box>
          <TableContainer style={{ maxHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 0, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {category.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.CategoryID}>
                    <TableCell style={{ textAlign: 'center' }}>{row.CategoryName}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {row.Priority === 1 ? (
                        <Typography>Cao</Typography>
                      ) : row.Priority === 2 ? (
                        <Typography>Trung bình</Typography>
                      ) : (
                        <Typography>Thấp</Typography>
                      )}
                    </TableCell>

                    <TableCell style={{ textAlign: 'center' }}>
                      <img style={{ width: '110px' }} src={`${URL_IMAGE}${row.CategoryImage}`} />
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Link
                        style={{ marginRight: '10px' }}
                        to={`/category/update/${row.CategoryID}`}
                      >
                        <EditIcon />
                      </Link>
                      <DeleteOutlinedIcon onClick={() => handleDeleteProduct(row.ProductID)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={category.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Paper>
          <Box>
            <Button sx={{ m: 2 }} variant="contained" endIcon={<ButtonCreate />}>
              Thêm mới
            </Button>
          </Box>
          <TableContainer style={{ minHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 0, minWidth: column.minWidth }}
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
      )}
    </Container>
  )
}
