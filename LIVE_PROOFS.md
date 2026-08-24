# Live StudioNet matrix

Contract: `0xaee4554235272CCF361829e9A9e6Df1Ff3A74Ba5`

Every transaction below finalized with `MAJORITY_AGREE`. Validators independently fetched three state domains per checkpoint: `CAPABILITY_STATE`, `POLICY_STATE`, and `TASK_STATE`.

| Version | Domain hashes | Semantic result | State | Recovery gate |
|---|---:|---|---|---|
| v1 genesis | 3/3 exact | identity SAME, role SAME, policy SAME, behavior SAME | VERIFIED | true |
| v2 compatible evolution | 3/3 exact | identity SAME, role EXPANDED, policy TIGHTENED, behavior COMPATIBLE | VERIFIED | true |
| v3 unsafe drift | 3/3 exact | identity CHANGED, role CHANGED, policy CHANGED, behavior CHANGED | DRIFTED | false |

The active head and authorized restore target both remain v2 after v3 is rejected.

## Transactions

- Create agent: https://explorer-studio.genlayer.com/tx/0xabdd21e9204df445ca4fde4ecca4cb07b5236f28d4cbb8ac6cf6ba5e4c82fc24
- Create v1: https://explorer-studio.genlayer.com/tx/0x343762df05d40153cbd94262228bed926f38797823506c0c8612555519df3e10
- Verify v1: https://explorer-studio.genlayer.com/tx/0x95fcc270cd5f66761a31702b138064e9b9ece652822b783be514e89e2bfc2758
- Create v2: https://explorer-studio.genlayer.com/tx/0x97f13510baf78fce5a2b9498c4bbd38244427d16252cd6ce6da86c37e2d74b19
- Verify v2: https://explorer-studio.genlayer.com/tx/0xe8ff0b91381752800d10ac5998a67f54b5e9eeae6a5cbef73f77a008bd8a61f1
- Authorize restore to v2: https://explorer-studio.genlayer.com/tx/0xf9c488a16230ce880e6092891eea6e6d31f50ab9470ab8caac30c7079caf6a0a
- Create v3 drift: https://explorer-studio.genlayer.com/tx/0x4fad58a962ba8730520c0137b91848e355d9b8362efb6fce0a83adfb9ace96b4
- Verify and reject v3 drift: https://explorer-studio.genlayer.com/tx/0x966ee41b8545ea314455e202d0d7912d2d98d510431c48089b16a02abb121670

## Stored identifiers

- Agent: `climate-research-agent-matrix`
- v1: `checkpoint-v1-1787584133564`
- v2: `checkpoint-v2-1787584133564`
- v3: `checkpoint-v3-drift-1787584133564`
- Active head: v2
- Restore target: v2
