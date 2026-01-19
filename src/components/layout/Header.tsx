import logo from '../../assets/logo.svg'

const Header = () => (
    <header>
        <div className="logo-container">
            <img src={logo} alt="Pixell River Logo" />
        </div>
        <div className="header-text">
            <h1>Pixell River Employee Directory</h1>
            <p>Welcome to our team Directory</p>
        </div>
    </header>
);

export default Header;