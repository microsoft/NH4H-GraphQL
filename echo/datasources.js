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
    let Challenge = function(id, name, desc) {
      this.id = id;
      this.name = name;
      this.description = desc;
  };
    let teams= [
      new Challenge(1,'Track 0 - Mental Health','Nurses need to recover from COVID'),
      new Challenge(2,"Track 1 - Education","Track 3 - Health Equity & Racial Disparities"),
      new Challenge(3,"Track 2 - MedicalDeserts","Medical Deserts Areas without healthcare services"),
      new Challenge(4,"Track 2 - MedicalDeserts","Medical Deserts Areas without healthcare services"),
      new Challenge(5,"Track 3 - Equity","Equity in Healthcare is a problem"),
      new Challenge(6,"Track 5 - Open","Solve any problem you have")
    ];
    return teams;
  }
 
}
module.exports = HackAPIBackend;