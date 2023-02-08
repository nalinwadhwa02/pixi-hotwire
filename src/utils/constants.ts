export const gameconstants = {
    CharacterMovementSpeed: 0.5,
    BackgroundPaneSpeed: 0.25
}

export let lerp = function (a: number, b: number, c: number): number {
    return a * (1 - c) + b * c;
}