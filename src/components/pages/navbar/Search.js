import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import style from './Styles.module.css'
import { useSetProducts } from '../../../contexts/ProductContext'
import { axiosRes } from '../../../api/axiosDefault'
export const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState([])
  const setProducts = useSetProducts()
  useEffect(()=>{
    getSearchData()
  },[searchValue])

  const handleSearchChanges = e =>{
    setSearchValue(e.target.value)
  }
  const getSearchData = ()=>{
    if(searchValue!='')
      {
        axiosRes.get('/categories/?name__contains='+searchValue, searchValue)
      .then(res=>{
          setResults(res.data.results)
      })
      .catch(err=>{})
      }
  }
  const handleChoosedValue = (item)=> {
    axios.get('/products/?category='+item.id)
    .then(res=>{
      setProducts(res.data.results);
    })
    .catch(err=>{
    })
    setSearchValue('')
  }
  
  return (
    <div className={`${style.Parent}`}>
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Search"
          className=" mr-sm-2"
          value={searchValue}
          name = "search"
          onChange={handleSearchChanges}
        />
      </Col>
    </Row>
  <div className={`${style.Child}`} style={{visibility: (searchValue === '' || results.length === 0) ? "hidden" :"visible"}}>
    <ul>
      {results?.map((item,id)=>
          <li key={id} onClick={()=>handleChoosedValue(item)}>{item.name}</li>)}
    </ul> 
  </div>
  </div>
  )
}
