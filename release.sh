#!/bin/bash

# 日志函数
log() {
  echo "[INFO] $(date +"%Y-%m-%d %H:%M:%S") - $1"
}

# 1. 获取当前日期和时间，格式为 YYYYMMDDHHMM
current_time=$(date +"%Y%m%d%H%M")
log "Current time is: $current_time"

# 2. 创建 release 分支，分支名称为 release-YYYYMMDDHHMM
branch_name="release-${current_time}"
log "Branch name will be: $branch_name"

# 3. 切换到主分支（根据实际情况调整，如果是 `main` 分支或者其他分支，修改这里）
log "Switching to main branch..."
git checkout main
if [ $? -ne 0 ]; then
  log "Error: Failed to checkout main branch"
  exit 1
fi

# 4. 拉取最新的主分支代码
log "Pulling the latest code from remote main branch..."
git pull origin main
if [ $? -ne 0 ]; then
  log "Error: Failed to pull latest code from main branch"
  exit 1
fi

# 5. 创建新的 release 分支并切换到该分支
log "Creating new branch: $branch_name and switching to it..."
git checkout -b "$branch_name"
if [ $? -ne 0 ]; then
  log "Error: Failed to create and checkout to branch $branch_name"
  exit 1
fi

# 6. 清理缓存（例如删除 node_modules 和其他缓存）
log "Cleaning up cache and old build files..."
rm -rf node_modules
rm -rf .cache
rm -rf build

# 7. 执行 install 安装依赖
log "Running yarn install..."
yarn install
if [ $? -ne 0 ]; then
  log "Error: yarn install failed"
  exit 1
fi

# 8. 执行 build
log "Running yarn run build..."
yarn run build
if [ $? -ne 0 ]; then
  log "Error: yarn run build failed"
  exit 1
fi

# 9. 删除除 build 文件夹之外的所有项目文件
log "Deleting all project files except build folder..."
find . -maxdepth 1 ! -name 'build' ! -name '.git' -exec rm -rf {} \;

# 10. 提交并推送到远程 Git 仓库
log "Adding changes and committing..."
git add .
git commit -m "Create release branch $branch_name"
if [ $? -ne 0 ]; then
  log "Error: Failed to commit changes"
  exit 1
fi

log "Pushing the release branch to remote..."
git push origin "$branch_name"
if [ $? -ne 0 ]; then
  log "Error: Failed to push the branch to remote"
  exit 1
fi

log "Release branch $branch_name created and pushed successfully!"

