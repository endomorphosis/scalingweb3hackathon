export function generate_readme_dataset(){
    let readme = "# Dataset\n"
    return readme
}

export function generate_readme_diffusion(){
    let readme = "# Diffusion Model\n"
    return readme
}

export function generate_readme_llama_cpp(){
    let readme = "# Llama Model\n"
    return readme
}

export function generate_readme_hf_transformers(){
    let readme = "# HF Transformers Model\n"
    return readme
}

export function generate_readme_knn(){
    let readme = "# KNN Model\n"
    return readme
}

export function generate_readme_hf_embed(){
    let readme = "# HF Embed Model\n"
    return readme
}

export function generate_readme_faster_whisper(){
    let readme = "# HF faster_whisper Model\n"
    return readme
}

export function generate_readme_hf_lm(){
    let readme = "# HF LM Model\n"
    return readme
}

export function generate_readme_hf_t5(){
    let readme = "# HF T5 Model\n"
    return readme
}

export function generate_readme(generate, manifest){
    if(generate.skill == "diffusion"){
        return generate_readme_diffusion()
    }
    if(generate.skill == "llama_cpp"){
        return generate_readme_llama_cpp()
    }
    if(generate.skill == "hf_transformers"){
        return generate_readme_hf_transformers()
    }
    if(generate.skill == "hf_t5"){
        return generate_readme_hf_t5()
    }
    if(generate.skill == "hf_lm"){
        return generate_readme_hf_lm()
    }
    if(generate.skill == "knn"){
        return generate_readme_knn()
    }
    if(generate.skill == "hf_embed"){
        return generate_readme_hf_embed()
    }
    if(generate.skill == "hf_faster_whisper"){
        return generate_readme_faster_whisper()
    }
    if(generate.skill == "dataset"){
        return generate_readme_dataset()
    }
    else{
        return "Invalid skill for readme generation"
    }
}