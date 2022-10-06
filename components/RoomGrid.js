function RoomGrid(props) {
  function effortSymbol(percentage) {
    if (percentage === "x") {
      return "Pending";
    } else if (percentage > 89) {
      return "A+";
    } else if (percentage > 79) {
      return "A";
    } else if (percentage > 69) {
      return "B+";
    } else if (percentage > 59) {
      return "B";
    } else if (percentage > 49) {
      return "C";
    } else {
      return "D";
    }
  }

  return props.rooms.map((roomName) => {
    console.log(roomName);
    return (
      <div className="container rounded border my-2">
        <h1>{roomName}</h1>
        <table>
          <thead>
            <tr>
              <th>Student name</th>
              <th>Effort symbol</th>
              <th>Join date</th>
            </tr>
          </thead>
          <tbody>
            {props.students.map((student) => {
              if (student.room === roomName) {
                return (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{effortSymbol(student.effort)}</td>
                    <td>{student.join}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  });
}

export default RoomGrid;
