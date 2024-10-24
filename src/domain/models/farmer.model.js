import { connectDataBase } from "../../config/database.js";

export default class FarmerModel {
    async createCollection() {
        const db = await connectDataBase();
        return db.createCollection('farmer', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['name', 'email', 'farmId'],
                    properties: {
                        name: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                        },
                        email: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                        },
                        farmId: {
                            bsonType: 'objectId',
                            description: 'must be an objectId and is required',
                        },
                    },
                },
            },
        });
    }
    
    async execute() {
        return connectDataBase().then((db) => db.collection('farmer'));
    }
}