import camelot
from Includes.processaTabela import ProcessaTabela

def fazProcessamento(pdf):
    """ Recebe um pdf e retorna as tabelas encontradas, num array de tabelas
    """
    candidateTables = camelot.read_pdf(pdf, flavor='stream', pages='all', flag_size=True)

    # Removendo "tabelas" desnecessarias
    newTables = []

    for tbl in candidateTables:
        # Se a tabela só possui 1 coluna, não é tabela
        if tbl.shape[1] == 1: continue        
        
        # Se a tabela não possui dados, ou possui apenas 1 linha, não é tabela
        if tbl.shape[0] <= 2: continue

    
        df = tbl.df
        for col in df.columns:
            df[col] = df[col].replace(r'^[^0-9]{1}$','',regex=True)

        if len(df) >= (df != '').to_numpy().sum(): continue

        newTables.append(tbl)

    candidateTables = newTables


    # Faz o processamento das tabelas
    newTables = []

    for tbl in candidateTables:
        processaTabela = ProcessaTabela(tbl)

        if not processaTabela.processamentoSucesso:
            continue
        
        novaTbl = processaTabela.tbl
        novaTbl.df = processaTabela.df
        newTables.append(novaTbl)

    return newTables
