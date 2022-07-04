import { Tournament } from "./Tournament";
import { Group } from "../dto/Group";
import { Match } from "../dto/Match";
// import { Participant } from "../dto/Participant";

const baseUrl = "http://ec2-3-24-218-176.ap-southeast-2.compute.amazonaws.com:3000"
export class TournamentDataProvider implements Tournament {
    async groups(): Promise<Group[]> {
        const response = await fetch(`${baseUrl}/pptournament/groups`)
        return (await response.json()).groups
    }
    async addResultToMatch(completedMatch: Match, group: Group): Promise<void> {
        const { result, winner } = completedMatch
        await fetch(`${baseUrl}/pptournament/groups/${group.id}/matchs/${completedMatch.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ result, winner }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }
}

//groups/:groupId/matchs/:matchId