export default class Tile {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    destroy() {
        this.delete = true;
    }

    render(state) {
        const context = this.refs.canvas.getContext("2d");
        const grid = state.grid;
        const offset = grid.offset;

        context.drawImage(
            this.state.img.tile,
            offset.x + this.x * grid.size,
            offset.y + this.y * grid.size,
            grid.size,
            grid.size,
        );
    }
}
