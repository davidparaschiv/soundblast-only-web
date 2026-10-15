# Soundblast DJ website

Static, single-page product website for GitHub Pages. The animated hero uses Phaser 3.90.0 with a Canvas fallback.

The private backend is currently stored in the ignored `soundblast-backend/` folder. That folder is self-contained and ready to become a separate private Git repository.

## Download file

Upload the Apple Silicon release to GitHub Releases using this exact name:

- `SoundBlast.dmg`

## Preview locally

From the repository root, start any static file server:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

Commit the website, publish the GitHub Release, then run:

```sh
./deploy.sh
```

The deployment excludes `soundblast-backend/`, local DMG files, and other local-only files. In GitHub repository settings, configure Pages to deploy from the `gh-pages` branch at `/ (root)`.
