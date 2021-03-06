import React from 'react';
import './style.css'

function Item(props){
    return (
        <div id={props.id} className={"turntable-item item" + (props.highlight ? " lottery" : "")}>
            {props.lock ? <div className="locked"></div> : null}
            <div className="image">
                <img src={props.img} alt={props.name} />
            </div>
            <div className="text">{props.name}</div>
            {props.lock ? 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="lock">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.99999 1.33325C10.025 1.33325 11.6667 2.97487 11.6667 4.99992V6.33325H14C14.3682 6.33325 14.6667 6.63173 14.6667 6.99992V13.9999C14.6667 14.3681 14.3682 14.6666 14 14.6666H1.99999C1.63181 14.6666 1.33333 14.3681 1.33333 13.9999V6.99992C1.33333 6.63173 1.63181 6.33325 1.99999 6.33325H4.33333V4.99992C4.33333 2.97487 5.97495 1.33325 7.99999 1.33325ZM8.33335 8.66667C8.51744 8.66667 8.66668 8.81591 8.66668 9V12C8.66668 12.1841 8.51744 12.3333 8.33335 12.3333H7.66668C7.48259 12.3333 7.33335 12.1841 7.33335 12V9C7.33335 8.81591 7.48259 8.66667 7.66668 8.66667H8.33335ZM5.66668 5C5.66668 3.71134 6.71135 2.66667 8.00001 2.66667C9.28868 2.66667 10.3333 3.71134 10.3333 5V6.33333H5.66668V5Z" fill="#D25F00"></path>
                </svg> : null}
        </div>
    );
}

export default Item;