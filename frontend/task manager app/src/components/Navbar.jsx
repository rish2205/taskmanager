function Navbar({ userName, onLogout }) {
  return (
    <header className="dashboard-navbar">
      <div>
        <h2>Task Manager</h2>
        <p>Welcome, {userName}</p>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}

export default Navbar;