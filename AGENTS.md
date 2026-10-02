<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep donor identity in Cloud Auth and donor details in an owner-scoped `donor_profiles` table; this avoids exposing health-adjacent profile data across users.
- Keep the prototype's sample campaigns, requests, and donation status clearly distinguished from verified live information until those workflows exist.
- Save user-created requests in an owner-scoped `blood_requests` table visible only to their author, and label them as not sent to donors; interest confirmation stays a local demo until a verified workflow exists, so nothing appears operational.
- Compute donor/recipient compatibility from the shared ABO/Rh matrix in `src/lib/blood.ts`; never hardcode a blood type in UI copy.
