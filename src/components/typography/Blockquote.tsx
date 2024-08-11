const Blockquote = ({ children }: { children?: React.ReactNode }) => {
  return (
    <blockquote className="my-2 py-2 border-l-2 pl-6 italic">{children}</blockquote>
  );
};

export default Blockquote;
