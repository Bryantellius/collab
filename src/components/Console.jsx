const Console = ({ value, style }) => {
  return (
    <pre style={style} className="console">
      <code>{value}</code>
    </pre>
  );
};

export default Console;
