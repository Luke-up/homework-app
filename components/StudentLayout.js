import StudentNav from "./StudentNav";

function studentLayout({ children }) {
  return (
    <div>
      <StudentNav />
      <main>{children}</main>
    </div>
  );
}

export default studentLayout;
