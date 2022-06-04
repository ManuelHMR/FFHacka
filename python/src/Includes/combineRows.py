import re
import pandas as pd

def combineRows(df, shouldCombine):
    newRow = None
    newRows = []
    rowToCombine = None
    doCombine = False

    for i, row in df.iterrows():
        newRow = row.to_dict()

        if doCombine:
            # Check index of each row before combining
            idxRtc = rowToCombine[0]

            for key in newRow.keys():
                if idxRtc > i:
                    newRow[key] = f'{newRow[key]} {rowToCombine[1][key]}'
                else:
                    newRow[key] = f'{rowToCombine[1][key]} {newRow[key]}'


        if shouldCombine[i]:
            # Combina com a linha de cima
            rowToCombine = (i,newRow)
            doCombine = True
        else:
            doCombine = False
            newRows.append(newRow)

    newDf = pd.DataFrame(newRows)

    # return newDf

    if doCombine:  # Se chegou aqui, é a primeira row
        headers = [*newDf.columns.values]
        for i, key in enumerate(headers):
            pattern = re.compile(r'^\d{0,2}')
            keyTxt = key
            if pattern.match(key):
                keyTxt = ''
            headers[i] = f'{keyTxt} {rowToCombine[key]}'
        

        newDf = newDf.set_axis(headers, axis=1, inplace=False)

    return newDf
