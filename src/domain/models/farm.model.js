import { connectDataBase } from "../../config/database.js";

export default class FarmModel {
    async createCollection(db) {
        return db.createCollection('farm', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['name', 'distance'],
                    properties: {
                        name: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                        },
                        distance: {
                            bsonType: 'number',
                            description: 'must be a number and is required',
                        },
                    },
                },
            },
        });
    }
    async execute() {
        const db = await connectDataBase();
        return db.collection('farm');
    }
}