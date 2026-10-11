function Button({ children, onClick }) {

  return (
    <button 
      className="main-button"
      onClick={onClick}
    >
      {children}
    </button>
  );

}

export default Button;