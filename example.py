from transformers import AutoModel
from ipfs_transformers import AutoModel

model = AutoModel.from_auto_download("bge-small-en-v1.5")  
print(dir(model))
model = AutoModel.from_ipfs("QmYRMaBBuWC8pPBvhi7U987P6YFexvjmiwhMHqEy7HvuWJ")
print(dir(model))


## OPTIONAL S3 Caching ##

#model = T5Model.from_auto_download(
#    model_name="google-bert/t5_11b_trueteacher_and_anli",
#    s3cfg={
#        "bucket": "cloud",
#        "endpoint": "https://storage.googleapis.com",
#        "secret_key": "",
#        "access_key": "",
#    }
#)
#print(dir(model))
