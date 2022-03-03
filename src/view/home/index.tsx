import React from "react";
import { Dispatch } from "futura";

import { Home, SearchName, UpdateStudent } from "../../state/home";
import { StudentListItem } from "../../lib/list-item";
import { InputField } from "../../lib/form/input-field";
import { Student } from "app/services/models";

export const HomeView: React.FunctionComponent<Props> = ({state, dispatch}) =>
  <div style={styles.container}>
    <div style={styles.listContainer}>
      <InputField
        placeholder="Search by name"
        onInput={onSearchName(dispatch)} />
      <ul style={styles.list}>
        {
          state.students
          .filter((student) =>
            `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes((state.searchName && state.searchName.toLowerCase()) || ""))
          .map((student) =>
            <li
              style={styles.listItem}
              key={student.id}>
              <StudentListItem
                student={student}
                onUpdateStudent={onUpdateStudent(dispatch)}/>
            </li>
          )
        }
      </ul>
    </div>
  </div>;

/** Messages */

const onSearchName = (dispatch: Dispatch<Home.Message>) =>
  (name: string) =>
    dispatch(new SearchName(name));

const onUpdateStudent = (dispatch: Dispatch<Home.Message>) =>
  (student: Student) =>
    dispatch(new UpdateStudent(student));

/** Types */

interface Props {
  state: Home.State;
  dispatch: Dispatch<Home.Message>;
}

/** Styles */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    backgroundColor: "aliceblue",
    justifyContent: "center",
  },
  listContainer: {
    borderRadius: "1rem",
    width: "55%",
    margin: "2% 0%",
    overflow: "auto",
    padding: "1rem",
    backgroundColor: "white"
  },
  list: {
    borderRadius: "1rem",
    listStyle: 'none',
    height: "36rem",
    padding: "0",
    overflow: "auto",
  },
  listItem: {
    borderBottom: "0.1rem solid #EEE",
  }
};