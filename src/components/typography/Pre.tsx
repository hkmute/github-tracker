const Pre = ({ children }: { children?: React.ReactNode }) => {
  return (
    <pre className="my-3 p-3 bg-gray-800 text-white rounded-md overflow-auto">
      {children}
    </pre>
  );
};

export default Pre;