import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CartImage from './../../../src/assets/images/cart/images.png'
import doanhthu from './../../../src/assets/images/cart/tăng doanh thu.png'
import review from './../../../src/assets/images/cart/pngtree-set-of-user-icon-user-symbol-profile-vector-outline-people-symbol-png-image_1885497.jpg'
import TopBestProduct from './../../../src/assets/images/cart/download.png'
import './../../scss/style.css'
const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [totalOrders, setTotalOrders] = useState(0)

  const API_URL = process.env.REACT_APP_API_URL
  const IMAGE_URL = process.env.REACT_APP_API_IMAGE
  useEffect(() => {
    axios
      .get(`${API_URL}/api/order/count`)
      .then((response) => {
        const data = response.data.data
        console.log('data order', response.data.data)
        setTotalOrders(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    axios
      .get(`${API_URL}/api/order/totalPrice`)
      .then((response) => {
        console.log('total', response.data.data)
        setTotalRevenue(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const [totalPriceDay, settotalPriceDay] = useState(0)

  useEffect(() => {
    axios
      .get(`${API_URL}/api/order/totalPriceDate`)
      .then((response) => {
        settotalPriceDay(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  const [totalReviewOrder, setTotalReviewOrder] = useState(0)

  useEffect(() => {
    axios
      .get(`${API_URL}/api/order/totalReview`)
      .then((response) => {
        setTotalReviewOrder(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/order/getProductTopBuy`)
        setProducts(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const [orderStatuses, setOrderStatuses] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/order/totalOrderStatus`)
        setOrderStatuses(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="root">
        <div>
          <h3 className="title">THỐNG KÊ DOANH THU</h3>
        </div>
        <div className="col-9">
          <div className="col-3">
            {' '}
            <span>
              Tổng số đơn hàng: <span>{totalOrders}</span>
            </span>
            <span>
              <img id="image-cart" src={CartImage} alt="My Image" />
            </span>
          </div>
          <div className="col-3">
            {' '}
            <span>
              <p>
                Doanh thu toàn bộ: <span>{formatCurrency(totalRevenue)}</span>
              </p>{' '}
            </span>
            <span>
              <img id="image-cart" src={doanhthu} alt="My Image" />
            </span>
          </div>
          <div className="col-3">
            {' '}
            <span>
              <p>
                Doanh thu hôm nay: <span>{formatCurrency(totalPriceDay)}</span>
              </p>{' '}
            </span>
            <span>
              <img id="image-cart" src={doanhthu} alt="My Image" />
            </span>
          </div>
          <div className="col-3">
            {' '}
            <span>
              <p>
                Lượt đánh giá: <span>{totalReviewOrder}</span>
              </p>{' '}
            </span>
            <span>
              <img id="image-cart" src={review} alt="My Image" />
            </span>
          </div>
        </div>
        <div className="ProductBestOrder">
          <h3 style={{ fontSize: '18px', color: 'blue', fontWeight: 'bold', margin: '15px' }}>
            Sản phẩm bán chạy
          </h3>
          {products.slice(0, 5).map((product, index) => (
            <div className="ProductBestItem" key={product.VARRIANTID}>
              <p className="index">{index + 1}</p>
              <img src={`${IMAGE_URL}${product.ImageVariant}`} alt={product.VARRIANNAME} />
              <p className="ProductItemBestName">{product.VARRIANNAME}</p>
              <p className="quantityItem">
                <span style={{ Width: '200px' }}> |Đã bán: {product.total_quantity}</span>{' '}
              </p>
              <p>
                <img className="iconbestproduct" src={TopBestProduct}></img>
              </p>
            </div>
          ))}
        </div>
        <h3>Thông tin trạng thái các đơn hàng</h3>
        <div className="range">
          {orderStatuses.map((orderStatus) => (
            <div key={orderStatus.OrderStatusID} className="range_item_receive">
              <p style={{ color: '#e74c3c' }}>
                {' '}
                <p className="OrderStatusName">{orderStatus.OrderStatusName}</p>
              </p>
              <p className="TotalOrderItem">{orderStatus.total_count} </p>
              <input value={orderStatus.total_count} type="range" min="0" max={totalOrders}></input>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard
