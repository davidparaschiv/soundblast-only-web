# Soundblast DJ website

Static, single-page product website for GitHub Pages. The animated hero uses Phaser 3.90.0 with a Canvas fallback.

## Download files

Place the Apple Silicon release in `downloads/` using this exact name:

- `Soundblast-DJ-macOS-Apple-Silicon.dmg`

## Preview locally

From `web-app`, start any static file server. For example:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

Commit the website and add the DMG first, then run:

```sh
./web-app/deploy.sh
```

The script checks the files, creates an isolated temporary branch in a temporary worktree, publishes its contents to the remote `gh-pages` branch, and removes the local temporary branch and worktree. Existing working files are never replaced.

In the GitHub repository settings, configure Pages to deploy from the `gh-pages` branch at `/ (root)`.
