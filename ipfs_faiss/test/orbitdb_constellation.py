# import torch

## define type base64

# def random_fp16x512():
    # return torch.rand(512, dtype=torch.float16)

import regex as re
def shard_base64(fn_name, index0, index1 = None, index2 = None, **kwargs):
    # check hex
    if type(index0) != str:
        raise ValueError("input0 is not a string")
    else:
        if index0 != None and type(index1) == str:
            Input0Base64 = re.match(r'^[A-Za-z0-9+/]+[=]{0,2}$', index0)
            if Input0Base64 == None:
                raise ValueError("input0 is not a base64 string")
        if index1 != None and type(index1) == str:
            Input0Base64 = re.match(r'^[A-Za-z0-9+/]+[=]{0,2}$', index1)
            if Input0Base64 == None:
                raise ValueError("input0 is not a base64 string")
        if index2 != None and type(index2) == str:
            Input1Base64 = re.match(r'^[A-Za-z0-9+/]+[=]{0,2}$', index2)
            if Input1Base64 == None:
                raise ValueError("input1 is not a base64 string")
    
    if index0 != None and index1 != None and index2 != None:
        results = shard_base64x3(index0, index1, index2)
        return results
    elif index0 != None and index1 != None:
        results = shard_base64x2(index0, index1)
        return results
    elif index0 != None:
        results = shard_base64x1(index0)
        return results
    else:
        raise ValueError("No input provided")
    
def shard_base64x1(fn_name, index0, **kwargs):
    fn_name = "insert_value"
    return function_router_shard_base64(fn_name, index0=index0 , **kwargs)
    return

def shard_base64x2(index0, index1, **kwargs):
    fn_name = "insert_value"
    return function_router_shard_base64(fn_name, index0=index0, index1=index1, **kwargs)

def shard_base64x3(index0, index1, index2, **kwargs):
    fn_name = "insert_value"
    return function_router_shard_base64(fn_name, index0=index0, index1=index1, index2=index2, **kwargs)
 

def function_router_shard_base64(fn_name, **kwargs):
    if fn_name == "some_function":
        return some_function_shard_base64(fn_name, **kwargs)
    else:
        raise ValueError("Function not found")

def some_function_shard_base64(fn_name, index0, index1, index2, **kwargs):
    # do something
    results = some_function_router(fn_name, index0, index1, index2, **kwargs)
    return results

def some_function_router(fn_name, index0, index1, index2, **kwargs):
    # do something
    fn_name = "sanity_check"
    for some_result in some_function_generator(index0, index1, index2, **kwargs):
        yield process_result(fn_name, some_result)

    return

def some_function_generator(fn_name, index0, index1, index2, **kwargs):
    # do something
    for some_result in some_function(index0, index1, index2, **kwargs):
        yield some_result

def some_function(fn_name, index0, index1, index2, **kwargs):
    if index0 != None and index1 != None and index2 != None:
        yield load_shard_base64(index0, index1, index2)
    elif index0 != None and index1 != None:
        yield load_shard_base64(index0, index1)
    elif index0 != None:
        yield load_shard_base64(index0)
    else:
        raise ValueError("No input provided")
    return

def load_shard_base64(index0, index1, index2):
    # load null
    if index0 != None and index1 != None and index2 != None:
        return None, None, None
    elif index0 != None and index1 != None:
        return None, None
    elif index0!= None:
        return None
    
def process_result(fn_name, some_result):
    if fn_name == "some_function":
        return some_result
    else:
        raise ValueError("Function not found")
    

