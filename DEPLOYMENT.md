# Publish a release

```bash
# Commit the changes
ga .
gcm "scope: commit message"

# Run tests
pnpm run test

# Create changeset and bump version
pnpm run changeset
pnpm run status
pnpm run version

# Commit the Changelog and the package.json with the bumped version
ga .
gcm "chore: release version x.x.x"

# Merge develop into main
gco main
git merge develop

# Push the main branch to github
git push origin main

#
gco develop
git pull original develop
```
- Make a commit
- Create a Changeset with `pnpm run changeset`
- Commit the
- Merge the `develop` branch into the `main` branch with ``
