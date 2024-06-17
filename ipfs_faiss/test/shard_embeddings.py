import datasets

class process_faiss_dataset():
    def __init__(self, collectio=None, meta=None):
        
    def load_faiss():
        pass
    def load_ipfs():
        pass
    def load_web3():
        pass
    def load_lighthouse():
        pass
    def load_pinata():
        pass
    def load_filebase():
        pass

    def select_faiss(self, index_name, index0, index1, index2):
        if index0 != None and index1 != None and index2 != None:
            return None, None, None
        elif index0 != None and index1 != None:
            return None, None
        elif index0 != None:
            return None
        
    def select_ipfs(self, index_name, index0, index1, index2):
        if index0 != None and index1 != None and index2 != None:
            return None, None, None
        elif index0 != None and index1 != None:
            return None, None
        elif index0 != None:
            return None
    
    def select_web3(self, index_name, index0, index1, index2):
        if index0 != None and index1 != None and index2 != None:
            return None, None, None
        elif index0 != None and index1 != None:
            return None, None
        elif index0 != None:
            return None

    def select_lighthouse(self, index_name, index0, index1, index2):
        if index0 != None and index1 != None and index2 != None:
            return None, None, None
        elif index0 != None and index1 != None:
            return None, None
        elif index0 != None:
            return None
        
    def select_pinata(self, index_name, index0, index1, index2):
        if index0 != None and index1 != None and index2 != None:
            return None, None, None
        elif index0 != None and index1 != None:
            return None, None
        elif index0 != None:
            return None
        
    def select_filebase(self, index_name, index0, index1, index2):
        if index0 != None and index1 != None and index2 != None:
            return None, None, None
        elif index0 != None and index1 != None:
            return None, None
        elif index0 != None:
            return None
    

    def load_faiss_index(self, index_name, index0, index1, index2, **kwargs):

        faiss_index = self.load_faiss(index_name)
        ipfs_index = self.load_ipfs(index_name)
        web3_index = self.load_web3(index_name)
        lighthouse_index = self.load_lighthouse(index_name)
        pinata_index = self.load_pinata(index_name)
        filebase_index = self.load_filebase(index_name)

        this_faiss = None
        this_ipfs = None
        this_web3 = None
        this_lighthouse = None
        this_pinata = None
        this_filebase = None

        if index0 != None and index1 != None and index2 != None:
            yield {
                "faiss": self.select_faiss(index_name, index0, index1, index2, kwargs),
                "ipfs": self.select_ipfs(index_name, index0, index1, index2, kwargs),
                "web3": self.select_web3(index_name, index0, index1, index2, kwargs),
                "lighthouse": self.select_lighthouse(index_name, index0, index1, index2, kwargs),
                "pinata": self.select_pinata(index_name, index0, index1, index2, kwargs),
                "filebase": self.select_filebase(index_name, index0, index1, index2, kwargs)
                }
        
        elif index0 != None and index1 != None:
            yield {
                "faiss": self.select_faiss(index_name, index0, index1, kwargs),
                "ipfs": self.select_ipfs(index_name, index0, index1, kwargs),
                "web3": self.select_web3(index_name, index0, index1, kwargs),
                "lighthouse": self.select_lighthouse(index_name, index0, index1, kwargs),
                "pinata": self.select_pinata(index_name, index0, index1, kwargs),
                "filebase": self.select_filebase(index_name, index0, index1, kwargs)
                }
        
        elif index0 != None:
            yield {
                "faiss": self.select_faiss(index_name, index0, kwargs),
                "ipfs": self.select_ipfs(index_name, index0, kwargs),
                "web3": self.select_web3(index_name, index0, kwargs),
                "lighthouse": self.select_lighthouse(index_name, index0, kwargs),
                "pinata": self.select_pinata(index_name, index0, kwargs),
                "filebase": self.select_filebase(index_name, index0, kwargs)
                }            
            return None
        else:
            raise ValueError("No input provided")



    def process_faiss_index(index0, index1, index2):
        # load null

        if index0 != None and index1 != None and index2 != None:
            return None, None, None
        elif index0 != None and index1 != None:
            return None, None
        elif index0!= None:
            return None
        
