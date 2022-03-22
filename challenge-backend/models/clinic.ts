'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Clinic.init({
    name: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    address_type: DataTypes.STRING,
    number: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    complement: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};