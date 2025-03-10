import React, { useState } from "react";
import { Link } from "react-router-dom";
import './searchInput.css';

export default function SearchInput({data}) {

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);

  const inputHandler = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length == 0) return;
    handleSearch(value);
  }

  const handleSearch = (query) => {
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setOptions(filteredResults);
  };

  // const onOptionSelect = (option) => {
    
  // }

  return (
    <div>
      <div className="position-relative mx-auto">
        <input
          className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill "
          type="text"
          placeholder="Search"
          value={query}
          onChange={inputHandler}
        />
        {/* <button
          type="submit"
          className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
          style={{
            top: 0,
            right: "25%",
          }}
        >
          Submit Now
        </button> */}
      </div>
      <ul className='search-result mt-1 position-absolute rounded-pill bg-white' style={{width: '36%', listStyle: 'none', margin: 0}}>
      {
        query.length > 0 &&  options.map((option, index) => (
            <Link to={`/product-details/${option.id}`} key={index} >
          <li className='text-decoration-none rounded-pill z-3' key={option.id} style={{listStyle: "none", fontSize:'1.2rem', display:'block' }} >
              {option.name}
            </li>
              </Link>
        ))
      }
      </ul>
      
    </div>
  );
}
