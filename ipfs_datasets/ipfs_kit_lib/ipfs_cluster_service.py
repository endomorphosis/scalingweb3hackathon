import sys
import os
import subprocess
import tempfile
import json

class ipfs_cluster_service:
    def __init__(self, resources, meta=None):
        if meta is not None:
            if "config" in meta:
                if meta['config'] is not None:
                    self.config = meta['config']
            if "role" in meta:
                if meta['role'] is not None:
                    self.role = meta['role']
                    if self.role not in  ["master","worker","leecher"]:
                        raise Exception("role is not either master, worker, leecher")
                    else:
                        self.role = "leecher"

            if self.role == "leecher" or self.role == "worker" or self.role == "master":
                pass
        
    def test_ipfs_cluster_service(self):
        detect = os.system("which ipfs-cluster-service")
        if len(detect) > 0:
            return True
        else:
            return False
        pass

    def ipfs_cluster_service_start(self):
        command = "systemctl start ipfs-cluster-service"
        results = subprocess.check_output(command, shell=True)
        results = results.decode()
        return results  
    
    def ipfs_cluster_service_stop(self):
        command = "systemctl stop ipfs-cluster-service"
        results = subprocess.check_output(command, shell=True)
        results = results.decode()
        return results
    
    def ipfs_cluster_service_status(self):
        command = "ipfs-cluster-service status"
        results = subprocess.check_output(command, shell=True)
        results = results.decode()
        return results

if __name__ == "__main__":
    this_ipfs_cluster_service = ipfs_cluster_service()
    results = this_ipfs_cluster_service.test_ipfs_cluster_service()
    print(results)
    pass
