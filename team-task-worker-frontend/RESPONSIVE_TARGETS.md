# Responsive Targets

The frontend is designed around three practical viewport groups:

| Device group | Recommended test viewport | CSS range |
| --- | ---: | --- |
| Phone | 390 x 844 | `max-width: 767px` |
| iPad / tablet | 834 x 1112 | `768px - 1079px` |
| Laptop / desktop | 1440 x 900 | `min-width: 1080px` |

Key behavior:

- Phone uses a bottom navigation bar, single-column content, full-width actions, scrollable boards/tables, and compact modals.
- iPad/tablet uses a compact left sidebar rail, two-column card grids where useful, and scrollable kanban/table surfaces.
- Laptop/desktop uses the full sidebar shell, wider grids, sticky profile/sidebar patterns, and spacious dashboard layouts.
