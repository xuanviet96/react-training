import {Task} from "./components/Task.jsx";
import './App.css'
import {useState} from "react";
import {CreateTaskArea} from "./components/CreateTaskArea.jsx";
import {FilterArea} from "./components/FilterArea.jsx";
import {Statistics} from "./components/Statistics.jsx";
import {FilterEnum, TaskArrayKey} from "./constants/Enum.jsx";
import {filterTasks, useLocalStorage} from "./utils/Utils.jsx";
import {AppArea} from "./App.styles.js";

function App() {
    const [tasks, setTasks] = useLocalStorage(TaskArrayKey, []);
    const [filter, setFilter] = useState(FilterEnum.ALL);
    const addTask = (description) => setTasks([...tasks, {description: description, isCompleted: false}]);
    const updateTask = (currentDescription, newDescription, isCompleted, isDeleted) => {
        if (isDeleted) {
            setTasks(tasks.filter(task => task.description !== currentDescription));
        } else {
            setTasks(tasks.map(task => {
                if (task.description === currentDescription) {
                    task.description = newDescription;
                    task.isCompleted = isCompleted;
                    return task;
                }
                return task;
            }));
        }
    }

    return (
        <AppArea>
            <CreateTaskArea addTask={addTask} />
            <Statistics tasks={tasks} />
            <FilterArea setFilter={setFilter} /> 
            {tasks.filter(element => filterTasks(filter, element))
                .map((element) => <Task key={element.description} element={element} updateTask={updateTask} />)}
        </AppArea>
    )

}

export default App