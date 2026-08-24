# Security model

- A controller cannot skip versions or fork from a stale parent.
- IDs and versions are permanently reserved before nondeterministic verification.
- Activation rechecks parent and next-version invariants, preventing overwrite races.
- Claimed counts, statuses and hashes do not control consensus; validators refetch and recompute them.
- Duplicate domain types, private/local URLs, malformed manifests and hash mismatches fail closed.
- Source failures are recorded as `UNAVAILABLE`; stale positive checkpoints do not masquerade as fresh verification.
- Semantic disagreement rejects consensus. `UNKNOWN`, relaxed policy, changed identity/role/behavior cannot authorize recovery.
- Restore authorization belongs only to the registered controller.
