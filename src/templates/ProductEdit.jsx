import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations'
import { SelectBox, PrimaryButton, TextInput } from '../components/UIkit'
import { MSpace, SContainer, SCenter } from '../styles/index'

const ProductEdit = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        [category, setCategory] = useState(''),
        [gender, setGender] = useState(''),
        [price, setPrice] = useState('');

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

  ];

  const genders = [
    {id: 'all', name: 'すべて'},
    {id: 'male', name: 'メンズ'},
    {id: 'female', name: 'レディース'},
  ]
  

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <SContainer>
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
        <MSpace />
        <SCenter>
          <PrimaryButton
            label={'商品情報を登録'}
            onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
          />
        </SCenter>
      </SContainer>
    </section>
  )
}

export default ProductEdit