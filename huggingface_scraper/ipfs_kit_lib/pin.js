import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import process from 'process';
import { execSync } from 'child_process';

export class PinService {
    constructor() {
        this.env = process.env;
        this.lighthouse_pins = []
        this.pinata_pins = []
        this.web3storage_pins = []
        this.filebase_pins = []
        this.pin_lighthouse = pin_lighthouse()
        this.pin_pinata = pin_pinata()
        this.pin_web3storage = pin_web3storage()
        this.pin_filebase = pin_filebase()
        this.unpin_lighthouse = unpin_lighthouse()
        this.unpin_pinata = unpin_pinata()
        this.unpin_web3storage = unpin_web3storage()
        this.unpin_filebase = unpin_filebase()
    }

    init_web3storage(JWT) {
        let cmd =  "ipfs pin remote service add web3.storage https://api.web3.storage/ " + JWT
        let results = execSync(cmd)
        return results
    }

    init_pinata(JWT) {
        let cmd = "ipfs pin remote service add pinata https://api.pinata.cloud/ " + JWT
        let results = execSync(cmd)
        return results
    }

    init_lighthouse(JWT) {
        let cmd = "ipfs pin remote service add lighthouse https://api.lighthouse.storage/ " + JWT
        let results = execSync(cmd)
        return results
    }

    init_filebase(JWT) {
        let cmd = "ipfs pin remote service add filebase https://api.filebase.com/ " + JWT
        let results = execSync(cmd)
        return results
    }


    main(pinset, config) {
        let lighthouse_size = 0
        let pinata_size = 0
        let web3storage_size = 0
        let filebase_size = 0
        if (Object.keys(config).includes(lighthouse)){
            if (Object.keys(config.lighthouse).includes(size)){
                lighthouse_size = config.lighthouse.size
            }
        }
        if (Object.keys(config).includes(pinata)){
            if (Object.keys(config.pinata).includes(size)){
                pinata_size = config.pinata.size
            }
        }
        if (Object.keys(config).includes(web3storage)){
            if (Object.keys(config.web3storage).includes(size)){
                web3storage_size = config.web3storage.size
            }
        }
        if (Object.keys(config).includes(filebase)){
            if (Object.keys(config.filebase).includes(size)){
                filebase_size = config.filebase.size
            }
        }
        let pin = pinset
        for (var key in pin) {
            this[key] = pin[key]
        }
        return this
    }
}


export async function pin_add_lighthouse(cid, fileName, JWT) {
    const formData = new FormData();
    const src = filePath;
    const request = {
        cid: cid,
        fileName: fileName
    }
    formData.append('file', file)
    formData.append('request', JSON.stringify(request));
    try {
        const res = await axios.post("https://api.lighthouse.storage/api/lighthouse/pin", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }

}


export async function pin_add_filebase (filePath, JWT){
    let pin_cmd = "ipfs remote pin add " + pin.cid + " --name " + fileName
    let results = execSync(pin_cmd)
    return results
}


export function pin_add_web3storage(pin, fileName, config) {
    let pin_cmd = "ipfs remote pin add " + pin.cid + " --name " + fileName
    let results = execSync(pin_cmd)
    return results
}

export async function pin_add_pinata (filePath, JWT){
    const formData = new FormData();
    const src = filePath;
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}


export async function pin_rm_pinata (cid, JWT){
    
}

export async function pin_rm_web3storage (cid, JWT){
    
}

export async function pin_rm_filebase (cid, JWT){
    
}

export async function pin_rm_lighthouse (cid, JWT){
    
}

export async function pin_ls_lighthouse (JWT){
    
}

export async function pin_ls_filebase (JWT){
    
}

export async function pin_ls_web3storage (JWT){
    
}

export async function pin_ls_pinata (JWT){
    
}

