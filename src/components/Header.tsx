import './Header.css'

function Header() {
    return (
        <div className="header">
            <div className="header_left">
                <img className="logo" src="public\NeuroConnect.png" alt="NeuroConnect"></img>
            </div>
            <div className="header_right">
                <p className="about">About</p>
            </div>
        </div>
        
    )
}

export default Header