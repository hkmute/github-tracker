const Link = ({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) => {
  return (
    <a
      className="text-blue-500 underline-offset-4 hover:underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;
