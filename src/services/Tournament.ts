import { Group } from "../dto/Group";
import { Match } from "../dto/Match";
import { isDevMode } from "../tools/IsDevMode";
import { MockedTournamentDataProvider } from "./MockedTournamentDataProvider";
import { TournamentDataProvider } from "./TournamentDataProvider";

export interface Tournament {
    groups(): Promise<Group[]>
    addResultToMatch(completedMatch: Match, group: Group): Promise<void>
}

export const tournamentServiceFactory = (): Tournament => (isDevMode()) ? new MockedTournamentDataProvider() : new TournamentDataProvider()