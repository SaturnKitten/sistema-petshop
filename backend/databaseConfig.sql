-- Cria o banco de dados
CREATE DATABASE petshop;

--Tabela conta a receber
CREATE TABLE IF NOT EXISTS ContaReceber (
    ID SERIAL PRIMARY KEY,
    Descricao VARCHAR(255) NOT NULL,
    DataLancamento DATE NOT NULL DEFAULT CURRENT_DATE,
    Valor NUMERIC(10,2) NOT NULL CHECK (Valor >= 0),
    Status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    Removido BOOLEAN NOT NULL DEFAULT FALSE
);

--Tabela recebimento
CREATE TABLE IF NOT EXISTS Recebimento (
    ID SERIAL PRIMARY KEY,
    Descricao VARCHAR(255) NOT NULL,
    ID_ContaReceber INT NOT NULL REFERENCES ContaReceber(ID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    DataRecebimento DATE NOT NULL DEFAULT CURRENT_DATE,
    ValorRecebido NUMERIC(10,2) NOT NULL CHECK (ValorRecebido >= 0),
    MetodoPagamento VARCHAR(50),
    Removido BOOLEAN NOT NULL DEFAULT FALSE
);

--Tabela funcionário
CREATE TABLE IF NOT EXISTS Funcionario (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Cargo VARCHAR(100),
    DataContratacao DATE NOT NULL,
    Salario NUMERIC(10,2) NOT NULL,
    Removido BOOLEAN DEFAULT FALSE
);