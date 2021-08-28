import React, { Component } from 'react';
import Item from '../item';
import './style.css';

function ItemSet(props) {
    let lock = props.data.itemList[props.id].unlockAt > new Date();
    return (<Item 
        id={props.id} 
        img={props.data.itemList[props.id].img} 
        name={lock ? "未解锁" : props.data.itemList[props.id].name} 
        highlight={props.data.highlight === props.id}
        lock={lock}
    />);
}

class Lottery extends Component {
    constructor(props){
        super(props);
        this.state = {
            highlight: null,

            modalShow: false,
            modalCaption: "",
            modalTitle: "",
            modalText: "",
            modalButtonText: "",
            modalIcon: ""

        };

        this.clicked = this.clicked.bind(this);
        this.highlightNext = this.highlightNext.bind(this);
        this.dialogCallbak = this.dialogCallbak.bind(this);
    }

    dialogCallbak(e){
        this.setState({modalShow: false, highlight: null});
        if(this.gift !== null){
            this.props.actionEnd();
        }
    }

    highlightNext(){
        let that = this;
        if(this.changeCounter > 0){
            this.setState((state) => {
                if(state.highlight == null){
                    that.changeCounter--;
                    return {highlight: 0};
                }
                else{
                    let x = state.highlight;
                    do {
                        that.changeCounter--;
                        x = (x + 1) % 8;
                    } while(that.props.itemList[x].unlockAt > new Date());
                    return {highlight: x};
                }
            });

            let time = this.changeCounter > 8 ? 100 : (this.changeCounter > 2 ? 200 : 500);
            this.timer = setTimeout(this.highlightNext, time);
        }
        else{
            this.setState({
                modalCaption: "🎉 恭喜中奖！",
                modalTitle: "恭喜获得" + this.props.itemList[this.gift].name,
                modalText: "",
                modalIcon: this.props.itemList[this.gift].img,
                modalShow: true
            });
            this.timer = null;
        }
    }

    clicked(){
        this.props.draw().then(x => {
            if(x.code === 0) {
                this.gift = x.id;
                this.changeCounter = 25 + x.id;
                this.highlightNext();
            }
            else {
                this.gift = null;
                this.setState({
                    modalCaption: "错误",
                    modalTitle: x.msg,
                    modalText: "",
                    modalIcon: "",
                    modalShow: true
                });
            }
        })
    }

    render() {
        let itemData = {
            itemList: this.props.itemList,
            highlight: this.state.highlight
        };

        return (
        <div className="turntable-box">
            <div className="upper-border up-down">
                <div className="dot vertex"></div>
                <div className="dot border left-border-dot"></div>
                <div className="dot white"></div>
                <div className="dot border right-border-dot"></div>
                <div className="dot vertex"></div>
            </div>
            <div className="lower-border up-down">
                <div className="dot vertex"></div>
                <div className="dot border left-border-dot"></div>
                <div className="dot white"></div>
                <div className="dot border right-border-dot"></div>
                <div className="dot vertex"></div>
            </div>
            <div className="left-border left-right">
                <div className="dot vertex"></div>
                <div className="dot border left-border-dot"></div>
                <div className="dot white"></div>
                <div className="dot border right-border-dot"></div>
                <div className="dot vertex"></div>
            </div>
            <div className="right-border left-right">
                <div className="dot vertex"></div>
                <div className="dot border left-border-dot"></div>
                <div className="dot white"></div>
                <div className="dot border right-border-dot"></div>
                <div className="dot vertex"></div>
            </div>
            <div className="blocks">
                <div className="item-container">
                    <ItemSet data={itemData} id={0} />
                    <ItemSet data={itemData} id={7} />
                    <ItemSet data={itemData} id={6} />
                    <ItemSet data={itemData} id={1} />
                    <div className="turntable-item item lottery" onClick={this.clicked}>
                        <div className="lottery-text">
                            抽奖
                        </div>
                        <div className="text">
                            {this.props.price}矿石/次
                        </div>
                    </div>
                    <ItemSet data={itemData} id={5} />
                    <ItemSet data={itemData} id={2} />
                    <ItemSet data={itemData} id={3} />
                    <ItemSet data={itemData} id={4} />
                </div>
            </div>
            {<this.props.modal 
                caption={this.state.modalCaption} 
                title={this.state.modalTitle}
                text={this.state.modalText}
                buttonText={"关闭"}
                icon={this.state.modalIcon}
                show={this.state.modalShow} 
                callback={this.dialogCallbak} />}
        </div>
        );
    }
}
  
export default Lottery;
  