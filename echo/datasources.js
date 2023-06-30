const { RESTDataSource } = require('apollo-datasource-rest');

class HackAPIBackend extends RESTDataSource {
  
  constructor(authHeader) {
    super();
    this.baseURL='https://hackapi-tax6y5voqibmw.azurewebsites.net';
    this.secret=authHeader;
    this.initialize({});
   }
   
   willSendRequest(request) {
    request.headers.set('Authorization', this.secret);
    request.headers.set( 'Content-Type','application/json');
   }

   async findByTeams({teamsemail}){
    let body={
      UserMSTeamsEmail:teamsemail
    };
    let res=await this.post('/api/users/msemail',body);
    
    return res;
  }

  async findByRegemail({regemail}){
    let body={
      userRegEmail: regemail
    };
    let res= await this.post('/api/users/regemail',body);
   console.log(res);
   
    return res;
  }

  async getTeams(){
    let teams=await this.get('/api/solutions');
    return teams;
  }

  async getTeamUsers({teamId}){
    let res=await this.get('/api/solutions/hackers/'+teamId);
    return res;
  }

  getChallenges(){
    //TODO Get from hackapi
    let Challenge = function(id, track, name, desc) {
      this.id = id;
      this.track = track;
      this.name = name;
      this.description = desc;
  };
    let teams= [
      new Challenge(1, 'FA1', 'Focus Area 1: Attracting, onboarding and developing nurses to thrive', 'Attracting, onboarding and developing nurses to thrive'),
      new Challenge(2, 'FA2', 'Focus Area 2: Addressing bullying and violence', 'Addressing bullying and violence'),
      new Challenge(3, 'FA3', 'Focus Area 3: Creating innovative care delivery models', 'Creating innovative care delivery models'),
      new Challenge(4, 'FA4', 'Focus Area 4: Open Track', 'Come with your own challenge'),
    ];
    return teams;
  }
 
}
module.exports = HackAPIBackend;