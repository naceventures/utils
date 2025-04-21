# Publish a release

```bash
# Commit the changes
ga .
gcmsg "scope: commit message"

# Run tests
pnpm run test

# Create changeset and bump version
pnpm run changeset
pnpm run status
pnpm run version

# Commit the Changelog and the package.json with the bumped version
ga .
gcmsg "chore: release version x.x.x"

# Pull main from origin and merge develop into main
gco main
ggl
gm develop

# Push the main branch to github
ggp

# Pull latest change from develop
gco develop
ggl
```
