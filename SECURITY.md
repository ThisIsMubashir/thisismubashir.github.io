# Security Policy

## Reporting a vulnerability

If you find a security issue in this repository — leaked secrets, a misconfigured deploy, an XSS sink, anything that could harm visitors — please **don't open a public issue**. Instead, email **mubashir.hussain@live.com** with:

- A short description of the issue
- Steps to reproduce
- The impact you've assessed
- Optionally, a suggested fix

I aim to acknowledge within 72 hours and roll out a fix within 7 days for high-severity items.

## Scope

This is a static site (no server-side code, no database, no auth). Reasonable scope:

- The published site at `mubashirhussain.cThom` (once live)
- The Next.js + Sanity build pipeline in this repo
- Any environment leak (Sanity tokens, Formspree IDs, GitHub PATs)

Out of scope:

- Vulnerabilities in third-party SaaS used by the site (Sanity, Formspree, Plausible, GitHub Pages) — please report those to the relevant vendor.
- Social engineering, physical access, or non-technical attacks on me personally.

## Acknowledgements

Reporters who follow this process and request it will be credited in the project README once a fix is shipped.
