
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4 gap-4 flex flex-col">{children}</div>
  );
}

export default Container