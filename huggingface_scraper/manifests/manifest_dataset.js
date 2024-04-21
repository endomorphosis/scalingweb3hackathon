import {complete, open_ended_question, multiple_choice_question, parse_templates, generate_template, generate_metadata_template, generate_hwrequirements_template} from '../utils.js'
import prompt_sync from 'prompt-sync'
import prompt_sync_history from 'prompt-sync-history'
import models_generate_dataset from '../modeldata/generate_diffusion.json' assert { type: 'json' };
import path, { relative } from 'path'
import os from 'os'
import fs from 'fs'
import { exec, execSync } from 'child_process';

export class Manifest_dataset{
    constructor(){
        this.metadata = {}
        this.hwRequirements = {}
        this.folderData = {}
        this.cache = {}
        this.format = ""
        this.id = ""
        this.source = ""
        this.skill = ""
    }

    main(generate){
        let generation = dataset_generate(generate)
        for (var key in generation){
            this[key] = generation[key]
        }
        return this
    }

    calc(){
        return dataset_calc()
    }
}


export default function dataset_calc(){

    let prompt = prompt_sync(({
        history: prompt_sync_history(),
        autocomplete: complete([]),
        sigint: true
    }))

    let modelName = open_ended_question("Enter a model name: ")

    let locations = ['local', 'huggingface', 'http', 's3']

    let location = multiple_choice_question("Where is the model located?", locations) 

    let source = open_ended_question("Enter a source from " + location + ": ")

    let formats = [ "parquet", "text", "json", "csv", "tsv"]
    let format = multiple_choice_question("Select a format from "+ source+": ", formats)

    let samples = 0
    let size = 0
    let compression_type = "none"
    let folderData = []
    if (format == "parquet"){
        let samples = open_ended_question("Enter the number of samples: ")
        let compression = ["snappy", "gzip", "brotli", "lz4", "zstd", "none"]
        compression_type = multiple_choice_question("Select a compression type: ", compression)
    }
    else{
        let source_path = path.resolve(source)
        folderData = walkSync(source_path)
        console.log("Number of samples: " + folderData.length)
        samples = samples.length
    }        
    size = execSync("du -sh " + source).toString()

    console.log("Size: ")
    let count = parseInt(size.split("\n")[0].split("\t")[0].split(" ")[0].replace(/\D/g,''))
    if (size.includes("P") || size.includes("PB")){
        size = count * 1024 * 1024 * 1024 * 1024 * 1024
    }
    else if (size.includes("T") || size.includes("TB")){
        size = count * 1024 * 1024 * 1024 * 1024
    }
    else if (size.includes("G") || size.includes("GB")){
        size = count * 1024 * 1024 * 1024
    }
    else if (size.includes("M") || size.includes("MB")){
        size = count * 1024 * 1024
    }
    else if (size.includes("K") || size.includes("KB")){
        size = count * 1024
    }
        
    let generate = {}
    generate.modelName = modelName
    generate.location = location
    generate.folderData = folderData
    generate.source = source
    generate.format = format
    generate.samples = samples
    generate.size = size    
    let results = dataset_generate(generate)
    return results
}

export function dataset_generate_hwrequirements(generate){
    if (generate.size == undefined){
        throw "size is undefined"
    }
    let results = generate_hwrequirements_template(generate)
    results.cpuCount = [1]
    results.gpuCount = [0]
    let padding = 1.1
    results.gpuMemory = 0
    results.diskUsage = generate.size * 1024 * 1024 * padding
    results.cpuMemory = generate.size * 1024 * 1024 * padding
    return results
}


export function dataset_generate_metadata(generate){
    let results = generate_metadata_template(generate)
    results.format = generate.format
    results.location = generate.location
    results.modelName = generate.modelName
    results.model_type = 'dataset'
    results.units = "Bytes"
    results.samples = generate.samples
    results.size = generate.size
    return results
}


export function dataset_generate(generate){
    let results = generate_template(generate)
    results.id = generate.modelName;
    results.folderData = generate.folderData
    results.hwRequirements = dataset_generate_hwrequirements(generate)
    results.metadata = dataset_generate_metadata(generate)
    results.skill = "dataset"
    return results
}

export function dataset_add(generation){
    if (generation.modelName != undefined){
        models_generate_dataset[generation.modelName] = generation
        fs.writeFileSync(path.resolve('../modeldata/generate_dataset.json'), JSON.stringify(models_generate_dataset, null, 2))       
        return Object.keys(models_generate_dataset)
    }
    else{
        throw "model name is undefined"
    }      
}

function walkSync(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkSync(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    console.log("files found: ", fileList.length)
    return fileList;
}