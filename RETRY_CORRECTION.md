# Retry-safe checkpoint correction

Corrected StudioNet contract: `0x96CCFEa16e282E6A7f77193c7644D6eA3650e891`

The corrected contract preserves each failed checkpoint as an immutable attempt. A replacement may reuse the same logical version only when the latest attempt ended `DRIFTED`, `INVALID`, `INDETERMINATE`, or `UNAVAILABLE`, and only while its parent remains the canonical head. Each replacement binds `replacement_of` and a monotonic `attempt`. Only the latest attempt can verify; verified versions are permanently closed.

## Live proof

- Deployment: https://explorer-studio.genlayer.com/tx/0x6ea0d9a068d9a778e5f6114e11758eac32658da3d8568e34068e1213f272b13c
- Create agent: https://explorer-studio.genlayer.com/tx/0xeac8623383383c603f3de4aa8b917d13be2ab71e77ae8d2ff9fb8177b4dc6d5f
- Create v1: https://explorer-studio.genlayer.com/tx/0xc05422ad78c62a34d65dbea710f266ebf49c7262dc20a25dfaaa5229068c71c6
- Verify v1: https://explorer-studio.genlayer.com/tx/0x89f21ef76ae8b625c5314919ccfd35ca0109b5a7c759a32cd7ea4ed733a0f7fd
- Create v2 attempt 1: https://explorer-studio.genlayer.com/tx/0x0956ef7743c7b49d4ff7cc23a72363aa5d5c871608c72c61557f03dc4b391b47
- Store v2 attempt 1 as `DRIFTED`: https://explorer-studio.genlayer.com/tx/0xbc05bf6fa8d2bc79182ac695cc651c7ddf75dcd8c11f4f2492da7a7fe624ddcc
- Create corrected v2 attempt 2: https://explorer-studio.genlayer.com/tx/0x69196f5452941cbe5fc2896a9bb4715d9cc801e45720a7420cd919107ed03d56
- Verify corrected v2 attempt 2: https://explorer-studio.genlayer.com/tx/0xc53280298a9f179768762a32dc94e7b748340408b303cbe69cccf54a93a39346

Stored state proves attempt 1 remains `DRIFTED`, attempt 2 is `VERIFIED`, attempt 2 has `replacement_of=checkpoint-v2-drift-attempt-1`, the latest version is 2, and the canonical head is `checkpoint-v2-corrected-attempt-2`.

Deployed source exactly matches `contracts/AgentCheckpoint.py`. Normalized SHA-256: `40cdd69fa3e9584e9a5799d7f70243fb43ff3ed70633d6f8129f4bb8ca30c245`.

