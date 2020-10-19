import React, { useCallback } from 'react'
import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import styled from 'styled-components/macro'
import { FWrap } from '../../styles'
import { storage } from '../../firebase'
import { ImagePreview } from './index'

const ImageArea = (props) => {
  const images = props.images

  const uploadImage = useCallback((e) => {
    const file = e.target.files
    let blob = new Blob(file, { type: 'image/jpeg' })

    // ランダムな文字列をファイル名(id)とする
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const N = 16
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map(n => S[n%S.length]).join('')

    const uploadRef = storage.ref('images').child(fileName)
    const uploadTask = uploadRef.put(blob)

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          const newImage = {id: fileName, path: downloadURL}
          props.setImages((prevState => [...prevState, newImage]))
        })
    })
  }, [props])

  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm('この画像を削除しますか？')
    if (!ret) {
      return false
    } else {
      const newImages = images.filter(image => image.id !== id)
      props.setImages(newImages)
      return storage.ref('images').child(id).delete()
    }
  }, [props, images])

  return (
    <div>
      <FWrap>
        {images.length > 0 && (
          images.map(image => <ImagePreview key={image.id} id={image.id} path={image.path} delete={deleteImage} />)
        )}
      </FWrap>
      <div css='text-align: right;'>
        <span>商品画像を登録する</span>
        <StIconButton>
          <label>
            <AddPhotoAlternateIcon />
            <input 
              css="display: none;" type='file' id='image'
              onChange={(e) => uploadImage(e)}
            />
          </label>
        </StIconButton>
      </div>
    </div>
  )
}

const StIconButton = styled(IconButton)`
  width: 45px;
  height: 45px;
`

export default ImageArea