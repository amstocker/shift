import React from 'react';
import ReactDOM from 'react-dom';

import { setupCanvas } from './utils.js';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.animate = this.animate.bind(this);

	// create object here
    }

    render() {
        return (
            <canvas className={"fullscreen"} ref={this.canvas} ></canvas>
        );
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
        
        window.requestAnimationFrame(this.animate);
    }

    animate() {
        const [cvs, ctx, w, h] = this.getCanvasInfo();
        // let abs_x = (w - this.odometer.size)/2,
        //     abs_y = 50;

        // this.odometer.set_pos(abs_x, abs_y);
        
	// draw here
	
        ctx.clearRect(0, 0, w, h);
	// draw

        window.requestAnimationFrame(this.animate);
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
