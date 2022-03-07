const Alert = ({ value, type, show = false, onClick }) => {
  let alertShow = show ? "alert-show" : "";

  return (
    <div className={`alert alert-${type} ${alertShow}`} onClick={onClick}>
      X {value}
    </div>
  );
};

export default Alert;
