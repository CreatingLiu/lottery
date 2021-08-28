import React, { Component } from 'react';
import './style.css'

class HistoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outputIndex: 0
        }
    }

    componentDidMount(){
        this.forceUpdate()
    }

    componentDidUpdate() {
        if(this.props.list.length > 5){
            if(!this.timer){
                this.timer = setInterval(() => {
                    this.setState({outputIndex: (this.state.outputIndex + 1) % (this.props.list.length * 30)});
                }, 20);
            }
        }
        else{
            if(this.timer){
                clearInterval(this.timer);
            }
        }
        
    }

    componentWillUnmount() {
        if(this.timer)
            clearInterval(this.timer);
    }

    render() {
        return (
            <div className="winninglist_container winning_list">
                <div className="content" style={{transform: "translateY(-" + (this.state.outputIndex % 30) + "px)"}}>
                    {this.props.list.map((_x, i) => {
                        let index;
                        if(this.props.list.length > 5)
                            index = (i + this.props.list.length - 1 + Math.floor(this.state.outputIndex / 30)) % this.props.list.length;
                        else
                            index = i;
                        return (
                        <div className="item" key={i}>
                            <p className="message">
                                {this.props.list[index].message}
                            </p> 
                            <p className="date">
                                {this.props.list[index].date}
                            </p>
                        </div>
                    );})} 
                </div>
            </div>
        );
    }
}

export default HistoryList;
