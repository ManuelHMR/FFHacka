def convertDfToJson(df):
    """ Converte um dataframe numa lista com as seguintes caracteristicas
        [
            {
                coluna1: dado,
                coluna2: dado2,
                coluna3: dado3
            },
            {
                coluna1: dado,
                coluna2: dado2,
                coluna3: dado3
            }
        ]
    
    """
    wrongJson = df.to_dict()
    # O json está no formato {"coluna1": {"idLinha1": valor1, "idLinha2": valor2}, {"coluna2": {...}}}

    aux = {}
    for k, v in wrongJson.items():
        aux[k] = []
        for i in v:
            aux[k].append(v[i])

    listaFinal = []
    for i in range(len(aux[[*aux.keys()][0]])):
        item = {}
        for k in aux.keys():
            item[k] = aux[k][i]
        
        listaFinal.append(item)

    return listaFinal
