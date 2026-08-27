# Security model

- A controller cannot skip versions or fork from a stale parent.
- IDs and versions are permanently reserved before nondeterministic verification.
- Activation rechecks parent and next-version invariants, preventing overwrite races.
- Claimed counts, statuses and hashes do not control consensus; validators refetch and recompute them.
- Duplicate domain types, private/local URLs, malformed manifests and hash mismatches fail closed.
- Source failures are recorded as `UNAVAILABLE`; stale positive checkpoints do not masquerade as fresh verification.
- Semantic disagreement rejects consensus. `UNKNOWN`, relaxed policy, changed identity/role/behavior cannot authorize recovery.
- Restore authorization belongs only to the registered controller.
# Retry safety

Every non-verified terminal result (`DRIFTED`, `INVALID`, `INDETERMINATE`, or `UNAVAILABLE`) may be replaced by a new immutable attempt for the same logical version. The replacement records `replacement_of` and a monotonic attempt number. Its parent must still be the canonical head. Only the latest attempt may verify, and a verified version is permanently finalized. Failed records are never deleted or rewritten.
