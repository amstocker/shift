export const GRID_SCALE = 5;
export const GRID_EXP = 7;
//export const CURSOR_RADIUS = 10;

export const GRID_COLOR = "#dbdbdb";
export const SELECTED_COLOR = "#f442c5";


export default class Animation {
    constructor() {
        this.abs_x = 0;
        this.abs_y = 0;

        this.grid_width = 2**GRID_EXP;
        this.size = this.grid_width * GRID_SCALE;
        this.grid = new Uint8Array(this.grid_width**2);

        console.log(this.grid_width, this.size);
    }

    set_pos(x, y) {
        this.abs_x = x;
        this.abs_y = y;
    }

    pos_to_coord(p) {
        return {
            x: Math.floor(((p.x - this.abs_x) / this.size) * this.grid_width),
            y: Math.floor(((p.y - this.abs_y) / this.size) * this.grid_width)
        };
    }

    coord_to_pos(c) {
        return {
            x: Math.floor(((c.x / this.grid_width) * this.size) + this.abs_x),
            y: Math.floor(((c.y / this.grid_width) * this.size) + this.abs_y)
        };
    }

    index_to_coord(i) {
        return {
            x: i ^ ((i >> GRID_EXP) << GRID_EXP),
            y: i >> GRID_EXP
        }
    }

    index_to_pos(i) {
        return this.coord_to_pos(this.index_to_coord(i));
    }

    coord_to_index(c) {
        return (c.y * this.grid_width) + c.x;
    }

    pos_to_index(p) {
        return this.coord_to_index(this.pos_to_coord(p));
    }

    clear_grid(grid) {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = 0;
        }
    }

    clear() {
        this.clear_grid(this.grid);
    }

    step() {
        let x_mask = this.grid_width - 1;
        let y_mask = this.grid_width**2 - this.grid_width;
        let carry_mask = 2**(GRID_EXP - 1);
        let new_grid = new Uint8Array(this.grid_width**2);
        this.clear_grid(new_grid);
        for (let i = 0; i < this.grid.length; i++) {
            let j = ((i << 1) & x_mask) + ((i >> 1) & y_mask) + ((i & carry_mask) << GRID_EXP);
            new_grid[j] |= this.grid[i];
            new_grid[j+1] |= this.grid[i];
        }
        this.grid = new_grid;
    }

    update(mouse) {
        if (mouse.down) {
            this.grid[this.pos_to_index(mouse)] = 1;
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.grid.length; i++) {
            let p = this.index_to_pos(i);

            ctx.fillStyle = this.grid[i] ? SELECTED_COLOR : GRID_COLOR;
            ctx.fillRect(p.x, p.y, GRID_SCALE, GRID_SCALE);
        }
    }

}