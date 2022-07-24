use Vacina_Recife;

CREATE TABLE Usuario (
cpf CHAR(11),
nome VARCHAR(225) NOT NULL,
senha VARCHAR(30) NOT NULL,
CONSTRAINT usario_pkey PRIMARY KEY (cpf)
);

CREATE TABLE Usuario_Adm (
cpf CHAR(11),
nome VARCHAR(225) NOT NULL,
senha VARCHAR(30) NOT NULL,
credencial VARCHAR(30) NOT NULL,
CONSTRAINT usario_pkey PRIMARY KEY (cpf)
);

CREATE TABLE Agendamento_Vacina (
cpf CHAR(11),
localidade VARCHAR(225) NOT NULL,
data_hora DATETIME NOT NULL,
dose varchar(30) NOT NULL,
CONSTRAINT usario_pkey PRIMARY KEY (cpf)
);

INSERT INTO Usuario VALUES
('77777777777', 'Carlos Frederico', '12345'),
('11111111111', 'Kevin Duran', '54321');

INSERT INTO Usuario_Adm VALUES
('22222222222', 'Almir Rouche', '12345', 'almir@adm'),
('33333333333', 'Márcio Bonfim', '54321', 'mb@adm');

-- SELECT * FROM Usuario_Adm;



