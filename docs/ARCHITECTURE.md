# Architecture

Flow: controller proposal → deterministic ID/version reservation → validator manifest fetch → independent domain fetches → exact domain receipts and root → bounded semantic continuity vector → exact full-record consensus → verified head → controller-authorized recovery.

The manifest is JSON with `agent_id`, `version`, `role`, `policy`, `behavior`, and 1–8 unique domain entries. Each domain entry supplies `type`, public HTTPS `url`, and `sha256`. Validators fetch bytes directly; the manifest cannot self-attest its domain hashes.

The semantic layer emits only bounded identity, role, policy and behavior categories. Free-form reasoning is neither stored nor used. Every validator recreates the complete certificate and exact equality is required.
