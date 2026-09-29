---
name: budget-review
description: Review, explain or update a CineFlo project's production budget and cost report. Use when the user asks what they've spent, what's over budget, what's committed, what's left, for a cost report or hot costs, or to add budget lines, purchase orders or actuals.
---

# Review the budget

Read the cost report like a line producer: where the money is, where it's
going over, and what's still coming.

## 1. Read the cost report

`list_projects`, then `get_budget`. Amounts are integer cents in the budget's
currency: divide by 100 and show the currency (150000 is 1,500.00 USD).

The report has accounts in four categories (above the line, below the line,
post, other), line items with their budgeted totals, purchase orders (POs)
and actuals, and rollups per line, account, category and grand total.

- **Committed** is POs that are submitted or approved; draft POs count
  nowhere; invoiced and paid POs are costs.
- **Actual** is money spent (invoiced and paid POs, and actuals).
- **Estimate to complete** (ETC) is what's still expected on a line;
  **estimate at completion** is actual plus ETC. Compare that with the budget
  for the variance.
- `totalInCents` excludes payroll fringe; `fringeInCents` shows it
  separately.
- "Unassigned" is money booked to an account but none of its lines.

## 2. Explain it

Lead with the answer to what the user asked. For a general review:

- The grand total against budget, and the variance.
- Lines over budget, largest first, with the amount and the reason if the PO
  or actual description gives one.
- Open commitments that will land soon.
- Money booked to an account but no line, which usually needs assigning.

Keep it to the lines that matter; offer the full list.

## 3. Change it only when asked

Use `save_budget` to add or change accounts, line items, POs and actuals, up to
100 of each per call. Amounts go in as cents; `totalInCents` is quantity × rate.
A locked budget stays editable, and edits move the revised figures, never the
original baseline. Confirm figures with the user before writing them, and
report what changed.

## Notes

- If Budget is shared view-only, answer questions and say that changes need
  edit access (CineFlo, Settings → Privacy & Data → Connected Apps).
- This records costs; it doesn't place orders or move money.
