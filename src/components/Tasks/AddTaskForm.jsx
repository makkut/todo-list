import addSvg from "../../assets/img/addSvg.svg";
import React, {useState} from "react";
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    };

    const addTask = () => {
        const obj =
            {
                listId: list.id,
                text: inputValue,
                completed: false
            };
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', obj)
            .then(({data}) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Ощибка при добавлении задачи!');
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    return (
        <div className='tasks_form'>
            {!visibleForm ? (
                <div className='tasks_form-new' onClick={toggleFormVisible}>
                    <img src={addSvg} alt='Add icon'/>
                    <span>Новая задача</span>
                </div>
            ) : (
                <div className='tasks_form-block'>
                    <input value={inputValue} className='field'
                           type='text'
                           placeholder='Текст задачи'
                           onChange={e => setInputValue(e.target.value)}/>
                    <button disabled={isLoading} onClick={addTask} className='button'>{isLoading ? 'Добавление' : 'Добавить задачу'}</button>
                    <button onClick={toggleFormVisible} className='button button--grey'>Отмена</button>
                </div>)}
        </div>
    );
}
export default AddTaskForm