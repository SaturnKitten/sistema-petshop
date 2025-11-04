-- Cria o banco de dados
CREATE DATABASE PetShopDB;

--Tabela contareceber
CREATE TABLE IF NOT EXISTS ContaReceber (
    ID SERIAL PRIMARY KEY,
    Descricao VARCHAR(255) NOT NULL,
    DataLancamento DATE NOT NULL DEFAULT CURRENT_DATE,
    Valor NUMERIC(10,2) NOT NULL CHECK (Valor >= 0),
    Status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    Removido BOOLEAN NOT NULL DEFAULT FALSE
);

--Insert contareceber
INSERT INTO ContaReceber (Descricao, DataLancamento, Valor, Status, Removido) VALUES
    ('Consulta veterinária - João Silva', '2024-06-01', 150.00, 'PENDENTE', FALSE),
    ('Vacinação - Maria Oliveira', '2024-06-03', 200.00, 'PENDENTE', FALSE),
    ('Banho e Tosa - Pedro Santos', '2024-06-05', 80.00, 'PENDENTE', FALSE);


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

--Insert recebimento
INSERT INTO Recebimento (Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento, Removido) VALUES
    ('Pagamento consulta veterinária - João Silva', 1, '2024-06-02', 150.00, 'CARTÃO DE CRÉDITO', FALSE),
    ('Pagamento vacinação - Maria Oliveira', 2, '2024-06-04', 200.00, 'DINHEIRO', FALSE);

--Tabela funcionário
CREATE TABLE IF NOT EXISTS Funcionario (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Username VARCHAR(100) NOT NULL UNIQUE,
    Senha TEXT NOT NULL,
    Cargo VARCHAR(100),
    DataContratacao DATE NOT NULL,
    Salario NUMERIC(10,2) NOT NULL,
    Removido BOOLEAN DEFAULT FALSE
);

--Insert funcionário
INSERT INTO Funcionario (Nome, Username, Senha, Cargo, DataContratacao, Salario, Removido) VALUES
    ('Administrador', 'adm', 'adm', 'Administrador', '2022-01-01', 6000.00, FALSE),
    ('Ana Paula', 'anapaula', 'senha123', 'Atendente', '2023-01-15', 2500.00, FALSE),
    ('Carlos Eduardo', 'carloseduardo', 'senha456', 'Veterinário', '2022-11-20', 5000.00, FALSE);