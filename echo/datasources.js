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
      new Challenge(1, 'Trk1', 'Track 1: Diversity in Practice and Care', 'Attracting & fostering a diverse, empowered workforce that serves the needs of an evolving patient population'),
      new Challenge(2, 'Trk2', 'Track 2: Education, Upskilling, Professional Development', 'Addressing needs to improve competence and confidence in practice'),
      new Challenge(3, 'Trk3', 'Track 3: Driving Administrative Efficiency in Nurse-led Care Delivery', 'Streamline and optimize non-clinical tasks that allow nurses the opportunity for top of license practice'),
      new Challenge(4, 'Trk4', 'Track 4: Open Track', 'Open Track'),
    ];
    return teams;
  }
 
}
module.exports = HackAPIBackend;