import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { db } from '../firebase/index'
import { saveProduct } from '../reducks/products/operations'
import { SelectBox, PrimaryButton, TextInput } from '../components/UIkit'
import { ImageArea, SetSizeArea } from '../components/Products'
import { SSpace, HMain, SContainer, SCenter } from '../styles/index'

const ProductEdit = () => {
  const dispatch = useDispatch()

  // urlの末尾のproductsのidを取得
  let id = window.location.pathname.split('/product/edit')[1]
  if (id !== '') {
    id = id.split('/')[1]
  }

  const [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        [category, setCategory] = useState(''),
        [gender, setGender] = useState(''),
        [price, setPrice] = useState(''),
        [images, setImages] = useState([]),
        [sizes, setSizes] = useState([]);

  const inputName = useCallback((e) => {
      setName(e.target.value)
  }, [setName])

  const inputDescription = useCallback((e) => {
    setDescription(e.target.value)
  }, [setDescription])

  const inputPrice = useCallback((e) => {
    setPrice(e.target.value)
  }, [setPrice])

  const categories = [
    {id: 'tops', name: 'トップス'},
    {id: 'shirts', name: 'シャツ'},
    {id: 'pants', name: 'パンツ'},
  ]

  const genders = [
    {id: 'all', name: 'すべて'},
    {id: 'male', name: 'メンズ'},
    {id: 'female', name: 'レディース'},
  ]

  useEffect(() => {
    if (id !== '') {
      db.collection('products').doc(id).get()
        .then(snapshot => {
          const product = snapshot.data()
          setName(product.name)
          setDescription(product.description)
          setCategory(product.category)
          setGender(product.gender)
          setPrice(product.price)
          setImages(product.images)
          setSizes(product.sizes)
        })
    }
  }, [id])

  return (
    <section>
      <SContainer>
        <HMain>商品の登録・編集</HMain>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={'商品名'} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={'text'}
        />
        <TextInput
          fullWidth={true} label={'商品説明'} multiline={true} required={true}
          onChange={inputDescription} rows={5} value={description} type={'text'}
        />
        <SelectBox
          label={'カテゴリー'} required={true} options={categories} select={setCategory} value={category}
        />
        <SelectBox
          label={'性別'} required={true} options={genders} select={setGender} value={gender}
        />
        <TextInput
          fullWidth={true} label={'価格'} multiline={false} required={true}
          onChange={inputPrice} rows={1} value={price} type={'number'}
        />
        <SSpace />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <SSpace />
        <SCenter>
          <PrimaryButton
            label={'商品情報を登録'}
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
          />
        </SCenter>
      </SContainer>
    </section>
  )
}

export default ProductEdit