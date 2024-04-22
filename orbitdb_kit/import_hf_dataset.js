import { WebSocketServer } from 'ws';
import fs from 'fs';

export default async function main(){
	const wss = new WebSocketServer({ port: 8888 });
	wss.on('connection', ws => {
		ws.on('message', (message) => {

			let parsed_message = JSON.parse(message);

			if(parsed_message.job == 'check_dataset'){
				check_dataset(ws, parsed_message);
			}

			if(parsed_message.job == 'download'){
				download_dataset(ws, parsed_message);
			}

			if(parsed_message.job == 'upload'){
				upload_dataset(ws, parsed_message);
			}
		});
	});
}


async function check_dataset(ws, message){
	console.log("checking dataset");
	// Check if the received dataset exists
	// if exists
		// Check the schema of the existing dataset
		// Check schema against the huggingface dataset
		// If schema matches, return dataset_exists
		// If schema does not match, return schema_mismatch
	// if not exists
		// return dataset_not_found
		
	ws.send("dataset_not_found")
}


async function download_dataset(ws, message){
	console.log("downloading dataset");

	// TODO: Fix to be the CID 
	let dataset_name = message.ipfs_address;


	console.log("dataset_name: ", dataset_name);
	// Download the dataset 
	if (fs.existsSync (`${dataset_name}.json`)){
		console.log('dataset exists')
		let data = fs.readFileSync(`${dataset_name}.json`, 'utf8');
		
		// Batch data 
		data

		ws.send(data);
	}
	else{
		console.log('dataset does not exist')
		ws.send("dataset_not_found");
	}
}


async function upload_dataset(ws, message){
	console.log("uploading dataset");

	// Get dataset_name from message
	let dataset_name = message.dataset_name;
	
	// check if there is an existing database for it
	if (!fs.existsSync(`${dataset_name}.json`)) {
		// get schema from message
		console.log("primary_key: ", message.key)
		// create a new database with the schema 
		fs.writeFileSync(`${dataset_name}.json`, JSON.stringify({"Database_type": message.database_type}, null, 2) + '\n');
		fs.appendFileSync(`${dataset_name}.json`, JSON.stringify({"primary_key": message.key}, null, 2) + '\n');
		fs.appendFileSync(`${dataset_name}.json`, JSON.stringify(message.schema, null, 2) + '\n'); 
	}

	// for each query in the message
	fs.appendFileSync(`${dataset_name}.json`, JSON.stringify(message.value, null, 2) + '\n');	
	
	ws.send('OK');
}

main();