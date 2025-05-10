import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrder } from "../store/Actions/Order";
import { checkToken } from "../utils/helpers";

import productPhoto from "../assets/images/samsung.jpg";
import "../assets/css/singleOrder.css";


function SingleOrder() {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const token = checkToken();
  const navigate = useNavigate();

  const { order } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(fetchOrder(uuid));
  }, [dispatch, uuid, navigate, token]);

  return (
    <div>
      <div className="flex-single-order">
        <div className="order-grid">
          {order?.items?.map((item, i) => (
            <div key={i} className="order-card">
              <div className="flex-order-desc">
                <img
                  src={productPhoto}
                  alt="product"
                  className="product-photo1"
                />
                <div>
                  <p className="first-product-desc1">{item.Product.title}</p>
                  <p className="rest-product-desc">{item.Product.category}</p>
                  <p className="rest-product-desc">
                    {item.Product.description}
                  </p>
                  <p className="price-product-desc1">
                    Quantity:
                    <span className="quantity-span">{item.quantity}</span>
                  </p>
                  <p className="price-product-desc2">${item.Product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-card1">
          <div>
            <h3 className="order-status-title">Total</h3>
            <p>${order?.total}</p>
          </div>
          <div>
            <h3 className="order-address-title">Address</h3>
            <p>{order?.Address?.country}</p>
            <p>{order?.Address?.city}</p>
            <p>{order?.Address?.street}</p>
            <p>{order?.Address?.postalCode}</p>
          </div>
          <div>
            <h3 className="order-status-title">Status</h3>
            <p>{order?.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
