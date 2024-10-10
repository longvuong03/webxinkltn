import React, { useState } from 'react'
import { fetchAllProduct, getbyidProduct } from "../../services/ProductService";
const Searchbar = () => {

  return (
    <div>
        <div className="search-bar d-flex">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="text-search"  placeholder='Type to search...'/>
            </div>

    </div>
  )
}

export default Searchbar
