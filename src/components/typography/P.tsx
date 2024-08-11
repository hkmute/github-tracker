const P = ({ children }: { children?: React.ReactNode }) => (
  <p className="leading-7 [&:not(:first-child)]:mt-2">{children}</p>
);

export default P;
