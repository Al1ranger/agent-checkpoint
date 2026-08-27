import fs from "node:fs";
import {createClient} from "genlayer-js";
import {studionet} from "genlayer-js/chains";
const {address}=JSON.parse(fs.readFileSync("deployment.json","utf8"));
const client=createClient({chain:studionet});
const agent=await client.readContract({address,functionName:"get_agent",args:["climate-research-agent"]});
const v1=await client.readContract({address,functionName:"get_checkpoint",args:["checkpoint-v1"]});
console.log(JSON.stringify({agent,v1},null,2));
