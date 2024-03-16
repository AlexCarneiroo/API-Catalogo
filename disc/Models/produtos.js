"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produtos = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../Instaces/mysql");
exports.Produtos = mysql_1.sequelizee.define('produtos', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.NUMBER
    },
    nome: {
        type: sequelize_1.DataTypes.STRING
    },
    valor: {
        type: sequelize_1.DataTypes.NUMBER
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING
    },
    subCategoria: {
        type: sequelize_1.DataTypes.STRING
    },
    maisVendidos: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    detalhe: {
        type: sequelize_1.DataTypes.STRING
    },
    imagens: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'produtos',
    timestamps: false
});
