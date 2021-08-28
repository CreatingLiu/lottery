import React from 'react';
import './style.css'

function Modal(props){
	return (
		<div className="lottery_modal modal v-transfer-dom" style={props.show ? {} : {display : "none"}}>
			<div className="modal__mask" style={{zIndex: 1015, background: "rgba(0, 0, 0, 0.2)"}}></div>
			<div className="modal__wrapper" style={{zIndex: 1015}}>
				<div className="modal__content" style={{width: "400px"}}>
					<div className="modal__header">
						<span className="modal__title">{props.caption}</span>
						<span aria-label="Close" className="modal__headerbtn" onClick={props.callback}>
							<i className="icon icon--close">
								<svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
									<path d="M512 448l288-288c6.4-6.4 19.2-6.4 32 0l25.6 32c6.4 6.4 6.4 19.2 0 32L569.6 505.6l288 288c6.4 6.4 6.4 19.2 0 32l-32 32c-6.4 6.4-19.2 6.4-32 0L512 569.6l-288 288c-6.4 6.4-19.2 6.4-32 0l-32-32c-6.4-6.4-6.4-19.2 0-32L448 505.6 160 224c-6.4-12.8-6.4-25.6 0-32l32-32c6.4-6.4 19.2-6.4 32 0L512 448z"></path>
									<path d="M512 448l288-288c6.4-6.4 19.2-6.4 32 0l25.6 32c6.4 6.4 6.4 19.2 0 32L569.6 505.6l288 288c6.4 6.4 6.4 19.2 0 32l-32 32c-6.4 6.4-19.2 6.4-32 0L512 569.6l-288 288c-6.4 6.4-19.2 6.4-32 0l-32-32c-6.4-6.4-6.4-19.2 0-32L448 505.6 160 224c-6.4-12.8-6.4-25.6 0-32l32-32c6.4-6.4 19.2-6.4 32 0L512 448z"></path>
								</svg>
							</i>
						</span>
					</div>
					<div className="modal__body">
						<div className="wrapper">
							<img src={props.icon} alt="" />
							<div className="title">{props.title}</div>
							<div className="desc">
								<p>{props.text}</p>
							</div>
							<button className="submit" onClick={props.callback}>{props.buttonText}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
