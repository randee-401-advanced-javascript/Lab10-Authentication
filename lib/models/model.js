'use strict';

class Model {
  constructor(schema){
    this.schema = schema
  }

  async create(data){
    let record = new this.schema(data);
    return await record.save();
  }

  async read() {
    let record = await this.schema.findOne({_id})
    return record
  }

  async update(_id, data) {
    let updateInfo = await this.schema.updateOne({_id}, data);
    // need to finsih this here 
    // if(updateInfo && updateInfo.)
  }

  async delete() {

  }
}

module.exports = Model;