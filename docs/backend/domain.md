# Backend domain reference (planning only)

**Stack / ownership**: Java 21, Spring Boot, PostgreSQL, Flyway. User owns backend; Claude must ask before editing it. Security and ownership validated server-side.

## User
Email/password authentication, own profile, status if included in implementation; protect resources by authenticated user ownership.

## Transaction
Income/expense; positive money amount; date (past, present, future); category mandatory; card optional for both types; description optional. Planned vs completed are explicit user-controlled states if implemented. Display future entries separately; do not auto-complete merely because date passes. Support filters by period, type, category and status where available.

## Category
Built-in categories and custom categories. Avoid duplicates per type where relevant. Category must belong to correct transaction type. Deny removal when referenced until user reassigns/detaches its transactions.

## Card
User-created fictional card (branding inspired by banks but not an actual bank integration); optional transaction relationship. Deny removal while still associated with transactions. No full card number, CVV, billing cycles or installment management for V1.

## Dashboard
Aggregations derived from the stored transactions, with clear grouping by date/category and planned vs completed status. No actual banking balances or fabricated data claims.

Implementation details, endpoint signatures and schema choices are intentionally deferred until backend work begins; avoid making unsupported assumptions in design mockups.
