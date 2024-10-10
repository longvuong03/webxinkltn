import React from 'react'
import "../../asset/css/product_variation.css"
var varione = require("../../asset/image/vari_1.png");
var varithree = require("../../asset/image/vari_3.png");
const ProductVariation = () => {
  return (
    <div className='my-5'>
    <section className="pt-100">
      <div className="container-fluid variation_one">
        <div className="row">
          <div className="col-4">
            <div className="row position-relative hoverxin py-4 mx-2">
              <img src={varione} className="vari-img" alt="" />
              <div className="product_var_one_text">
                <h4 className="color_one fw-bold fs-2">Outerwear</h4>
                <p className="fw-bold fs-3">NEW</p>
                <h4 className="py-3">COLLECTION</h4>
                <a href="/shop/shop-2" className="btn_shopnow">Shop Now</a>
              </div>
            </div>
            <div className="row position-relative hoverxin mx-2">
              <img src={varione} className="vari-img" alt="" />
              <div className="product_var_one_text">
                <h4 className="color_one fw-bold fs-2">Outerwear</h4>
                <p className="fw-bold fs-3">NEW</p>
                <h4 className="py-3">COLLECTION</h4>
                <a href="/shop/shop-2" className="btn_shopnow">Shop Now</a>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row position-relative hoverxin py-4 mx-2">
              <img src={varithree} className="varis-img" alt="" />
              <div className="product_variation_one_boxed">
                <div className="product_var_one_text_center lentrenti">
                  <p className="color_one">10% Offer</p>
                  <h4 className='py-3'>Models</h4>
                  <a href="/shop/shop-2" className="btn_shopnow">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row position-relative hoverxin py-4 mx-2">
              <img src={varione} className="vari-img" alt="" />
              <div className="product_var_one_text">
                <h4 className="color_one fw-bold fs-2">Outerwear</h4>
                <p className="fw-bold fs-3">NEW</p>
                <h4 className="py-3">COLLECTION</h4>
                <a href="/shop/shop-2" className="btn_shopnow">Shop Now</a>
              </div>
            </div>
            <div className="row position-relative hoverxin mx-2">
              <img src={varione} className="vari-img" alt="" />
              <div className="product_var_one_text">
                <h4 className="color_one fw-bold fs-2">Outerwear</h4>
                <p className="fw-bold fs-3">NEW</p>
                <h4 className="py-3">COLLECTION</h4>
                <a href="/shop/shop-2" className="btn_shopnow">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default ProductVariation
