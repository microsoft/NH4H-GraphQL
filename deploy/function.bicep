param Name string = 'NH4H-Graphql-${uniqueString(resourceGroup().id)}'
param Location string = resourceGroup().location
param APIURL string = 'https://n'

var storageAccountName = '${uniqueString(resourceGroup().id)}storage'


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
  properties:{
    serverFarmId: funcappserviceplan.id
    siteConfig:{
      linuxFxVersion: 'NODE|14'
      appSettings:[
        {
          name: 'HackAPI'
          value: APIURL
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value}'
          
          
        }
      ]
    }
  }
}

output functionAppName string = Name
