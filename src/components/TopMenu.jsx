import './TopMenu.css'
//import { Link } from "react-router-dom";

export function TopMenu () {
  return (
    <navbar className='top-menu'>
      <a to='/'>Home</a>
      <a to='/products'>Products</a>
      <a to='/cart'>Cart</a>
    </navbar>
  )
}