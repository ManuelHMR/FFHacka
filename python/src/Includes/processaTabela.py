import importlib
import re

from . import combineRows
importlib.reload(combineRows)

from .combineRows import combineRows

class ProcessaTabela:
    patternEmptyHeader = re.compile(r'^\d{1,2}')
    patternSupr = re.compile(r'<s>.*?<\/s>')

    def __init__(self, df):
        self.df = df
        self.temCabecalhoLateral = False

        # self.df = self.cabecalhosVazios(df)
        self.df = self.eliminaSupr(self.df)
        self.df = self.eliminaColunaVazia(self.df)
        self.df = self.eliminaRowInferior(self.df)
        self.df = self.cabecalhosVaziosCombina(self.df)
        # self.df = self.etapa2(self.df)

    @property
    def colunasDeDados(self):
        if self.temCabecalhoLateral:
            return [*self.df.columns][1:]
        else:
            return [*self.df.columns]

    def eliminaSupr(self, df):
        # Elimina elementos pequenos, que normalmente linkam com alguma informação da legenda
        pattern = ProcessaTabela.patternSupr
        for col in df.columns:
            df[col] = df[col].str.replace(pattern, '', regex=True)
        return df

    def eliminaColunaVazia(self, df):
        # Se uma coluna contem apenas 1 elemento, remover a coluna pois não há informação a ser extraida
        colsToDrop = []
        for col in df.columns:
            if (df[col] != '').value_counts()[True] <= 1:
                colsToDrop.append(col)

        if len(colsToDrop) > 0:
            df = df.drop(colsToDrop, axis=1)
        return df

    def cabecalhosVazios(self, df):
        # CHECA SE NENHUM CABEÇALHO ESTÁ PREENCHIDO
        # Se não houverem cabeçalhos preenchidos, a primeira linha deveria ser o cabeçalho
        pattern = ProcessaTabela.patternEmptyHeader

        unnamedCols = df.columns.astype(str).str.match(pattern)

        if unnamedCols.all():
            df = df.set_axis(df.iloc[0], axis=1)
            df = df.drop(0)
           
        return df
    

    def cabecalhosVaziosCombina(self, df):
        # Se algum cabeçalho estiver vazio (exceto o primeiro)
        # Vai combinando as linhas abaixo até preencher todos os cabeçalhos
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

        return df

    def etapa2(self, df):
        # Tenta detectar se o df tambem tem um cabeçalho lateral
        # Se apenas a primeira coluna for Unnamed, supõe-se que pode ser
        pattern = ProcessaTabela.patternEmptyHeader

        cols = df.columns.astype(str)
        unnamedCols = cols.str.match(pattern) | [c == '' for c in cols]

        if unnamedCols[0] == True and not unnamedCols[1:].any():
            self.temCabecalhoLateral = True
            # col0 = df[df.columns[0]]
            # shouldCombine = col0.str.replace(r'\(.{1,3}\)','',regex=True) == ''
            # df = combineRows(df, shouldCombine)

        return df

    def eliminaRowInferior(self,df):
        # Se a ultima row for vazia exceto pela primeira coluna, deve ser problema

        while True:
            lastRow = df.iloc[-1]
            emptyCells = [lastRow[col] == '' for col in df.columns]
            if not emptyCells[0] and all(emptyCells[1:]):
                # Se entrou aqui, apenas a primeira coluna está preenchida. Pode deletar
                df = df.drop(lastRow.name)
            else:
                break
        return df


    def etapa3(self,df):
        # Em cada coluna de dados, tenta checar se existem apenas dados numéricos
        

        for col in self.colunasDeDados:
            continue
        pass


    def etapa4(self,df):
        # Remove linhas desnecessarias com muitas NaNs
        df = df.replace('',np.nan)
        shouldCombine = df.isnull().sum(axis=1) >= 0.5*len(df.columns)
        df = df.fillna('')

        df = combineRows(df, shouldCombine)
        return df