import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SWrapin, FRowWrap } from '../styles'
import { ProductCard } from '../components/Products'
import { fetchProducts } from '../reducks/products/operations'
import { getProducts } from '../reducks/products/selectors'

const ProductList = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const products = getProducts(selector)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <SWrapin>
      <FRowWrap>
        {products.length > 0 && (
          products.map(product => (
            <ProductCard 
              key={product.id} id={product.id} name={product.name} 
              images={product.images} price={product.price}
            />
          ))
        )}
      </FRowWrap>
    </SWrapin>
  )
}

export default ProductList