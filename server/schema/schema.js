const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');
const Project = require('../models/Project');
const Client = require('../models/Client');

const clientType = new GraphQLObjectType({
    name: 'Client',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
})

const projectType = new GraphQLObjectType({
    name: 'Project',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: clientType,
            resolve(parents, args){
                return Client.findById(parents.clientId)
            }
        }
    })
})

const rootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields : {
        clients: {
            type: new GraphQLList(clientType),
            resolve(parents, args) {
                return Client.find();
            }

        },
        client : {
            type: clientType,
            args: {id:{type: GraphQLID}},
            resolve(parents, args) {
                return Client.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(projectType),
            resolve(parents, args) {
                return Project.find();
            }

        },
        project : {
            type: projectType,
            args: {id:{type: GraphQLID}},
            resolve(parents, args) {
                return Project.findById(args.id)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: clientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}, 
            },
            resolve(parents, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save();
            }
        },
        deleteClient: {
            type: clientType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parents, args) {
                return Client.findByIdAndDelete(args.id)
            }
        },
        addProject: {
            type: projectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status: {type : new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        'new' : {value: 'Not Started'},
                        'progress': {value: 'In Progress'},
                         'completed': {value: 'Completed'}
                    }
                }),
                defaultValue: 'Not Started'
            },
            clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parents, args) {
                const project = new Project({
                    name: args.name,
                    description:args.description,
                    status: args.status,
                    clientId: args.clientId
                });
                return project.save();
            }
        },
        deleteProject:{
            type: projectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parents, args) {
                return Project.findByIdAndDelete(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQueryType,
    mutation
})