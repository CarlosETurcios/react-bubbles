//@ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuth } from './axiossWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  console.log('ctee', colorToEdit);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/colors`, colorToEdit)
      .then(res => {
        console.log(res.data);
        setColorToEdit(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const saveEdit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/colors`, colorToEdit)
      .then(res => {
        console.log('this is the res from list', res);
        setEditing(res.data);
      })
      .catch(err => console.error(err));
    updateColors.history.push('/');
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
