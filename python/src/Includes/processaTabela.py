import importlib
import re

from . import combineRows
importlib.reload(combineRows)

from .combineRows import combineRows

class ProcessaTabela:
    patternEmptyHeader = re.compile(r'^\d{1,2}$')
    patternSupr = re.compile(r'<s>.*?<\/s>')

    def __init__(self, tbl):
        self.tbl = tbl
        self.df = tbl.df
        self.temCabecalhoLateral = False

        self.processamentoSucesso = False

        # self.df = self.cabecalhosVazios(df)
        self.curPipeline = 0

        self.pipeline = [
            self.eliminaSupr,
            self.eliminaColunaVazia,
            self.cabecalhosVaziosCombina,
            self.localizaCabecalhoLateral,
            self.renomeiaCabecalhosIguais,
            self.eliminaRowInferior,
            self.eliminaTabelaIncorreta,
        ]

        self.processamentoSucesso = self.run()

        # self.df = self.eliminaSupr(self.df)
        # self.df = self.eliminaColunaVazia(self.df)
        # self.df = self.cabecalhosVaziosCombina(self.df)
        # self.df = self.localizaCabecalhoLateral(self.df)
        # self.df = self.renomeiaCabecalhosIguais(self.df)
        # self.df = self.eliminaRowInferior(self.df)

    @property
    def colunasDeDados(self):
        if self.temCabecalhoLateral:
            return [*self.df.columns][1:]
        else:
            return [*self.df.columns]

    @property
    def nextProcessing(self):
        if self.curPipeline == len(self.pipeline):
            fn = lambda df: ('finish', df)
        else:
            fn = self.pipeline[self.curPipeline]
        self.curPipeline += 1
        return fn
        

    def run(self) -> None:
        continua = True
        self.curPipeline = 0

        while continua:
            continua, self.df = self.nextProcessing(self.df)

            if continua == 'finish':
                return True
        
        return False


    def eliminaSupr(self, df):
        # Elimina elementos pequenos, que normalmente linkam com alguma informação da legenda
        continua = True

        pattern = ProcessaTabela.patternSupr
        for col in df.columns:
            df[col] = df[col].str.replace(pattern, '', regex=True)

        return continua, df

    def eliminaColunaVazia(self, df):
        # Se uma coluna contem apenas 1 elemento, remover a coluna pois não há informação a ser extraida
        continua = True

        colsToDrop = []
        for col in df.columns:
            if (df[col].values != '').sum() <= 1:
                colsToDrop.append(col)

        if len(colsToDrop) > 0:
            df = df.drop(colsToDrop, axis=1)


        # Checa se só sobrou uma coluna
        if len(df.columns) <= 1:
            continua = False
            
        return continua, df

    def cabecalhosVazios(self, df):
        # CHECA SE NENHUM CABEÇALHO ESTÁ PREENCHIDO
        # Se não houverem cabeçalhos preenchidos, a primeira linha deveria ser o cabeçalho
        continua = True

        pattern = ProcessaTabela.patternEmptyHeader

        unnamedCols = df.columns.astype(str).str.match(pattern)

        if unnamedCols.all():
            df = df.set_axis(df.iloc[0], axis=1)
            df = df.drop(0)
           
        return continua, df
    

    def cabecalhosVaziosCombina(self, df):
        # Se algum cabeçalho estiver vazio (exceto o primeiro)
        # Vai combinando as linhas abaixo até preencher todos os cabeçalhos
        continua = True

        pattern = ProcessaTabela.patternEmptyHeader

        unnamedCols = df.columns.astype(str).str.match(pattern) |  [c == '' for c in df.columns.astype(str)]

        while(unnamedCols[1:].any()):
            newCols = [*df.columns]
            firstRow = df.iloc[0]

            for i, _ in enumerate(newCols):
                if unnamedCols[i] == True:
                    newCols[i] = firstRow.iloc[i]
                else:
                    newCols[i] = f'{newCols[i]} {firstRow[i]}'

            df = df.set_axis(newCols, axis=1)
            df = df.drop(0).reset_index(drop=True)
            unnamedCols = df.columns.astype(str).str.match(pattern) |  [c == '' for c in df.columns.astype(str)]
            
        return continua, df

    def renomeiaCabecalhosIguais(self,df):
        continua = True
        
        cols = [*df.columns]
        newCols = [*cols]
        for i in range(len(cols)):
            nEqual = 1
            for j in range(i):
                if cols[j] == cols[i]:
                    nEqual += 1
            
            if nEqual > 1:
                newCols[i] = f'{cols[i]} {nEqual}'
        
        return continua, df.set_axis(newCols,axis=1)

    def localizaCabecalhoLateral(self, df):
        # Tenta detectar se o df tambem tem um cabeçalho lateral
        # Se apenas a primeira coluna for Unnamed, supõe-se que pode ser
        continua = True
        pattern = ProcessaTabela.patternEmptyHeader

        cols = df.columns.astype(str)
        unnamedCols = cols.str.match(pattern) | [c == '' for c in cols]

        if unnamedCols[0] == True and not unnamedCols[1:].any():
            self.temCabecalhoLateral = True
            # col0 = df[df.columns[0]]
            # shouldCombine = col0.str.replace(r'\(.{1,3}\)','',regex=True) == ''
            # df = combineRows(df, shouldCombine)

        return continua, df

    def eliminaRowInferior(self,df):
        # Se a ultima row for vazia exceto pela primeira coluna, deve ser problema
        continua = True

        while True:
            try:
                lastRow = df.iloc[-1]
            except IndexError:
                # DataFrame está vazio
                break

            emptyCells = [lastRow[col] == '' for col in self.colunasDeDados]
            if all(emptyCells):
                # Se entrou aqui, apenas a primeira coluna está preenchida. Pode deletar
                df = df.drop(lastRow.name)
            elif sum(emptyCells) >= len(emptyCells) * 0.3:
                # Se apenas 30% das colunas estão preenchidas, deleta tambem
                df = df.drop(lastRow.name)
            else:
                break

        return continua, df


    def eliminaTabelaIncorreta(self,df):
        # Se a tabela só possui 1 coluna, não é tabela
        if df.shape[1] == 1: return False, df        
        
        # Se a tabela não possui dados, ou possui apenas 1 linha, não é tabela
        if df.shape[0] <= 2: return False, df  

        # Troca valores de linhas inuteis para ''
        for col in df.columns:
            df[col] = df[col].replace(r'^[^0-9]{1}$','',regex=True)
        

        numDadosPreenchidos = (df != '').to_numpy().sum()

        if len(df) * 1.2 >= numDadosPreenchidos:
            return False, df

        if len(df.columns) * 1.2 >= numDadosPreenchidos:
            return False, df

        if len(df) * len(df.columns) * 0.3 >= numDadosPreenchidos:
            return False, df

        return True, df
