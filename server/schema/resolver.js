const Project = require('../models/Project');
const Client = require('../models/Client');

const resolvers = {
    Query: {
        clients: () => {
            return Client.find();
        },
        client: (_, args) => {
            return Client.findById(args.id)
        },
        projects: () => {
            return Project.find();
        },
        project: (parent, args) => {
            const project = Project.findById(args.id);
            project.client = Client.findById(parent.clientId);
            return project;
        }
    },
    Mutation: {
        addClient: (_, args) => {
            const client = new Client({
                name: args.input.name,
                email: args.input.email,
                phone: args.input.phone
            })
            return client.save();
        },
        deleteClient: (_, args) => {
            return Client.findByIdAndUpdate(args.id)
        },
        addProject: (_, args) => {
            const project = new Project({
                name: args.input.name,
                description: args.input.description,
                status: args.input.status,
                clientId: args.input.clientId
            });
            return project.save();
        },
        deleteProject: (_, args) => {
            return Project.findOneAndUpdate(args.id)
        },
        updateProject: (_, args) => {
             return Project.findByIdAndUpdate(
                     { _id: args.input.id }, {
                    name: args.input.name,
                    description: args.input.description,
                    status: args.input.status
            }
            )
        }
    }
}

module.exports = { resolvers }