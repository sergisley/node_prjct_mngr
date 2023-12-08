'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
         Task.belongsTo(models.Project, {
          foreignKey: 'project_id',
          as: 'project'
        })
    }
  }
  Task.init({
    projectId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    conclusion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};