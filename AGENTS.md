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

- Keep the imported restaurant views in src/features/redfern and use one TanStack file route per page; this preserves the upload without replacing the supported application framework.
- Resolve original illustration paths through the food image registry and CDN pointers; this preserves uploaded media while allowing selected generated photos.
- The imported website is presentation-only: reservation, contact, and voice services must explicitly remain unavailable until real services are connected, so visitors never receive fabricated confirmations.
