import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '../List/List';
import closeSvg from './../../assets/img/close.svg'


import './AddList.scss';
import Badge from "../Badge/Badge";

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(3);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setSelectedColor(colors[0].id);
        setInputValue('');
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка')
            return;
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0];
                const listObj = { ...data, color, tasks:[]};
                onAdd(listObj);
                onClose();
            })
            .catch(()=>{
                alert('Ощибка при добавлении списка!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return <div className='add-list'>
        <List onClick={() => setVisiblePopup(!visiblePopup)} items={[
            {
                className: 'list_add-button',
                icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                name: 'Добавить список'
            }
        ]}/>
        {visiblePopup && <div className='add-list_popup'>
            <img onClick={onClose} src={closeSvg} alt='Close button'
                 className='add-list_popup-close-btn'/>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} className='field' type='text'
                   placeholder='Название списка'/>
            <div className='add-list_popup-colors'>
                {colors.map((color) => (
                    <Badge onClick={() => setSelectedColor(color.id)}
                           key={color.id}
                           color={color.name}
                           className={selectedColor === color.id && 'active'}/>
                ))}
            </div>
            <button onClick={addList} className='button'> {isLoading ? 'Добавление...' : 'Добавить'}</button>
        </div>}
    </div>
}

export default AddList;