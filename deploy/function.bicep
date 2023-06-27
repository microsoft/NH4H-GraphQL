param Name string = 'NH4H-Graphql-${uniqueString(resourceGroup().id)}'
param Location string = resourceGroup().location
param APIURL string = 'https://hackapi-tax6y5voqibmw.azurewebsites.net'

var storageAccountName = '${uniqueString(resourceGroup().id)}storage'
var teamAppUrlCors = 'https://hackathonteambuifee948ef.z13.web.${environment().suffixes.storage}'

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  name: storageAccountName
  location: Location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  
}

resource funcappserviceplan 'Microsoft.Web/serverfarms@2021-01-15' = {
  name: '${Name}-sp'
  location: Location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  properties: {
    reserved: true
  }
}

resource functionapp 'Microsoft.Web/sites@2021-01-15' = {
  name: Name
  location: Location
  kind: 'functionapp,linux'
  properties: {
    reserved: true
    serverFarmId: funcappserviceplan.id
    
    siteConfig:{
      cors: {
        allowedOrigins: [
          teamAppUrlCors
        ]
      }
      linuxFxVersion: 'Node|16'
      appSettings:[
        {
          name: 'HackAPI'
          value: APIURL
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value}'
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~3'
        }
      ]
    }
  }
}

output functionAppName string = functionapp.name
