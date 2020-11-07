// let user = process.browser ? JSON.parse(localStorage.getItem("user")) : null;
// const initialState = user
//   ? { status: { loggedIn: true }, user }
//   : { status: { loggedIn: false }, user: null, error: null };
export default () => ({
  status: { loggedIn: true }, 
  user: null, 
  error: null
});
