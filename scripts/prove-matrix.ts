import{createAccount,createClient}from"genlayer-js";
import{studionet}from"genlayer-js/chains";
import{TransactionStatus}from"genlayer-js/types";
const address="0xaee4554235272CCF361829e9A9e6Df1Ff3A74Ba5" as `0x${string}`;
const account=createAccount(),client=createClient({chain:studionet,account});
const suffix=process.env.PROOF_SUFFIX??String(Date.now()),agent="climate-research-agent-matrix";
const base="https://raw.githubusercontent.com/Al1ranger/agent-checkpoint/main/proof-data";
async function w(fn:string,args:any[],strict=true){const hash=await client.writeContract({address,functionName:fn,args,account,value:0n});console.log(`${fn}=${hash}`);let r:any;for(let i=0;i<8;i++){try{r=await client.waitForTransactionReceipt({hash:hash as never,status:TransactionStatus.FINALIZED,interval:5000,retries:180});break}catch(e){if(i===7)throw e}}const fatal=(r.consensus_data?.leader_receipt??[]).filter((x:any)=>x.execution_result!=="SUCCESS"&&x.genvm_result?.error_code!=="CONSENSUS_VALIDATOR_QUORUM_REACHED");if(strict&&(r.result_name!=="MAJORITY_AGREE"||fatal.length))throw Error(JSON.stringify({fn,hash,result:r.result_name,fatal}));return{hash,result:r.result_name,explorer:`https://explorer-studio.genlayer.com/tx/${hash}`}}
async function evaluate(id:string){let x:any;for(let i=0;i<4;i++){x=await w("verify_checkpoint",[id],false);if(x.result==="MAJORITY_AGREE")break}if(x.result!=="MAJORITY_AGREE")throw Error(`${id}: no validator agreement`);return x}
const ids={v1:`checkpoint-v1-${suffix}`,v2:`checkpoint-v2-${suffix}`,drift:`checkpoint-v3-drift-${suffix}`},tx:any={};
tx.createAgent=await w("create_agent",[agent]);
tx.v1Create=await w("create_checkpoint",[ids.v1,agent,1,"",`${base}/matrix-v1.json`,"90dc27a5290defc37a215c0ba6726e777f854b0649885cab449b96a73e8f834a"]);tx.v1Verify=await evaluate(ids.v1);
tx.v2Create=await w("create_checkpoint",[ids.v2,agent,2,ids.v1,`${base}/matrix-v2.json`,"a47bf139ce9b393be6516a5a5d8a3c1d5f4917f058a1375436b86e9390ad2c57"]);tx.v2Verify=await evaluate(ids.v2);tx.restore=await w("restore_checkpoint",[agent,ids.v2]);
tx.driftCreate=await w("create_checkpoint",[ids.drift,agent,3,ids.v2,`${base}/matrix-v3-drift.json`,"52a18c0c066f8b95e0728d1792696b4d88331c7610b5da9ff34f47193d020493"]);tx.driftVerify=await evaluate(ids.drift);
const[record,v1,v2,drift]=await Promise.all([client.readContract({address,functionName:"get_agent",args:[agent]}),client.readContract({address,functionName:"get_checkpoint",args:[ids.v1]}),client.readContract({address,functionName:"get_checkpoint",args:[ids.v2]}),client.readContract({address,functionName:"get_checkpoint",args:[ids.drift]})])as any[];
const gates={v1:await client.readContract({address,functionName:"verify_recovery_certificate",args:[ids.v1,v1.certificate_fingerprint]}),v2:await client.readContract({address,functionName:"verify_recovery_certificate",args:[ids.v2,v2.certificate_fingerprint]}),drift:await client.readContract({address,functionName:"verify_recovery_certificate",args:[ids.drift,drift.certificate_fingerprint]})};
if(v1.state!=="VERIFIED"||v2.state!=="VERIFIED"||drift.state!=="DRIFTED"||record.latest_checkpoint!==ids.v2||record.restore_checkpoint!==ids.v2||!gates.v1||!gates.v2||gates.drift)throw Error("matrix invariant failed");
console.log(JSON.stringify({contract:address,controller:account.address,agent,ids,tx,stored:{agent:record,v1,v2,drift,gates}},null,2));
