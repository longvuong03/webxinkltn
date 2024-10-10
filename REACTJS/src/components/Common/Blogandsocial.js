import React from 'react'

const Blogandsocial = ()=> {
  var insta1 = require("../../asset/image/insta1.jpg");
var insta2 = require("../../asset/image/insta2.jpg");
var insta3 = require("../../asset/image/insta3.jpg");
var insta4 = require("../../asset/image/insta4.jpg");
var insta5 = require("../../asset/image/insta5.jpg");
var insta6 = require("../../asset/image/insta6.jpg");
var blog1 = require("../../asset/image/blog1.jpg");
var blog2 = require("../../asset/image/blog2.jpg");
var blog3 = require("../../asset/image/blog3.jpg");
var blog4 = require("../../asset/image/blog4.jpg");
var blog5 = require("../../asset/image/blog5.jpg");
var blog6 = require("../../asset/image/blog6.jpg");
  return (
    <div class="container">
        <div class="row text-center">
          <span class="color-primary">Our Collection</span>
          <p class="fw-bold fs-1">SPECIAL PRODUCT</p>
          <div class="hr-special-offer"></div>
        </div>
        <div class="row mt-4 mx-auto">
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="card blogcard">
                      <div class="hover15">
                        <figure>
                          <a href="./indexblog.html">
                            <img src={blog1} class="card-img-top" alt="..." />
                          </a>
                        </figure>
                      </div>
                      <div class="card-body text-center">
                        <h5 class="card-title color-primary fs-6">
                          26 January 2022
                        </h5>
                        <p class="card-text fw-bold">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <div class="hr-special-offer"></div>
                        <p class="text-secondary font-size-small mt-2">
                          By : Johnny Depp , 2,1K Comments
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="card blogcard responsive_none">
                      <div class="hover15">
                        <figure>
                          <img src={blog2} class="card-img-top" alt="..." />
                        </figure>
                      </div>
                      <div class="card-body text-center">
                        <h5 class="card-title color-primary fs-6">
                          26 January 2022
                        </h5>
                        <p class="card-text fw-bold">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <div class="hr-special-offer"></div>
                        <p class="text-secondary font-size-small mt-2">
                          By : Johnny Depp , 2,1K Comments
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="card blogcard">
                      <div class="hover15">
                        <figure>
                          <img src={blog3} class="card-img-top" alt="..." />
                        </figure>
                      </div>
                      <div class="card-body text-center">
                        <h5 class="card-title color-primary fs-6">
                          26 January 2022
                        </h5>
                        <p class="card-text fw-bold">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <div class="hr-special-offer"></div>
                        <p class="text-secondary font-size-small mt-2">
                          By : Johnny Depp , 2,1K Comments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="card blogcard">
                      <div class=" hover15">
                        <figure>
                          <img src={blog4} class="card-img-top" alt="..." />
                        </figure>
                      </div>
                      <div class="card-body text-center">
                        <h5 class="card-title color-primary fs-6">
                          26 January 2022
                        </h5>
                        <p class="card-text fw-bold">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <div class="hr-special-offer"></div>
                        <p class="text-secondary font-size-small mt-2">
                          By : Johnny Depp , 2,1K Comments
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="card blogcard responsive_none">
                      <div class="hover15">
                        <figure>
                          <img src={blog5} class="card-img-top" alt="..." />
                        </figure>
                      </div>
                      <div class="card-body text-center">
                        <h5 class="card-title color-primary fs-6">
                          26 January 2022
                        </h5>
                        <p class="card-text fw-bold">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <div class="hr-special-offer"></div>
                        <p class="text-secondary font-size-small mt-2">
                          By : Johnny Depp , 2,1K Comments
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="card blogcard">
                      <div class="hover15">
                        <figure>
                          <img src={blog6} class="card-img-top" alt="..." />
                        </figure>
                      </div>
                      <div class="card-body text-center">
                        <h5 class="card-title color-primary fs-6">
                          26 January 2022
                        </h5>
                        <p class="card-text fw-bold">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <div class="hr-special-offer"></div>
                        <p class="text-secondary font-size-small mt-2">
                          By : Johnny Depp , 2,1K Comments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div class="social-media mt-5 mb-5">
          <div class="row text-center">
            <p class="fw-bold fs-2"># INSTAGRAM</p>
          </div>
          <div class="row">
            <div class="col-2 imgsocial">
              <img src={insta1} class="instaimg" alt="" />
              <div class="overlay">
                <i class="bi bi-instagram"></i>
              </div>
            </div>
            <div class="col-2 imgsocial">
              <img src={insta2} class="instaimg" alt="" />
              <div class="overlay">
                <i class="bi bi-instagram"></i>
              </div>
            </div>
            <div class="col-2 imgsocial">
              <img src={insta3} class="instaimg" />
              <div class="overlay">
                <i class="bi bi-instagram"></i>
              </div>
            </div>
            <div class="col-2 imgsocial">
              <img src={insta4} class="instaimg" />
              <div class="overlay">
                <i class="bi bi-instagram"></i>
              </div>
            </div>
            <div class="col-2 imgsocial ">
              <img src={insta5} class="instaimg" />
              <div class="overlay">
                <i class="bi bi-instagram"></i>
              </div>
            </div>
            <div class="col-2 imgsocial ">
              <img src={insta6} class="instaimg" />
              <div class="overlay">
                <i class="bi bi-instagram"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-12 col-sm-12 centerafterfooter">
              <span class="fw-bold fs-3 text-center">KNOW IT ALL FIRST!</span>
              <p class="fs-6 text-secondary responsive_none">
                Never Miss Anything From Multikart By Signing Up To Our
                Newsletter.
              </p>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12 centerafterfooter">
              <input type="text" placeholder="Enter Your Email" />
              <button>SUBCRIBE</button>
            </div>
          </div>
          <hr />
        </div>
      </div>
  )
}

export default Blogandsocial
