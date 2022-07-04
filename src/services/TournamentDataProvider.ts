import { Tournament } from "./Tournament";
import { Group } from "../dto/Group";
import { Match } from "../dto/Match";
import { Participant } from "../dto/Participant";


export class TournamentDataProvider implements Tournament {
    groups(): Promise<Group[]> {
        throw new Error("Method not implemented.");
    }
    groupBy(id: number): Promise<Group | null> {
        throw new Error("Method not implemented.");
    }
    participantsBy(groupId: number): Promise<Participant[]> {
        throw new Error("Method not implemented.");
    }
    matchsBy(groupId: number): Promise<Match[]> {
        throw new Error("Method not implemented.");
    }
    addResultToMatch(completedMatch: Match): Promise<void> {
        throw new Error("Method not implemented.");
    }
}