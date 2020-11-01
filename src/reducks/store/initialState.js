const initialState = {
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
    cart: [],
    orders: []
  },
  products: {
    list: []
  },
  loading: {
    state: false,
    text: ''
  }
};

export default initialState