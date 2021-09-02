const { RESTDataSource } = require('apollo-datasource-rest');

class HackAPIBackend extends RESTDataSource {
  
  constructor(authHeader) {
    super();
    this.baseURL=process.env.HackAPI;
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
    let res=await this.post('/users/msemail',body);
    
    return res;
  }

  async findByRegemail({regemail}){
    let body={
      userRegEmail: regemail
    };
    let res= await this.post('/users/regemail',body);
   console.log(res);
   
    return res;
  }

  async getTeams(){
    let teams=await this.get('/solutions/');
    return teams;
  }

  async getTeamUsers({teamId}){
    let res=await this.get('solutions/hackers/'+teamId);
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
      new Challenge(1, 'Track 0', 'Track 0 - Mental Health','Nurses need to recover from COVID'),
      new Challenge(2, 'Track 1', 'Track 1 - Education', 'Vaccine Education & Delivery'),
      new Challenge(3, 'Track 2', 'Track 2 - Medical Deserts', 'Medical Deserts'),
      new Challenge(4, 'Track 3', 'Track 3 - Equity', 'Health Equity & Racial Disparities'),
      new Challenge(5, 'Track 4', 'Track 4 - Care', 'New Models and Settings for Care'),
      new Challenge(6, 'Track 5', 'Track 5 - Open', 'Open Topic')
    ];
    return teams;
  }
 
}
module.exports = HackAPIBackend;