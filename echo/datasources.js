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
 
}
module.exports = HackAPIBackend;