import React from 'react';
import ReactDOM from 'react-dom';

import Animation from './animation.js';
import { setupCanvas } from './utils.js';

const Mouse = {
    x: 0,
    y: 0,
    down: false
};


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.animate = this.animate.bind(this);

        this.animation = new Animation();
    }
    
    render() {
        return (<div>
            <canvas className={"fullscreen"} ref={this.canvas} ></canvas>
            <p className="controls">
                <button onClick={(e) => this.animation.step()}>
                    {"Shift"}
                </button>
                <button onClick={(e) => this.animation.clear()}>
                    {"Clear"}
                </button>
            </p>
        </div>);
    }

    getCanvasInfo() {
        let cvs = this.canvas.current,
            ctx = setupCanvas(cvs),
            w = cvs.offsetWidth,
            h = cvs.offsetHeight;
        return [cvs, ctx, w, h];
    }

    componentDidMount() {
        window.addEventListener("mousemove", (e) => {
            e.preventDefault();   
            e.stopPropagation();
            Mouse.x = parseInt(e.clientX);
            Mouse.y = parseInt(e.clientY);
        });
        window.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            Mouse.down = true;
        });
        window.addEventListener("mouseup", (e) => {
            e.preventDefault();
            e.stopPropagation();
            Mouse.down = false;
        });
        
        window.requestAnimationFrame(this.animate);
    }

    animate() {
        const [cvs, ctx, w, h] = this.getCanvasInfo();
        let abs_x = (w - this.animation.size)/2,
            abs_y = 50;

        this.animation.set_pos(abs_x, abs_y);
       	this.animation.update(Mouse); 
	
        ctx.clearRect(0, 0, w, h);
        this.animation.draw(ctx);

        window.requestAnimationFrame(this.animate);
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
