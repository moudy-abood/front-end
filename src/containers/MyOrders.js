import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchOrders } from "../store/Actions/Order";
import { checkToken } from "../utils/helpers";

import "../assets/css/orderList.css";
import productPhoto from "../assets/images/samsung.jpg";
import notFound from "../assets/images/no-item-found.png";

function MyOrders() {
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchOrders());
  }, [dispatch, token, navigate]);

  const handleNavigation = (uuid) => {
    navigate(`/my-order/${uuid}`);
  };

  const ordersData = (
    <div>
      <h2 className="title">My Orders</h2>
      <div className="orders-grid">
        {orders?.map((order) => (
          <div
            className="orders-card"
            key={order.uuid}
            onClick={() => handleNavigation(order.uuid)}
          >
            <div className="flex-photo-count">
              <div className="flex-photo-count">
                <img
                  src={productPhoto}
                  alt="order-product"
                  className="product-photo"
                />
                <div
                  className={
                    order.Cart.Items.length - 1 === 0 ? "" : "plus-item-order"
                  }
                >
                  <p className="items-length">
                    {order.Cart.Items.length - 1 === 0
                      ? ""
                      : `+${order.Cart.Items.length - 1}`}
                  </p>
                  <p className="items-expression">
                    {order.Cart.Items.length - 1 === 0 ? "" : "ITEMS"}
                  </p>
                </div>
              </div>
              <div className="order-address-flex">
                <h3 className="order-address-title">Address</h3>
                {order?.Address !== null ? (
                  <div className="order-address-desc">
                    <p>{order?.Address?.country}</p>
                    <p>{order?.Address?.city}</p>
                    <p>{order?.Address?.street}</p>
                    <p>{order?.Address?.postalCode}</p>
                  </div>
                ) : (
                  <div className="order-address-desc">
                    <p>{order?.temporaryAddress?.city}</p>
                    <p>{order?.temporaryAddress?.country}</p>
                    <p>{order?.temporaryAddress?.street}</p>
                    <p>{order?.temporaryAddress?.postalCode}</p>
                  </div>
                )}
              </div>
              <div className="order-status-flex">
                <h3 className="order-status-title">Total</h3>
                <div className="order-status-desc">
                  <p>${order.total}</p>
                </div>
              </div>
              <div className="order-status-flex">
                <h3 className="order-status-title">Status</h3>
                <div className="order-status-desc">
                  <p>{order.status}</p>
                </div>
              </div>
            </div>
            <div className="items-flex">
              <p className="item-order-title">
                {order.Cart?.Items[0]?.Product?.title}
              </p>
              <p
                className={order.Cart?.Items.length > 1 ? "items-length-2" : ""}
              >
                {order.Cart?.Items.length > 1
                  ? ` +${order.Cart?.Items.length - 1}`
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const noOrders = (
    <div className="flex-empty-cart">
      <img className="no-product-found" src={notFound} alt="nothing-found" />
      <p>No Orders Found !</p>
    </div>
  );

  const contentToRender = orders?.length ? ordersData : noOrders;

  return contentToRender;
}

export default MyOrders;
