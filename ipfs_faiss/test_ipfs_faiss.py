import datasets
from datasets import load_dataset
from datasets import FaissIndex
from ipfs_datasets import auto_download_dataset , ipfs_dataset
from ipfs_faiss import auto_download_faiss_index, ipfs_load_faiss_index
from ipfs_transformers import AutoModel

# Load a dataset
dataset = auto_download_dataset('squad')
#dataset = ipfs_dataset('ipfs_CID')
#dataset = auto_download_dataset('ipfs_CID'
#    s3cfg={
#        "bucket": "cloud",
#        "endpoint": "https://storage.googleapis.com",
#        "secret_key": "",
#        "access_key": "",
#    }
#)

# TODO
# NOTE
# example huggingface method do_this_thing()
#datasets.do_this_thing()
#auto_download_dataset.do_this_thing()
#ipfs_datset.do_this_thing()

# our methods
#dataset.from_orbitdb()
#auto_download_dataset.to_orbitdb()
#ipfs_dataset.to_orbitdb()

#dataset.from_orbitdb()
#dataset.to_orbitdb()
#ipfs_dataset.to_orbitdb()

# Load a Faiss index
knnindex = auto_download_faiss_index('squad')
#knnindex = ipfs_load_faiss_index('ipfs_CID')
#knnindex = auto_download_faiss_index('ipfs_CID'
#   s3cfg={
#       "bucket": "cloud",
#       "endpoint": "https://storage.googleapis
#       "secret_key": "",
#       "access_key": "",
#   }
#)

# Load an embedding model
model = AutoModel.from_auto_download("bge-small-en-v1.5")  # 1.5GB
#model = AutoModel.from_ipfs("QmccfbkWLYs9K3yucc6b3eSt8s8fKcyRRt24e3CDaeRhM1")  # 1.5GB
#model = AutoModel.from_pretrained("bert-base-en-v1.5",
#    s3cfg={
#        "bucket": "cloud",
#        "endpoint": "https://storage.googleapis.com",
#        "secret_key": "",
#        "access_key": "",
#    }
#)

import gzip as Gzip
import numpy as np


def gzip_classify(test_set, training_set, k=5):
    for ( x1 , _ ) in test_set :
        Cx1 = len( Gzip.compress ( x1.encode ()))
        distance_from_x1 = []
        for ( x2 , _ ) in training_set :
            Cx2 = len(Gzip.compress(x2.encode()))
            x1x2 = " ". join ([ x1 , x2 ])
        Cx1x2 = len(Gzip.compress(x1x2.encode()))
        ncd = ( Cx1x2 - min( Cx1 , Cx2 ) ) / max( Cx1 , Cx2 )
        distance_from_x1.append( ncd )
    sorted_idx = np.argsort(np .array(distance_from_x1 ))
    top_k_class = training_set [ sorted_idx [: k ] , 1]
    predict_class = max(set( top_k_class ), key = top_k_class.count())
    print( f"Predicted class: { predict_class }")


# Initialize a Faiss index
index = FaissIndex(dimension=768)

embeddings = dataset['embeddings']
# Suppose `embeddings` is a 2D numpy array containing your vectors
index.add(embeddings)

query = "What is the capital of France?"
# Suppose `query` is a string
# generate the embeddings for the query
query_vector = model.encode(query)
# You can then query the index
scores, neighbors = index.search(query_vectors, k=10)
