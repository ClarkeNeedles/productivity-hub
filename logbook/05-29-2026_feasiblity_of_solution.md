---
title: "Architecture Pivot & Core Setup Complete"
date: 06-03-2026
status: planning
version: 0.0.0
---

# Log Notes

## 🔄 Architecture Pivot & Core Setup Complete

### 🛑 Critical Bottlenecks
* **PWA Limitations:** Mobile web drag-and-drop mechanics are non-viable. Native push notifications remain highly unreliable.
* **Token Overhead:** Feeding massive, personalized user data blocks into cloud LLMs is cost-prohibitive for an open-source budget.

---

### ✨ Key Successes
* **Architecture Wins:** Core engine framework and backend API routing are successfully established.
* **Modularity Validated:** Relying on community-driven module creation effectively eliminates core platform feature creep.

---

### 🔄 Strategic Pivots
* **Platform Shift:** Abandoning restrictive Progressive Web App (PWA) development constraints in favor of a standard web application layout.
* **Alert Workarounds:** Replacing native mobile push notifications with recurring email summaries and external communication app webhooks.
* **Hybrid AI Model:** Mitigating mobile hardware limitations and high token costs through a smart, multi-tier LLM strategy:
  * **Tier 1:** Server-side local LLM utilizing a localized RAG pipeline pulled directly from the database (zero extra training required).
  * **Tier 2:** Intelligent client-side device detection falling back to free-tier cloud LLM APIs for active mobile users.

- **Make sure that you run (pip install -r requirements.txt) for the AI script to work.**
- The AI script (/scripts/generate_readme.py) will read through this unstructured section and automatically figure out your project's features and updates for the README.md.
