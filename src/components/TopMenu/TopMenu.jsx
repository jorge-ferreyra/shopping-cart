import './TopMenu.css'
import { Link } from "react-router-dom";


export function TopMenu () {
  return (
    <navbar className='top-menu'>
      <Link to='/'>Home</Link>
      <Link to='/products'>Products</Link>
      <Link to='/cart'>Cart</Link>
    </navbar>
  )
}