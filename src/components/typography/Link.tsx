const Link = ({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) => {
  return (
    <a className="text-blue-500 hover:underline underline-offset-4" href={href}>
      {children}
    </a>
  );
};

export default Link;
