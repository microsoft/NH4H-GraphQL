const { ApolloServer, gql } = require('apollo-server-azure-functions');
const typeDefs=
gql`
type UserExpanded {
    name: String
    islead: Int
}
type User {
    teamId: ID
    teamName: String
    userID: [Int]
    hackers:[UserExpanded]
}
type Hacker {
    userId: ID
    active: Boolean
    adUserId: String
    createdBy: String
    createdDate: String
    gitHubId: String
    gitHubUser: String
    jnjOptIn: Boolean
    mailchimpId: String
    modifiedBy: String
    modifiedDate: String
    msftOptIn: Boolean
    mySkills: String
    sonsielOptIn: Boolean
    userDisplayName: String
    userMSTeamsEmail: String
    userOptOut: Boolean
    userRegEmail: String
    userRole: String
}
type Team{
    active: Boolean
    challengeName: String
    createdBy: String
    createdDate: String
    githubURL: String
    modifiedBy: String
    modifiedDate:String
    msLabAzureUsername:String
    msLabEnvironment:String
    msLabSPNAppId: String
    msLabSPNAppObjectId: String
    msLabSPNDisplayName: String
    msLabSPNKey: String
    msLabSPNObjectId: String
    msLabTenantName: String
    msTeamsChannelName: String
    msTeamsChannelUrl: String
    skillsWanted: String
    Users:User
    teamDescription: String
    teamId: Int
    teamName: String
}
type Challenge{
    id: ID
    track: String
    name: String
    description: String
}

type Query {
   hello: String
   getUserByRegEmail(regemail:String):Hacker
   getUserByTeamsEmail(teamsemail:String):Hacker
   getAllTeams:[Team]
   getChallenges:[Challenge]
}
`;
module.exports = typeDefs;;