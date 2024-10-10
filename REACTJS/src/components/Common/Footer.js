import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

var Diamond = require('../../asset/image/logo.png');
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row mb-3">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="row mt-5">
              <img src={Diamond} alt="" className="logo" />
            </div>
            <div className="row font-size-small mt-3" style={{ marginLeft: '1px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam.
            </div>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12 mt-5 lifooter">
            <ul>
              <li>
                <p className="fs-4 fw-bold dropdownbtn">ACCOUNT</p>
              </li>
              <li className="lh-lg text-secondary font-size-small">Women</li>
              <li className="lh-lg text-secondary font-size-small">Clothing</li>
              <li className="lh-lg text-secondary font-size-small">Accessories</li>
              <li className="lh-lg text-secondary font-size-small">Feature</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 mt-5">
            <ul>
              <li>
                <p className="fs-4 fw-bold">WHY WE CHOOSE</p>
              </li>
              <li className="lh-lg text-secondary font-size-small">Shipping & Return</li>
              <li className="lh-lg text-secondary font-size-small">Secure Shopping</li>
              <li className="lh-lg text-secondary font-size-small">Galleries</li>
              <li className="lh-lg text-secondary font-size-small">Affiliates</li>
              <li className="lh-lg text-secondary font-size-small">Contacts</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 mt-5">
            <ul>
              <li>
                <p className="fs-4 fw-bold">INFORMATION</p>
              </li>
              <li className="lh-lg text-secondary font-size-small">Demo Store</li>
              <li className="lh-lg text-secondary font-size-small">
                Call Us: +84 886-670-711
              </li>
              <li className="lh-lg text-secondary font-size-small">
                Email Us: longkg@gmail.com
              </li>
              <li className="lh-lg text-secondary font-size-small">Fax: 123456</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <p className="text-secondary">© 2020-21 themeforest powered by pixelstrap</p>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 icon-footer">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-google-plus-g"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-solid fa-rss"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
