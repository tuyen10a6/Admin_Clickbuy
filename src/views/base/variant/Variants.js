import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SyncAltIcon from '@mui/icons-material/SyncAlt'

export default function ProductVariant() {
  const { id } = useParams()
  const [variant, setVariant] = useState([])

  useEffect(() => {
    axios
      .get('https://localhost:7014/api/ProductVariant/GetIdProduct/' + id, {})
      .then(async (response) => {
        setVariant(response.data)
        console.log(response.data)
      })
  }, [])

  const formatNumber = (number) => {
    var nf = new Intl.NumberFormat()
    return nf.format(number)
  }

  return (
    <Card>
      <Button sx={{ m: '15px' }} variant="contained" endIcon={<AddCircleIcon />}>
        Thêm mới
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Mã biến thể</TableCell>
              <TableCell align="center">Tên biến thể</TableCell>
              <TableCell align="center">Giá</TableCell>
              <TableCell align="center">Màu sắc</TableCell>
              <TableCell align="center">Dung lượng</TableCell>
              <TableCell align="center">Hình ảnh</TableCell>
              <TableCell align="center">Số lượng tồn kho</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variant.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.varriantid}</TableCell>
                <TableCell sx={{ maxWidth: '400px' }} align="center">
                  {row.varrianname}
                </TableCell>
                <TableCell align="center"> {formatNumber(row.price)} VNĐ</TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="center">{row.capacity} GB</TableCell>
                <TableCell align="center">
                  <img width="160px" src={row.imageVariant} />
                </TableCell>
                <TableCell align="center">{row.productVariantSL}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" startIcon={<SyncAltIcon />}>
                    Sửa
                  </Button>
                  <hr />
                  <Button variant="contained" startIcon={<DeleteOutlineIcon />}>
                    Xoá
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
