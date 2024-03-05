import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <div class="header-container">
      <div className="logo-div">
        <Link to="/landing">
          <h1>CafeHopper</h1>
        </Link>
      </div>
      <div className="link-div">
        <Link to="/">
          <a href="" style={{ marginRight: '10px' }}>
            Home
          </a>
        </Link>
        <Link to="/Query">
          <a href="" style={{ marginRight: '10px' }}>
            FindCafes
          </a>
        </Link>
      </div>
    </div>
  );
}
