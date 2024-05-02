import { Filters } from '../Filters/Filters.jsx'

// eslint-disable-next-line react/prop-types
export function Header () {
  return (
    <header style={{width: '100%'}}>
      <Filters />
    </header>
  )
}