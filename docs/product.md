# Product contract — V1

Orby Finance Flow: simple, manual tracking of income and expenses, including optional association with fictional, visually bank-inspired cards. No real banking, bank sync, transfers between accounts, invoices, installment schedules, balances or credit management.

- User signs up/logs in, owns and manages own data.
- Transaction: income/expense, positive amount, date, category, optional card, optional description; distinguish completed vs planned when supported by product rules. Future transactions are displayed separately, not automatically completed.
- Categories: some predefined, user can add own; keep relationships consistent.
- Cards: display and management, optional association with income or expense; no real payment processing.
- Prevent deletion of categories/cards still associated with transactions until detached.
- Dashboard summarizes recorded movements; avoid fabricated claims, real-time sync, AI financial advice, investments, predictions, budgets or user counts.
- All interface/copy in Brazilian Portuguese unless user requests otherwise.

This is a product summary, not an implementation contract. Detailed decisions: `docs/backend/domain.md`.
