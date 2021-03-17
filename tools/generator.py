#%%
import pandas as pd
import json
import os

#%%
d = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vTh1_w7u9zTrFtW8UQDMCmaJrwLezZQWnj5f4yeSRhm1oA_O_eTRydTUzQYhrD4ntzpA5VIQ1l5uqlK/pub?gid=0&single=true&output=csv')

#%%
d.fillna('', inplace=True)
# d.drop(['Unnamed: 6', 'editace', 'korektura'], axis=1, inplace=True)


#%%
d['foto'] = d.foto.apply(lambda x: x if (x != '') else 'face.jpg')

#%%
with open('../data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(list(d.to_dict(orient='index').values()),  ensure_ascii=False))
# %%
