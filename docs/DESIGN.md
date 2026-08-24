# Design decisions

The protocol stores certificates, not agent data. Raw state remains at public content-addressed endpoints. This keeps state bounded while making every accepted root reproducible.

Continuity has two layers: deterministic lineage and content integrity, then semantic compatibility. GenLayer is used only for the second layer and for consensus around independently acquired web evidence.

Changing any domain bytes changes its observed hash and the computed root. Changing role, policy or behavior can produce a drift certificate but cannot advance the recovery head.
