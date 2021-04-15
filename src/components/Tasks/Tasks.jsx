import React from 'react';
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import {Link} from "react-router-dom";

import editSvg from '../../assets/img/pen.svg'

import './Tasks.scss'
import Task from "./Task";


const Tasks = ({list, onEditTitle, onAddTask, onEditTask,onRemoveTask,onCompleteTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка');
            });
        }
    };

    const onEdit = ()=>{

    }



    return (<div className='tasks'>
            <Link to={`/lists/${list.id}`}>
                <h2 style={{color:list.color.hex}} className='tasks_title'>
                    {list.name}
                    <img onClick={editTitle} src={editSvg}/>
                </h2>
            </Link>
            <div className='tasks_items'>
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                { list.tasks && list.tasks.map(task => (
                    <Task key={task.id} list={list} {...task} onComplete={onCompleteTask} onRemove={onRemoveTask} onEdit={onEditTask}/>
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>

    )
}
export default Tasks;