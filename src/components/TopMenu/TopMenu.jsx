import './TopMenu.css'
import { Link } from "react-router-dom";
import { useEffect } from 'react';


export function TopMenu () {

  useEffect(() => {
    const listItems = document.querySelectorAll('.top-menu a');

    listItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const menuBackdrop = document.querySelector('#menu-backdrop');

        menuBackdrop.style.setProperty('--left', `${left}px`);
        menuBackdrop.style.setProperty('--top', `${top}px`);
        menuBackdrop.style.setProperty('--width', `${width}px`);
        menuBackdrop.style.setProperty('--height', `${height}px`);
        menuBackdrop.style.opacity = '1';
        menuBackdrop.style.visibility = 'visible';
      });

      item.addEventListener('mouseleave', () => {
        const menuBackdrop = document.querySelector('#menu-backdrop');
        menuBackdrop.style.opacity = '0';
        menuBackdrop.style.visibility = 'hidden';
      });
    });

    return () => {
      listItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);


  return (
    <>
      <header className='top-menu'>
        <Link to='/'>Home</Link>
        <Link to='/products'>Products</Link>
        <Link to='/cart'>Cart</Link>
        <div id='menu-backdrop' className='card-backdrop'></div>
      </header>
    </>
  )
}