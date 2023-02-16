import './Header.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Header({ headerText }) {

    const location = useLocation()
    return (
        <header>
            { location.pathname === '/addcard' && <Link className='back-btn' to='..'><i className="fa-solid fa-arrow-left"></i></Link>}
            <h1>{ headerText }</h1>
        </header>
    )
}

export default Header