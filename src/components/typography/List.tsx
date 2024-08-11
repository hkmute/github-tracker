const List = ({ children }: { children?: React.ReactNode }) => {
  return <ul className="my-3 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
};

export default List;
