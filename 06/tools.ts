export type Pos = {
    x: number;
    y: number;
}

export enum Direction {
    N,
    E,
    S,
    W,
    NE,
    SE,
    SW,
    NW,
}

export const direction_coord = (direction: Direction): Pos => {
  switch (direction) {
    case Direction.N:
      return { x: 0, y: -1 };
    case Direction.E:
      return { x: 1, y: 0 };
    case Direction.S:
      return { x: 0, y: 1 };
    case Direction.W:
      return { x: -1, y: 0 };
    case Direction.NE:
      return { x: 1, y: -1 };
    case Direction.SE:
      return { x: 1, y: 1 };
    case Direction.SW:
      return { x: -1, y: 1 };
    case Direction.NW:
      return { x: -1, y: -1 };
    default:
      throw new Error("Direction does not exist");
  }
}

export const search_grid = (grid: string[][], symbol: string) => {
    for (let x = 0; x < grid[0].length; x++) {
        for (let y = 0; y < grid.length; y++) {
            if (grid[y][x] === symbol) {
                return { x, y };
            }
        }
    }

    throw Error("Symbol is missing from grid")
}

export const rotate_guard = (direction: number) => {
    direction = (direction + 1) % 4;
    return direction
}

export const valid_coord = (x:number, y:number, max_grid_x:number, max_grid_y:number) => {
    return (x >= 0 && x < max_grid_x && y >= 0 && y < max_grid_y);
}