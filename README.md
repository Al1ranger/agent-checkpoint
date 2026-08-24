# AgentCheckpoint

Consensus-verified state continuity and recovery certificates for autonomous agents.

AgentCheckpoint binds each checkpoint to a sequential version, the active parent, a public manifest, independently fetched domain objects, and a validator-agreed semantic continuity vector. It is infrastructure for agent migration, crash recovery and controlled upgrades—not a snapshot database or an LLM wrapper.

## Core guarantees

- Checkpoint IDs and `(agent, version)` slots are reserved at proposal time.
- Only the agent controller can propose or authorize restoration.
- Validators independently fetch the manifest and every domain object.
- Reported source count/status, hashes, Merkle-style root and semantic fields are all bound to exact consensus.
- Missing or invalid sources produce stored negative certificates.
- Only `VERIFIED` checkpoints advance the canonical head.
- Restore requires a verified certificate marked `safe_restore`.

## Layout

`contracts/` deployable source · `docs/` protocol design and threat model · `examples/` manifest model · `tests/` repository-safe invariant checks.

## Validate

```bash
genvm-lint check contracts/AgentCheckpoint.py
node tests/invariants.mjs
```

## License

Apache-2.0
