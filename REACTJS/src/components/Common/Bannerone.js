import React from 'react'
import "../../asset/css/banner.css"
var bannergirl = require("../../asset/image/bannergirl.png");

const  Bannerone = () =>{
  return (
    <div>
              <section className="banner_one">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="banner_text_one">
                            <h1 className="display-1">LIVE FOR</h1>
                            <h1 className="fashion_text">Fashion</h1>
                            <h3 className="text-white">Save up to 50%</h3>
                            <button className="btn_shopnow">Shop now</button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img src={bannergirl} className='bannergirl' alt="Banner Girl" />
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Bannerone
