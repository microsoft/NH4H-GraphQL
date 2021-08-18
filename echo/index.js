
const { ApolloServer, gql } = require('apollo-server-azure-functions');
const typeDefs = require('./schema');

const HackAPIBackend = require('./datasources');

const resolvers = 
{
  Query: {
    hello: () => 'Hello world!',
    getUserByRegEmail:(_,{regemail},{hackAPI})=>{
        return hackAPI.findByRegemail({regemail:regemail})},
    getUserByTeamsEmail:(_,{teamsemail},{hackAPI})=>{
     return hackAPI.findByTeams({teamsemail:teamsemail})},
     getAllTeams:(_,{},{hackAPI})=>{
      return hackAPI.getTeams()
      }
     },
  Team: {
        Users: (team,{},{hackAPI}) => {
          return hackAPI.getTeamUsers({teamId:team.teamId});
        }
      }
  
  };

const server = new ApolloServer(
    
    { typeDefs, 
         //dataSources: () => ({ hackapibackend :new HackAPIBackend()     }),
        resolvers,
        context: (req) => {
          return {
            hackAPI: new HackAPIBackend(req.context.bindings.req.headers.authorization)
          }
        },
        introspection: true,
        playground: true, 
    });

exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
     allowedHeaders:['Content-Type', 'Authorization']
   },
  });
