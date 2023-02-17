import './Header.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Header({ headerText, privateMode, flipPrivateMode }) {

    const location = useLocation()
    return (
        <header>
            { location.pathname === '/addcard' && <Link className='back-btn' to='..'><i className="fa-solid fa-arrow-left"></i></Link>}
            <h1>{ headerText }</h1>
            { location.pathname === '/' && 
                <i 
                    onClick={ flipPrivateMode } 
                    className={ privateMode? 'private-mode-logo fa-solid fa-eye-slash' 
                    : 'private-mode-logo fa-solid fa-eye' }
                    title='Toggle Private mode'
                    >
                    
                </i> 
            }
        </header>
    )
}

export default Header