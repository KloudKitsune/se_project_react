param(
  [string]$KeyPath = "$env:USERPROFILE\.ssh\id_ed25519",
  [string]$RemoteUser = "corbansmith92",
  [string]$RemoteHost = "api.wtwr.txtlet.org",
  [string]$RemotePath = "/home/corbansmith92/se_project_express/frontend"
)

Push-Location $PSScriptRoot

Write-Host "Installing dependencies..."
npm ci

Write-Host "Building frontend..."
npm run build

Write-Host "Ensure ssh-agent is running and add key if needed. If ssh-add fails, run 'Start-Service ssh-agent' and try again."
ssh-add $KeyPath 2>$null || Write-Host "ssh-add failed; ensure ssh-agent is running or pass -KeyPath with a private key file."

Write-Host "Copying files to $RemoteUser@$RemoteHost:$RemotePath"
scp -i $KeyPath -r .\dist\* $RemoteUser@$RemoteHost:`"$RemotePath`"

Pop-Location
Write-Host "Deploy finished."
