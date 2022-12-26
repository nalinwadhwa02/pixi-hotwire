export interface Vector2 {
    x: number,
    y: number,
}

export function getLen(b: Vector2): number {
    return Math.sqrt(b.x^2 + b.y^2);
}

export function distBtw(a: Vector2, b: Vector2): number {
    return Math.sqrt((a.x - b.x)^2 + (a.y - b.y)^2);
}

export function getDirectionTo(a: Vector2, b: Vector2): Vector2{
    return {
        x: (b.x - a.x), 
        y: (b.y - a.y),
    };
}