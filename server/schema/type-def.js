const { gql } = require("apollo-server");

const typeDefs = gql`
type Client {
id: ID
name: String
email: String
phone: String
}
type Project {
id: ID
name: String
description: String
status: Status
client: Client
}
type Query {
clients: [Client]
client(id: ID!): Client
projects: [Project]
project(id: ID!): Project
}
input addClientInput {
name: String!
email: String!
phone: String!
}
input addProjectInput {
name: String!
description: String!
status: Status = new
clientId: String!
}
input updateProjectInput {
id: String!
name: String!
description: String!
status: Status = new
clientId: String!
}
type Mutation {
addClient(input: addClientInput!) : Client
deleteClient(id: ID!) : Client
addProject(input: addProjectInput): Project
deleteProject(id: ID!): Project
updateProject(input: updateProjectInput): Project
}
enum Status {
new
progress
completed
}
`;

module.exports = {typeDefs};