import React, { useState } from 'react'
import './style.css';

function Todolist() {
    const [task, setTask] = useState(null);
    const [updateTask, setUpdateTask] = useState(null);
    const [updateTaskId, setUpdateTaskId] = useState();
    const [taskList, setTaskList] = useState([]);
    
    const AddTodo = () => {
        if (task === null) return;
    
        const item = {
          id: Math.floor(Math.random() * 1000000),
          value: task,
        };
        setTaskList(oldList => [...oldList, item]);

        setTask("");
        document.getElementById('item').value = "";
    };

    const DeleteTask = (id) => {
        const newTaskList = taskList.filter((item) => item.id !== id);
        setTaskList(newTaskList);
    }

    const EditTask = (id) => {
        const updateTaskList = taskList.filter((item) => item.id === id);

        document.getElementById('item').value = updateTaskList[0].value;
        setUpdateTaskId(id);
    }

    const Update = () => {
        const newItem = {
            id: updateTaskId,
            value: task
        }

        DeleteTask(updateTaskId);
        setTaskList((oldList) => [...oldList, newItem]);
    }

    return (
      <React.Fragment>
        <section className="d-flex flex-row flex-1 flex-wrap justify-content-center align-items-center gap-3 pt-4">
          <div className="d-flex flex-column flex-1 flex-wrap">
            <form id="formTodo" type="multipart/form-data" method="post">
              <input
                id="item"
                type="text"
                className="form-control"
                onChange={(e) => setTask(e.target.value)}
                autoFocus={true}
              />
            </form>
          </div>
          <div className="d-flex flex-column flex-1 flex-wrap">
            <div className="btn-group gap-2" role="group">
              <button className="btn btn-primary" onClick={(e) => AddTodo()}>
                Add item
              </button>
              <button id='update' className="btn btn-success" onClick={(e) => Update()}>
                Update
              </button>
            </div>
          </div>
        </section>

        <section className="d-flex flex-row flex-1 flex-wrap justify-content-center align-items-center pt-3">
          <div className="d-flex flex-column flex-1 flex-wrap">
            <ul className="list-group task-list">
              {taskList.map((item) => {
                return (
                  <li className="list-group-item" key={item.id}>
                    <div className="row col-12">
                      <div className="col-6">
                        <span className="pt-5">{item.value}</span>
                      </div>
                      <div className="col-6">
                        <div className="btn-group gap-2" role="group">
                          <button
                            className="btn btn-danger"
                            onClick={() => DeleteTask(item.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-info"
                            onClick={() => EditTask(item.id)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Todolist