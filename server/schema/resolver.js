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
         projects: async () => {
            const projects = await Project.find();
             const mappedProjects=  projects.map(async project => {
                project.client =await Client.findById(project?.clientId);
               return project;
            })
             return mappedProjects;
        },
        project: async (__,args) => {
             const project = await Project.findById(args.id);
            project.client =await Client.findById(project?.clientId);
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
        deleteClient: async (_, args) => {
            const projects = await Project.find({clientId: args.id});
             projects.forEach(project => project.remove());
            return Client.findByIdAndDelete(args.id)
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
            return Project.findByIdAndDelete(args.id)
        },
        updateProject: (_, args) => {
             return Project.findByIdAndUpdate(
                     { _id: args.input.id }, {
                    name: args.input.name,
                    description: args.input.description,
                    status: args.input.status,
                    clientId: args.input.clientId
            }
            )
        }
    }
}

module.exports = { resolvers }