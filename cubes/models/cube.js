const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class CubeModel {
    constructor() {
        this.db = require('../config/database.json');
    }

    _write(newData, resolveData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(newData, null, 2), (err) => {
                if (err) { reject(err); return; };
                this.db = newData;
                resolve(resolveData);
            })
        })
    }

    create(name, description, imageUrl, difficultyLevel) {
        return {
            name,
            description,
            imageUrl,
            difficultyLevel
        }
    }

    get(id) {
        return Promise.resolve(this.db.entities.find(({ id: i}) => i === id));
    }

    getAll() {
        return Promise.resolve(this.db.entities);
    }

    insert(newCube) {
        newCube = { id: uuid.v4(), ...newCube };

        const newData = {
            entities: this.db.entities.concat(newCube)
        };

        return this._write(newData, newCube);
    }

    update(cubeId, updObj) {
        const entityIndex = this.db.entities.findIndex(({ id }) => id === cubeId);
        const entity = this.db.entities[entityIndex];
        const updatedEntity = { ...entity, ...updObj };

        const newData = {
            entities: [
                ...this.db.entities.slice(0, entityIndex),
                updatedEntity,
                ...this.db.entities.slice(entityIndex + 1)
            ]
        };

        return this._write(newData, updatedEntity);
    }

    delete(id) {
        const deletedEntity = this.get(id)
        const newData = {
            entities: this.db.entities.filter(({ id: i}) => i !== id)
        };

        return this._write(newData, deletedEntity);
    }
}

module.exports = new CubeModel();