export type Match = {
    playerA: string,
    playerB: string,
    winner?: string,
    result?: Result,
}

export type Result = [number?, number?]