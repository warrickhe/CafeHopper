import '../styles/Header.css';

export default function Header() {
  return (
    <div class="header-container">
      <div className="logo-div">
        <h1>CafeHopper</h1>
      </div>
      <div className="link-div">
        <a href="" style={{ marginRight: '10px' }}>
          Home
        </a>
        <a href="" style={{ marginRight: '10px' }}>
          FindCafes
        </a>
      </div>
    </div>
  );
}
