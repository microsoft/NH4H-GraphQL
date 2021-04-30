const { RESTDataSource } = require('apollo-datasource-rest');

const { v4: uuidv4  } =require('uuid');



class HackAPIBackend extends RESTDataSource {
  constructor() {
    super();
    this.baseURL='https://hackapi-v2.azurewebsites.net/api';  
    this.secret=process.env.ClientTeamEmbed;
   }
   
   willSendRequest(request) {
    request.headers.set('ClientTeamEmbed', this.secret);
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
    let res=await this.get('/solutions/');
    console.log(res);
    return res;
  }
  
 
  
 
}
module.exports = HackAPIBackend;