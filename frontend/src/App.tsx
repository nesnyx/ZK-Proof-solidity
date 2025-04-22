// zk-poh-frontend/src/App.tsx
import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract, useSimulateContract } from "wagmi";
import verifierAbi from "./abi/Verifier.json"; // ABI hasil export snarkjs
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const snarkjs = await import("snarkjs");

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Ganti setelah deploy

export default function App() {
  const [input, setInput] = useState(25); // Umur input
  const [proof, setProof] = useState<any>(null); // Bukti dari snarkjs
  const [publicSignals, setPublicSignals] = useState<any>(null);
  const account = useAccount()
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Siapkan transaksi ke contract Verifier
  const { data} = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: verifierAbi,
    functionName: "verifyProof",
    args: [
      proof?.pi_a || ["0", "0"],
      proof?.pi_b || [["0", "0"], ["0", "0"]],
      proof?.pi_c || ["0", "0"],
      publicSignals || ["0"]
    ],
  });

  const { writeContract } = useWriteContract()

  

  // Generate proof asli menggunakan snarkjs
  const generateProof = async () => {
    const inputSignals = { "age": input }; // Signal input

    const wasmPath = "../public/ageCheck.wasm"; // Pastikan file ini ada di public/
    const zkeyPath = "../public/ageCheck_final.zkey";

    try {
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        inputSignals,
        wasmPath,
        zkeyPath
      );
  
      console.log("✅ Proof generated");
      console.log(proof);
      console.log(publicSignals);
  
  
      const callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
    
      const argv = callData
        .replace(/[[\]"\s]/g, "")
        .split(',')
        .map((x: string) => x.trim());
  
      const a = [argv[0], argv[1]];
      const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
      const c = [argv[6], argv[7]];
      const inputPub = argv.slice(8);
      
      setProof({ pi_a: a, pi_b: b, pi_c: c });
      setPublicSignals(inputPub);
      
    } catch (error) {
      console.error("❌ Failed to generate proof", error);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Zero Knowledge Proof Checker (PoH)</h1>

        {account.status === "connected" ? (
                <div className='flex gap-4 items-center'>
                    <p className='bg-blue-400 px-4 py-2 rounded-xl text-white'>{(account.addresses)}</p>
                    
                    <button className='border rounded-lg px-4 py-2' type="button" onClick={() => disconnect()}>
                       Disconnect
                    </button> 
                </div>
                     
            ) : <button className="bg-blue-600 rounded-lg px-4 py-2 text-white" >

                    {connectors.map((connector) => (
                    <button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        type="button"
                    >
                        <div className='flex gap-2 items-center justify-center'>
                        <p>connect</p> <img src={connector.icon} width={20} alt="" />
                        </div>
                    </button>
                    ))}
                </button>
            }

      <div>
        <label className="block mb-1">Masukkan umur kamu:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      <button
        onClick={generateProof}
        className="bg-green-500 text-white px-4 py-2 rounded shadow"
      >
        Generate ZK Proof
      </button>

      <button
       onClick={() => writeContract(data!.request)}
        disabled={!Boolean(data?.request)}
        className="bg-purple-500 text-white px-4 py-2 rounded shadow disabled:bg-gray-300"
      >
        Submit Proof to Smart Contract
      </button>
     <div>
      <p>{data?.result}</p>
     </div>
      
    </main>
  );
}
