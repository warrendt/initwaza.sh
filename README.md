# initwaza.sh

Personal blog. Plain HTML/CSS/JS, terminal themed, no build step. Served from GitHub Pages.

## Structure

```
index.html          home (whoami / ls skills / ls posts / cat contact.txt)
posts.html          post index
posts/*.html        one file per post (copy hello-world.html as template)
talks.html          sessions / recordings
about.html          man page
404.html            command not found
assets/css/style.css
assets/js/main.js   theme toggle + boot sequence
CNAME               initwaza.sh
.nojekyll           disable Jekyll processing
```

## Publish

```sh
gh repo create initwaza.sh --public --source . --push
# Repo settings -> Pages -> Deploy from branch -> main / (root)
```

Repo can be named anything; CNAME file controls the domain.

## Cloudflare DNS (initwaza.sh)

| Type  | Name | Content                | Proxy    |
|-------|------|------------------------|----------|
| A     | @    | 185.199.108.153        | DNS only |
| A     | @    | 185.199.109.153        | DNS only |
| A     | @    | 185.199.110.153        | DNS only |
| A     | @    | 185.199.111.153        | DNS only |
| CNAME | www  | warrendt.github.io   | DNS only |

1. Set records DNS-only (grey cloud) first.
2. GitHub repo -> Settings -> Pages -> Custom domain: `initwaza.sh` -> wait for DNS check -> Enforce HTTPS.
3. After the GitHub cert is issued you may flip to proxied (orange cloud); if you do, set Cloudflare SSL mode to **Full (strict)** or you get redirect loops.

## New post

```sh
cp posts/hello-world.html posts/my-new-post.html
vim posts/my-new-post.html
vim posts.html index.html   # add <li> to both lists, newest first
git add -A && git commit -m 'post: my-new-post' && git push
```
