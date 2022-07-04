import { Tournament } from "./Tournament";
import { Group } from "../dto/Group";
import { Match } from "../dto/Match";
// import { Participant } from "../dto/Participant";


export class TournamentDataProvider implements Tournament {
    groups(): Promise<Group[]> {
        return Promise.resolve([])
    }
    addResultToMatch(completedMatch: Match, group: Group): Promise<void> {
        return Promise.resolve()
    }
}