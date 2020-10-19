import { FirebaseTimestamp, db } from '../../firebase'
import { push } from 'connected-react-router'

const productsRef = db.collection('products')

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      name: name,
      description: description,
      gender: gender,
      category: category,
      price: parseInt(price, 10),
      images: images,
      sizes: sizes,
      updated_at: timestamp
    }

    if (id === '') {
      const ref = productsRef.doc()
      data.created_at = timestamp
      id = ref.id
      data.id = id
    }
    

    return productsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push('/'))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}