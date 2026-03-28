# GitHub Actions Deployment Workflow

This directory contains the GitHub Actions workflows used to build and deploy this blog to GitHub Pages.

## Deploy to GitHub Pages (`deploy.yml`)

The primary workflow is `deploy.yml`, which automates the deployment process.

### Workflow Triggers

- **Push to `main` branch**: Every time you push or merge code to the `main` branch, the deployment starts.
- **Manual Trigger**: You can manually trigger the workflow from the **Actions** tab in your GitHub repository.

### Workflow Permissions

The workflow requires specific permissions to interact with GitHub Pages:

```yaml
permissions:
  contents: read      # To checkout the repository
  pages: write         # To deploy to GitHub Pages
  id-token: write      # To verify deployment authenticity
```

### Jobs

The workflow consists of two main jobs:

#### 1. `build`
- **Runs on**: `ubuntu-latest`
- **Node.js version**: 22
- **Process**:
  - Checks out the code.
  - Installs `pnpm`.
  - Installs project dependencies.
  - Executes `pnpm run build` to generate the static files in the `dist` directory.
  - Uploads the `dist` directory as a GitHub Pages artifact using `actions/upload-pages-artifact`.

#### 2. `deploy`
- **Needs**: `build`
- **Environment**: `github-pages`
- **Process**:
  - Deploys the previously uploaded artifact to GitHub Pages using `actions/deploy-pages`.
  - Provides the live URL of the blog as output.

## How to Set Up

To ensure this workflow functions correctly on your fork:

1. Go to your repository **Settings**.
2. Navigate to **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The workflow will now handle everything when you push to `main`.

## Local Troubleshooting

Before pushing, you can test the build locally:
```bash
pnpm build
```
The static output will be in the `dist/` directory. If the local build succeeds, the GitHub Action should also succeed.
