import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server-express'
import { merge } from 'lodash'

// The GraphQL schema
const typeDefs = gql`
	type Query {
		"A simple type for getting started!"
		hello: String
	}
	type Mutation {
		_empty: String
	}
`

// A map of functions which return data for the schema.
const resolvers = {
	Query: {
		hello: () => 'world',
	},
}

// Read the current directory and load types and resolvers automatically
fs.readdirSync(__dirname)
	.filter(dir => dir.indexOf('.') < 0)
	.forEach(dir => {
		const tmp = require(path.join(__dirname, dir)).default // eslint-disable-line
		resolvers = merge(resolvers, tmp.resolvers)
		typeDefs.push(tmp.types)
	})

const schema = new ApolloServer({
	typeDefs,
	resolvers,
	playground: {
		endpoint: '/graphql',
		settings: {
			'editor.theme': 'light',
		},
	},
})

export default schema
