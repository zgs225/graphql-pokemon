import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString
} from "graphql";
import {
	fromGlobalId
} from "graphql-relay";
import {
	updatePokemonByID
} from "../service/Pokemon";
import PokemonType from "./PokemonType";

const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Create or update pokemon',
	fields: () => ({
		updatePokemon: {
			type: PokemonType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString)
				},
				name: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: async (obj, {
				id,
				name
			}) => {
				return await updatePokemonByID(fromGlobalId(id).id, name)
			}
		},
	})
});

export default MutationType;
