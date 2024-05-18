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
import {
  Button,
  Container,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from '@mui/material'
import ButtonCreate from '@mui/icons-material/AddCircle'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import { FormControl } from 'react-bootstrap'
const columns = [
  // { id: 'id', label: 'ID', minWidth: 100, align: 'center' },
  { id: 'id', label: 'ID', minWidth: 100, align: 'center' },
  { id: 'name', label: 'Tên kho', minWidth: 170, align: 'center' },
  { id: 'variant-name', label: 'Tên biến thể', minWidth: 130, align: 'center' },
  { id: 'quantity-invetory', label: 'Số lượng tồn kho', minWidth: 170, align: 'center' },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'update',
    label: 'Chức năng',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
]

export default function WareHouseDetails() {
  const API_URL = process.env.REACT_APP_API_URL

  const navigate = useNavigate()

  const [wareHouse, setWareHouse] = useState([])
  const [warehouseDetail, setWareHouseDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouseDetails/getAll`)
        setWareHouseDetail(response.data.data)
        console.log('response warehouse details:', response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData().finally(() => {
      setLoading(true)
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouse/getAllWareHouse`)
        setWareHouse(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData().finally(() => {
      setLoading(true)
    })
  }, [])

  const onChangeSearchWareHouse = async (param) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/warehouseDetails/allWareHouseDetailByID?id=${param}`,
      )
      setWareHouseDetail(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(true)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleAddWareHouseDetails = () => {
    navigate('add')
  }

  return (
    <Container>
      {loading ? (
        <Paper style={{ width: '100%', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={handleAddWareHouseDetails}
              sx={{ m: 2 }}
              variant="contained"
              endIcon={<ButtonCreate />}
            >
              Thêm mới
            </Button>
            <Select
              sx={{ mr: 3, mt: 2, width: '200px', height: '40px' }}
              defaultValue="all"
              displayEmpty
              onChange={(e) => onChangeSearchWareHouse(e.target.value)}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem selected value="all">
                <em>Tất cả</em>
              </MenuItem>
              {wareHouse.map((item, i) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.ten_kho}
                </MenuItem>
              ))}
            </Select>
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
                {warehouseDetail
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell style={{ textAlign: 'center' }}>{row.id}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {row.ware_house && row.ware_house.ten_kho}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {row.variant.VARRIANNAME}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{row.quantity}</TableCell>

                      <TableCell style={{ textAlign: 'center' }}>
                        {row.status === 1 ? (
                          <Typography
                            style={{
                              background: 'rgb(114, 225, 40)',
                              padding: '6px',
                              borderRadius: '7px',
                              color: 'white',
                            }}
                          >
                            Đang hoạt động
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              background: 'rgb(224, 224, 224)',
                              padding: '6px',
                              borderRadius: '7px',
                            }}
                          >
                            Không hoạt động
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <Link style={{ marginRight: '10px' }} to={`/warehouse/update/${row.id}`}>
                          <EditIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={warehouseDetail.length}
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
