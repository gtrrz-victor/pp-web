import { Tournament } from "./Tournament";
import { Group } from "../dto/Group";
import { Match } from "../dto/Match";

export class MockedTournamentDataProvider implements Tournament {

    addResultToMatch(completedMatch: Match, group: Group): Promise<void> {
        console.log(completedMatch,group)
       return Promise.resolve()
    }

    groups(): Promise<Group[]> {
        return Promise.resolve([
            {
                id: "group_1",
                matchs: [
                    {
                        id:"1",
                        playerA:"1",
                        playerB:"2",
                    },
                    {
                        id:"2",
                        playerA:"1",
                        playerB:"2",
                        winner:"2",
                        result:[2,1]
                    }
                ],
                participants: [
                    {
                        id:"1",
                        name:"Jose",
                        contact:"Jose@email.com",
                        group:"group_1",
                        matches:{
                            wins:1,
                            losts:0
                        },
                        sets:{
                            wins:3,
                            losts:2
                        }
                    },
                    {
                        id:"2",
                        name:"Alberto",
                        contact:"Alberto@email.com",
                        group:"group_1",
                        matches:{
                            wins:3,
                            losts:2
                        },
                        sets:{
                            wins:3,
                            losts:2
                        }
                    }
                ]
            },
            {
                id: "group_2",
                matchs: [
                    {
                        id:"3",
                        playerA:"3",
                        playerB:"5",
                    },
                ],
                participants: [
                    {
                        id:"3",
                        name:"Joses2",
                        contact:"Jose@email.com",
                        group:"group_2",
                        matches:{
                            wins:1,
                            losts:0
                        },
                        sets:{
                            wins:3,
                            losts:2
                        }
                    },
                    {
                        id:"5",
                        name:"Albertos2",
                        contact:"Albertos2@email.com",
                        group:"group_2",
                        matches:{
                            wins:3,
                            losts:2
                        },
                        sets:{
                            wins:3,
                            losts:2
                        }
                    }
                ]
            },
        ])
    }
}


/**
 * export type Participant = {
    id?:string
    name:string
    contact:string
    group:number
    matches:{
        wins:number
        losts:number
    }
    sets:{
        wins:number
        losts:number
    }
}



 *  id?:string
    matchs: Match[]
    participants: Participant[]




    export type Match = {
    id?:string
    playerA: string,
    playerB: string,
    winner?: string,
    result?: Result,
}




 */