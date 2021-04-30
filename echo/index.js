
const { ApolloServer, gql } = require('apollo-server-azure-functions');
const typeDefs = 
gql`
 type User {
     userId: ID
     userRole: String
     userRegEmail: String
     userMSTeamsEmail:String 
     gitHubId: Int
 }
 type Team{
    teamId: ID
    teamName: String
 }
 type Query {
    hello: String
    getUserByRegEmail(regemail:String):User
    getUserByTeamsEmail(teamsemail:String):User
    getAllTeams:[Team]
}

`;
const HackAPIBackend = require('./datasources');


const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getUserByRegEmail:(_,{regemail},{dataSources})=>{
        return dataSources.hackapibackend.findByRegemail({regemail:regemail})},
    getUserByTeamsEmail:(_,{teamsemail},{dataSources})=>{
     return dataSources.hackapibackend.findByTeams({teamsemail:teamsemail})},
     getAllTeams:(_,{},{dataSources})=>{
      return dataSources.hackapibackend.getTeams()}
    
    
  }
  };

const server = new ApolloServer(
    
    { typeDefs, 
         dataSources: () => ({ hackapibackend :new HackAPIBackend()     }),
        resolvers,
        introspection: process.env.introspection,
        playground: process.env.playground, 
    });

exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
     allowedHeaders:['Content-Type', 'Authorization']
   },
  });
