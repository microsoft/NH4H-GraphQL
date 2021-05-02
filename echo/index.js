
const { ApolloServer, gql } = require('apollo-server-azure-functions');
const typeDefs = require('./schema');


const HackAPIBackend = require('./datasources');


const resolvers = 
{
  Query: {
    hello: () => 'Hello world!',
    getUserByRegEmail:(_,{regemail},{dataSources})=>{
        return dataSources.hackapibackend.findByRegemail({regemail:regemail})},
    getUserByTeamsEmail:(_,{teamsemail},{dataSources})=>{
     return dataSources.hackapibackend.findByTeams({teamsemail:teamsemail})},
     getAllTeams:(_,{},{dataSources})=>{
      return dataSources.hackapibackend.getTeams()
      }
     },
  Team: {
        Users: (team,{},{dataSources}) => {
          return dataSources.hackapibackend.getTeamUsers({teamId:team.teamId});
        }
      }
  
  };

const server = new ApolloServer(
    
    { typeDefs, 
         dataSources: () => ({ hackapibackend :new HackAPIBackend()     }),
        resolvers,
        introspection: false,
        playground: false, 
    });

exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
     allowedHeaders:['Content-Type', 'Authorization']
   },
  });
