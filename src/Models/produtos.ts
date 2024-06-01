import { Model , DataTypes } from "sequelize";
import { sequelize } from "../Instaces/mysql";

export interface ProdutosInterface extends Model{
    id:number,
    nome:string,
    valor:number,
    categoria:string,
    subCategoria:string,
    maisVendidos:boolean,
    imagens:string,
    detalhe:string
}

export const Produtos = sequelize.define<ProdutosInterface>('produtos',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    nome:{
        type: DataTypes.STRING
    },
    valor:{
        type:DataTypes.NUMBER
    },
    categoria:{
        type:DataTypes.STRING
    },
    subCategoria:{
        type:DataTypes.STRING
    },
    maisVendidos:{
        type:DataTypes.BOOLEAN
    },
    detalhe:{
        type:DataTypes.STRING
    },
    imagens:{
        type:DataTypes.STRING
    }
},{
    tableName:'produtos',
    timestamps:false
})