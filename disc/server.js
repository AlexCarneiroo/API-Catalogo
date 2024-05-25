"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = __importDefault(require("./Routes/api"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cors_1.default)());
server.use(body_parser_1.default.json());
server.get("/", (req, res) => {
    res.json({ message: "Servidor rodando!!!!" });
    console.log("Testando....");
});
server.use(api_1.default);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});
server.listen(1000);
