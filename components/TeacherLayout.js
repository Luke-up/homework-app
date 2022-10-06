import TeacherNav from "./TeacherNav";

function TeacherLayout({ children }) {
  return (
    <div>
      <TeacherNav />
      <main>{children}</main>
    </div>
  );
}

export default TeacherLayout;
